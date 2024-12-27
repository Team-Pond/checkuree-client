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
