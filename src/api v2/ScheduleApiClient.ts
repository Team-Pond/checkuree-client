import ApiClient from "./ApiClient";
import {
  GetScheduleAttendeeRequest,
  GetScheduleAttendeeResponse,
  GetScheduleCountOfDateRequest,
  GetScheduleCountOfDateResponse,
} from "./ScheduleSchema";

export const getScheduleAttendee = async ({
  params,
  attendanceBookId,
}: {
  params: GetScheduleAttendeeRequest;
  attendanceBookId: number;
}): Promise<GetScheduleAttendeeResponse> => {
  const { date, pageable } = params;
  const response = await ApiClient.request({
    method: "GET",
    url: `/book/${attendanceBookId}/schedule?date=${date}&page=${pageable.page}&size=${pageable.size}&sort=${pageable.sort}`,
  });

  return response.data;
};

export const getScheduleCountOfDate = async ({
  params,
  attendanceBookId,
}: {
  params: GetScheduleCountOfDateRequest;
  attendanceBookId: number;
}): Promise<GetScheduleCountOfDateResponse> => {
  const { date } = params;
  const response = await ApiClient.request({
    method: "GET",
    url: `/book/${attendanceBookId}/schedule/count?date=${date}`,
  });

  return response.data;
};
