import ApiClient from "./ApiClient";
import {
  UpdateRecordAllRequest,
  UpdateRecordAllResponse,
  UpdateRecordLessonRequest,
  UpdateRecordLessonResponse,
  UpdateRecordStatusRequest,
  UpdateRecordStatusResponse,
} from "./RecordSchema";

// 출석 체크
export const updateRecordStatus = async ({
  params,
}: {
  params: UpdateRecordStatusRequest;
}): Promise<UpdateRecordStatusResponse> => {
  const { recordId, status, attendanceBookId, scheduleId } = params;
  const response = await ApiClient.request({
    method: "POST",
    url: `/record/${recordId}`,
    data: {
      attendanceBookId,
      scheduleId,
      status,
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
