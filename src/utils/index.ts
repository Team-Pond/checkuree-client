import { DaysType } from "@/api v2/AttendanceBookSchema";
import dayjs from "dayjs";

export const dateFormat = (
  date: Date | string,
  type: "slash" | "dash" | "dot" | "fullDash" | "fullDot"
): string => {
  const formattedDate = dayjs(date); // dayjs로 날짜 객체 생성

  switch (type) {
    case "slash":
      return formattedDate.format("YYYY/MM/DD");
    case "dash":
      return formattedDate.format("YYYY-MM-DD");
    case "dot":
      return formattedDate.format("YYYY.MM.DD");
    case "fullDash":
      return formattedDate.format("YYYY-MM-DD HH:mm");
    case "fullDot":
      return formattedDate.format("YYYY.MM.DD HH:mm");
    default:
      return formattedDate.format("YYYY-MM-DD");
  }
};

export const dayObj: Record<string, string> = {
  MONDAY: "월",
  TUESDAY: "화",
  WEDNESDAY: "수",
  THURSDAY: "목",
  FRIDAY: "금",
  SATURDAY: "토",
  SUNDAY: "일",
};

export const convertEngDayToKorDay = (engDay: string) => {
  return dayObj[engDay];
};

// 요일 순서
const dayOrder = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

export interface ScheduleType {
  id: number;
  day: string;
  time: string;
}

// 요일 순서 정렬을 위한 비교 함수 (ex - { a: {id: 1, day: "MONDAY", time: "0800" }, b: { ... } )
export const compareDays = (a: ScheduleType, b: ScheduleType) => {
  return dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day);
};

export type DayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

// 요일 순서 정렬을 위한 비교 함수 (ex - weekdays: ["MONDAY", "TUESDAY"])
export function sortWeekdays(weekdays: string[]): DayOfWeek[] {
  return weekdays.sort(
    (a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b)
  ) as DayOfWeek[];
}

const DayTransfer = {
  MONDAY: "월",
  TUESDAY: "화",
  WEDNESDAY: "수",
  THURSDAY: "목",
  FRIDAY: "금",
  SATURDAY: "토",
  SUNDAY: "일",
};

export function getDayGroupFromInput(input: DaysType[]) {
  const weekdays = ["월", "화", "수", "목", "금"];
  const weekends = ["토", "일"];
  const allDays = ["월", "화", "수", "목", "금", "토", "일"];

  // Input을 한글 요일로 변환
  const days = input.map((item) => DayTransfer[item]);

  // 매일
  if (
    days.every((day) => allDays.includes(day)) &&
    days.length === allDays.length
  ) {
    return "매일";
  }

  // 평일
  if (
    days.every((day) => weekdays.includes(day)) &&
    days.length === weekdays.length
  ) {
    return "평일";
  }

  // 주말
  if (
    days.every((day) => weekends.includes(day)) &&
    days.length === weekends.length
  ) {
    return "주말";
  }

  // 각각 요일
  return days.join(", ");
}

export function formatTime(time: string) {
  // time을 문자열로 변환하고 시간과 분을 분리
  const timeStr = time.padStart(4, "0");
  const hours = parseInt(timeStr.slice(0, 2), 10);
  const minutes = timeStr.slice(2);

  // 오전/오후 계산
  const period = hours < 12 ? "오전" : "오후";
  const formattedHour = hours % 12 === 0 ? 12 : hours % 12;

  return `${period} ${formattedHour}${minutes === "00" ? "" : `${minutes}`}시`;
}

export function formatTimeRange(startTime: string, endTime: string) {
  const formattedStartTime = formatTime(startTime);
  const formattedEndTime = formatTime(endTime);

  return `${formattedStartTime} ~ ${formattedEndTime}`;
}

// 오늘날짜 구하기
export function getTodayYYYYMMDD(): string {
  const today = new Date();

  const year = today.getFullYear();

  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function scheduleCheckformatTime(input: string) {
  if (!input || typeof input !== "string") return "Invalid Input";

  const [hourStr, minuteStr] = input.split(":");
  let hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);

  if (isNaN(hour) || isNaN(minute)) return "Invalid Time Format";

  const period = hour >= 12 ? "오후" : "오전";
  if (hour > 12) hour -= 12;
  if (hour === 0) hour = 12;

  return `${period} ${hour}:${minute.toString().padStart(2, "0")}`;
}

export function getCurrentTimeParts() {
  const now = new Date();

  // Extract hours, minutes, and seconds
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();

  // Calculate nanoseconds using performance.now()
  const millis = now.getMilliseconds();
  const nano = millis * 1e6; // Convert milliseconds to nanoseconds

  return {
    hour,
    minute,
    second,
    nano,
  };
}
