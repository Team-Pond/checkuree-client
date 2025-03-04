import ApiClient from "./ApiClient";
import {
  GetBookCourseResponse,
  GetBookDetailRequest,
  GetBookDetailResponse,
  GetBookScheduleTableResponse,
  GetBookScheudleTableRequest,
  UpdateBookProgressRequest,
  UpdateBookProgressResponse,
  UpdateBookStatusRequest,
  UpdateBookStatusResponse,
} from "./AttendanceBookSchema";
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
  params: CreateBookRequest,
): Promise<CreateBookResponse> => {
  const response = await ApiClient.request({
    method: "POST",
    url: "/book",
    data: params,
  });

  return response.data;
};

// 출석부 조회
export const getBooks = async (
  attendanceBookId: GetBooksRequest,
): Promise<GetBooksResponse> => {
  const response = await ApiClient.request({
    method: "GET",
    url: `/book/${attendanceBookId}`,
  });
  return response.data;
};

// 출석부 삭제
export const deleteBook = async (
  attendanceBookId: DeleteBookRequest,
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
    data: params,
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

// 출석부 상세 조회
export const getBookDetail = async (
  bookId: GetBookDetailRequest,
): Promise<GetBookDetailResponse> => {
  const response = await ApiClient.request({
    method: "GET",
    url: `/book/${bookId}`,
  });

  return response.data;
};

// 출석부 수정
export const updateBookProgress = async ({
  attendanceBookId,
  params,
}: {
  attendanceBookId: number;
  params: UpdateBookProgressRequest;
}): Promise<UpdateBookProgressResponse> => {
  const response = await ApiClient.request({
    method: "PUT",
    url: `/book/${attendanceBookId}/progress`,
    data: params,
  });
  return response.data;
};

// 출석부 해당 날짜 출석부 상태 수정 ex) 휴원원
export const updateBookStatus = async ({
  attendanceBookId,
  params,
}: {
  attendanceBookId: number;
  params: UpdateBookStatusRequest;
}): Promise<UpdateBookStatusResponse> => {
  const response = await ApiClient.request({
    method: "PUT",
    url: `/book/${attendanceBookId}/status`,
    data: params,
  });
  return response.data;
};

// 출석부 스케줄 테이블 조회
export const getBookScheduleTable = async ({
  attendanceBookId,
}: {
  attendanceBookId: GetBookScheudleTableRequest;
}): Promise<GetBookScheduleTableResponse> => {
  const response = await ApiClient.request({
    method: "GET",
    url: `/book/${attendanceBookId}/schedule/table`,
  });
  return response.data;
};

// 출석부 조회
export const getBookCourse = async (
  attendanceBookId: GetBooksRequest,
): Promise<GetBookCourseResponse> => {
  const response = await ApiClient.request({
    method: "GET",
    url: `/book/${attendanceBookId}/course`,
  });
  return response.data;
};
