import { ScheduleData } from "@/api v2/ScheduleSchema";
import { twMerge } from "tailwind-merge";
import tw from "tailwind-styled-components";
import { useLessonUpdate } from "../queries";
import { formatLocalTimeString } from "@/utils";

interface IProps {
  needLessonStudents: ScheduleData[];
  bookId: number;
  handleAttendanceStatusWithConfirmation: (
    targetStatus: "ATTEND" | "ABSENT",
    schedule: ScheduleData
  ) => void;
  handleRecord: (id: number, formattedTime: string) => void;
}
export default function NeedLessonTable(props: IProps) {
  const {
    needLessonStudents,
    bookId,
    handleAttendanceStatusWithConfirmation,
    handleRecord,
  } = props;

  const { mutate: lessonMutation } = useLessonUpdate({
    bookId,
  });

  return (
    <>
      {needLessonStudents.length > 0 && (
        <LessonContainer key={"needLesson"}>
          <LessonStatusTime isLesson={true}>{"수업 중"}</LessonStatusTime>
          {needLessonStudents.map((schedule, index) => {
            return (
              <LessonWrapper key={[schedule, index].join("-")}>
                <div
                  className="flex flex-col items-start"
                  onClick={() => {
                    if (schedule.recordStatus === "ATTEND") {
                      handleRecord(schedule.recordId, schedule.recordTime);
                    }
                  }}
                >
                  <p className="font-bold text-text-primary">
                    {schedule.name}
                    {schedule.isMakeup && (
                      <span className="text-[#EC9E14] text-xs-medium align-middle">
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
      )}
    </>
  );
}

const LessonContainer = tw.div`w-full text-left rounded-2xl bg-white px-6 pt-1 flex flex-col`;
const LessonWrapper = tw.div`w-full h-[56px] flex items-center justify-between px-2`;
const LessonStatusTime = tw.p<{ isLesson: boolean }>`${(prop) =>
  prop.isLesson
    ? "text-[#171717]"
    : "text-[#5d5d5d]"} text-s-bold h-12 flex items-center`;
