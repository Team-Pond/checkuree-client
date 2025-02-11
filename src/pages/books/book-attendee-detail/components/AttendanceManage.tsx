import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isEqual,
  startOfMonth,
  startOfToday,
  startOfWeek,
} from "date-fns";
import { useState } from "react";

type IProps = {
  studentInfo: {
    name: string;
    age: number;
    grade: string;
    scheduleDays: string;
  };
};

export default function AttendanceManage(props: IProps) {
  const { studentInfo } = props;

  const today = startOfToday();

  const [selectedMonth, setSelectedMonth] = useState(startOfMonth(today));

  const lastDayOfMonth = endOfMonth(selectedMonth);
  const additionalPreviousMonth = startOfWeek(selectedMonth, {
    weekStartsOn: 0,
  });
  const additionalNextMonth = endOfWeek(lastDayOfMonth, { weekStartsOn: 0 });

  const dates = eachDayOfInterval({
    start: additionalPreviousMonth,
    end: additionalNextMonth,
  });

  const datesInWeeks = dates.reduce((acc, _, index) => {
    if (index % 7 === 0) {
      acc.push(dates.slice(index, index + 7));
    }
    return acc;
  }, [] as Date[][]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-8 items-center w-full h-[81px] rounded-2xl bg-white">
        <img
          src="/images/icons/book-roaster/ico-student.svg"
          alt="학생 아이콘"
          width={40}
          height={40}
          className="rounded-full ml-[23px]"
        />
        <div className="flex flex-col gap-2 text-left">
          <div className="flex flex-col gap-1">
            <p className="text-m-bold">
              <span className="text-text-primary">{studentInfo.name}</span>
              <span className="text-text-secondary text-m-semibold ml-2">
                {studentInfo.age}
              </span>
            </p>
            <p className="text-s-medium">
              <span className="text-text-brand">
                {studentInfo.scheduleDays}
              </span>{" "}
              <span className="text-[#b0b0b0]"> {studentInfo.grade}</span>
            </p>
          </div>
        </div>
      </div>

      {/*<div className="flex gap-8 items-center w-full h-[81px] rounded-2xl bg-white">*/}
      <div className="w-full h-auto rounded-2xl bg-white p-4 flex flex-col gap-2">
        <div>
          <p className="flex text-s-bold text-[#5d5d5d]">출석 현황</p>
        </div>

        <div className="flex items-center justify-center space-x-10 mt-6">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <p className="text-text-secondary text-s-semibold">출석 8</p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <p className="text-text-secondary text-s-semibold">결석 1</p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <p className="text-text-secondary text-s-semibold">보강 1</p>
          </div>
        </div>

        {/*<div className="flex-2 flex items-center justify-between w-full">*/}
        <div className="flex items-center justify-center mt-6">
          <button
            aria-label="calendar backward"
            className="focus:text-gray-400 hover:text-gray-400 text-[#5d5d5d] mr-2"
            onClick={() => setSelectedMonth(add(selectedMonth, { months: -1 }))}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-chevron-left"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <polyline points="15 6 9 12 15 18" />
            </svg>
          </button>
          <div>
            <span className="focus:outline-none text-s-bold text-text-primary">
              {format(selectedMonth, "yyyy년 MM월")}
            </span>
          </div>
          <button
            aria-label="calendar forward"
            className="focus:text-gray-400 hover:text-gray-400 text-[#5d5d5d] ml-2"
            onClick={() => setSelectedMonth(add(selectedMonth, { months: 1 }))}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler  icon-tabler-chevron-right"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </button>
        </div>

        <div className="flex items-center justify-between mt-1">
          <table className="w-full table-fixed">
            <thead>
              <tr>
                {["일", "월", "화", "수", "목", "금", "토"].map((day) => {
                  return (
                    <th className="w-1/7">
                      <div className="w-full h-[30px] flex justify-center items-center">
                        <p className="text-xs-medium text-center text-[#5d5d5d]">
                          {day}
                        </p>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {datesInWeeks.map((dates) => {
                return (
                  <tr>
                    {dates.map((date) => {
                      return (
                        <td>
                          <div className="flex w-full h-[53px] justify-center flex-col items-center">
                            <div className="h-full">
                              <p
                                className={`text-xs-medium ${
                                  date.getDay() === 0
                                    ? "text-[#f44336]"
                                    : date.getMonth() !==
                                        selectedMonth.getMonth()
                                      ? "text-text-tertiary"
                                      : isEqual(today, date)
                                        ? "text-[#5d5d5d] rounded-full w-4 h-4 bg-[#BDDDC3]"
                                        : "text-[#5d5d5d]"
                                }`}
                              >
                                {format(date, "d")}
                              </p>
                            </div>

                            <div className="flex gap-1 justify-center mb-6 mt-2">
                              {/* 원을 1~3개 추가 */}
                              <p className="rounded-full w-1 h-1 bg-[#BDDDC3]"></p>
                              <p className="rounded-full w-1 h-1 bg-[#BDDDC3]"></p>
                              <p className="rounded-full w-1 h-1 bg-[#BDDDC3]"></p>
                            </div>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
