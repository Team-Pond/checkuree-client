import { twMerge } from "tailwind-merge";

import { ScheduleDataType } from "@/api v2/ScheduleSchema";
import { scheduleCheckformatTime } from "@/utils";
import { STATUS } from "@/api v2/RecordSchema";
import { ScheduleData } from "../../../../api v2/ScheduleSchema";
import { formatLocalTimeString } from "../../../../utils";
import { useLessonUpdate, useRecordCreate, useStatusUpdate } from "../queries";

type IProps = {
  bookSchedules: ScheduleDataType;
  bookId: number;
  currentDate: string;
  checkedScheduleCount: number;
  setCheckedCount: (count: number) => void;
};

const handleCheckedCountChange = ({
  schedule,
  targetStatus,
  checkedScheduleCount,
  setCheckedCount,
}: {
  schedule: ScheduleData;
  targetStatus: Omit<STATUS, "PENDING">;
  checkedScheduleCount: number;
  setCheckedCount: (count: number) => void;
}) => {
  if (!schedule.recordId) {
    setCheckedCount(checkedScheduleCount + 1);
    return;
  }
  const currentStatus = schedule.recordStatus;
  // 상태 변화에 따른 checkedScheduleCount 조정
  const adjustment =
    currentStatus === targetStatus ? -1 : currentStatus === "PENDING" ? 1 : 0;
  setCheckedCount(checkedScheduleCount + adjustment);
};

const handleStatusChange = ({
  schedule,
  targetStatus,
  statusMutation,
  recordMutation,
}: {
  schedule: ScheduleData;
  targetStatus: Omit<STATUS, "PENDING">;
  statusMutation: (params: {
    recordId: number;
    scheduleId: number;
    status: STATUS;
  }) => void;
  recordMutation: (params: {
    attendeeId: number;
    scheduleId: number;
    status: STATUS;
  }) => void;
}) => {
  // 출석 기록이 없는 경우 출석 기록 생성
  if (!schedule.recordId) {
    recordMutation({
      attendeeId: schedule.attendeeId,
      scheduleId: schedule.scheduleId,
      status: targetStatus as STATUS,
    });
    return;
  }

  // 이미 출석인 경우 다시 누르면 PENDING 상태로 수정
  if (schedule.recordStatus === targetStatus) {
    statusMutation({
      recordId: schedule.recordId,
      scheduleId: schedule.scheduleId,
      status: "PENDING",
    });
    return;
  }

  // 출석 상태를 targetStatus로 변경
  statusMutation({
    recordId: schedule.recordId,
    scheduleId: schedule.scheduleId,
    status: targetStatus as STATUS,
  });
};

export default function MainContents(props: IProps) {
  const {
    bookId,
    bookSchedules,
    currentDate,
    checkedScheduleCount,
    setCheckedCount,
  } = props;

  const { mutate: recordMutation } = useRecordCreate({
    bookId,
    currentDate,
  });

  const { mutate: statusMutation } = useStatusUpdate({ bookId });

  const { mutate: lessonMutation } = useLessonUpdate({
    bookId,
  });

  return (
    <div className="w-full flex flex-col gap-4 justify-center items-center py-3 px-4 bg-bg-secondary scrollbar-hide custom-scrollbar-hide">
      {bookSchedules?.content?.map((content, index) => {
        return (
          <div
            key={content.schedules + `${index}`}
            className="w-full text-left rounded-2xl bg-white px-6 pt-1 flex flex-col"
          >
            <p className="text-s-bold text-text-secondary h-12 flex items-center">
              {scheduleCheckformatTime(content.startTime)}
            </p>

            {content.schedules.map((schedule) => {
              return (
                <div className="w-full h-[56px] flex items-center justify-between px-2 ">
                  {/*<p className="font-bold  text-text-primary">{schedule.name}</p>*/}
                  <div className="flex flex-col items-start">
                    <p className="font-bold text-text-primary">
                      {schedule.name}
                    </p>
                    {schedule.recordStatus === "ATTEND" && (
                      <p className="text-[12px] text-[#59996B] font-medium leading-[14.98px]">
                        {formatLocalTimeString(schedule.recordTime) + " 출석"}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-4">
                    <div className="flex gap-2">
                      {/* TODO: 결석은 status명이 어떻게 되는지? */}
                      <button
                        onClick={() => {
                          // await checkAttendee("", schedule.attendeeId)
                          // statusMutation("REJECTED");`
                          handleCheckedCountChange({
                            schedule,
                            targetStatus: "ABSENT",
                            checkedScheduleCount,
                            setCheckedCount,
                          });
                          handleStatusChange({
                            schedule,
                            targetStatus: "ABSENT",
                            statusMutation,
                            recordMutation,
                          });
                        }}
                        className={twMerge(
                          "rounded-lg text-sm w-[57px] h-[33px] flex items-center justify-center",
                          schedule.recordStatus === "ABSENT"
                            ? "bg-bg-destructive text-text-interactive-destructive"
                            : "bg-bg-disabled text-text-disabled"
                        )}
                      >
                        결석
                      </button>
                      <button
                        onClick={() => {
                          handleCheckedCountChange({
                            schedule,
                            targetStatus: "ATTEND",
                            checkedScheduleCount,
                            setCheckedCount,
                          });
                          handleStatusChange({
                            schedule,
                            targetStatus: "ATTEND",
                            statusMutation,
                            recordMutation,
                          });
                        }}
                        className={twMerge(
                          "rounded-lg text-sm w-[57px] h-[33px] flex items-center justify-center",
                          schedule.recordStatus === "ATTEND"
                            ? "bg-bg-primary text-text-interactive-primary"
                            : "bg-bg-disabled text-text-disabled"
                        )}
                      >
                        출석
                      </button>
                    </div>
                    <button
                      className={twMerge(
                        "w-8 h-8 flex items-center justify-center rounded-lg",
                        schedule.recordStatus !== "ATTEND"
                          ? "bg-bg-disabled"
                          : schedule.isTaught
                          ? "bg-bg-tertiary"
                          : "bg-bg-base" // recordStatus === "ATTEND" && isTaught === false 인 경우 bg-bg-base 맞나 ?
                      )}
                      onClick={() => {
                        lessonMutation({
                          recordId: schedule.recordId,
                          isTaught: !schedule.isTaught,
                        });
                      }}
                      disabled={
                        schedule.recordStatus === "ATTEND" ? false : true
                      }
                    >
                      <img
                        src={`/images/icons/book-check/${
                          schedule.isTaught
                            ? "ico-note-active.svg"
                            : "ico-note.svg"
                        }`}
                        alt=""
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
