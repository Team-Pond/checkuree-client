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
  // 예) [12:00인덱스0, 12:30인덱스1, 13:00인덱스2, 13:30인덱스3, ...]
}

interface ScheduleProps {
  scheduleTable: ScheduleItem[];
  startHhmm: string; // "12:00"
  endHhmm: string; // "20:00"
  timeSlots: number;
  handleSchedule: (dayOfWeek: string, hhmm: string) => void;
  handleAttendeeBottomDrawer: (state: boolean) => void;
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

// ────────────────────────────────────────────────────────────────────────────────
// 유틸: "12:00" → { hour: 12, minute: 0 }, "20:00" → { hour: 20, minute: 0 }
function parseHhmm(hhmm: string) {
  const [hh, mm] = hhmm.split(":").map(Number);
  return { hour: hh, minute: mm };
}

// ────────────────────────────────────────────────────────────────────────────────
const ScheduleTable: React.FC<ScheduleProps> = ({
  scheduleTable,
  startHhmm,
  endHhmm,
  handleSchedule,
  handleAttendeeBottomDrawer,
}) => {
  const start = parseHhmm(startHhmm); // { hour: 12, minute: 0 }
  const end = parseHhmm(endHhmm); // { hour: 20, minute: 0 }

  // 예: 12시부터 19시까지 = 8시간
  const totalHours = end.hour - start.hour;
  // 만약 분단위가 있을 경우 처리 더 필요 (예: 12:30 ~ 20:00)

  // 시간 배열: [12, 13, 14, ..., 19]
  const hoursArray = Array.from(
    { length: totalHours },
    (_, i) => start.hour + i
  );

  // 스케줄 테이블 렌더링
  return (
    <div className="max-w-4xl mx-auto overflow-x-auto">
      <table className="table-auto w-full text-center border-collapse">
        <thead>
          <tr>
            {/* 시간 컬럼 */}
            <th className="border border-text-tertiary w-[21px] h-2"></th>
            {/* 요일 컬럼 */}
            {scheduleTable.map((dayData) => (
              <th
                key={dayData.dayOfWeek}
                className="border border-text-tertiary w-[54px] h-2 text-xs-medium text-text-tertiary"
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

            // 첫 번째 30분 줄
            const firstRow = (
              <tr key={`${hour}-first`}>
                <td
                  className="border border-text-tertiary text-xs-medium h-10 text-text-tertiary align-top"
                  rowSpan={2}
                >
                  {hour}
                </td>
                {scheduleTable.map((dayData) => {
                  const count = dayData.scheduleCount[slotIndex];
                  return (
                    <td
                      key={`${dayData.dayOfWeek}-${slotIndex}`}
                      className={`border border-text-tertiary text-sm w-[54px] h-[34px] align-middle ${
                        count > 0
                          ? "bg-bg-primary text-text-secondary text-xs-semibold"
                          : "bg-white text-text-secondary text-xs-semibold"
                      }`}
                      onClick={() =>
                        handleSchedule(dayData.dayOfWeek, `${hour}:00`)
                      }
                    >
                      {count > 0 ? count : ""}
                    </td>
                  );
                })}
              </tr>
            );

            // 두 번째 30분 줄
            const secondRow = (
              <tr key={`${hour}-second`}>
                {scheduleTable.map((dayData) => {
                  const count = dayData.scheduleCount[secondSlotIndex];
                  return (
                    <td
                      key={`${dayData.dayOfWeek}-${secondSlotIndex}`}
                      className={`border border-text-tertiary text-sm w-[54px] h-[34px] align-middle ${
                        count > 0
                          ? "bg-bg-primary text-text-secondary text-xs-semibold"
                          : "bg-white text-text-secondary text-xs-semibold"
                      }`}
                      onClick={() =>
                        handleSchedule(dayData.dayOfWeek, `${hour}:30`)
                      }
                    >
                      {count > 0 ? count : ""}
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
