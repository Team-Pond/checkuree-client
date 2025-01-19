import { STATUS } from "./RecordSchema";

type ResponseBase = {
  message: string;
};

type ErrorResponse = ResponseBase & {
  status: 400 | 500 | 403;
  data: {};
  timeStamp: string;
};

export type ScheduleDataType = {
  content: {
    count: number;
    startTime: string;
    endTime: string;
    schedules: {
      scheduleId: number;
      scheduleTime: string;
      recordId: number;
      recordTime: string;
      sortTime: string;
      recordStatus: STATUS | string; // Adjust based on actual enum values
      attendeeId: number;
      name: string;
    }[];
  }[];
  first: boolean;
  last: boolean;
  size: number;
  number: number;
  numberOfElements: number;
  empty: boolean;
};

export type GetScheduleAttendeeResponse =
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
