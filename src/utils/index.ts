import { PeriodType } from '@/api/type'
import dayjs, { Dayjs } from 'dayjs'

/**
 * 날짜를 다양한 형식으로 포맷팅합니다.
 * - 'slash': YYYY/MM/DD
 * - 'dash': YYYY-MM-DD
 * - 'dot': YYYY.MM.DD
 * - 'fullDash': YYYY-MM-DD HH:mm
 * - 'fullDot': YYYY.MM.DD HH:mm
 * @param date
 * @param type
 * @returns
 */
export const dateFormat = (
  date: Date | string,
  type: 'slash' | 'dash' | 'dot' | 'fullDash' | 'fullDot',
): string => {
  const formattedDate = dayjs(date) // dayjs로 날짜 객체 생성

  switch (type) {
    case 'slash':
      return formattedDate.format('YYYY/MM/DD')
    case 'dash':
      return formattedDate.format('YYYY-MM-DD')
    case 'dot':
      return formattedDate.format('YYYY.MM.DD')
    case 'fullDash':
      return formattedDate.format('YYYY-MM-DD HH:mm')
    case 'fullDot':
      return formattedDate.format('YYYY.MM.DD HH:mm')
    default:
      return formattedDate.format('YYYY-MM-DD')
  }
}

export const dayObj: Record<string, string> = {
  MONDAY: '월',
  TUESDAY: '화',
  WEDNESDAY: '수',
  THURSDAY: '목',
  FRIDAY: '금',
  SATURDAY: '토',
  SUNDAY: '일',
}

export const convertEngDayToKorDay = (engDay: string) => {
  return dayObj[engDay]
}

// 요일 순서
const dayOrder = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY',
]

export interface ScheduleType {
  id: number
  day: string
  time: string
}

// 요일 순서 정렬을 위한 비교 함수 (ex - { a: {id: 1, day: "MONDAY", time: "0800" }, b: { ... } )
export const compareDays = (a: ScheduleType, b: ScheduleType) => {
  return dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day)
}

export type DayOfWeek =
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY'
  | 'SUNDAY'

// 요일 순서 정렬을 위한 비교 함수 (ex - weekdays: ["MONDAY", "TUESDAY"])
export function sortWeekdays(weekdays: string[]): DayOfWeek[] {
  return weekdays.sort(
    (a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b),
  ) as DayOfWeek[]
}

/**
 * 주어진 시간을 "HH:mm" 포맷으로 반환합니다.
 * - "5:3" → "05:03"
 * - "12:30" → "12:30"
 * - 530      → "05:30"
 *
 * @param time "H:mm", "HH:mm" 또는 숫자 (예: 530, 1230)
 * @returns 두 자리 시:분 문자열
 */
export function formmattedHhmm(time: string | number): string {
  // 1) 문자열로 통일
  const str = typeof time === 'number' ? time.toString() : time

  // 2) 콜론 기준 분리
  const parts = str.split(':')
  let [h, m] = parts

  // 숫자 입력이면서 콜론이 없을 때 (e.g. 530, 1230) 처리
  if (parts.length === 1 && /^\d+$/.test(str)) {
    const num = str.padStart(4, '0') // "530" → "0530"
    h = num.slice(0, num.length - 2) // "05"
    m = num.slice(-2) // "30"
  }

  // 3) 시·분이 없거나 비정상 포맷이면 원본 반환
  if (typeof h === 'undefined' || typeof m === 'undefined') {
    return str
  }

  // 4) 두 자리로 패딩
  const hh = h.padStart(2, '0')
  const mm = m.padStart(2, '0')

  return `${hh}:${mm}`
}

export const DayTransfer = {
  MONDAY: '월',
  TUESDAY: '화',
  WEDNESDAY: '수',
  THURSDAY: '목',
  FRIDAY: '금',
  SATURDAY: '토',
  SUNDAY: '일',
}

/**
 * 입력된 요일 배열을 한글 요일로 변환하여 그룹화합니다.
 * - 매일: 모든 요일이 포함된 경우
 * - 평일: 월~금 요일만 포함된 경우
 * - 주말: 토, 일 요일만 포함된 경우
 * - 각각 요일: 나머지 경우
 * @param input - 요일 배열 (예: ['MONDAY', 'TUESDAY', 'WEDNESDAY'])
 */
