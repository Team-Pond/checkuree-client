import { createBook } from "@/api v2/AttendanceBookApiClient";
import { CreateBookRequest } from "@/api v2/AttendanceBookSchema";
import { getSubjectItems, getSubjects } from "@/api v2/CourseApiClient";
import { bookKeys } from "@/queryKeys";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useSubjects = () => {
  return useQuery({
    queryKey: bookKeys.subjects._def,
    queryFn: async () =>
      await getSubjects().then((res) => {
        if (res.status === 200) return res.data;
      }),
  });
};

export const useSubjectItems = ({ subjectId }: { subjectId: number }) => {
  return useQuery({
    enabled: !!subjectId,
    queryKey: bookKeys.subjectCourses(subjectId).queryKey,
    queryFn: async () =>
      await getSubjectItems({ subjectId: String(subjectId) }).then((res) => {
        if (res.status === 200) {
          return res.data;
        }
      }),
  });
};

export const useBookCreate = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (params: CreateBookRequest) => await createBook(params),
    onSuccess: () => {
      toast.success("출석부를 생성하였습니다.");
      navigate("/book");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
        toast.error(error.response?.data?.data || "An error occurred");
      } else {
        console.log(error);
        toast.error("An unexpected error occurred");
      }
    },
  });
};
