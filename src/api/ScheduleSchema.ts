import { ScheduleDataType } from "./type";

type ResponseBase = {
  message: string;
};

type ErrorResponse = ResponseBase & {
  status: 400 | 500 | 403;
  data: {};
  timeStamp: string;
};

export type GetScheduleAttendeeResponse =
  | ({
      status: 200;
      data: ScheduleDataType;
    } & ResponseBase)
  | ErrorResponse;

export type GetScheduleCountOfDateResponse =
  | ({
      status: 200;
      data: ScheduleDataType;
    } & ResponseBase)
  | ErrorResponse;

export type GetScheduleAttendeeRequest = {
  date: string;
  pageable: {
    page: number;
    size: number;
    sort: string[];
  };
};

export type GetScheduleCountOfDateRequest = {
  date: string;
};
