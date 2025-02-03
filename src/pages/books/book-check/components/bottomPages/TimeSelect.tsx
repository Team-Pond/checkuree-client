import { useContext, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import dayjs from 'dayjs';
import { BookContext } from '../../../../../context/BookContext';

interface Props {
  student: { id: number; name: string };
  onBack: () => void;
  onConfirm: (time: string) => void;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
}

export const TimeSelectionView = ({ student, onBack, onConfirm, setSelectedTime, selectedTime }: Props) => {
  const context = useContext(BookContext);

  const { selectedBook } = context!;

  // 수업 시간 슬롯 생성
  const slots = [];
  if (selectedBook?.availableFrom && selectedBook?.availableTo) {
    // availableFrom: 30분 단위로 내림 (floor)
    const availableFromTime = dayjs('2024-01-01 ' + selectedBook.availableFrom, 'HH:mm');
    const floor30From = availableFromTime.subtract(availableFromTime.minute() % 30);

    // availableTo: 30분 단위로 올림 (ceil)
    const availableToTime = dayjs('2024-01-01 ' + selectedBook.availableTo, 'HH:mm');
    const ceil30To = availableToTime.add(30 - (availableToTime.minute() % 30)).subtract(1, 'hour');

    for (let time = floor30From; !time.isAfter(ceil30To); time = time.add(30, 'minute')) {
      slots.push(time.format('HH:mm'));
    }
  }

  return (
    <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto pt-0 h-full">
      <p className="text-m-bold text-left">인원 추가</p>
      <div className="flex flex-col flex-grow">
        <p className="text-m-semibold text-text-primary text-left mt-0">{student.name} 학생을 어떤 수업에 추가할까요?</p>
        <div className="mt-4">
          {slots.filter((time) => time < '12:00').length > 0 ? (
            <>
              <p className="text-m text-text-secondary mb-2 text-left">오전</p>
              <div className="grid grid-cols-5 gap-2">
                {slots
                  .filter((time) => time < '12:00')
                  .map((time) => (
                    <button
                      key={time}
                      className={twMerge(
                        'rounded-lg border border-[#d1d1d1] w-[61px] h-[33px] text-s-medium text-border-secondary-hover',
                        selectedTime === time ? 'border-border-brand text-text-brand bg-bg-tertiary text-white' : 'text-border-secondary-hover',
                      )}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </button>
                  ))}
              </div>
            </>
          ) : null}
        </div>

        <div className="mt-4">
          {slots.filter((time) => time >= '12:00').length > 0 ? (
            <>
              <p className="text-m text-text-secondary mb-2 text-left">오후</p>
              <div className="grid grid-cols-5 gap-2 ">
                {slots
                  .filter((time) => time >= '12:00')
                  .map(time => {
                    const [hour, minute] = time.split(':');
                    if (hour == '12') {
                      return time;
                    }
                    return (parseInt(hour) - 12) + ':' + minute;

                  })
                  .map((time) => (
                    <button
                      key={time}
                      className={twMerge(
                        'rounded-lg border border-[#d1d1d1] w-[61px] h-[33px] text-s-medium text-border-secondary-hover',
                        selectedTime === time ? 'border-border-brand text-text-brand bg-bg-tertiary text-white' : 'text-border-secondary-hover',
                      )}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </button>
                  ))}
              </div>
            </>
          ) : null}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-row gap-2 shadow-md">
        <button className="w-full h-[54px] bg-gray-300 rounded-2xl text-l-semibold" onClick={onBack}>
          이전으로
        </button>
        <button className="w-full h-[54px] bg-bg-tertiary text-[#f1f8f3] rounded-2xl text-l-semibold"
                onClick={() => onConfirm(selectedTime)}>
          추가하기
        </button>
      </div>
    </div>
  );
};