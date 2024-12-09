// 출석 관리 대상 API

import ApiClient from "./ApiClient";
import {
  AttendeeCheckNameRequest,
  AttendeeNewResponse,
  AttendeeNewRequest,
  AttendeeCheckNameResponse,
} from "./AttendeeSchema";

export const createAttendee = async ({
  attendanceBookId,
  params,
}: {
  attendanceBookId: string;
  params: AttendeeNewRequest;
}): Promise<AttendeeNewResponse> => {
  const response = await ApiClient.request({
    method: "GET",
    url: `/book/${attendanceBookId}/attendee/new`,
    params,
  });
  return response.data;
};

export const checkNameAttendee = async (
  params: AttendeeCheckNameRequest
): Promise<AttendeeCheckNameResponse> => {
  const { attendanceBookId, name } = params;

  const response = await ApiClient.request({
    method: "GET",
    url: `/book/${attendanceBookId}/attendee/check-name?name=${name}`,
  });

  return response.data;
};
