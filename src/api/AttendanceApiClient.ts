import ApiClient from "./ApiClient";
import {
  CreateAttendanceRequest,
  CreateAttendeeRequest,
  CreateRecordsRequest,
  CreateSchedulesRequest,
  DeleteAttendeesRequest,
} from "./schema";

export const getAttendanceList = async () => {
  const response = await ApiClient.request({
    method: "GET",
    url: "/attendances",
  });

  return response.data;
};

/** 특정 출석부 상세 조회 */
export const getAttendanceDetail = async (attendanceId: string) => {
  const response = await ApiClient.request({
    method: "GET",
    url: `/attendances/${attendanceId}`,
  });

  return response.data;
};

/** 날짜에 따른 출석부 명단 */
export const getAttendanceSchedulesByDate = async ({
  attendanceId,
  date,
  pageNo = 1,
}: {
  attendanceId: string | undefined;
  date: string;
  pageNo: number;
}) => {
  const response = await ApiClient.request({
    method: "GET",
    url: `/attendanceId/${attendanceId}/schedules/${date}`,
    params: {
      pageNo,
    },
  });
  return response.data;
};

/** 출석 요약 */
export const getAttendanceSummary = async (
  attendanceId: string,
  attendeeIds: string[]
) => {
  const response = await ApiClient({
    method: "GET",
    url: `/attendance/${attendanceId}/attendees/records/summary`,
    params: {
      attendeeIds,
    },
  });
  return response.data;
};

/** 날짜별 출석 요약 */
export const getAttendanceSummaryByDate = async (
  attendanceId: string,
  date: string
) => {
  const response = await ApiClient.request({
    method: "GET",
    url: `/attendance/${attendanceId}/records/${date}/summary`,
  });
  return response.data;
};

/** 특정 출석부의 출석대상 명단 */
export const getAttendeeList = async (attendanceId: string) => {
  const response = await ApiClient.request({
    method: "GET",
    url: `/attendees/attendanceId/${attendanceId}`,
  });

  return response.data;
};

/** 출석대상의 스케쥴조회 */
export const getAttendeeDetail = async (attendeeId: string) => {
  const response = await ApiClient.request({
    method: "GET",
    url: `/attendees/${attendeeId}`,
  });
  return response.data;
};

/** 출석부 생성 */
export const createAttandance = async (request: CreateAttendanceRequest) => {
  const response = await ApiClient.request({
    method: "POST",
    url: `/attendances`,
    data: request,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

/** 명단관리 > 출석대상 등록 */
export const createAttendee = async (parameters: CreateAttendeeRequest) => {
  const response = await ApiClient.request({
    method: "POST",
    url: `/attendees`,
    data: parameters,
  });
  return response.data;
};

/** 명단관리 > 출석대상 정보 수정 */
export const updateAttendee = async (
  attendeeId: string,
  parameters: CreateAttendeeRequest
) => {
  const response = await ApiClient.request({
    method: "PATCH",
    url: `/attendees/${attendeeId}`,
    data: parameters,
  });
  return response.data;
};

/** 명단관리 > 출석대상 등록 후 스케쥴 등록 */
export const createSchedules = async (parameters: CreateSchedulesRequest) => {
  const response = await ApiClient.request({
    method: "POST",
    url: `/schedules`,
    data: parameters,
  });

  return response.data;
};

/** 출석기록 생성 및 수정 */
export const createRecords = async (parameters: CreateRecordsRequest) => {
  const response = await ApiClient.request({
    method: "POST",
    url: `/records`,
    data: parameters,
  });
  return response.data;
};
/** 출석대상 삭제 */

export const deleteAttendees = async (parameters: DeleteAttendeesRequest) => {
  const response = await ApiClient.request({
    method: "DELETE",
    url: `/attendees`,
    data: parameters,
  });
  return response.data;
};

export const getSchedulesById = async (attendeeId: string) => {
  const response = await ApiClient.request({
    method: "GET",
    url: `/attendee/${attendeeId}/schedules`,
  });
  return response.data;
};
