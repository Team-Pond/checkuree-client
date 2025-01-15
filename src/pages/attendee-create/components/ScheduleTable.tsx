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
  // timeSlots=16 → (20 - 12) * 2 = 16, 30분 단위
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
      <table className="table-auto border-collapse border border-gray-300 w-full text-center">
        <thead>
          <tr>
            {/* 시간 컬럼 */}
            <th className="border border-gray-300 bg-gray-50 w-[54px] h-5">
              시간
            </th>
            {/* 요일 컬럼 */}
            {scheduleTable.map((dayData) => (
              <th
                key={dayData.dayOfWeek}
                className="border border-gray-300 bg-gray-50 w-[54px] h-5"
              >
                {dayMap[dayData.dayOfWeek]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hoursArray.map((hour, hourIdx) => {
            // 예: 12시 → slotIndex=0,0+1
            //     13시 → slotIndex=2,3
            const slotIndex = hourIdx * 2;
            const secondSlotIndex = slotIndex + 1;

            // 첫 번째 30분 줄
            const firstRow = (
              <tr key={`${hour}-first`}>
                {/* 시간 셀 (rowSpan=2) → 이 셀만 두 줄 높이를 차지 */}
                <td
                  className="border border-gray-300 text-sm font-semibold
                             w-[54px] h-10 align-middle bg-gray-100"
                  rowSpan={2}
                >
                  {hour}
                </td>
                {/* 각 요일에 대한 첫 번째 슬롯 */}
                {scheduleTable.map((dayData) => {
                  const count = dayData.scheduleCount[slotIndex];
                  return (
                    <td
                      key={`${dayData.dayOfWeek}-${slotIndex}`}
                      className={`border border-gray-300 text-sm w-[54px] h-10 align-middle ${
                        count > 0
                          ? "bg-green-200 text-green-900 font-semibold"
                          : "bg-white"
                      }`}
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
                      className={`border border-gray-300 text-sm w-[54px] h-10 align-middle ${
                        count > 0
                          ? "bg-green-200 text-green-900 font-semibold"
                          : "bg-white"
                      }`}
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
