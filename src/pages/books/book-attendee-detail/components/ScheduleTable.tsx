import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useBookDetail } from "../../queries";
import { UpdateAttendeeScheduleRequest } from "@/api/AttendeeSchema";

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
  timeSlots: number;
  startHhmm: string;
  endHhmm: string;
  handleSchedule: (
    dayOfWeek: string,
    hhmm: string,
    isSelected: boolean
  ) => void;
  handleAttendeeBottomDrawer: (state: boolean) => void;
  attendeeSchedules?: UpdateAttendeeScheduleRequest;
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
  const { bookId } = useParams();
  const { data: bookDetail } = useBookDetail(Number(bookId));

  const start = parseHhmm(startHhmm);
  const end = parseHhmm(endHhmm);
  const totalHours = end.hour - start.hour;
  const hoursArray = Array.from(
    { length: totalHours },
    (_, i) => start.hour + i
  );

  const availableDaysSet = new Set([
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
  ]);

  const [filteredScheduleTable, setFilteredScheduleTable] =
    useState(scheduleTable);

  useEffect(() => {
    if (bookDetail?.data?.availableDays) {
      bookDetail.data.availableDays.forEach((day) => availableDaysSet.add(day));

      const weekendFiltered = scheduleTable.filter((daySchedule) =>
        availableDaysSet.has(daySchedule.dayOfWeek)
      );

      const isAvailableFrom30 = bookDetail?.data?.availableFrom?.endsWith("30");

      const updatedScheduleTable = isAvailableFrom30
        ? weekendFiltered.map((daySchedule) => ({
            ...daySchedule,
            scheduleCount: [0, ...daySchedule.scheduleCount, 0], // 30분 간격 보정
          }))
        : weekendFiltered;

      setFilteredScheduleTable(updatedScheduleTable);
    }
  }, [bookDetail, scheduleTable]);

  console.log(scheduleTable);
  return (
    <div className="max-w-4xl mx-auto">
      <table className="table-fixed w-full text-center border-collapse">
        <thead>
          <tr>
            <th className="border border-[#f6f6f6] w-[21px] h-2"></th>
            {filteredScheduleTable.map((dayData) => (
              <th
                key={dayData.dayOfWeek}
                className="border border-[#f6f6f6] w-auto max-w-[54px] h-2 text-xs-medium text-text-tertiary"
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
                {filteredScheduleTable.map((dayData) => {
                  const count = dayData.scheduleCount[slotIndex];
                  const hhmm = `${hour}:00`;
                  const beforeHhmm =
                    hour >= 1
                      ? `${String(hour - 1).padStart(2, "0")}:30`
                      : "00:00";

                  const isSelected =
                    attendeeSchedules?.schedules.some(
                      (schedule) =>
                        schedule.day === dayData.dayOfWeek &&
                        (schedule.hhmm === hhmm || schedule.hhmm === beforeHhmm)
                    ) ?? false;

                  return (
                    <td
                      key={`${dayData.dayOfWeek}-${slotIndex}`}
                      className={`border border-[#f6f6f6] text-sm w-[54px] h-[34px] align-middle cursor-pointer ${
                        isSelected
                          ? "bg-bg-tertiary text-text-interactive-inverse text-xs-medium"
                          : count > 0
                          ? "bg-bg-primary text-text-secondary text-xs-medium"
                          : "bg-bg-secondary text-text-secondary text-xs-medium"
                      }`}
                      onClick={() =>
                        handleSchedule(dayData.dayOfWeek, hhmm, isSelected)
                      }
                    >
                      {count}명
                    </td>
                  );
                })}
              </tr>
            );

            const secondRow = (
              <tr key={`${hour}-second`}>
                {filteredScheduleTable.map((dayData) => {
                  const count = dayData.scheduleCount[secondSlotIndex];
                  const hhmm = `${hour}:30`;
                  const beforeHhmm = `${hour}:00`;

                  const isSelected =
                    attendeeSchedules?.schedules.some(
                      (schedule) =>
                        schedule.day === dayData.dayOfWeek &&
                        (schedule.hhmm === hhmm || schedule.hhmm === beforeHhmm)
                    ) ?? false;

                  return (
                    <td
                      key={`${dayData.dayOfWeek}-${secondSlotIndex}`}
                      className={`border border-[#f6f6f6] text-sm w-[54px] h-[34px] align-middle cursor-pointer ${
                        isSelected
                          ? "bg-bg-tertiary text-text-interactive-inverse text-xs-medium"
                          : count > 0
                          ? "bg-bg-primary text-text-secondary text-xs-medium"
                          : "bg-bg-secondary text-text-secondary text-xs-medium"
                      }`}
                      onClick={() =>
                        handleSchedule(dayData.dayOfWeek, hhmm, isSelected)
                      }
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
