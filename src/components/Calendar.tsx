import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  add,
  startOfMonth,
  startOfToday,
  startOfWeek,
  isSameDay,
} from 'date-fns'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import LeftArrowIcon from '@/assets/icons/ico-arrow-left.svg?react'
import RightArrowIcon from '@/assets/icons/ico-arrow-right.svg?react'
import Button from './Button'

type CalendarProps = {
  className?: string
  handleCurrentDay: (date: Date) => void
  value?: Date
  disableBeforeToday?: boolean
}

export default function Calendar({
  className,
  handleCurrentDay,
  value,
  disableBeforeToday,
}: CalendarProps) {
  const today = startOfToday()
  const [selectedMonth, setSelectedMonth] = useState(
    startOfMonth(value || today),
  )

  const [selectedDay, setSelectedDay] = useState<Date>(value || today)

  const lastDayOfMonth = endOfMonth(selectedMonth)
  const additionalPreviousMonth = startOfWeek(selectedMonth, {
    weekStartsOn: 0,
  })
  const additionalNextMonth = endOfWeek(lastDayOfMonth, { weekStartsOn: 0 })

  const dates = eachDayOfInterval({
    start: additionalPreviousMonth,
    end: additionalNextMonth,
  })

  useEffect(() => {
    setSelectedMonth(startOfMonth(value || today))
    setSelectedDay(value || today)
  }, [value])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center h-10 gap-3">
        <Button
          aria-label="calendar backward"
          type="button"
          className="focus:text-gray-400 hover:text-gray-400 text-[#5d5d5d] mr-2"
          onClick={() => setSelectedMonth(add(selectedMonth, { months: -1 }))}
          children={<LeftArrowIcon width={12} height={12} />}
        />

        <span className="focus:outline-none text-l-bold text-text-primary">
          {format(selectedMonth, 'yyyy년 MM월')}
        </span>

        <Button
          aria-label="calendar forward"
          type="button"
          className="focus:text-gray-400 hover:text-gray-400 text-[#5d5d5d] ml-2"
          onClick={() => setSelectedMonth(add(selectedMonth, { months: 1 }))}
          children={<RightArrowIcon width={12} height={12} />}
        />
      </div>
      <table className={twMerge('w-full table-fixed', className)}>
        <thead>
          <tr>
            {['일', '월', '화', '수', '목', '금', '토'].map((day) => {
              return (
                <th key={day} className="w-1/7">
                  <div className="w-full h-[30px] flex justify-center items-center">
                    <p
                      className={`text-center text-s-semibold ${
                        day === '일' ? 'text-border-danger' : 'text-[#5d5d5d]'
                      }`}
                    >
                      {day}
                    </p>
                  </div>
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {
            // 7일씩 끊어서 렌더링
            dates
              .reduce((acc, _, index) => {
                if (index % 7 === 0) {
                  acc.push(dates.slice(index, index + 7))
                }
                return acc
              }, [] as Date[][])
              .map((dates, index) => {
                return (
                  <tr key={index}>
                    {dates.map((date) => {
                      const isTextColor =
                        isSameDay(selectedDay, date) &&
                        'rounded-full w-9 h-9 bg-[#BDDDC3]'

                      const isPast = disableBeforeToday && date < today
                      const disabledStyle = isPast
                        ? 'text-text-disabled cursor-not-allowed'
                        : ''

                      const isTodayMonth =
                        date.getMonth() === selectedMonth.getMonth()
                      const holidayColor =
                        date.getDay() === 0
                          ? 'text-[#f44336] '
                          : !isTodayMonth
                            ? 'text-text-tertiary'
                            : ''
                      return (
                        <td key={date.toString()}>
                          <div
                            onClick={() => {
                              if (
                                (disableBeforeToday && date < today) ||
                                !isTodayMonth
                              )
                                return
                              setSelectedDay(date)
                              handleCurrentDay(date)
                            }}
                            className="relative flex justify-center items-center w-full h-[45px]"
                          >
                            <p className="relative z-10">
                              <span
                                className={twMerge(
                                  '!text-s-semibold flex items-center justify-center',
                                  disabledStyle,
                                  holidayColor,
                                )}
                              >
                                {format(date, 'd')}
                              </span>
                            </p>
                            <p
                              className={twMerge(
                                'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0',
                                isTextColor,
                              )}
                            />
                          </div>
                        </td>
                      )
                    })}
                  </tr>
                )
              })
          }
        </tbody>
      </table>
    </div>
  )
}
