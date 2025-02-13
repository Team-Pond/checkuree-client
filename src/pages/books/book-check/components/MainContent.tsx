import { twMerge } from "tailwind-merge";

import { ScheduleDataType } from "@/api v2/ScheduleSchema";
import { scheduleCheckformatTime } from "@/utils";
import { STATUS } from "@/api v2/RecordSchema";
import { ScheduleData } from "../../../../api v2/ScheduleSchema";
import { formatLocalTimeString } from "../../../../utils";
import { useLessonUpdate, useRecordCreate, useStatusUpdate } from "../queries";
import { useState } from "react";
import { ConfirmModal } from "./ConfirmModal";
import ModifyRecordTimeModal from "./ModifyRecordTimeModal";

type IProps = {
  bookSchedules: ScheduleDataType;
  bookId: number;
  currentDate: string;
  checkedScheduleCount: number;
  setCheckedCount: (count: number) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  confirmMessage: string;
  setConfirmMessage: (message: string) => void;
  onSave: () => void;
  setOnSave: (onSave: () => void) => void;
};

export default function MainContents(props: IProps) {
  const {
    bookId,
    bookSchedules,
    currentDate,
    checkedScheduleCount,
    setCheckedCount,
    isOpen,
    setIsOpen,
    confirmMessage,
    setConfirmMessage,
    onSave,
    setOnSave,
  } = props;

  const { mutate: recordMutation } = useRecordCreate({
    bookId,
    currentDate,
  });

  const { mutate: statusMutation } = useStatusUpdate({ bookId });

  const { mutate: lessonMutation } = useLessonUpdate({
    bookId,
  });

  const [isRecordTimeOpen, setIsRecordTimeOpen] = useState(false);

  const [record, setRecord] = useState({
    id: 0,
    formattedTime: "",
  });

  // 출석체크 화면의 체크 인원 수 변경
  const handleCheckedCountChange = ({
    schedule,
    targetStatus,
  }: {
    schedule: ScheduleData;
    targetStatus: Omit<STATUS, "PENDING">;
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

  // 출석체크 상태 변경
  const handleStatusChange = ({
    schedule,
    targetStatus,
  }: {
    schedule: ScheduleData;
    targetStatus: Omit<STATUS, "PENDING">;
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

  // 확인 모달에서 띄울 메시지 설정
  const handleConfirmMessage = (
    schedule: ScheduleData,
    targetStatus: "ATTEND" | "ABSENT",
  ) => {
    if (schedule.recordStatus === targetStatus) {
      setConfirmMessage("출석체크를 취소하시겠어요?");
      return;
    }
    if (targetStatus === "ATTEND") {
      setConfirmMessage("출석상태로 변경하시겠어요?");
      return;
    }
    if (targetStatus === "ABSENT") {
      setConfirmMessage("결석상태로 변경하시겠어요?");
      return;
    }
  };

  const handleAttendanceStatusWithConfirmation = (
    targetStatus: "ATTEND" | "ABSENT",
    schedule: ScheduleData,
  ) => {
    // 출석기록이 이미 있는 경우 확인 메시지 출력
    if (schedule.recordStatus !== "PENDING") {
      handleConfirmMessage(schedule, targetStatus);
      setOnSave(() => () => {
        handleCheckedCountChange({
          schedule,
          targetStatus,
        });
        handleStatusChange({
          schedule,
          targetStatus,
        });
      });
      setIsOpen(true);
      return;
    }

    // 출석기록이 없는 경우 바로 상태 변경
    handleCheckedCountChange({
      schedule,
      targetStatus,
    });
    handleStatusChange({
      schedule,
      targetStatus,
    });
  };

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
                  <div
                    className="flex flex-col items-start"
                    onClick={() => {
                      if (schedule.recordStatus === "ATTEND") {
                        setRecord({
                          id: schedule.recordId,
                          formattedTime: schedule.recordTime,
                        });
                        setIsRecordTimeOpen(true);
                      }
                    }}
                  >
                    <p className="font-bold text-text-primary">
                      {schedule.name}
                      {schedule.isMakeup && (
                        <span className="text-[#EC9E14] text-xs-medium align-middle">
                          {" "}
                          보강
                        </span>
                      )}
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
                          handleAttendanceStatusWithConfirmation(
                            "ABSENT",
                            schedule,
                          );
                        }}
                        className={twMerge(
                          "rounded-lg text-sm w-[57px] h-[33px] flex items-center justify-center",
                          schedule.recordStatus === "ABSENT"
                            ? "bg-bg-destructive text-text-interactive-destructive"
                            : "bg-bg-disabled text-text-disabled",
                        )}
                      >
                        결석
                      </button>
                      <button
                        onClick={() => {
                          handleAttendanceStatusWithConfirmation(
                            "ATTEND",
                            schedule,
                          );
                        }}
                        className={twMerge(
                          "rounded-lg text-sm w-[57px] h-[33px] flex items-center justify-center",
                          schedule.recordStatus === "ATTEND"
                            ? "bg-bg-primary text-text-interactive-primary"
                            : "bg-bg-disabled text-text-disabled",
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
                            : "bg-bg-base", // recordStatus === "ATTEND" && isTaught === false 인 경우 bg-bg-base 맞나 ?
                      )}
                      onClick={() => {
                        lessonMutation({
                          recordId: schedule.recordId,
                          isTaught: !schedule.isTaught,
                        });
                      }}
                      disabled={schedule.recordStatus !== "ATTEND"}
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
      <ConfirmModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        onSave={() => {
          onSave();
          setIsOpen(false);
        }}
        message={confirmMessage}
      />
      <ModifyRecordTimeModal
        isOpen={isRecordTimeOpen}
        bookId={bookId}
        onClose={() => {
          setIsRecordTimeOpen(false);
        }}
        record={record}
      />
    </div>
  );
}
