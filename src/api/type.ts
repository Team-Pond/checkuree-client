export type DaysType =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

export type GenderType = "MALE" | "FEMALE" | "";
export type Status = "ATTENDING" | string;

export interface Associates {
  name?: string;
  gender?: GenderType;
  relationType: RelationType;
  phoneNumber: string;
  relationescription?: string;
  description?: string;
}
export type RelationType = "FATHER" | "MOTHER" | "SIBLING" | "OTHER";

export type ScheduleAttendeeDataType = {
  attendeeId: number;
  name: string;
  gender: GenderType;
  age: number;
  scheduleId: number;
  time: string;
  endTime: string;
};

export type UpdateScheduleAttendeeDataType = {
  ids: number[];
};

export type Progresses = {
  id: number;
  courseId: number;
  gradeId: number;
  gradeTitle: string;
  courseTitle: string;
  startDate: string;
}[];

export type SearchAttendeeDataType = {
  content: {
    id: number;
    name: string;
    gender: GenderType;
    age: number;
  }[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
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

export type ProgressLog = {
  progressLogId: number;
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

export type BookStatus = "ACTIVE" | "PAUSED" | "VACATION";
export type CourseData = {
  title: string;
  isPrimary: boolean;
  grades: {
    subjectItemId: number;
    level: number;
  }[];
};

export type GetMyBooksDataType = {
  id: number;
  title: string;
  description?: string;
  availableFrom: string;
  availableTo: string;
  availableDays: DaysType[];
  imageUrl: string;
  attendeeCount: number;
};

export interface ScheduleItem {
  dayOfWeek: DaysType;
  scheduleCount: number[]; // 16칸짜리 예시
}

export type GetBookScheduleTableDataType = {
  startHhmm: string;
  endHhmm: string;
  timeSlots: number;
  scheduleTable: ScheduleItem[];
};

export type Grade = {
  id: number;
  title: string;
  level: number;
  subjectItemId: number;
};

export type Course = {
  id: number;
  title: string;
  isPrimary: boolean;
  grades: Grade[];
};

export type STATUS = "PENDING" | "ATTEND" | "ABSENT";

export type AttendeeRecord = {
  id: number;
  attendeeId: number;
  attendDate: string;
  attendTime: string;
  status: STATUS;
  taughtBy: number;
  taught: boolean;
  makeup: boolean;
};

export type ScheduleData = {
  scheduleId: number;
  isTaught: boolean;
  isMakeup: boolean;
  scheduleTime: string;
  recordId: number;
  recordTime: string;
  sortTime: string;
  recordStatus: STATUS;
  attendeeId: number;
  name: string;
};

export type ScheduleDataContentType = {
  count: number;
  startTime: string;
  endTime: string;
  schedules: ScheduleData[];
}[];

export type ScheduleDataType = {
  content: ScheduleDataContentType;
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
