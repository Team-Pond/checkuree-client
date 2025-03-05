import ApiClient from "./ApiClient";
import {
  CounsellingCreateRequest,
  CounsellingCreateResponse,
  CounsellingListRequest,
  CounsellingListResponse,
} from "./CounselSchema";

export const getAttendeeCounsellings = async (
  params: CounsellingListRequest
): Promise<CounsellingListResponse> => {
  const { bookId, attendeeId } = params;
  const response = await ApiClient.request({
    method: "GET",
    url: `/book/${bookId}/attendee/counselling?attendeeId=${attendeeId}`,
    params,
  });

  return response.data;
};

export const createCounsellings = async ({
  params,
  attendanceBookId,
}: {
  params: CounsellingCreateRequest;
  attendanceBookId: number;
}): Promise<CounsellingCreateResponse> => {
  const response = await ApiClient.request({
    method: "POST",
    url: `/book/${attendanceBookId}/counselling`,
    data: params,
  });

  return response.data;
};
