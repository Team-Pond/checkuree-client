import { ScheduleData } from "@/api/ScheduleSchema";
import tw from "tailwind-styled-components";
import LessonRow from "./LessonRow";

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

  const openModifyRecordTimeModal = (schedule: ScheduleData) => {
    if (schedule.recordStatus === "ATTEND") {
      handleRecord(schedule.recordId, schedule.recordTime);
    }
  };

  return (
    <>
      {needLessonStudents.length > 0 && (
        <LessonContainer key={"needLesson"}>
          <LessonStatusTime>{"수업 중"}</LessonStatusTime>
          {needLessonStudents.map((schedule, index) => (
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
      )}
    </>
  );
}

const LessonContainer = tw.div`w-full text-left rounded-2xl bg-white px-6 pt-1 flex flex-col`;
const LessonStatusTime = tw.p`text-[#5d5d5d] text-s-bold h-12 flex items-center`;
