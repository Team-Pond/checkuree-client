import ApiClient from "./ApiClient";
import {
  CreateBookRequest,
  CreateBookResponse,
  DeleteBookRequest,
  DeleteBookResponse,
  GetBooksRequest,
  GetBooksResponse,
  GetMyBooksResponse,
  UpdateBookRequest,
  UpdateBookResponse,
} from "./AttendanceBookSchema";

// 출석부 생성
export const createBook = async (
  params: CreateBookRequest
): Promise<CreateBookResponse> => {
  const response = await ApiClient.request({
    method: "POST",
    url: "/book",
    params,
  });

  return response.data;
};

// 출석부 조회
export const getBooks = async (
  attendanceBookId: GetBooksRequest
): Promise<GetBooksResponse> => {
  const response = await ApiClient.request({
    method: "GET",
    url: `/book/${attendanceBookId}`,
  });
  return response.data;
};

// 출석부 삭제
export const deleteBook = async (
  attendanceBookId: DeleteBookRequest
): Promise<DeleteBookResponse> => {
  const response = await ApiClient.request({
    method: "DELETE",
    url: `/book/${attendanceBookId}`,
  });
  return response.data;
};

// 출석부 수정
export const updateBook = async ({
  attendanceBookId,
  params,
}: {
  attendanceBookId: string;
  params: UpdateBookRequest;
}): Promise<UpdateBookResponse> => {
  const response = await ApiClient.request({
    method: "PATCH",
    url: `/book/${attendanceBookId}`,
    params,
  });
  return response.data;
};

// 내 출석부 조회
export const getMeBooks = async (): Promise<GetMyBooksResponse> => {
  const response = await ApiClient.request({
    method: "GET",
    url: "/book/my",
  });

  return response.data;
};
