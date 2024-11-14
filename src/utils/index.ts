import { format } from "date-fns";

export const dateFormat = (
  date: Date,
  type: "slash" | "dash" | "dot" | "fullDash" | "fullDot"
) => {
  switch (type) {
    case "slash":
      return format(date, "yyyy/MM/dd");
    case "dash":
      return format(date, "yyyy-MM-dd");
    case "dot":
      return format(date, "yyyy.MM.dd");
    case "fullDash":
      return format(date, "yyyy-MM-dd HH:mm");
    case "fullDot":
      return format(date, "yyyy.MM.dd HH:mm");
    default:
      return format(date, "yyyy-MM-dd");
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
