import ApiClient from "./ApiClient";
import {
  CreateCourseRequest,
  CreateCourseResponse,
  GetSubjectItemsRequest,
  GetSubjectItemsResponse,
  GetSubjectResponse,
} from "./CourseSchema";

export const getSubjects = async (): Promise<GetSubjectResponse> => {
  const response = await ApiClient.request({
    method: "GET",
    url: "/subject",
  });
  return response.data;
};

export const getSubjectItems = async ({
  subjectId,
}: GetSubjectItemsRequest): Promise<GetSubjectItemsResponse> => {
  const response = await ApiClient.request({
    method: "GET",
    url: `/subject/${String(subjectId)}`,
  });
  return response.data;
};

export const createCourse = async ({
  attendanceBookId,
  params,
}: {
  attendanceBookId: string;
  params: CreateCourseRequest;
}): Promise<CreateCourseResponse> => {
  const response = await ApiClient.request({
    method: "POST",
    url: `/book/${attendanceBookId}/course`,
    data: params,
  });
  return response.data;
};
