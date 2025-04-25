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
        queryKey: bookKeys.schedules(bookId, formattedDate).queryKey,
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
  currentDate,
}: {
  bookId: number
  recordId: number
  formattedTime: string
  currentDate: string
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
        queryKey: bookKeys.schedules(bookId, currentDate).queryKey,
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
  const key = bookKeys.schedules(bookId, currentDate).queryKey
  const queryClient = useQueryClient()
  const recordTime = `${getCurrentTimeParts()
    .hour.toString()
    .padStart(2, '0')}:${getCurrentTimeParts()
    .minute.toString()
    .padStart(2, '0')}`

  return useMutation({
    mutationFn: async ({
      attendeeId,
      scheduleId,
      status,
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
          attendTime: recordTime,

          status: status,
        },
      }),

    onMutate: async ({ scheduleId, status, startTime }) => {
      const previous =
        queryClient.getQueryData<GetScheduleAttendeeResponse>(key)

      queryClient.setQueryData<GetScheduleAttendeeResponse>(key, (old) => {
        if (!old || old.status !== 200) return old

        return {
          ...old,
          data: {
            ...old.data,
            content: old.data.content.map((slot) => {
              if (slot.startTime !== startTime) return slot
              return {
                ...slot,
                schedules: slot.schedules.map((s) =>
                  s.scheduleId === scheduleId
                    ? {
                        ...s,
                        recordStatus: status,
                        recordTime,
                      }
                    : s,
                ),
              }
            }),
          },
        }
      })

      // 3. 롤백용 컨텍스트 반환
      return { previous }
    },

    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: key,
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
  const key = bookKeys.schedules(bookId, currentDate).queryKey
  const recordTime = `${getCurrentTimeParts()
    .hour.toString()
    .padStart(2, '0')}:${getCurrentTimeParts()
    .minute.toString()
    .padStart(2, '0')}`

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

    onMutate: async ({ scheduleId, status, startTime }) => {
      // 1. 동시 요청 취소 및 이전 데이터 스냅샷
      await queryClient.cancelQueries({ queryKey: key })

      const previous =
        queryClient.getQueryData<GetScheduleAttendeeResponse>(key)

      // 2. 불변성 유지하며 새로운 캐시 상태 계산
      queryClient.setQueryData<GetScheduleAttendeeResponse>(key, (old) => {
        if (!old || old.status !== 200) return old
        return {
          ...old,
          data: {
            ...old.data,
            content: old.data.content.map((slot) => {
              if (slot.startTime !== startTime) return slot
              return {
                ...slot,
                schedules: slot.schedules.map((s) =>
                  s.scheduleId === scheduleId
                    ? {
                        ...s,
                        recordStatus: status,
                        recordTime,
                      }
                    : s,
                ),
              }
            }),
          },
        }
      })

      // 3. 롤백용 컨텍스트 반환
      return { previous }
    },

    onError: (_err, _vars, context) => {
      // 실패 시 이전 상태로 복원
      if (context?.previous) {
        queryClient.setQueryData(key, context.previous)
      }
    },

    onSettled: () => {
      // 최종적으로 서버 상태와 동기화
      queryClient.invalidateQueries({ queryKey: key })
    },
  })
}

export const useLessonUpdate = ({
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
        queryKey: bookKeys.schedules(bookId, currentDate).queryKey,
      })
    },
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
