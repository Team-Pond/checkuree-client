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
    <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto pt-0">
      <p className="text-m-bold text-text-primary text-left mt-0">수업 시간 선택 - {student.name}</p>
      <div className="grid grid-cols-4 gap-2">
        {slots.map((time) => (
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
      <div className="flex flex-row gap-2 p-4">
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