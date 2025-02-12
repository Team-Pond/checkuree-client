import ApiClient from "./ApiClient";
import {
  CreateRecordRequest,
  CreateRecordResponse,
  GetAttendeeRecordsRequest,
  GetAttendeeRecordsResponse,
  UpdateRecordAllRequest,
  UpdateRecordAllResponse,
  UpdateRecordLessonRequest,
  UpdateRecordLessonResponse,
  UpdateRecordRequest,
  UpdateRecordResponse,
} from "./RecordSchema";

// 출석 체크
export const updateRecord = async ({
  params,
}: {
  params: UpdateRecordRequest;
}): Promise<UpdateRecordResponse> => {
  const { recordId, status, attendanceBookId, scheduleId, attendTime } = params;
  const response = await ApiClient.request({
    method: "POST",
    url: `/record/${recordId}`,
    data: {
      attendanceBookId,
      scheduleId,
      status,
      attendTime,
    },
  });

  return response.data;
};

// 출석 레슨
export const updateRecordLesson = async ({
  params,
}: {
  params: UpdateRecordLessonRequest;
}): Promise<UpdateRecordLessonResponse> => {
  const { recordId, attendanceBookId, isTaught } = params;
  const response = await ApiClient.request({
    method: "POST",
    url: `/record/${recordId}/lesson`,
    data: {
      attendanceBookId,
      isTaught,
    },
  });

  return response.data;
};

//  전체 출석
export const updateRecordAll = async ({
  params,
}: {
  params: UpdateRecordAllRequest;
}): Promise<UpdateRecordAllResponse> => {
  const { attendanceBookId, attendDate } = params;
  const response = await ApiClient.request({
    method: "POST",
    url: `/record/all`,
    data: {
      attendanceBookId,
      attendDate,
    },
  });

  return response.data;
};

// 출석부 기록 생성
export const createRecord = async ({
  params,
}: {
  params: CreateRecordRequest;
}): Promise<CreateRecordResponse> => {
  const response = await ApiClient.request({
    method: "POST",
    url: `/record`,
    data: params,
  });
  return response.data;
};

// 출석부 기록 생성
export const getAttendeeRecords = async ({
  params,
  attendanceBookId,
  attendeeId,
}: {
  params: GetAttendeeRecordsRequest;
  attendanceBookId: number;
  attendeeId: number;
}): Promise<GetAttendeeRecordsResponse> => {
  const { from, to } = params;
  const response = await ApiClient.request({
    method: "GET",
    url: `/book/${attendanceBookId}/attendee/${attendeeId}/record?from=${from}&to=${to}`,
    data: params,
  });
  return response.data;
};
