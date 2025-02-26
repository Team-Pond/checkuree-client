import { ScheduleData, ScheduleDataContentType } from "@/api v2/ScheduleSchema";
import { twMerge } from "tailwind-merge";
import tw from "tailwind-styled-components";
import { useLessonUpdate } from "../queries";
import { formatLocalTimeString, scheduleCheckformatTime } from "@/utils";

interface IProps {
  noNeedLessonTimeScheduleTable: ScheduleDataContentType;
  bookId: number;
  handleAttendanceStatusWithConfirmation: (
    targetStatus: "ATTEND" | "ABSENT",
    schedule: ScheduleData
  ) => void;

  openModifyRecordTimeModal: (schedule: ScheduleData) => void;
}
export default function NoNeedLessonTable(props: IProps) {
  const {
    noNeedLessonTimeScheduleTable,
    bookId,
    handleAttendanceStatusWithConfirmation,
    openModifyRecordTimeModal,
  } = props;

  const { mutate: lessonMutation } = useLessonUpdate({
    bookId,
  });

  return (
    <>
      {noNeedLessonTimeScheduleTable?.map((content, index) => {
        return (
          content.schedules.length > 0 && (
            <LessonContainer key={[content.schedules, index].join("-")}>
              <LessonStatusTime isLesson={false}>
                {scheduleCheckformatTime(content.startTime)}
              </LessonStatusTime>

              {content.schedules.map((schedule, index) => {
                return (
                  <LessonWrapper key={[schedule, index].join("-")}>
                    <div
                      className="flex flex-col items-start"
                      onClick={() => openModifyRecordTimeModal(schedule)}
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
                        <button
                          onClick={() => {
                            handleAttendanceStatusWithConfirmation(
                              "ABSENT",
                              schedule
                            );
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
                            handleAttendanceStatusWithConfirmation(
                              "ATTEND",
                              schedule
                            );
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
                  </LessonWrapper>
                );
              })}
            </LessonContainer>
          )
        );
      })}
    </>
  );
}

const LessonContainer = tw.div`w-full text-left rounded-2xl bg-white px-6 pt-1 flex flex-col`;
const LessonWrapper = tw.div`w-full h-[56px] flex items-center justify-between px-2`;
const LessonStatusTime = tw.p<{ isLesson: boolean }>`${(prop) =>
  prop.isLesson
    ? "text-[#171717]"
    : "text-[#5d5d5d]"} text-s-bold h-12 flex items-center`;
