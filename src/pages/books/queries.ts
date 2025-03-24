import { getMeBooks } from "@/api/AttendanceBookApiClient";
import { bookKeys } from "@/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getBookDetail } from "@/api/AttendanceBookApiClient";
import { getStatistics } from "@/api/RecordApiClient";
import { GetStatisticsRequest } from "@/api/RecordSchema";
import { GetAttendeeStatisticsRequest } from "@/api/AttendeeSchema";
import { getAttendeeStatistics } from "@/api/AttendeeApiClient";

export const useBookList = () => {
  return useQuery({
    queryKey: bookKeys.list().queryKey,
    staleTime: 10 * 60 * 1000, // 10분
    queryFn: async () => {
      const response = await getMeBooks();
      if (response.status === 200) {
        return response;
      }
    },
  });
};

export const useBookDetail = (bookId: number) => {
  return useQuery({
    queryKey: bookKeys.detail(bookId).queryKey,

    queryFn: async () => {
      const response = await getBookDetail(bookId);
      if (response.status === 200) {
        return response;
      }
    },
  });
};

export const useBookStatistic = (
  bookId: number,
  params: GetStatisticsRequest
) => {
  return useQuery({
    enabled: !!params.from && !!params.periodType,
    queryKey: bookKeys.statistic(bookId, params.from, params.periodType)
      .queryKey,
    queryFn: async () => {
      const response = await getStatistics({
        params: params,
        attendanceBookId: bookId,
      });
      if (response.status === 200) {
        return response;
      }
    },
  });
};

export const useAttendeeStatistic = (
  bookId: number,
  params: GetAttendeeStatisticsRequest
) => {
  return useQuery({
    enabled: !!params.type,
    queryKey: bookKeys.statisticAttendee(bookId, params.type).queryKey,
    queryFn: async () => {
      const response = await getAttendeeStatistics({
        params: params,
        attendanceBookId: bookId,
      });
      if (response.status === 200) {
        return response;
      }
    },
  });
};
