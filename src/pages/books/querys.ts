import { getMeBooks } from "@/api v2/AttendanceBookApiClient";
import { useQuery } from "@tanstack/react-query";

export const useBookList = () => {
  return useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const response = await getMeBooks();
      if (response.status === 200) {
        return response;
      } else {
        console.log(response); // 에러 바운더리 추가
      }
    },
  });
};
