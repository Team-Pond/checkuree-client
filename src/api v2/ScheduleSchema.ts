import { STATUS } from "./RecordSchema";

type ResponseBase = {
  message: string;
};

type ErrorResponse = ResponseBase & {
  status: 400 | 500 | 403;
  data: {};
  timeStamp: string;
};

export type ScheduleData = {
  scheduleId: number;
  isTaught: boolean;
  scheduleTime: string;
  recordId: number;
  recordTime: string;
  sortTime: string;
  recordStatus: STATUS | string; // Adjust based on actual enum values
  attendeeId: number;
  name: string;
};

export type ScheduleDataType = {
  content: {
    count: number;
    startTime: string;
    endTime: string;
    schedules: ScheduleData[];
  }[];
  first: boolean;
  last: boolean;
  size: number;
  number: number;
  numberOfElements: number;
  empty: boolean;
};

export type ScheduleCountOfDateType = {
  date: string;
  totalCount: number;
  checkedCount: number;
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
