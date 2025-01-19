type ResponseBase = {
  message: string;
};

type ErrorResponse = ResponseBase & {
  status: 400 | 500 | 403;
  data: {};
  timeStamp: string;
};

export type UpdateRecordStatusResponse =
  | ({
      status: 200;
      data: {
        id: number;
      };
    } & ResponseBase)
  | ErrorResponse;

export type STATUS = "PENDING" | "ATTEND" | "ABSENT";

export type UpdateRecordStatusRequest = {
  recordId: number;
  attendanceBookId: number;
  scheduleId: number;
  status: STATUS | string;
};

export type UpdateRecordLessonResponse =
  | ({
      status: 200;
      data: {
        id: number;
      };
    } & ResponseBase)
  | ErrorResponse;

export type UpdateRecordLessonRequest = {
  recordId: number;
  attendanceBookId: number;
  isTaught: boolean;
};

export type UpdateRecordAllResponse =
  | ({
      status: 200;
      data: {
        affectedRows: number;
      };
    } & ResponseBase)
  | ErrorResponse;

export type UpdateRecordAllRequest = {
  attendDate: string;
  attendanceBookId: number;
};

export type CreateRecordResponse =
  | ({
      status: 200;
      data: {
        id: number;
      };
    } & ResponseBase)
  | ErrorResponse;

// attendTime의 형태를 정의하는 타입

export type CreateRecordRequest = {
  attendanceBookId: number;
  attendeeId: number;
  scheduleId: number;
  attendDate: string; // "YYYY-MM-DD" 형태의 문자열로 전송
  attendTime: string;
  status: STATUS;
};
