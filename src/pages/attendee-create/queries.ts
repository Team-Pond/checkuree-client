// src/querys.ts
import { useMutation, useQuery } from '@tanstack/react-query'
import { updateBookProgress } from '@/api/AttendanceBookApiClient'
import {
  updateAttendeeSchedule,
  updateAttendeeVerify,
} from '@/api/AttendeeApiClient'
import { UpdateAttendeeScheduleRequest } from '@/api/AttendeeSchema'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { attendeeKeys } from '@/queryKeys'

// 일정(요일, 시간)에 따른 수강생 데이터를 가져오는 커스텀 훅
export const useSchedule = (
  attendanceBookId: number,
  dayOfWeek: string,
  hhmm: string,
  enabled: boolean = false,
) =>
  useQuery({
    ...attendeeKeys.schedules(attendanceBookId, dayOfWeek, hhmm),
    enabled: enabled,
    staleTime: 6000,
  })

// 시간표 데이터를 가져오는 커스텀 훅
export const useScheduleTable = (attendanceBookId: number) =>
  useQuery(attendeeKeys.scheduleTable(attendanceBookId))

// 커리큘럼(강좌) 정보를 가져오는 커스텀 훅
export const useBookCourses = (id: number, enabled: boolean) =>
  useQuery({
    enabled,
    ...attendeeKeys.courses(id),
  })

interface progressGrade {
  startAt: string
  gradeId: number
}

export const useOnlyScheduleUpdate = ({
  paramBookId,
  attendeeId,
  attendeeSchedules,
}: {
  paramBookId: number
  attendeeId: number
  attendeeSchedules: UpdateAttendeeScheduleRequest
}) => {
  return useMutation({
    mutationFn: async () =>
      await updateAttendeeSchedule({
        params: attendeeSchedules!,
        attendanceBookId: paramBookId,
        attendeeId,
      }),
    onSuccess: () => {
      toast.success('수강생 일정이 수정되었습니다.')
    },
    onError: () => {
      toast.error('클래스 일정 수정에 실패했습니다.')
    },
  })
}

export const useScheduleUpdate = ({
  paramBookId,
  attendeeId,
  attendeeSchedules,
  progressGrade,
}: {
  paramBookId: number
  attendeeId: number
  attendeeSchedules: UpdateAttendeeScheduleRequest
  progressGrade: progressGrade[]
}) => {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: async () =>
      await updateAttendeeSchedule({
        params: attendeeSchedules!,
        attendanceBookId: paramBookId,
        attendeeId,
      }),
    onSuccess: async () => {
      await updateBookProgress({
        attendanceBookId: paramBookId,
        params: {
          attendeeId: attendeeId,
          progresses: progressGrade!,
        },
      })
      await updateAttendeeVerify({
        attendanceBookId: paramBookId,
        params: {
          attendeeId: attendeeId,
        },
      }).then((res) => {
        if (res.status === 200) {
          toast.success('학생 등록되었습니다.')
          navigate(`/book/${paramBookId}/attendee${location.search}`)
        }
      })
    },
    onError: () => {},
  })
}
