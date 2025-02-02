// src/queryKeys.ts
import { createQueryKeys } from "@lukemorales/query-key-factory";

// 수강생 데이터를 위한 키
export const attendeeKeys = createQueryKeys("attendee", {
  detail: () => ["table-attendee"] as const,
  schedule: (attendanceBookId: number) => ({
    queryKey: [attendanceBookId],
  }),
  courses: (bookId: number) => ({
    queryKey: [bookId],
  }),
  // byDayAndTime: (dayOfWeek: string, hhmm: string) z=>
  //   [...scheduleAttendeeKeys.all(), dayOfWeek, hhmm] as const,
});
