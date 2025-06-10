import { bookKeys } from '@/queryKeys'
import { useQuery } from '@tanstack/react-query'
import { GetStatisticsRequest } from '@/api/RecordSchema'
import { GetAttendeeStatisticsRequest } from '@/api/AttendeeSchema'

export const useBookList = () =>
  useQuery({
    ...bookKeys.list(),
    staleTime: 10 * 60 * 1000, // 10분
  })

export const useBookDetail = (bookId: number) =>
  useQuery(bookKeys.detail(bookId))

export const useBookStatistic = (
  bookId: number,
  params: GetStatisticsRequest,
) =>
  useQuery({
    enabled: !!params.from && !!params.periodType,
    ...bookKeys.statistic(bookId, params.from, params.periodType),
  })

export const useAttendeeStatistic = (
  bookId: number,
  params: GetAttendeeStatisticsRequest,
) =>
  useQuery({
    enabled: !!params.type,
    ...bookKeys.statisticAttendee(bookId, params.type),
  })
