import ApiClient from "./ApiClient";
import {
  GetScheduleAttendeeRequest,
  GetScheduleAttendeeResponse,
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
    url: `/book/${attendanceBookId}/schedule?date=${date}&page=${pageable.page}&size=${pageable.page}&sort=${pageable.sort}`,
  });

  return response.data;
};
