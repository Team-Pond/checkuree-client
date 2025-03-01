import { AttendeeSchema } from "@/pages/attendee-create/_schema";
import { z } from "zod";
import {
  Associates,
  DaysType,
  GenderType,
  Progresses,
  ProgressLog,
  ScheduleAttendeeDataType,
  SearchAttendeeDataType,
  StudentStatus,
  UpdateScheduleAttendeeDataType,
} from "./type";

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

export type AttendeeNewRequest = z.infer<typeof AttendeeSchema>;

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
    status: StudentStatus;
  };
};

type AttendeeListType = {
  content: {
    id: number;
    name: string;
    gender: GenderType;
    status: StudentStatus;
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

export type GetScheduleAttendeeRequest = {
  attendanceBookId: number;
  dayOfWeek: string;
  hhmm: string;
};

export type GetScheduleAttendeeResponse = {
  status: 200;
  data: ScheduleAttendeeDataType[];
} & ErrorResponse;

export type UpdateAttendeeScheduleRequest = {
  schedules: {
    hhmm: string;
    day: DaysType;
  }[];
};

export type UpdateAttendeeScheduleResponse = {
  status: 200;
  data: UpdateScheduleAttendeeDataType[];
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

export type GetAttendeeDetailResponse = {
  status: 200;
  data: {
    id: number;
    name: string;
    gender: GenderType;
    birthDate: string;
    enrollmentDate: string;
    age: number;
    status: StudentStatus;
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

export type SearchAttendeeRequest = {
  attendanceBookId: number;
  name: string;
};

export type SearchAttendeeResponse = {
  status: 200;
  data: SearchAttendeeDataType;
} & ErrorResponse;

export type GetAttendeeProgressLogRequest = {
  attendanceBookId: number;
  attendeeId: number;
};

export type GetAttendeeProgressLogResponse = {
  status: 200;
  data: ProgressLog[];
} & ErrorResponse;

export type UpdateProgressPromoteRequest = {
  attendeeProgressId: number;
  completedAt: string;
  startAt: string;
  nextGradeId?: number;
};

export type UpdateProgressPromoteResponse = {
  status: 200;
  data: {
    id: number;
  };
} & ErrorResponse;

export type UpdateAttendeeDetailRequest = {
  birthDate: string;
  gender: GenderType;
  address_1: string;
  description: string;
};

export type UpdateAttendeeDetailResponse = {
  status: 200;
  data: {
    id: number;
  };
} & ErrorResponse;
