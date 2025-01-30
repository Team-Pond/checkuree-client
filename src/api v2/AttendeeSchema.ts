export type GenderType = "MALE" | "FEMALE" | "";
type Parent = string;
type Status = "ATTENDING" | string;

export type DaysType =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

export interface Associates {
  name?: string;
  gender?: GenderType;
  relationType: Parent;
  phoneNumber: string;
  relationescription?: string;
  description?: string;
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
  actualName: string;
  birthDate: string;
  enrollmentDate: string;
  description: string;
  school: string;
  attendeeId?: number;
  initialGradeId?: number;
  isBeginner?: boolean;
  address_1: string;
  associates?: Associates[];
};

export type AttendeeNewResponse = {
  status: 200;
  data: {
    id: number;
  };
} & ErrorResponse;

export type AttendeeCheckNameRequest = {
  attendanceBookId: string;
  name: string;
};

export type AttendeeCheckNameResponse = SuccessResponse | ErrorResponse;

// 출석 체크

export type AttendeeCheckRequest = {
  attendanceBookId: number;
  attendeeId: number;
  status: string;
};

export type AttendeeCheckResponse = SuccessResponse | ErrorResponse;

export type GetAttendeeListRequest = {
  attendanceBookId: number;
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
  data: ScheduleAttendeeDataType[];
} & ErrorResponse;

export type UpdateScheduleAttendeeDataType = {
  ids: number[];
};

export type UpdateAttendeeScheduleRequest = {
  schedules: {
    hhmm: string;
    day: DaysType;
  }[];
};

export type UpdateAttendeeScheduleResponse = {
  status: 200;
  data: ScheduleAttendeeDataType[];
} & ErrorResponse;

// 진도 관리 API
export type UpdateBookProgressRequest = {
  attendeeId: number;
  progresses: {
    startAt: string;
    gradeId: number;
  }[];
};

export type UpdateBookProgressResponse = {
  status: 200;
  data: {
    ids: number[];
  };
} & ErrorResponse;

// 출석부 학생 인증
export type UpdateAttendeeVerifyRequest = {
  attendeeId: number;
};
export type UpdateAttendeeVerifyResponse = {
  status: 200;
  data: {
    id: number;
  };
} & ErrorResponse;

export type GetAttendeeDetailRequest = {
  attendanceBookId: number;
  attendeeId: number;
};

export type Progresses = {
  id: number;
  courseId: number;
  gradeId: number;
  gradeTitle: string;
  courseTitle: string;
  startDate: string;
}[];

export type GetAttendeeDetailResponse = {
  status: 200;
  data: {
    id: number;
    name: string;
    gender: GenderType;
    birthDate: string;
    enrollmentDate: string;
    age: number;
    status: Status;
    phoneNumber: string;
    description: string;
    school: string;
    familyId: number;
    associates?: Associates[];
    siblings: {
      id: number;
      name: string;
      gender: GenderType;
      age: number;
    }[];
    address_1: string;
    address_2: string;
    schedules: {
      id: number;
      day: DaysType;
      time: string;
    }[];
    progresses: Progresses;
  };
} & ErrorResponse;

export type GetAttendeeProgressLogRequest = {
  attendanceBookId: number;
  attendeeId: number;
};

type ProgressLog = {
  progress_log_id: number;
  status: "IN_PROGRESS" | "COMPLETED" | "CANCELLED"; // 상태 값이 여러 개일 가능성을 고려
  startedAt: string; // ISO 형식의 날짜 문자열
  endedAt: string; // ISO 형식의 날짜 문자열
  attendeeId: number;
  gradeId: number;
  gradeTitle: string;
  attendanceCount: number;
  lessonCount: number;
  ageAtStart: number;
};

export type GetAttendeeProgressLogReseponse = {
  status: 200;
  data: ProgressLog[];
} & ErrorResponse;

export type UpdateProgressPromoteRequest = {
  attendeeProgressId: number;
  completedAt: string;
  startAt: string;
};

export type UpdateProgressPromoteResponse = {
  status: 200;
  data: {
    id: number;
  };
} & ErrorResponse;
