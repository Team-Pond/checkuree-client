import ApiClient from "./ApiClient";
import {
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
  console.log(subjectId);
  const response = await ApiClient.request({
    method: "GET",
    url: `/subject/${String(subjectId)}`,
  });
  return response.data;
};
