import {
  createRecord,
  updateRecordAll,
  updateRecordLesson,
  updateRecordStatus,
} from "@/api v2/RecordApiClient";
import { STATUS } from "@/api v2/RecordSchema";
import { getScheduleAttendee } from "@/api v2/ScheduleApiClient";
import { bookKeys } from "@/queryKeys";
import { getCurrentTimeParts } from "@/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useBookSchedules = ({
  bookId,
  formattedDate,
}: {
  bookId: number;
  formattedDate: string;
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
            sort: ["asc"],
          },
        },
      }),
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
    enabled: !!bookId && !!formattedDate,
  });
};

export const useRecordAllUpdate = ({
  bookId,
  formattedDate,
}: {
  bookId: number;
  formattedDate: string;
}) => {
  const queryClient = useQueryClient();
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
      });
      toast.success("전체 출석 완료");
    },
    onError: () => {
      toast.success("전체 출석 실패");
    },
  });
};

export const useRecordCreate = ({
  bookId,
  currentDate,
}: {
  bookId: number;
  currentDate: string;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      attendeeId,
      scheduleId,
      status,
    }: {
      attendeeId: number;
      scheduleId: number;
      status: STATUS;
    }) =>
      await createRecord({
        params: {
          attendanceBookId: bookId,
          attendeeId: attendeeId,
          scheduleId: scheduleId,
          attendDate: currentDate,
          attendTime: `${getCurrentTimeParts()
            .hour.toString()
            .padStart(2, "0")}:${getCurrentTimeParts()
            .minute.toString()
            .padStart(2, "0")}`,
          status: status,
        },
      }),
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: bookKeys.schedules._def,
      });
    },
    onError: () => {},
  });
};

export const useStatusUpdate = ({ bookId }: { bookId: number }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      recordId,
      scheduleId,
      status,
    }: {
      recordId: number;
      scheduleId: number;
      status: STATUS;
    }) =>
      await updateRecordStatus({
        params: {
          attendanceBookId: bookId,
          status,
          scheduleId,
          recordId,
        },
      }),
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: bookKeys.schedules._def,
      });
    },
    onError: () => {},
  });
};

export const useLessonUpdate = ({ bookId }: { bookId: number }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      recordId,
      isTaught,
    }: {
      recordId: number;
      isTaught: boolean;
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
      });
    },
    onError: () => {},
  });
};
