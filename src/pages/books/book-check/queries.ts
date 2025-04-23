import {
  createRecord,
  updateRecordAll,
  updateRecordLesson,
  updateRecord,
  deleteRecord,
} from '@/api/RecordApiClient'
import { DeleteRecordRequest } from '@/api/RecordSchema'
import { getScheduleAttendee } from '@/api/ScheduleApiClient'
import { GetScheduleAttendeeResponse } from '@/api/ScheduleSchema'
import { STATUS } from '@/api/type'
import { bookKeys } from '@/queryKeys'
import useFormDataStore from '@/store/recordStore'
import { getCurrentTimeParts } from '@/utils'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { s } from 'vite/dist/node/types.d-aGj9QkWt'

export const useBookSchedules = ({
  bookId,
  formattedDate,
}: {
  bookId: number
  formattedDate: string
}) => {
  return useQuery({
    queryKey: bookKeys.schedules(bookId, formattedDate).queryKey,
    queryFn: async () =>
      await getScheduleAttendee({
        attendanceBookId: Number(bookId!),
        params: {
          date: formattedDate,
          pageable: {
            page: 0,
            size: 100,
            sort: ['asc'],
          },
        },
      }),
    // refetchInterval: 5000,
    // refetchIntervalInBackground: true,

    enabled: !!bookId && !!formattedDate,
  })
}

export const useRecordAllUpdate = ({
  bookId,
  formattedDate,
}: {
  bookId: number
  formattedDate: string
}) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () =>
      await updateRecordAll({
        params: {
          attendanceBookId: bookId,
          attendDate: formattedDate,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: bookKeys.schedules._def,
      })
      toast.success('전체 출석 완료')
    },
    onError: () => {
      toast.success('전체 출석 실패')
    },
  })
}

export const useRecordUpdate = ({
  bookId,
  recordId,
  formattedTime,
}: {
  bookId: number
  recordId: number
  formattedTime: string
}) => {
  const queryClient = useQueryClient()
  const { setFormData } = useFormDataStore()
  return useMutation({
    mutationFn: async () =>
      await updateRecord({
        params: {
          attendanceBookId: bookId,
          attendTime: formattedTime
            .split(':')
            .map((time) => time.padStart(2, '0'))
            .join(':'),
          recordId,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: bookKeys.schedules._def,
      })
      toast.success('출석시간 변경 완료')
      setFormData({ hour: '', minute: '' })
    },
    onError: () => {
      toast.error('출석시간 수정 실패')
    },
  })
}

/**
 * @param attendTime : 'HH:mm' 형식으로 입력
 * attendTime 을 입력하지 않을 경우 현재 시간이 자동으로 입력됨
 */
export const useRecordCreate = ({
  bookId,
  currentDate,
}: {
  bookId: number
  currentDate: string
}) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      attendeeId,
      scheduleId,
      status,
      startTime,
    }: {
      attendeeId: number
      scheduleId?: number
      status: STATUS

      startTime?: string
    }) =>
      await createRecord({
        params: {
          attendanceBookId: bookId,
          attendeeId: attendeeId,
          scheduleId: scheduleId,
          attendDate: currentDate,
          attendTime: `${getCurrentTimeParts()
            .hour.toString()
            .padStart(2, '0')}:${getCurrentTimeParts()
            .minute.toString()
            .padStart(2, '0')}`,

          status: status,
        },
      }),

    onMutate: async ({ attendeeId, scheduleId, status, startTime }) => {
      // 2. 이전 데이터를 가져오되, 없으면 빈 객체로 처리
      const previousRecords = queryClient.getQueryData(
        bookKeys.schedules(bookId, currentDate).queryKey,
      ) as GetScheduleAttendeeResponse

      const updateRecords = previousRecords

      if (updateRecords.status === 200 && updateRecords.data.content) {
        const targetSchedule = updateRecords.data.content
          ?.find((item) => item.startTime === startTime)
          ?.schedules?.find((item) => item.scheduleId === scheduleId)
        if (targetSchedule) {
          targetSchedule.recordStatus = status
          targetSchedule.scheduleId = scheduleId!
          targetSchedule.recordTime = `${getCurrentTimeParts()
            .hour.toString()
            .padStart(2, '0')}:${getCurrentTimeParts()
            .minute.toString()
            .padStart(2, '0')}`
        }
        // 3. 낙관적 업데이트] 후 새로운 상태를 `setQueryData`로 저장
        queryClient.setQueryData(
          bookKeys.schedules(bookId, currentDate).queryKey,
          updateRecords,
        )
      }
      return { previousRecords } // 롤백을 위해 이전 상태 반환
    },

    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: bookKeys.schedules(bookId, currentDate).queryKey,
      })
    },
    onError: () => {},
  })
}

export const useStatusUpdate = ({
  bookId,
  currentDate,
}: {
  bookId: number
  currentDate: string
}) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      recordId,
      scheduleId,
      status,
    }: {
      recordId: number
      scheduleId: number
      status: STATUS
      startTime?: string
    }) =>
      await updateRecord({
        params: {
          attendanceBookId: bookId,
          status,
          scheduleId,
          recordId,
        },
      }),
    onMutate: async ({ recordId, scheduleId, status, startTime }) => {
      // 1. 이전 데이터를 가져오되, 없으면 빈 객체로 처리

      const previousRecords = queryClient.getQueryData(
        bookKeys.schedules(bookId, currentDate).queryKey,
      ) as GetScheduleAttendeeResponse

      const updateRecords = previousRecords

      if (updateRecords.status === 200 && updateRecords.data.content) {
        const targetSchedule = updateRecords.data.content
          ?.find((item) => item.startTime === startTime)
          ?.schedules?.find((item) => item.scheduleId === scheduleId)
        if (targetSchedule) {
          targetSchedule.recordStatus = status
        }
        // 3. 낙관적 업데이트] 후 새로운 상태를 `setQueryData`로 저장
        queryClient.setQueryData(
          bookKeys.schedules(bookId, currentDate).queryKey,
          updateRecords,
        )
      }

      return { previousRecords } // 롤백을 위해 이전 상태 반환
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: bookKeys.schedules(bookId, currentDate).queryKey,
      })
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(
        bookKeys.schedules(bookId, currentDate).queryKey,
        context?.previousRecords,
      )
    },
  })
}

export const useLessonUpdate = ({ bookId }: { bookId: number }) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      recordId,
      isTaught,
    }: {
      recordId: number
      isTaught: boolean
    }) =>
      await updateRecordLesson({
        params: {
          attendanceBookId: bookId,
          isTaught,
          recordId,
        },
      }),
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: bookKeys.schedules._def,
      })
    },
    onError: () => {},
  })
}

export const useRecordDelete = (bookId: number, currentDate: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (params: DeleteRecordRequest) =>
      await deleteRecord(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: bookKeys.schedules(bookId, currentDate).queryKey,
      })
      toast.success('보강기록이 삭제되었습니다.')
    },
  })
}
