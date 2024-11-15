import ApiClient from "./ApiClient";

interface UseApiProps {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  data: any;
  dependencies: any[];
}

export const useFetch = async ({ url, method, data }: UseApiProps) => {
  const response = await ApiClient.request({
    url,
    method,
    data,
    baseURL: import.meta.env.VITE_VITE_API_ROOT,
  });

  return response.data;
};

export interface LoginData {
  username: string;
  password: string;
  isAutoLogin: boolean;
}

export const userLogin = async (request: LoginData) => {
  const response = await ApiClient.request({
    method: "POST",
    url: "/auth/signin",
    data: request,
  });
  return response.data;
};

export const userInfo = async () => {
  const response = await ApiClient.request({
    method: "GET",
    url: `/users`,
  });

  return response.data;
};

export const getAttendanceList = async () => {
  const response = await ApiClient.request({
    method: "GET",
    url: "/attendances",
  });

  return response.data;
};

/** 특정 출석부 상세 조회 */
export const getAttendanceDetail = async (attendanceId: string) => {
  const response = await ApiClient.request({
    method: "GET",
    url: `/attendances/${attendanceId}`,
  });

  return response.data;
};

/** 날짜에 따른 출석부 명단 */
export const getAttendanceSchedulesByDate = async ({
  attendanceId,
  date,
  pageNo = 1,
}: {
  attendanceId: string;
  date: string;
  pageNo: number;
}) => {
  const response = await ApiClient.request({
    method: "GET",
    url: `/attendanceId/${attendanceId}/schedules/${date}`,
    params: {
      pageNo,
    },
  });
  return response.data;
};

/** 출석 요약 */
export const getAttendanceSummary = async (
  attendanceId: string,
  attendeeIds: string[]
) => {
  const response = await ApiClient({
    method: "GET",
    url: `/attendance/${attendanceId}/attendees/records/summary`,
    params: {
      attendeeIds,
    },
  });
  return response.data;
};

/** 날짜별 출석 요약 */
export const getAttendanceSummaryByDate = async (
  attendanceId: string,
  date: string
) => {
  const response = await ApiClient.request({
    method: "GET",
    url: `/attendance/${attendanceId}/records/${date}/summary`,
  });
  return response.data;
};

/** 특정 출석부의 출석대상 명단 */
export const getAttendeeList = async (attendanceId: string) => {
  const response = await ApiClient.request({
    method: "GET",
    url: `/attendees/attendanceId/${attendanceId}`,
  });

  return response.data;
};

/** 출석대상의 스케쥴조회 */
export const getAttendeeDetail = async (attendeeId: string) => {
  const response = await ApiClient.request({
    method: "GET",
    url: `/attendees/${attendeeId}`,
  });
  return response.data;
};

export interface CreateAttendance {
  title: string;
  description: string;
  availableFrom: string;
  availableTo: string;
  allowLateness: string;
  attendanceDays: string;
  image: File;
}

/** 출석부 생성 */
export const createAttandance = async (request: CreateAttendance) => {
  const response = await ApiClient.request({
    method: "POST",
    url: `/attendances`,
    data: request,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export interface CreateAttendee {
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

/** 명단관리 > 출석대상 등록 */
export const createAttendee = async (parameters: CreateAttendee) => {
  const response = await ApiClient.request({
    method: "POST",
    url: `/attendees`,
    data: parameters,
  });
  return response.data;
};

export interface CreateAttendance {
  title: string;
  description: string;
  availableFrom: string;
  availableTo: string;
  allowLateness: string;
  attendanceDays: string;
  image: File;
}
/** 명단관리 > 출석대상 정보 수정 */
export const updateAttendee = async (
  attendeeId: string,
  parameters: CreateAttendee
) => {
  const response = await ApiClient.request({
    method: "PATCH",
    url: `/attendees/${attendeeId}`,
    data: parameters,
  });
  return response.data;
};

export type SingleSchedulesType = { id?: number; day: string; time: string }[];
export interface CreateSchedules {
  attendanceId: string;
  attendeeId: string;
  singleSchedules: SingleSchedulesType;
}

export interface CreateAttendance {
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
export interface CreateRecords {
  attendanceId: string;
  singleRecords: SingleRecords[];
}

export interface DeleteAttendees {
  ids: string[];
  attendanceId: string;
}

/** 명단관리 > 출석대상 등록 후 스케쥴 등록 */
export const createSchedules = async (parameters: CreateSchedules) => {
  const response = await ApiClient.request({
    method: "POST",
    url: `/schedules`,
    data: parameters,
  });

  return response.data;
};

/** 출석기록 생성 및 수정 */
export const createRecords = async (parameters: CreateRecords) => {
  const response = await ApiClient.request({
    method: "POST",
    url: `/records`,
    data: parameters,
  });
  return response.data;
};
/** 출석대상 삭제 */

export const deleteAttendees = async (parameters: DeleteAttendees) => {
  const response = await ApiClient.request({
    method: "DELETE",
    url: `/attendees`,
    data: parameters,
  });
  return response.data;
};

export const getSchedulesById = async (attendeeId: string) => {
  const response = await ApiClient.request({
    method: "GET",
    url: `/attendee/${attendeeId}/schedules`,
  });
  return response.data;
};
