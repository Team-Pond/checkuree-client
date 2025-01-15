export type GenderType = "MALE" | "FEMALE" | "";
type Parent = "FATHER" | "MATHER";
type Status = "ATTENDING" | string;

export type DaysType =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

interface Associates {
  name: string;
  gender: GenderType;
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
  gender: GenderType;
  birthDate: string;
  enrollmentDate: string;
  phoneNumber: string;
  description: string;
  school: string;
  attendeeId?: number;
  initialGradeId?: number;
  isBeginner?: boolean;
  address_1: string;
  associates?: Associates[];
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

export type GetAttendeeListRequest = {
  attendanceBookId: string;
  filter: {
    age: {
      min: number;
      max: number;
    };
    gender: GenderType;
    gradeIds: number[];
    scheduleDays: DaysType[];
    status: Status;
  };
};

type AttendeeListType = {
  content: {
    id: number;
    name: string;
    gender: GenderType;
    status: "ATTENDING";
    grades: {
      id: number;
      name: string;
    }[];
    age: number;
    scheduleDays: DaysType[];
  }[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfelements: number;
  size: number;
  pageable: {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
  };
  sort: {
    emply: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
};
export type GetAttendeeListResponse = {
  status: 200;
  data: AttendeeListType;
} & ErrorResponse;

type ScheduleAttendeeDataType = {
  attendeeId: number;
  name: string;
  gender: GenderType;
  age: number;
  scheduleId: number;
  time: string;
  endTime: string;
};
export type GetScheduleAttendeeRequest = {
  attendanceBookId: number;
  dayOfWeek: string;
  hhmm: string;
};

export type GetScheduleAttendeeResponse = {
  status: 200;
  data: ScheduleAttendeeDataType;
} & ErrorResponse;
