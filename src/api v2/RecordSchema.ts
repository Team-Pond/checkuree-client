type ResponseBase = {
  message: string;
};

type ErrorResponse = ResponseBase & {
  status: 400 | 500 | 403;
  data: {};
  timeStamp: string;
};

export type UpdateRecordResponse =
  | ({
      status: 200;
      data: {
        id: number;
      };
    } & ResponseBase)
  | ErrorResponse;

export type STATUS = "PENDING" | "ATTEND" | "ABSENT";

export type UpdateRecordRequest = {
  recordId: number;
  attendanceBookId: number;
  scheduleId?: number;
  status?: STATUS | string;
  attendTime?: string;
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
  scheduleId?: number;
  attendDate: string; // "YYYY-MM-DD" 형태의 문자열로 전송
  attendTime: string;
  status: STATUS;
};

/**
 * 입력한 기간의 출석부 기록을 조회합니다.
 * @param from 조회 시작일 yyyy-MM-dd 형식 문자열
 * @param to 조회 종료일 yyyy-MM-dd 형식 문자열
 */
export type GetRecordMonthAttendeeRequest = {
  from: string;
  to: string;
};

export type GetRecordMonthAttendeeResponse = {
  id: number;
  attendeeId: number;
  attendeeDate: string;
  attendeeTime: {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  };
  status: STATUS;
  taughtBy: number;
  taught: boolean;
}[];
