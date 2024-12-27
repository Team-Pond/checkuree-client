type ResponseBase = {
  message: string;
};

export type DaysType =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

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
  availableFrom?: string;
  availableTo?: String;
  availableDays: DaysType[];
  imageUrl?: string;
  curriculumName: string;
};

export type CreateBookResponse = SuccessResponse | ErrorResponse;

export type GetBooksRequest = string;

export type GetBooksResponse = SuccessResponse | ErrorResponse;

export type DeleteBookRequest = string;

export type DeleteBookResponse = SuccessResponse | ErrorResponse;

export type UpdateBookRequest = string;

export type UpdateBookResponse = SuccessResponse | ErrorResponse;

export type GetMyBooksDataType = {
  id: number;
  title: string;
  description?: string;
  availableFrom?: string;
  availableTo?: String;
  availableDays: DaysType[];
  imageUrl: string;
};
type GetBookResponse = ResponseBase & {
  status: 200;
  data: GetMyBooksDataType[];
};

export type GetMyBooksResponse = GetBookResponse | ErrorResponse;
