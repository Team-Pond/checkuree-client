// ScheduleTable.tsx

import { UpdateAttendeeScheduleRequest } from "@/api v2/AttendeeSchema";
import React from "react";

type DayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

interface ScheduleItem {
  dayOfWeek: DayOfWeek;
  scheduleCount: number[];
}

interface ScheduleProps {
  scheduleTable: ScheduleItem[];
  startHhmm: string;
  endHhmm: string;
  timeSlots: number;
  handleSchedule: (dayOfWeek: string, hhmm: string) => void;
  handleAttendeeBottomDrawer: (state: boolean) => void;
  // ▼ 추가

  attendeeSchedules: UpdateAttendeeScheduleRequest | undefined;
}

const dayMap: Record<DayOfWeek, string> = {
  MONDAY: "월",
  TUESDAY: "화",
  WEDNESDAY: "수",
  THURSDAY: "목",
  FRIDAY: "금",
  SATURDAY: "토",
  SUNDAY: "일",
};

function parseHhmm(hhmm: string) {
  const [hh, mm] = hhmm.split(":").map(Number);
  return { hour: hh, minute: mm };
}

const ScheduleTable: React.FC<ScheduleProps> = ({
  scheduleTable,
  startHhmm,
  endHhmm,
  handleSchedule,

  attendeeSchedules,
}) => {
  const start = parseHhmm(startHhmm);
  const end = parseHhmm(endHhmm);

  const totalHours = end.hour - start.hour;
  const hoursArray = Array.from(
    { length: totalHours },
    (_, i) => start.hour + i
  );

  return (
    <div className="max-w-4xl mx-auto overflow-x-auto">
      <table className="table-auto w-full text-center border-collapse">
        <thead>
          <tr>
            <th className="border border-[#f6f6f6] w-[21px] h-2"></th>
            {scheduleTable.map((dayData) => (
              <th
                key={dayData.dayOfWeek}
                className="border border-[#f6f6f6] w-[54px] h-2 text-xs-medium text-text-tertiary"
              >
                {dayMap[dayData.dayOfWeek]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hoursArray.map((hour, hourIdx) => {
            const slotIndex = hourIdx * 2;
            const secondSlotIndex = slotIndex + 1;

            const firstRow = (
              <tr key={`${hour}-first`}>
                <td
                  className="border border-[#f6f6f6] text-xs-medium h-10 text-text-tertiary align-top"
                  rowSpan={2}
                >
                  {hour}
                </td>

                {scheduleTable.map((dayData) => {
                  const count = dayData.scheduleCount[slotIndex];
                  const hhmm = `${hour}:00`;

                  // ▼ dayOfWeek, hhmm이 selectedSchedules에 있는지 체크
                  const isSelected = attendeeSchedules?.schedules.some(
                    (schedule) =>
                      schedule.day === dayData.dayOfWeek &&
                      schedule.hhmm === hhmm
                  );

                  return (
                    <td
                      key={[dayData.dayOfWeek, slotIndex].join("-")}
                      // ▼ isSelected면 빨간색, 아니면 기존 로직
                      className={`border border-[#f6f6f6] text-sm w-[54px] h-[34px] align-middle cursor-pointer
                        ${
                          isSelected
                            ? "bg-bg-tertiary text-text-interactive-inverse text-xs-medium"
                            : count > 0
                            ? "bg-bg-primary text-text-secondary text-xs-medium"
                            : "bg-bg-secondary text-text-secondary text-xs-medium"
                        }
                      `}
                      onClick={() => handleSchedule(dayData.dayOfWeek, hhmm)}
                    >
                      {count}명
                    </td>
                  );
                })}
              </tr>
            );

            const secondRow = (
              <tr key={`${hour}-second`}>
                {scheduleTable.map((dayData) => {
                  const count = dayData.scheduleCount[secondSlotIndex];
                  const hhmm = `${hour}:30`;

                  // ▼ dayOfWeek, hhmm이 selectedSchedules에 있는지 체크
                  const isSelected = attendeeSchedules?.schedules.some(
                    (schedule) =>
                      schedule.day === dayData.dayOfWeek &&
                      schedule.hhmm === hhmm
                  );

                  return (
                    <td
                      key={[dayData.dayOfWeek, secondSlotIndex].join("-")}
                      className={`border border-[#f6f6f6] text-sm w-[54px] h-[34px] align-middle cursor-pointer
                        ${
                          isSelected
                            ? "bg-bg-tertiary text-text-interactive-inverse text-xs-medium"
                            : count > 0
                            ? "bg-bg-primary text-text-secondary text-xs-medium"
                            : "bg-bg-secondary text-text-secondary text-xs-medium"
                        }
                      `}
                      onClick={() => handleSchedule(dayData.dayOfWeek, hhmm)}
                    >
                      {count}명
                    </td>
                  );
                })}
              </tr>
            );

            return (
              <React.Fragment key={hour}>
                {firstRow}
                {secondRow}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleTable;
