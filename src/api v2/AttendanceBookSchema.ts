type ResponseBase = {
  status: number;
  message: string;
};

type DaysType =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

type SuccessResponse = ResponseBase & {
  data: Record<string, unknown>;
};

type ErrorResponse = ResponseBase & {
  data: Record<string, unknown>;
  timeStamp: string;
};

export type CreateBookRequest = {
  title: string;
  description: string;
  availableFrom: string;
  availableTo: String;
  availableDays: DaysType[];
  imageUrl: string;
};

export type CreateBookResponse = SuccessResponse | ErrorResponse;

export type GetBooksRequest = string;

export type GetBooksResponse = SuccessResponse | ErrorResponse;

export type DeleteBookRequest = string;

export type DeleteBookResponse = SuccessResponse | ErrorResponse;

export type UpdateBookRequest = string;

export type UpdateBookResponse = SuccessResponse | ErrorResponse;

export type GetMyBooksResponse = SuccessResponse | ErrorResponse;
