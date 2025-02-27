import { ScheduleData, ScheduleDataContentType } from "@/api/ScheduleSchema";
import { twMerge } from "tailwind-merge";
import tw from "tailwind-styled-components";
import { useLessonUpdate } from "../queries";
import { formatLocalTimeString, scheduleCheckformatTime } from "@/utils";
import LessonRow from "./LessonRow";

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

  return (
    <>
      {noNeedLessonTimeScheduleTable?.map((content, index) => {
        return (
          content.schedules.length > 0 && (
            <LessonContainer key={[content.schedules, index].join("-")}>
              <LessonStatusTime>
                {scheduleCheckformatTime(content.startTime)}
              </LessonStatusTime>

              {content.schedules.map((schedule, index) => (
                <LessonRow
                  key={[schedule.scheduleId, index].join("-")}
                  schedule={schedule}
                  bookId={bookId}
                  handleAttendanceStatusWithConfirmation={
                    handleAttendanceStatusWithConfirmation
                  }
                  openModifyRecordTimeModal={openModifyRecordTimeModal}
                />
              ))}
            </LessonContainer>
          )
        );
      })}
    </>
  );
}

const LessonContainer = tw.div`w-full text-left rounded-2xl bg-white px-6 pt-1 flex flex-col`;
const LessonWrapper = tw.div`w-full h-[56px] flex items-center justify-between px-2`;
const LessonStatusTime = tw.p`text-[#5d5d5d] text-s-bold h-12 flex items-center`;
