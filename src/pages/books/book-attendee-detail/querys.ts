import {
  getBookCourse,
  getBookScheduleTable,
} from "@/api v2/AttendanceBookApiClient";
import {
  getAttendeeDetail,
  getAttendeeProgressLog,
  getScheduleAttendee,
  updateAttendeeDetail,
  updateProgressPromote,
} from "@/api v2/AttendeeApiClient";
import { GenderType } from "@/api v2/AttendeeSchema";
import { getRecordMonthAttendee } from "@/api v2/RecordApiClient";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

// TODO: Calendar 작업 시 필요
export const useAttendeeMonth = () => {
  return useQuery({
    queryKey: [""],
    queryFn: async () =>
      getRecordMonthAttendee({
        params: {
          year: 2025,
          month: 1,
        },
        attendanceBookId: 5,
        attendeeId: 0,
      }),
  });
};

// 선택된 스케줄에 따라 수강생 목록 가져오기
export const useScheduleData = ({
  dayOfWeek,
  hhmm,
  bookId,
}: {
  dayOfWeek: string;
  hhmm: string;
  bookId: number;
}) => {
  return useQuery({
    enabled: !!dayOfWeek && !!hhmm,
    queryKey: ["table-attendee", dayOfWeek, hhmm],
    queryFn: async () => {
      const res = await getScheduleAttendee({
        attendanceBookId: bookId,
        dayOfWeek: dayOfWeek,
        hhmm: hhmm,
      });
      if (res.status === 200) return res.data;
    },
  });
};

export const useScheduleTimeTable = ({ bookId }: { bookId: number }) => {
  return useQuery({
    queryKey: ["table-schedule"],
    queryFn: async () => {
      const res = await getBookScheduleTable({
        attendanceBookId: bookId,
      });
      if (res.status === 200) return res.data;
    },
  });
};

export const useBookCourses = ({
  openDrawer,
  bookId,
}: {
  openDrawer: boolean;
  bookId: string;
}) => {
  return useQuery({
    enabled: openDrawer,
    queryKey: ["book-courses", bookId],
    queryFn: async () => {
      const res = await getBookCourse(bookId);
      if (res.status === 200) return res.data;
    },
  });
};

export const useProgressLog = ({
  bookId,
  attendeeId,
}: {
  bookId: number;
  attendeeId: number;
}) => {
  return useQuery({
    queryKey: ["progressLog", bookId, attendeeId],
    queryFn: async () =>
      await getAttendeeProgressLog({
        attendanceBookId: Number(bookId),
        attendeeId: Number(attendeeId),
      }).then((res) => res.data),
  });
};

export const useAttendeeDetail = ({
  attendeeId,
  bookId,
}: {
  attendeeId: number;
  bookId: number;
}) => {
  return useQuery({
    enabled: attendeeId !== null,
    queryKey: ["attendee-detail", attendeeId],
    queryFn: async () =>
      await getAttendeeDetail({
        attendanceBookId: bookId,
        attendeeId: attendeeId,
      }).then((res) => res.data),
    refetchOnMount: true,
    staleTime: 0,
  });
};

interface AttendeeModifyFormState {
  birthDate: string;
  gender: GenderType;
  address_1: string;
  description: string;
}

const queryClinet = new QueryClient();

export const useAttendeeUpdate = ({
  bookId,
  attendeeId,
  formData,
  setIsAttendeeModify,
}: {
  bookId: number;
  attendeeId: number;
  formData: AttendeeModifyFormState;
  setIsAttendeeModify: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return useMutation({
    mutationFn: async () =>
      await updateAttendeeDetail({
        attendanceBookId: bookId,
        attendeeId: Number(attendeeId),
        params: {
          birthDate: formData.birthDate.replaceAll(".", "-"),
          gender: formData.gender,
          address_1: formData.address_1,
          description: formData.description,
        },
      }),
    onSuccess: () => {
      queryClinet.invalidateQueries({
        queryKey: ["attendee-detail", String(attendeeId)],
      });

      toast.success("학생 정보가 저장되었습니다.");
      setIsAttendeeModify(false);
    },
  });
};

export const useProgressPromote = ({
  bookId,
  attendeeProgressId,
  formData,
  attendeeId,
  onClose,
}: {
  bookId: number;
  attendeeProgressId: number;
  formData: {
    completeAt: string;
    startAt: string;
    nextGradeId: string;
  };
  attendeeId: number;
  onClose: () => void;
}) => {
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: async () =>
      await updateProgressPromote({
        attendanceBookId: Number(bookId),
        params: {
          attendeeProgressId: attendeeProgressId,
          completedAt: formData.completeAt.replaceAll(".", "-"),
          startAt: formData.startAt.replaceAll(".", "-"),
          nextGradeId: !!formData.nextGradeId
            ? Number(formData.nextGradeId)
            : undefined, // "" 빈 문자열일 경우 보내지 않음
        },
      }).then((res) => res.data),
    onSuccess: () => {
      toast.success("다음 과정이 저장되었습니다.");
      queryClient.invalidateQueries({
        queryKey: ["attendee-detail", String(attendeeId)],
      });
      onClose();
    },
  });
};
