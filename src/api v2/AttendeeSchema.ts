type Gender = "MALE" | "FEMALE";
type Parent = "FATHER" | "MATHER";

interface Associates {
  name: string;
  gender: Gender;
  relationType: Parent;
  phoneNumber: string;
  relationescription: string;
  description: string;
}

type ResponseBase = {
  status: number;
  message: string;
};

type SuccessResponse = ResponseBase & {
  data: Record<string, unknown>;
};

type ErrorResponse = ResponseBase & {
  data: Record<string, unknown>;
  timeStamp: string;
};

export type AttendeeNewRequest = {
  name: string;
  gender: Gender;
  age: number;
  phoneNumber: string;
  associates: Associates[];
};

export type AttendeeNewResponse = SuccessResponse | ErrorResponse;

export type AttendeeCheckNameRequest = {
  attendanceBookId: string;
  name: string;
};

export type AttendeeCheckNameResponse = SuccessResponse | ErrorResponse;

// 출석 체크

export type AttendeeCheckRequest = {
  attendanceBookId: string;
  attendeeId: number;
  status: string;
};

export type AttendeeCheckResponse = SuccessResponse | ErrorResponse;
