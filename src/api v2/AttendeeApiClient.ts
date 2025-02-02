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
  GetAttendeeDetailRequest,
  GetAttendeeDetailResponse,
  GetAttendeeProgressLogRequest,
  GetAttendeeProgressLogResponse,
  UpdateProgressPromoteRequest,
  UpdateProgressPromoteResponse,
  UpdateAttendeeDetailRequest,
  UpdateAttendeeDetailResponse, SearchAttendeeRequest,
} from './AttendeeSchema';

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
    }&status=ATTENDING&size=100`,
  });

  return response.data;
};

// 학생 출석 체크
export const statusCheckAttendee = async (
  params: AttendeeCheckRequest
): Promise<AttendeeCheckResponse> => {
  const { attendanceBookId, attendeeId, status } = params;

  const response = await ApiClient.request({
    method: "PUT",
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

//
export const getAttendeeDetail = async (
  params: GetAttendeeDetailRequest
): Promise<GetAttendeeDetailResponse> => {
  const { attendanceBookId, attendeeId } = params;

  const response = await ApiClient.request({
    method: "GET",
    url: `/book/${attendanceBookId}/attendee/${attendeeId}`,
  });

  return response.data;
};

// 학생 진도
export const getAttendeeProgressLog = async (
  params: GetAttendeeProgressLogRequest
): Promise<GetAttendeeProgressLogResponse> => {
  const { attendanceBookId, attendeeId } = params;

  const response = await ApiClient.request({
    method: "GET",
    url: `/book/${attendanceBookId}/attendee/progress/log?attendeeId=${attendeeId}`,
  });

  return response.data;
};

// 학생 진도 진급
export const updateProgressPromote = async ({
  params,
  attendanceBookId,
}: {
  params: UpdateProgressPromoteRequest;
  attendanceBookId: number;
}): Promise<UpdateProgressPromoteResponse> => {
  const response = await ApiClient.request({
    method: "POST",
    url: `/book/${attendanceBookId}/progress/promote`,
    data: params,
  });

  return response.data;
};

// 학생 정보 수정
export const updateAttendeeDetail = async ({
  params,
  attendanceBookId,
  attendeeId,
}: {
  params: UpdateAttendeeDetailRequest;
  attendanceBookId: number;
  attendeeId: number;
}): Promise<UpdateAttendeeDetailResponse> => {
  const response = await ApiClient.request({
    method: "PATCH",
    url: `/book/${attendanceBookId}/attendee/${attendeeId}`,
    data: params,
  });

  return response.data;
};

// 학생 검색 API
export const searchAttendee = async (params: SearchAttendeeRequest) => {
  const { attendanceBookId, name } = params;
  const response = await ApiClient.request({
    method: 'GET',
    url: `/book/${attendanceBookId}/attendee/search?name=${name}&size=100`,
  });

  return response.data;
};