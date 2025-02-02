import {
  createRecord,
  updateRecordAll,
  updateRecordLesson,
  updateRecordStatus,
} from "@/api v2/RecordApiClient";
import { STATUS } from "@/api v2/RecordSchema";
import { getScheduleAttendee } from "@/api v2/ScheduleApiClient";
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
    queryKey: ["book-schedules", bookId, formattedDate],
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
        queryKey: ["book-schedules"],
      });
      toast.success("전체 출석 완료");
    },
    onError: () => {
      toast.success("전체 출석 실패");
    },
  });
};

/**
 * @param attendTime : 'HH:mm' 형식으로 입력
 * attendTime 을 입력하지 않을 경우 현재 시간이 자동으로 입력됨
 */
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
      attendTime,
    }: {
      attendeeId: number;
      scheduleId?: number;
      status: STATUS;
      attendTime?: string;
    }) =>
      await createRecord({
        params: {
          attendanceBookId: bookId,
          attendeeId: attendeeId,
          scheduleId: scheduleId,
          attendDate: currentDate,
          attendTime: attendTime ?? `${getCurrentTimeParts()
            .hour.toString()
            .padStart(2, "0")}:${getCurrentTimeParts()
            .minute.toString()
            .padStart(2, "0")}`,
          status: status,
        },
      }),
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["book-schedules"],
      });
    },
    onError: () => {},
  });
};

export const useStatusUpdate = ({ bookId }: { bookId: number }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [""],
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
        queryKey: ["book-schedules"],
      });
    },
    onError: () => {},
  });
};

export const useLessonUpdate = ({ bookId }: { bookId: number }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [""],
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
        queryKey: ["book-schedules"],
      });
    },
    onError: () => {},
  });
};
