import { getMeBooks } from "@/api/AttendanceBookApiClient";
import { bookKeys } from "@/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getBookDetail } from "@/api/AttendanceBookApiClient";

export const useBookList = () => {
  return useQuery({
    queryKey: bookKeys.list._def,
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
    queryKey: bookKeys.detail._def,

    queryFn: async () => {
      const response = await getBookDetail(bookId);
      if (response.status === 200) {
        return response;
      }
    },
  });
};
