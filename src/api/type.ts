export type DaysType =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

export type GenderType = "MALE" | "FEMALE" | "";
export type StudentStatus = "ATTENDING" | "SUSPENSION" | "WITHDRAWAL";

export interface Associates {
  name?: string;
  id: number;
  gender?: GenderType;
  relationType: RelationType;
  phoneNumber: string;
  relationescription?: string;
  description?: string;
}
export type RelationType = "FATHER" | "MOTHER" | "SIBLING" | "OTHER" | "NONE";

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

export type SortType = {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
};

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
    sort: SortType;
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

export type PeriodType = "DAILY" | "WEEKLY" | "MONTHLY";
export type StatisticType = {
  periodType: PeriodType;
  from: string; // YYYY‑MM‑DD 형식의 날짜
  to: string; // YYYY‑MM‑DD 형식의 날짜
  totalCount: number;
  attendCount: number;
  absentCount: number;
  makeupCount: number;
  unCheckedCount: number;
  attendRate: number; // (0–100)
  absentRate: number; // (0–100)
  makeupRate: number; // (0–100)
  unCheckedRate: number; // (0–100)
};

export type AttendeeStatisticsType = "CURRICULUM" | "AGE" | "DAY";

export type AttendeeStatisticType = {
  type: AttendeeStatisticsType;
  contents: {
    name: string;
    count: number;
  }[];
};

export type DayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

export const dayMap: Record<DayOfWeek, string> = {
  MONDAY: "월",
  TUESDAY: "화",
  WEDNESDAY: "수",
  THURSDAY: "목",
  FRIDAY: "금",
  SATURDAY: "토",
  SUNDAY: "일",
};
