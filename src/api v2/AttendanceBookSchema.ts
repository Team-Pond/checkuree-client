type ResponseBase = {
  message: string;
};

export type DaysType =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

type SuccessResponse = ResponseBase & {
  status: 200;
  data: Record<string, unknown>;
};

type ErrorResponse = ResponseBase & {
  status: 400 | 500 | 403;
  data: {};
  timeStamp: string;
};

export type CourseData = {
  title: string;
  isPrimary: boolean;
  grades: {
    subjectItemId: number;
    level: number;
  }[];
};

export type CreateBookRequest = {
  title: string;
  description?: string;
  availableFrom: string;
  availableTo: string;
  availableDays: DaysType[];
  imageUrl?: string;
  courses: {
    title: string;
    isPrimary: boolean;
    grades: {
      subjectItemId: number;
      level: number;
    }[];
  }[];
};

export type CreateBookResponse =
  | {
      status: 200;
      data: {
        id: number;
      };
    }
  | ErrorResponse;

export type GetBooksRequest = string;

export type GetBooksResponse = SuccessResponse | ErrorResponse;

export type DeleteBookRequest = string;

export type DeleteBookResponse = SuccessResponse | ErrorResponse;

export type UpdateBookRequest = string;

export type UpdateBookResponse = SuccessResponse | ErrorResponse;

export type GetMyBooksDataType = {
  id: number;
  title: string;
  description?: string;
  availableFrom?: {
    hhmm: string;
  };
  availableTo?: {
    hhmm: string;
  };
  availableDays: DaysType[];
  imageUrl: string;
};
type GetBookResponse = ResponseBase & {
  status: 200;
  data: GetMyBooksDataType[];
};

export type GetMyBooksResponse = GetBookResponse | ErrorResponse;

interface ScheduleItem {
  dayOfWeek: DaysType;
  scheduleCount: number[]; // 16칸짜리 예시
}

type GetBookScheduleTableDataType = {
  startHhmm: string;
  endHhmm: string;
  timeSlots: number;
  scheduleTable: ScheduleItem[];
};

export type GetBookScheudleTableRequest = number;

export type GetBookScheduleTableResponse = ResponseBase & {
  status: 200;
  data: GetBookScheduleTableDataType;
};

export type UpdateBookProgressDataType = {
  ids: number[];
};

export type UpdateBookProgressRequest = {
  attendeeId: number;
  progresses: {
    startAt: string;
    gradeId: number;
  }[];
};

export type UpdateBookProgressResponse = {
  status: 200;
  data: UpdateBookProgressDataType;
} & ErrorResponse;

type Grade = {
  id: number;
  title: string;
  level: number;
  subjectItemId: number;
};

type Course = {
  id: number;
  title: string;
  isPrimary: boolean;
  grades: Grade[];
};

export type CoursesResponse = {
  courses: Course[];
};

export type GetBookCourseResponse = ResponseBase & {
  status: 200;
  data: CoursesResponse;
};
