import {
  BookStatus,
  Course,
  DaysType,
  GetBookScheduleTableDataType,
  GetMyBooksDataType,
} from "./type";

type ResponseBase = {
  message: string;
};

type SuccessResponse = ResponseBase & {
  status: 200;
  data: Record<string, unknown>;
};

type ErrorResponse = ResponseBase & {
  status: 400 | 500 | 403;
  data: {};
  timeStamp: string;
};

export type CreateBookRequest = {
  title: string;
  description?: string;
  availableFrom: string;
  availableTo: string;
  availableDays: DaysType[];
  imageUrl?: string;
  courses: {
    title: string;
    isPrimary: boolean;
    grades: {
      subjectItemId: number;
      level: number;
    }[];
  }[];
};

export type CreateBookResponse =
  | {
      status: 200;
      data: {
        id: number;
      };
    }
  | ErrorResponse;

export type GetBooksRequest = string;

export type GetBooksResponse = SuccessResponse | ErrorResponse;

export type DeleteBookRequest = string;

export type DeleteBookResponse = SuccessResponse | ErrorResponse;

export type UpdateBookRequest = string;

export type UpdateBookResponse = SuccessResponse | ErrorResponse;

type GetBookResponse = ResponseBase & {
  status: 200;
  data: GetMyBooksDataType[];
};

export type GetBookDetailRequest = number;

export type GetBookDetailResponse = ResponseBase & {
  status: 200;
  data: GetMyBooksDataType;
};

export type GetMyBooksResponse = GetBookResponse | ErrorResponse;

export type GetBookScheudleTableRequest = number;

export type GetBookScheduleTableResponse = ResponseBase & {
  status: 200;
  data: GetBookScheduleTableDataType;
};

export type UpdateBookProgressRequest = {
  attendeeId: number;
  progresses: {
    startAt: string;
    gradeId: number;
  }[];
};

export type UpdateBookProgressResponse = {
  status: 200;
  data: { ids: number[] };
} & ErrorResponse;

export type UpdateBookStatusRequest = {
  date: string;
  status: BookStatus;
  reason?: string;
};

export type UpdateBookStatusResponse = {
  status: 200;
  data: {
    id: number;
  };
} & ErrorResponse;

export type CoursesResponse = {
  courses: Course[];
};

export type GetBookCourseResponse = ResponseBase & {
  status: 200;
  data: CoursesResponse;
};
