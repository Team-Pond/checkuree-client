// src/queryKeys.ts
import { createQueryKeys } from '@lukemorales/query-key-factory'
import {
  AttendeeStatisticsType,
  DaysType,
  GenderType,
  PeriodType,
} from './api/type'
import { getSchedule } from './api/ScheduleApiClient'
import {
  getBookCourse,
  getBookDetail,
  getBookScheduleTable,
  getMeBooks,
} from './api/AttendanceBookApiClient'
import {
  getAttendee,
  getAttendeeDetail,
  getAttendeeProgressLog,
  getAttendeeStatistics,
  getScheduleAttendee,
} from './api/AttendeeApiClient'
import { getStatistics } from './api/RecordApiClient'
import { getSubjectItems, getSubjects } from './api/CourseApiClient'
import { getAttendeeCounsellings } from './api/CounselApiClient'

// 수강생 데이터를 위한 키
export const attendeeKeys = createQueryKeys('attendee', {
  list: (
    bookId: number,
    dayArrays: DaysType[],
    gender: GenderType,
    age: { min: number; max: number },
  ) => ({
    queryKey: [bookId, dayArrays, gender, age],
    queryFn: async () => {
      const response = await getAttendee({
        attendanceBookId: Number(bookId),
        filter: {
          age: age,
          gradeIds: [0],
          scheduleDays: dayArrays,
          gender: gender,
          status: 'ATTENDING',
        },
      })
      if (response.status === 200) return response
    },
  }),
  detail: (bookId: number, attendeeId: number) => ({
    queryKey: [bookId, attendeeId],
    queryFn: async () =>
      await getAttendeeDetail({
        attendanceBookId: bookId,
        attendeeId: attendeeId,
      }).then((res) => res.data),
  }),

  // 스케줄 시간표 학생 데이터
  schedules: (attendanceBookId: number, dayOfWeek?: string, hhmm?: string) => ({
    queryKey: [attendanceBookId, dayOfWeek, hhmm],
    queryFn: async () => {
      const res = await getScheduleAttendee({
        attendanceBookId,
        dayOfWeek: dayOfWeek!,
        hhmm: hhmm!,
      })
      if (res.status === 200) return res.data
    },
  }),

  // 수강생 스케줄 데이터
  scheduleTable: (attendanceBookId: number) => ({
    queryKey: [attendanceBookId],
    queryFn: async () => {
      const res = await getBookScheduleTable({ attendanceBookId })
      if (res.status === 200) return res.data
    },
  }),

  // 수강생 수업 데이터
  courses: (bookId: number) => ({
    queryKey: [bookId],
    queryFn: async () => {
      const res = await getBookCourse(String(bookId))
      if (res.status === 200) return res.data
    },
  }),

  // 수강생 진도 기록
  progressLog: (bookId: number, attendeeId: number) => ({
    queryKey: [bookId, attendeeId],
    queryFn: async () =>
      await getAttendeeProgressLog({
        attendanceBookId: Number(bookId),
        attendeeId: Number(attendeeId),
      }).then((res) => res.data),
  }),
})

export const bookKeys = createQueryKeys('book', {
  // 출석부 스케줄 데이터
  schedules: (bookId?: number, formattedDate?: string) => ({
    queryKey: [bookId, formattedDate],
    queryFn: async () =>
      await getSchedule({
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
  // 출석부 리스트트
  list: () => ({
    queryKey: [''],
    queryFn: async () => {
      const response = await getMeBooks()
      if (response.status === 200) {
        return response
      }
    },
  }),

  // 출석부 상세
  detail: (bookId: number) => ({
    queryKey: [bookId],
    queryFn: async () => {
      const response = await getBookDetail(bookId)
      if (response.status === 200) {
        return response
      }
    },
  }),

  // 출석부 과목 리스트트
  subjects: () => ({
    queryKey: [''],
    queryFn: async () =>
      await getSubjects().then((res) => {
        if (res.status === 200) return res.data
      }),
  }),

  // 출석부 과목별 수업 리스트
  subjectCourses: (subjectId: number) => ({
    queryKey: [subjectId],
    queryFn: async () =>
      await getSubjectItems({ subjectId: String(subjectId) }).then((res) => {
        if (res.status === 200) {
          return res.data
        }
      }),
  }),

  // 출석부 통계계
  statistic: (bookId: number, from: string, periodType: PeriodType) => ({
    queryKey: [bookId, from, periodType],
    queryFn: async () => {
      const response = await getStatistics({
        params: {
          from,
          periodType,
        },
        attendanceBookId: bookId,
      })
      if (response.status === 200) {
        return response
      }
    },
  }),

  // 출석부 통계 - 학생생
  statisticAttendee: (bookId: number, type: AttendeeStatisticsType) => ({
    queryKey: [bookId, type],
    queryFn: async () => {
      const response = await getAttendeeStatistics({
        params: {
          type: type,
        },
        attendanceBookId: bookId,
      })
      if (response.status === 200) {
        return response
      }
    },
  }),
})

export const counsellingKeys = createQueryKeys('counselling', {
  // 상담 리스트
  list: (bookId: number, attendeeId: number) => ({
    queryKey: [bookId, attendeeId],
    queryFn: async () =>
      await getAttendeeCounsellings({
        bookId,
        attendeeId,
      }).then((res) => res.data),
  }),
})
