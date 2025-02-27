// src/queryKeys.ts
// src/queryKeys.ts
import { createQueryKeys } from "@lukemorales/query-key-factory";
import { DaysType, GenderType } from "./api/AttendeeSchema";

// 수강생 데이터를 위한 키
export const attendeeKeys = createQueryKeys("attendee", {
  list: (
    bookId: number,
    dayArrays: DaysType[],
    gender: GenderType,
    age: { min: number; max: number }
  ) => ({
    queryKey: [bookId, dayArrays, gender, age],
  }),
  detail: (attendeeId: number) => ({
    queryKey: [attendeeId],
  }),
  schedules: (attendanceBookId: number, dayOfWeek?: string, hhmm?: string) => ({
    queryKey: [attendanceBookId, dayOfWeek, hhmm],
  }),
  courses: (bookId: number) => ({
    queryKey: [bookId],
  }),
  progressLog: (bookId: number, attendeeId: number) => ({
    queryKey: [bookId, attendeeId],
  }),
});

export const bookKeys = createQueryKeys("book", {
  schedules: (bookId?: number, formattedDate?: string) => ({
    queryKey: [bookId, formattedDate],
  }),
  list: () => ({
    queryKey: [""],
  }),
  detail: (bookId: number) => ({
    queryKey: [bookId],
  }),
  subjects: () => ({
    queryKey: [""],
  }),
  subjectCourses: (subjectId: number) => ({
    queryKey: [subjectId],
  }),
});
