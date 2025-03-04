import ApiClient from "./ApiClient";
import {
  CounsellingListRequest,
  CounsellingListResponse,
} from "./CounselSchema";

export const getAttendeeCounsellings = async (
  params: CounsellingListRequest,
): Promise<CounsellingListResponse> => {
  const { bookId, attendeeId } = params;
  const response = await ApiClient.request({
    method: "GET",
    url: `/book/${bookId}/attendee/counselling?attendeeId=${attendeeId}`,
    params,
  });

  return response.data;
};
