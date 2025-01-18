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

export type UpdateRecordStatusRequest = {
  recordId: number;
  attendanceBookId: number;
  scheduleId: number;
  status: "PENDING" | "APPROVED" | "REJECTED" | string;
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
