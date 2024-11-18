export interface UseApiProps {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  data: any;
  dependencies: any[];
}

interface BaseApiResponse {
  success: boolean;
  count: number;
}
export interface Attendance {
  id: string;
  title: string;
  description: string;
  availableFrom: string;
  availableTo: string;
  allowLateness: boolean;
  imageUrl: string;
  userAttendance: {
    userAttendanceId: number;
    userId: string;
    attendanceId: string;
    role: "MASTER" | "MANAGER" | "GENERAL" | "READER";
    // user*	User{...}
  };
  days: string[];
  attendees: {};
  attendanceDays: { attendanceId: string; day: string; id: number }[];
}

export interface LoginDataRequest {
  username: string;
  password: string;
  isAutoLogin: boolean;
}

export interface AttendanceDetail extends BaseApiResponse {
  data: Attendance;
}

export interface ScheduleType {
  id: number;
  day: string;
  time: string;
}

export interface Record {
  id: number;
  attendeeId: string;
  status: "Present" | "Late" | "Absent";
  date: string;
  day:
    | "SUNDAY"
    | "MONDAY"
    | "TUESDAY"
    | "WEDNESDAY"
    | "THURSDAY"
    | "FRIDAY"
    | "SATURDAY";
  etc: string | null;
  lateTime: string | null;
  absenceType: string | null;
}

export interface AttendeeData {
  id: string;
  attendanceId: string;
  name: string;
  gender: string;
  mobileNumber: string;
  subMobileNumber: string | null;
  birth: string;
  course: string | null;
  school: string | null;
  grade: string | null;
  description: string | null;
  attendance: Attendance[];
  schedules: ScheduleType[];
  records: Record[];
  status?: string;
  isDetailOpen?: boolean;
}

export interface AttendeeList extends BaseApiResponse {
  data?: AttendeeData[];
  items?: AttendeeData[];
}

export interface AttendeeDetail {
  data: AttendeeData;
  success: boolean;
  message: string;
}

export interface AttendanceSchedulesByDateItem {
  attendee: AttendeeData;
  attendeeId: string;
  createdAt: string;
  day: string;
  id: number;
  time: string;
  status?: string;
  newStatus?: string; // api에서 내려온 status가 아닌 사용자가 생성/수정을 위해 선택한 status
  isDetailOpen?: boolean;
  etc?: string;
  lateTime?: string;
  absenceType?: string;
}

export interface AttendanceSchedulesByDateItemObj {
  [key: string]: AttendanceSchedulesByDateItem[];
}

export interface AttendanceSchedulesByDate extends BaseApiResponse {
  items: AttendanceSchedulesByDateItemObj[];
  pageSize: number;
  totalPage: number;
}

export interface CreateAttendeeRequest {
  attendanceId: string;
  name: string;
  gender: string;
  mobileNumber?: string;
  subMobileNumber?: string;
  birth: string;
  course?: string;
  grade?: string;
  school?: string;
  description?: string;
}

export type SingleSchedulesType = { id?: number; day: string; time: string }[];
export interface CreateSchedulesRequest {
  attendanceId: string;
  attendeeId: string;
  singleSchedules: SingleSchedulesType;
}

export interface CreateAttendanceRequest {
  title: string;
  description: string;
  availableFrom: string;
  availableTo: string;
  allowLateness: string;
  attendanceDays: string;
  image: File;
}

export interface SingleRecords {
  status: string;
  attendeeId: string;
  date: string;
  time: string;
  day: string;
  etc: string;
  lateTime?: string;
  absenceType?: string;
}
export interface CreateRecordsRequest {
  attendanceId: string;
  singleRecords: SingleRecords[];
}

export interface DeleteAttendeesRequest {
  ids: string[];
  attendanceId: string;
}

export interface AttendeeSchedules extends BaseApiResponse {
  items: {
    attendeeId: string;
    createdAt: string;
    day: string;
    id: number;
    time: string;
  }[];
}
