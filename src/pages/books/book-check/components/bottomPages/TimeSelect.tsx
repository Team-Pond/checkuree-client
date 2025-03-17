import { useContext } from "react";
import { twMerge } from "tailwind-merge";
import { BookContext } from "../../../../../context/BookContext";
import { useBookDetail } from "../../../queries";
import { useParams } from "react-router-dom";
import {
  ceil30Minute,
  floor30Minute,
  formatTimeWith12Hour,
} from "../../../../../utils";

interface Props {
  student: { id: number; name: string };
  onBack: () => void;
  onConfirm: (time: string) => void;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
}

const createSlots = (availableFrom: string, availableTo: string): string[] => {
  // availableFrom: 30분 단위로 내림 (floor)
  const availableStart = floor30Minute(availableFrom);

  // availableTo: 30분 단위로 올림 (ceil)
  const availableEnd = ceil30Minute(availableTo).subtract(1, "hour");

  const result = [];

  for (
    let time = availableStart;
    !time.isAfter(availableEnd);
    time = time.add(30, "minute")
  ) {
    result.push(time.format("HH:mm"));
  }
  return result;
};

export const TimeSelectionView = ({
  student,
  onBack,
  onConfirm,
  setSelectedTime,
  selectedTime,
}: Props) => {
  const context = useContext(BookContext);
  const { bookId } = useParams();

  let { selectedBook } = context!;

  // 선택된 책이 없을 경우, 책 상세 정보를 가져옴
  const { data: bookDetailResult } = !selectedBook
    ? useBookDetail(Number(bookId))
    : { data: null }; // monad 유지

  // timeSloe 생성
  const availableFrom =
    selectedBook?.availableFrom ?? bookDetailResult?.data?.availableFrom;
  const availableTo =
    selectedBook?.availableTo ?? bookDetailResult?.data?.availableTo;

  // 수업 시간 슬롯 생성
  const timeSlots =
    availableFrom && availableTo ? createSlots(availableFrom, availableTo) : [];

  return (
    <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto pt-0 h-full">
      <p className="text-m-bold text-left">인원 추가</p>
      <div className="flex flex-col flex-grow">
        <p className="text-m-semibold text-text-primary text-left mt-0">
          {student.name} 학생을 어떤 수업에 추가할까요?
        </p>
        <div className="mt-4">
          {timeSlots.filter((time) => time < "12:00").length > 0 ? (
            <>
              <p className="text-m text-text-secondary mb-2 text-left">오전</p>
              <div className="grid grid-cols-5 gap-2">
                {timeSlots
                  .filter((time) => time < "12:00")
                  .map((time) => (
                    <button
                      key={time}
                      className={twMerge(
                        "rounded-lg border border-[#d1d1d1] w-[61px] h-[33px] text-s-medium text-border-secondary-hover",
                        selectedTime === time
                          ? "border-border-brand text-text-brand bg-bg-tertiary "
                          : "text-border-secondary-hover"
                      )}
                      onClick={() => {
                        if (selectedTime === time) {
                          setSelectedTime("");
                          return;
                        }
                        setSelectedTime(time);
                      }}
                    >
                      {time}
                    </button>
                  ))}
              </div>
            </>
          ) : null}
        </div>

        <div className="mt-4">
          {timeSlots.filter((time) => time >= "12:00").length > 0 ? (
            <>
              <p className="text-m text-text-secondary mb-2 text-left">오후</p>
              <div className="grid grid-cols-5 gap-2 ">
                {timeSlots
                  .filter((time) => time >= "12:00")
                  .map((time) => (
                    <button
                      key={time}
                      className={twMerge(
                        "rounded-lg border border-[#d1d1d1] w-[61px] h-[33px] text-s-medium text-border-secondary-hover",
                        selectedTime === time
                          ? "border-border-brand text-text-brand"
                          : "text-border-secondary-hover"
                      )}
                      onClick={() => {
                        if (selectedTime === time) {
                          setSelectedTime("");
                          return;
                        }
                        setSelectedTime(time);
                      }}
                    >
                      {formatTimeWith12Hour(time)}
                    </button>
                  ))}
              </div>
            </>
          ) : null}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-row gap-2 shadow-md">
        <button
          className="w-full h-[54px] bg-gray-300 rounded-2xl text-l-semibold"
          onClick={onBack}
        >
          이전으로
        </button>
        <button
          className={twMerge(
            "w-full h-[54px] rounded-2xl text-l-semibold",
            selectedTime === ""
              ? "bg-gray-300 text-gray-500 cursor-not-allowed opacity-50" // 비활성화 스타일
              : "bg-bg-tertiary text-[#f1f8f3]" // 활성화 스타일
          )}
          onClick={() => onConfirm(selectedTime)}
          disabled={!selectedTime}
        >
          추가하기
        </button>
      </div>
    </div>
  );
};
