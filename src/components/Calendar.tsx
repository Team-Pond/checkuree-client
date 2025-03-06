import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  isEqual,
  format,
  add,
  startOfMonth,
  startOfToday,
  startOfWeek,
} from "date-fns";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

interface IProps {
  className?: string;
  handleCurrentDay: (date: Date) => void;
}
export default function Calendar({ className, handleCurrentDay }: IProps) {
  const today = startOfToday();
  const [selectedMonth, setSelectedMonth] = useState(startOfMonth(today));
  const [selectedDay, setSelectedDay] = useState<Date>(today);

  const lastDayOfMonth = endOfMonth(selectedMonth);
  const additionalPreviousMonth = startOfWeek(selectedMonth, {
    weekStartsOn: 0,
  });
  const additionalNextMonth = endOfWeek(lastDayOfMonth, { weekStartsOn: 0 });

  const dates = eachDayOfInterval({
    start: additionalPreviousMonth,
    end: additionalNextMonth,
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center h-10 gap-3">
        <button
          aria-label="calendar backward"
          className="focus:text-gray-400 hover:text-gray-400 text-[#5d5d5d] mr-2"
          onClick={() => setSelectedMonth(add(selectedMonth, { months: -1 }))}
        >
          <img
            src="/images/icons/ico-arrow-left.svg"
            alt=""
            width={10}
            height={10}
          />
        </button>

        <span className="mt-1 focus:outline-none text-l-bold text-text-primary">
          {format(selectedMonth, "yyyy년 MM월")}
        </span>

        <button
          aria-label="calendar forward"
          className="focus:text-gray-400 hover:text-gray-400 text-[#5d5d5d] ml-2"
          onClick={() => setSelectedMonth(add(selectedMonth, { months: 1 }))}
        >
          <img
            src="/images/icons/ico-arrow-right.svg"
            alt=""
            width={10}
            height={10}
          />
        </button>
      </div>
      <table className={twMerge("w-full table-fixed", className)}>
        <thead>
          <tr>
            {["일", "월", "화", "수", "목", "금", "토"].map((day) => {
              return (
                <th className="w-1/7">
                  <div className="w-full h-[30px] flex justify-center items-center">
                    <p
                      className={twMerge(
                        "text-s-semibold text-center",
                        day === "일" ? "text-border-danger" : "text-[#5d5d5d]"
                      )}
                    >
                      {day}
                    </p>
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {
            // 7일씩 끊어서 렌더링
            dates
              .reduce((acc, _, index) => {
                if (index % 7 === 0) {
                  acc.push(dates.slice(index, index + 7));
                }
                return acc;
              }, [] as Date[][])
              .map((dates) => {
                return (
                  <tr>
                    {dates.map((date) => {
                      const isTextColor =
                        isEqual(selectedDay, date) &&
                        "rounded-full w-9 h-9 bg-[#BDDDC3]";

                      const holidayColor =
                        date.getDay() === 0
                          ? "text-[#f44336]"
                          : date.getMonth() !== selectedMonth.getMonth()
                          ? "text-text-tertiary"
                          : "text-[#5d5d5d]";
                      return (
                        <td>
                          <div
                            onClick={() => {
                              setSelectedDay(date);
                              handleCurrentDay(date);
                            }}
                            className="relative flex justify-center items-center w-full h-[45px]"
                          >
                            <p className="relative z-10">
                              <span
                                className={twMerge(
                                  "text-s-semibold flex items-center justify-center",
                                  holidayColor
                                )}
                              >
                                {format(date, "d")}
                              </span>
                            </p>
                            <p
                              className={twMerge(
                                "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0",
                                isTextColor
                              )}
                            />
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })
          }
        </tbody>
      </table>
    </div>
  );
}
