// 출석 관리 대상 API

import ApiClient from "./ApiClient";
import {
  AttendeeCheckNameRequest,
  AttendeeNewResponse,
  AttendeeNewRequest,
  AttendeeCheckNameResponse,
  AttendeeCheckRequest,
  AttendeeCheckResponse,
  GetAttendeeListRequest,
  GetAttendeeListResponse,
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

// 이름 중복 체크
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

// 학생 목록 조회
export const getAttendee = async (
  params: GetAttendeeListRequest
): Promise<GetAttendeeListResponse> => {
  const { attendanceBookId, filter } = params;

  const scheduleDays = filter.scheduleDays.join(",");

  const response = await ApiClient.request({
    method: "GET",
    url: `/book/${attendanceBookId}/attendee?age.min=0&age.max=100&scheduleDays=${scheduleDays}&gender=${
      filter.gender || ""
    }&status=ATTENDING`,
  });

  return response.data;
};

// 학생 출석 체크
export const statusCheckAttendee = async (
  params: AttendeeCheckRequest
): Promise<AttendeeCheckResponse> => {
  const { attendanceBookId, attendeeId, status } = params;

  const response = await ApiClient.request({
    method: "PATCH",
    url: `/book/${attendanceBookId}/attendee/status`,
    params: {
      attendeeId,
      status,
    },
  });

  return response.data;
};
