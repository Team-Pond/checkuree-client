import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { UseFormWatch } from "react-hook-form";

import _ from "lodash";
import {
  createAttendee,
  createSchedules,
  deleteAttendees,
  getAttendeeDetail,
  updateAttendee,
} from "@/api/AttendanceApiClient";
import {
  AttendeeData,
  CreateAttendeeRequest,
  CreateSchedulesRequest,
  DeleteAttendeesRequest,
  SingleSchedulesType,
} from "@/api/schema";
import { Inputs } from "@/components/FormContents";

interface PropsType {
  watch: UseFormWatch<Inputs>;
  attendeeId?: string;
  attendanceId: string;
  onClose: () => void;
}

const useFormContents = (props: PropsType) => {
  const { watch, attendeeId, attendanceId, onClose } = props;

  const queryClient = useQueryClient();

  /** 수정 대상의 정보 */
  const { data: attendeeDetail, isSuccess } = useQuery({
    queryKey: ["attendee-detail", attendeeId],
    queryFn: async (): Promise<AttendeeData> => {
      const response = await getAttendeeDetail(attendeeId || "");

      if (response.success) {
        return response.data;
      }

      return {} as AttendeeData;
    },
    enabled: attendeeId ? attendeeId.length > 0 : false,
  });

  /** 출석대상 생성 */
  const { mutate: createAttendeeMutation } = useMutation({
    mutationFn: async (parameters: CreateAttendeeRequest) => {
      const response = await createAttendee(parameters);
      return response.data;
    },
    onSuccess: async (data) => {
      const selectedSchedules = watch("times");
      const singleSchedulesList: SingleSchedulesType = [];

      Object.keys(selectedSchedules).forEach((day) => {
        const times = selectedSchedules[day];

        times.forEach((time) => {
          singleSchedulesList.push({ day, time });
        });
      });
      mutateSchedules({
        attendanceId,
        attendeeId: data.data.id,
        singleSchedules: singleSchedulesList,
      });
    },
  });

  /** 출석대상 정보 수정 */
  const { mutate: updateAttendeeMutation } = useMutation({
    mutationFn: async (props: {
      attendeeId: string;
      parameters: CreateAttendeeRequest;
    }) => {
      const { attendeeId, parameters } = props;

      const response = await updateAttendee(attendeeId, parameters);
      return response.data;
    },
    onSuccess: async (data) => {
      const selectedSchedules = watch("times");
      const singleSchedulesList: SingleSchedulesType = [];

      Object.keys(selectedSchedules || {}).forEach((day) => {
        const times = selectedSchedules[day];

        times.forEach((time) => {
          singleSchedulesList.push({ day, time });
        });
      });

      if (selectedSchedules === undefined || !singleSchedulesList.length) {
        await queryClient.invalidateQueries({
          queryKey: ["attendee-list"],
        });
        await queryClient.invalidateQueries({
          queryKey: ["attendee-detail"],
        });
        onClose();
        return;
      }

      mutateSchedules({
        attendanceId,
        attendeeId: data.data.id,
        singleSchedules: singleSchedulesList,
      });
    },
  });

  /** 출석대상의 스케쥴 생성 */
  const { mutate: mutateSchedules } = useMutation({
    mutationFn: async (parameters: CreateSchedulesRequest) => {
      const response = await createSchedules(parameters);
      return response.data;
    },
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["attendee-list"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["attendee-detail"],
        }),
      ]);
      onClose();
    },
  });

  /** 출석대상 삭제 */
  const { mutate: deleteAttendeesMutation } = useMutation({
    mutationKey: ["deleteAttendees"],
    mutationFn: async (parameters: DeleteAttendeesRequest) =>
      deleteAttendees(parameters),
    onSuccess: async () => {
      onClose();
      await queryClient.invalidateQueries({
        queryKey: ["attendee-list"],
      });
    },
  });

  // 30분 간격으로 시간을 생성하는 함수
  function generateTimeOptions() {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeLabel = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        const timeValue = (hour * 100 + minute).toString().padStart(4, "0");
        options.push({ label: timeLabel, value: timeValue });
      }
    }
    return options;
  }

  return {
    attendeeDetail,
    isSuccess,
    createAttendee: createAttendeeMutation,
    updateAttendee: updateAttendeeMutation,
    deleteAttendees: deleteAttendeesMutation,
    generateTimeOptions,
  };
};

export default useFormContents;