export function getDayGroupFromInput(input: DayOfWeek[]) {
  const weekdays = ['월', '화', '수', '목', '금']
  const weekends = ['토', '일']
  const allDays = ['월', '화', '수', '목', '금', '토', '일']

  // Input을 한글 요일로 변환
  const days = input
    .sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b))
    .map((item) => DayTransfer[item])

  // 매일
  if (
    days.every((day) => allDays.includes(day)) &&
    days.length === allDays.length
  ) {
    return '매일'
  }

  // 평일
  if (
    days.every((day) => weekdays.includes(day)) &&
    days.length === weekdays.length
  ) {
    return '평일'
  }

  // 주말
  if (
    days.every((day) => weekends.includes(day)) &&
    days.length === weekends.length
  ) {
    return '주말'
  }

  // 각각 요일
  return days.join(', ')
}

export function formatTime(time: string) {
  // time을 문자열로 변환하고 시간과 분을 분리
  const timeStr = time.padStart(4, '0')
  const hours = parseInt(timeStr.slice(0, 2), 10)
  const minutes = timeStr.slice(2)

  // 오전/오후 계산
  const period = hours < 12 ? '오전' : '오후'
  const formattedHour = hours % 12 === 0 ? 12 : hours % 12

  return `${period} ${formattedHour}시 ${minutes === '00' ? '' : `${minutes}분`}`
}

export function formatTimeRange(startTime: string, endTime: string) {
  const formattedStartTime = formatTime(startTime)
  const formattedEndTime = formatTime(endTime)

  return `${formattedStartTime} ~ ${formattedEndTime}`
}

// 오늘날짜 구하기
/**
 *
 * @returns 오늘 날짜를 "YYYY-MM-DD" 형식으로 반환합니다.
 */
