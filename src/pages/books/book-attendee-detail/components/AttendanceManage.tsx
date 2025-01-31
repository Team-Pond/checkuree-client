import { useQuery } from "@tanstack/react-query";
import { getRecordMonthAttendee } from "@/api v2/RecordApiClient";

type IProps = {
  studentInfo: {
    name: string;
    age: number;
    grade: string;
    scheduleDays: string;
  };
};

export default function AttendanceManage(props: IProps) {
  const { studentInfo } = props;
  const { data: attendeeMonth } = useQuery({
    queryKey: [""],
    queryFn: async () =>
      getRecordMonthAttendee({
        params: {
          year: 2025,
          month: 1,
        },
        attendanceBookId: 5,
        attendeeId: 0,
      }),
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-8 items-center w-full h-[81px] rounded-2xl bg-white">
        <img
          src="/images/icons/book-roaster/ico-student.svg"
          alt="학생 아이콘"
          width={40}
          height={40}
          className="rounded-full ml-[23px]"
        />
        <div className="flex flex-col gap-2 text-left">
          <div className="flex flex-col gap-1">
            <p className="text-m-bold">
              <span className="text-text-primary">{studentInfo.name}</span>
              <span className="text-text-secondary text-m-semibold ml-2">
                {studentInfo.age}
              </span>
            </p>
            <p className="text-s-medium">
              <span className="text-text-brand">
                {studentInfo.scheduleDays}
              </span>{" "}
              <span className="text-[#b0b0b0]"> {studentInfo.grade}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
