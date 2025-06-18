import { AttendeeRecord, StatisticType, STATUS } from './type'

type ResponseBase = {
  message: string
}

type ErrorResponse = ResponseBase & {
  status: 400 | 500 | 403
  data: {}
  timeStamp: string
}

export type UpdateRecordResponse =
  | ({
      status: 200
      data: {
        id: number
      }
    } & ResponseBase)
  | ErrorResponse

export type UpdateRecordRequest = {
  recordId: number
  attendanceBookId: number
  scheduleId?: number
  status?: STATUS | string
  attendTime?: string
}

export type UpdateRecordLessonResponse =
  | ({
      status: 200
      data: {
        id: number
      }
    } & ResponseBase)
  | ErrorResponse

export type UpdateRecordLessonRequest = {
  recordId: number
  attendanceBookId: number
  isTaught: boolean
}

export type UpdateRecordAllResponse =
  | ({
      status: 200
      data: {
        affectedRows: number
      }
    } & ResponseBase)
  | ErrorResponse

export type UpdateRecordAllRequest = {
  attendDate: string
  attendanceBookId: number
}

export type CreateRecordResponse =
  | ({
      status: 200
      data: {
        id: number
      }
    } & ResponseBase)
  | ErrorResponse

// attendTime의 형태를 정의하는 타입

export interface BaseRecordCreateCommon {
  attendanceBookId: number
  attendeeId: number
  attendDate: string
  attendTime?: string
}

export interface NormalRecordCreate extends BaseRecordCreateCommon {
  status: STATUS
  scheduleId: number
}

export interface MakeupRecordCreate extends BaseRecordCreateCommon {
  status: 'PENDING'
}

/**
 * 입력한 기간의 출석대상의 출석부 기록을 조회합니다.
 * @param from 조회 시작일 yyyy-MM-dd 형식 문자열
 * @param to 조회 종료일 yyyy-MM-dd 형식 문자열
 */
export type GetAttendeeRecordsRequest = {
  from: string
  to: string
}

export type GetAttendeeRecordsResponse =
  | {
      status: 200
      data: AttendeeRecord[]
    }
  | ErrorResponse

export type DeleteRecordRequest = {
  attendanceBookId: number
  recordId: number
}
export type DeleteRecordResponse =
  | {
      status: 200
      message: string
      data: {}
    }
  | ErrorResponse

export type GetStatisticsRequest = {
  from: string

  periodType: 'DAILY' | 'WEEKLY' | 'MONTHLY'
}

export type GetStatisticsResponse =
  | {
      status: 200
      message: string
      data: StatisticType
    }
  | ErrorResponse
