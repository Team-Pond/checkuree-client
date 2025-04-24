// src/queryKeys.ts
import { createQueryKeys } from '@lukemorales/query-key-factory'
import {
  AttendeeStatisticsType,
  DaysType,
  GenderType,
  PeriodType,
} from './api/type'
import { getScheduleAttendee } from './api/ScheduleApiClient'

// 수강생 데이터를 위한 키
export const attendeeKeys = createQueryKeys('attendee', {
  list: (
    bookId: number,
    dayArrays: DaysType[],
    gender: GenderType,
    age: { min: number; max: number },
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
})

export const bookKeys = createQueryKeys('book', {
  schedules: (bookId?: number, formattedDate?: string) => ({
    queryKey: [bookId, formattedDate],
    queryFn: async () =>
      await getScheduleAttendee({
        attendanceBookId: Number(bookId!),
        params: {
          date: formattedDate!,
          pageable: {
            page: 0,
            size: 100,
            sort: ['asc'],
          },
        },
      }),
  }),
  list: () => ({
    queryKey: [''],
  }),
  detail: (bookId: number) => ({
    queryKey: [bookId],
  }),
  subjects: () => ({
    queryKey: [''],
  }),
  subjectCourses: (subjectId: number) => ({
    queryKey: [subjectId],
  }),
  statistic: (bookId: number, from: string, periodType: PeriodType) => ({
    queryKey: [bookId, from, periodType],
  }),
  statisticAttendee: (bookId: number, type: AttendeeStatisticsType) => ({
    queryKey: [bookId, type],
  }),
})

export const counsellingKeys = createQueryKeys('counselling', {
  list: (attendeeId: number) => ({
    queryKey: [attendeeId],
  }),
})
