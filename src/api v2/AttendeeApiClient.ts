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
  GetScheduleAttendeeRequest,
  GetScheduleAttendeeResponse,
  UpdateAttendeeScheduleRequest,
  UpdateAttendeeScheduleResponse,
  UpdateBookProgressResponse,
  UpdateBookProgressRequest,
  UpdateAttendeeVerifyRequest,
  UpdateAttendeeVerifyResponse,
} from "./AttendeeSchema";

export const createAttendee = async ({
  attendanceBookId,
  params,
}: {
  attendanceBookId: number;
  params: AttendeeNewRequest;
}): Promise<AttendeeNewResponse> => {
  const response = await ApiClient.request({
    method: "PUT",
    url: `/book/${attendanceBookId}/attendee/new`,
    data: params,
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

// 학생 출석 체크
export const getScheduleAttendee = async (
  params: GetScheduleAttendeeRequest
): Promise<GetScheduleAttendeeResponse> => {
  const { attendanceBookId, dayOfWeek, hhmm } = params;

  const response = await ApiClient.request({
    method: "GET",
    url: `/book/${attendanceBookId}/attendee/schedule?dayOfWeek=${dayOfWeek}&hhmm=${hhmm}`,
  });

  return response.data;
};

// 학생 출석 체크
export const updateAttendeeSchedule = async ({
  params,
  attendeeId,
  attendanceBookId,
}: {
  params: UpdateAttendeeScheduleRequest;
  attendanceBookId: number;
  attendeeId: number;
}): Promise<UpdateAttendeeScheduleResponse> => {
  const { schedules } = params;

  const response = await ApiClient.request({
    method: "PUT",
    url: `/book/${attendanceBookId}/attendee/${attendeeId}/schedule`,
    data: {
      schedules: schedules,
    },
  });

  return response.data;
};

// 학생 출석 체크
export const updateBookProgress = async ({
  params,
  attendanceBookId,
}: {
  params: UpdateBookProgressRequest;
  attendanceBookId: number;
}): Promise<UpdateBookProgressResponse> => {
  const response = await ApiClient.request({
    method: "PUT",
    url: `/book/${attendanceBookId}/progress`,
    data: params,
  });

  return response.data;
};

// 학생 출석 체크
export const updateAttendeeVerify = async ({
  params,
  attendanceBookId,
}: {
  params: UpdateAttendeeVerifyRequest;
  attendanceBookId: number;
}): Promise<UpdateAttendeeVerifyResponse> => {
  const response = await ApiClient.request({
    method: "POST",
    url: `/book/${attendanceBookId}/attendee/verify`,
    data: params,
  });

  return response.data;
};