export function getTodayYYYYMMDD(): string {
  const today = new Date()

  const year = today.getFullYear()

  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

/**
 * 시간 문자열을 받아서 오전/오후 hh:mm 형식으로 변환합니다.
 * 예: "14:30" -> "오후 2:30"
 * @param input
 * @returns
 */

export function scheduleCheckformatTime(input: string) {
  if (!input || typeof input !== 'string') return 'Invalid Input'

  const [hourStr, minuteStr] = input.split(':')
  let hour = parseInt(hourStr, 10)
  const minute = parseInt(minuteStr, 10)

  if (isNaN(hour) || isNaN(minute)) return 'Invalid Time Format'

  const period = hour >= 12 ? '오후' : '오전'
  if (hour > 12) hour -= 12
  if (hour === 0) hour = 12

  return `${period} ${hour}:${minute.toString().padStart(2, '0')}`
}

/**
 *
 * @returns 현재 시간의 시, 분, 초, 나노초를 반환합니다.
 * 시: 0~23, 분: 0~59, 초: 0~59, 나노초: 0~999999999
 */
export function getCurrentTimeParts() {
  const now = new Date()

  // Extract hours, minutes, and seconds
  const hour = now.getHours()
  const minute = now.getMinutes()
  const second = now.getSeconds()

  // Calculate nanoseconds using performance.now()
  const millis = now.getMilliseconds()
  const nano = millis * 1e6 // Convert milliseconds to nanoseconds

  return {
    hour,
    minute,
    second,
    nano,
  }
}

type ScheduleItem = {
  id: number
  day: string
  time: string
}

/**
 * ScheduleItem 배열을 받아서 요일(월~일) 순서대로 정렬한 후 시간을 한글로 변환하여 반환합니다.
 *
 */
export const formatSchedule = (schedule: ScheduleItem[]): string[] => {
  const daysInKorean: Record<string, string> = {
    MONDAY: '월',
    TUESDAY: '화',
    WEDNESDAY: '수',
    THURSDAY: '목',
    FRIDAY: '금',
    SATURDAY: '토',
    SUNDAY: '일',
  }

  const dayOrder: Record<string, number> = {
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6,
    SUNDAY: 7,
  }

  return schedule
    ?.sort((a, b) => dayOrder[a.day] - dayOrder[b.day])
    .map(({ day, time }) => {
      const [hour, minute] = time.split(':').map(Number)
      const period = hour >= 12 ? '오후' : '오전'
      const formattedHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour // 12시간제 변환
      return `(${daysInKorean[day]}) ${period} ${formattedHour}:${minute
        .toString()
        .padStart(2, '0')}`
    })
}

/**
 * hh:mm:ss 형식의 시간 문자열을 받아서 오전/오후 hh:mm 형식으로 변환합니다.
 */
export const formatLocalTimeString = (time: string) => {
  let [hour, minute] = time.split(':')

  const period = hour >= '12' ? '오후' : '오전'
  if (parseInt(hour) > 12) hour = String(parseInt(hour) - 12).padStart(2, '0')
  if (parseInt(hour) === 0) hour = '12'
  return `${period} ${hour}:${minute}`
}

/**
 * hh:mm 형식의 시간 문자열을 받아서 12시간제의 h:mm 형식으로 변환합니다.
 */
export const formatTimeWith12Hour = (time: string): string => {
  const [hour, minute] = time.split(':')

  if (hour <= '12') return time

  const formattedHour = String(parseInt(hour) - 12)
  return `${formattedHour}:${minute}`
}

/**
 * yyyy-MM-dd 형식의 날짜 문자열을 받아서 일 수 차이를 반환합니다.
 */
export const getDateDifference = (date1: string, date2: string): number => {
  return dayjs(date1).diff(dayjs(date2), 'day')
}

/**
 * hh:mm 형식의 시간을 받아 30분 단위로 내림
 *
 * @example
 * floor30Minute("10:15") // "10:00"
 * floor30Minute("10:45") // "10:30"
 */
export function floor30Minute(hhmm: string) {
  const dayTime = dayjs('2000-01-01 ' + hhmm, 'HH:mm')
  return dayTime.subtract(dayTime.minute() % 30, 'minute')
}

/**
 * hh:mm 형식의 시간을 받아 30분 단위로 올림
 *
 * @example
 * floor30Minute("10:15") // "10:30"
 * floor30Minute("10:45") // "11:00"
 */
export function ceil30Minute(hhmm: string) {
  const dayTime = dayjs('2000-01-01 ' + hhmm, 'HH:mm')
  const remainder = dayTime.minute() % 30
  if (remainder === 0) {
    return dayTime
  }
  return dayTime.subtract(remainder).add(30, 'minute')
}

/**
 * hh:mm 형식의 시간을 받아 30분을 뺀 시간을 반환합니다.
 * 00:00 이전인 경우 00:00을 반환합니다.
 */
export const getSub30MinuteHhmm = (hhmm: string) => {
  const dayTime = dayjs('2000-01-01 ' + hhmm)
  const sub30Minute = dayTime.subtract(30, 'minute')
  return sub30Minute.format('HH:mm')
}

/**
 * hh:mm 형식의 시간을 받아 입력한 시간을 더한 후 hh:mm 형식으로 반환합니다.
 * 24:00 이후인 경우 24:00을 반환합니다.
 */
export const getAddMinuteHhmm = (hhmm: string, minute: number) => {
  const dayTime = dayjs('2000-01-01 ' + hhmm)
  const addedTime = dayTime.add(minute, 'minute')
  return addedTime.isBefore(dayjs('2000-01-02 00:00:00'))
    ? addedTime.format('HH:mm')
    : '24:00'
}

/**
 * 통계 기간 텍스트를 생성합니다.
 * DAILY, WEEKLY, MONTHLY에 따라 다른 형식으로 반환합니다.
 * @param date
 * @param period
 * @returns
 */
export const statisticPeriodText = (date: Dayjs, period: PeriodType) => {
  const today = dayjs(date).format('YYYY.MM.DD(ddd)')

  const weekDayFirst = dayjs(date).subtract(7, 'day').format('YYYY.MM.DD')
  const weekDayLast = dayjs(date).format('YYYY.MM.DD')
  const month = dayjs(date).format('YYYY년 M월')

  switch (period) {
    case 'DAILY':
      return `오늘 ${today}`
    case 'WEEKLY':
      return `${weekDayFirst} - ${weekDayLast}`
    case 'MONTHLY':
      return month
  }
}

export const spaceBlockKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === ' ') e.preventDefault()
}
