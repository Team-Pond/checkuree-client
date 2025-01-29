import { useState } from "react";
import { ko } from "date-fns/locale";
import { useQuery } from "@tanstack/react-query";
import { getRecordMonthAttendee } from "@/api v2/RecordApiClient";

export default function AttendanceManage() {
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
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="p-4 flex flex-col gap-4">
      {/* <Calendar
        title="예약"
        locale={ko}
        onDayClick={(day) => {
          setDate(day);
        }}
        onSelect={setDate}
        className=""
      /> */}
    </div>
  );
}
