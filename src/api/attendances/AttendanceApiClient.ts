import BaseApiClient, { Tokens } from "../BaseApiClient";
import {
  AttendanceDetail,
  AttendanceSchedulesByDate,
  AttendeeDetail,
  AttendeeList,
  AttendeeSchedules,
  CreateAttendance,
  CreateAttendee,
  CreateRecords,
  CreateSchedules,
  DeleteAttendees,
} from "./schema";

export interface ICommonResponse<T> {
  code: number;
  message: string;
  result?: T;
}

/**
 * 페이지 데이터 오브젝트 타입
 */
export interface IPage<T> {
  data: T[];
  page: number;
  size: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage?: number;
  prevPage?: number;
}

class AttendanceApiClient extends BaseApiClient {
  private static instance: AttendanceApiClient;

  public constructor(tokens?: Tokens) {
    super(import.meta.env.VITE_API_ROOT!, tokens);
  }

  public static getInstance() {
    if (this.instance == null) {
      this.instance = new AttendanceApiClient();
    }
    return this.instance;
  }

  public getAttendanceList = () =>
    this.axios.request({
      method: "GET",
      url: "/attendances",
    });

  /** 특정 출석부 상세 조회 */
  public getAttendanceDetail = (attendanceId: string) =>
    this.axios.request<AttendanceDetail>({
      method: "GET",
      url: `/attendances/${attendanceId}`,
    });

  /** 날짜에 따른 출석부 명단 */
  public getAttendanceSchedulesByDate = ({
    attendanceId,
    date,
    pageNo = 1,
  }: {
    attendanceId: string;
    date: string;
    pageNo: number;
  }) =>
    this.axios.request<AttendanceSchedulesByDate>({
      method: "GET",
      url: `/attendanceId/${attendanceId}/schedules/${date}`,
      params: {
        pageNo,
      },
    });

  /** 출석 요약 */
  public getAttendanceSummary = (attendanceId: string, attendeeIds: string[]) =>
    this.axios.request({
      method: "GET",
      url: `/attendance/${attendanceId}/attendees/records/summary`,
      params: {
        attendeeIds,
      },
    });

  /** 날짜별 출석 요약 */
  public getAttendanceSummaryByDate = (attendanceId: string, date: string) =>
    this.axios.request({
      method: "GET",
      url: `/attendance/${attendanceId}/records/${date}/summary`,
    });

  /** 특정 출석부의 출석대상 명단 */
  public getAttendeeList = (attendanceId: string) =>
    this.axios.request<AttendeeList>({
      method: "GET",
      url: `/attendees/attendanceId/${attendanceId}`,
    });

  /** 출석대상의 스케쥴조회 */
  public getAttendeeDetail = (attendeeId: string) =>
    this.axios.request<AttendeeDetail>({
      method: "GET",
      url: `/attendees/${attendeeId}`,
    });

  /** 출석부 생성 */
  public createAttandance = (request: CreateAttendance) =>
    this.axios.request({
      method: "POST",
      url: `/attendances`,
      data: request,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

  /** 명단관리 > 출석대상 등록 */
  public createAttendee = (parameters: CreateAttendee) =>
    this.axios.request({
      method: "POST",
      url: `/attendees`,
      data: parameters,
    });

  /** 명단관리 > 출석대상 정보 수정 */
  public updateAttendee = (attendeeId: string, parameters: CreateAttendee) =>
    this.axios.request({
      method: "PATCH",
      url: `/attendees/${attendeeId}`,
      data: parameters,
    });

  /** 명단관리 > 출석대상 등록 후 스케쥴 등록 */
  public createSchedules = (parameters: CreateSchedules) =>
    this.axios.request({
      method: "POST",
      url: `/schedules`,
      data: parameters,
    });

  /** 출석기록 생성 및 수정 */
  public createRecords = (parameters: CreateRecords) =>
    this.axios.request({
      method: "POST",
      url: `/records`,
      data: parameters,
    });

  /** 출석대상 삭제 */
  public deleteAttendees = (parameters: DeleteAttendees) =>
    this.axios.request({
      method: "DELETE",
      url: `/attendees`,
      data: parameters,
    });

  /** 출석대상의 스케쥴 조회 */
  public getSchedulesById = (attendeeId: string) =>
    this.axios.request<AttendeeSchedules>({
      method: "GET",
      url: `/attendee/${attendeeId}/schedules`,
    });
}

export default AttendanceApiClient;
