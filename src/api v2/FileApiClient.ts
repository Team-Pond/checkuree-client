// 출석부 기록 생성
import ApiClient from "./ApiClient";
import { UploadImageRequest, UploadImageResponse } from "./FileSchema";


/**
 * 이미지 파일 업로드 API
 *
 * @param file 파일
 * @param bookId 출석부 ID
 *
 * @returns 이미지 URL
 */
export const uploadImage = async ({
  file,
  bookId,
}: UploadImageRequest): Promise<UploadImageResponse> => {
  const formData = new FormData();
  formData.append("file", file);
  if (bookId) formData.append("bookId", String(bookId));

  const response = await ApiClient.request({
    method: "POST",
    url: `/files`,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
