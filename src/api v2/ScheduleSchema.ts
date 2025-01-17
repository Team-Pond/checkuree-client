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
    startTime: Time;
    endTime: Time;
    schedules: {
      scheduleId: number;
      scheduleTime: Time;
      recordId: number;
      recordTime: Time;
      sortTime: Time;
      recordStatus: "PENDING" | "APPROVED" | "REJECTED" | string; // Adjust based on actual enum values
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
type Time = {
  hour: number;
  minute: number;
  second: number;
  nano: number;
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
