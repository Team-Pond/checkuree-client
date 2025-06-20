import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

import { DaysType } from '@/api/type'

import { UpdateAttendeeScheduleRequest } from '@/api/AttendeeSchema'
import { CreateAttendeeSchema } from '../_schema'
import { useFormContext } from 'react-hook-form'
import { useBookDetail } from '@/pages/book/queries'

interface ScheduleItem {
  dayOfWeek: DaysType
  scheduleCount: number[]
}

interface ScheduleProps {
  scheduleTable: ScheduleItem[]
  startHhmm: string
  endHhmm: string
  timeSlots: number
  handleSchedule: (dayOfWeek: string, hhmm: string, isSelected: boolean) => void
  handleAttendeeBottomDrawer: (state: boolean) => void
  // ▼ 추가
  attendeeSchedules?: UpdateAttendeeScheduleRequest
}

const dayMap: Record<DaysType, string> = {
  MONDAY: '월',
  TUESDAY: '화',
  WEDNESDAY: '수',
  THURSDAY: '목',
  FRIDAY: '금',
  SATURDAY: '토',
  SUNDAY: '일',
}

function parseHhmm(hhmm: string) {
  const [hh, mm] = hhmm.split(':').map(Number)
  return { hour: hh, minute: mm }
}

const ScheduleTable: React.FC<ScheduleProps> = ({
  scheduleTable,
  startHhmm,
  endHhmm,
  handleSchedule,
}) => {
  const { bookId } = useParams()

  const { data: bookDetail } = useBookDetail(Number(bookId))
  // 토.일 미사용 요일 삭제
  const [filteredScheduleTable, setFilteredScheduleTable] =
    useState(scheduleTable)

  const start = parseHhmm(startHhmm)
  const end = parseHhmm(endHhmm)

  const totalHours = end.hour - start.hour
  const hoursArray = Array.from(
    { length: totalHours },
    (_, i) => start.hour + i,
  )

  const availableDaysSet = new Set([
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
  ])

  const updateScheduleData = useMemo(() => {
    if (bookDetail?.data?.availableDays) {
      bookDetail.data.availableDays.forEach((day) => {
        availableDaysSet.add(day)
      })
      const weekendFiltered = scheduleTable.filter((daySchedule) =>
        availableDaysSet.has(daySchedule.dayOfWeek),
      )

      // availableFrom이 '30'으로 끝나는 경우 scheduleCount에 0을 추가
      const isAvailableFrom30 = bookDetail?.data?.availableFrom?.endsWith('30')
      const updatedScheduleTable = isAvailableFrom30
        ? weekendFiltered.map((daySchedule) => ({
            ...daySchedule,
            scheduleCount: [0, ...daySchedule.scheduleCount, 0], // 시작시간이 30분 인 경우 앞에 0을 하나 추가
          }))
        : weekendFiltered

      return updatedScheduleTable
    }
  }, [bookDetail]) // ▼ 추가

  useEffect(() => {
    if (updateScheduleData) setFilteredScheduleTable(updateScheduleData)
  }, [updateScheduleData])

  const { watch } = useFormContext<CreateAttendeeSchema>()
  const newSchedules = watch('schedulesRequest.schedules') || []

  return (
    <div className="max-w-4xl mx-auto">
      <table className="table-fixed w-full text-center border-collapse">
        <thead>
          <tr>
            <th className="border border-[#f6f6f6] w-[21px] h-2"></th>
            {filteredScheduleTable &&
              filteredScheduleTable.map((dayData, idx) => (
                <th
                  key={dayData.dayOfWeek}
                  className="border border-[#f6f6f6] w-auto w-max-[54px] h-2 text-xs-medium text-text-tertiary"
                >
                  {dayMap[dayData.dayOfWeek]}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {hoursArray.map((hour, hourIdx) => {
            const slotIndex = hourIdx * 2
            const secondSlotIndex = slotIndex + 1

            const firstRow = (
              <tr key={`${hour}-first`}>
                <td
                  className="border border-[#f6f6f6] text-xs-medium h-10 text-text-tertiary align-top"
                  rowSpan={2}
                >
                  {hour}
                </td>

                {filteredScheduleTable.map((dayData, index) => {
                  const count = dayData.scheduleCount[slotIndex]
                  const hhmm = `${hour}:00`
                  const beforeHhmm =
                    hour >= 1
                      ? `${String(hour - 1).padStart(2, '0')}:30`
                      : '00:00'

                  // ▼ dayOfWeek, hhmm이 selectedSchedules에 있는지 체크
                  const isSelected =
                    newSchedules?.some(
                      (schedule) =>
                        schedule.day === dayData.dayOfWeek &&
                        (schedule.hhmm === hhmm ||
                          schedule.hhmm === beforeHhmm),
                    ) ?? false

                  return (
                    <td
                      key={[dayData.dayOfWeek, slotIndex].join('-')}
                      data-cy={`schedule-${index}`}
                      // ▼ isSelected면 빨간색, 아니면 기존 로직
                      className={`border border-[#f6f6f6] text-sm w-[54px] h-[34px] align-middle cursor-pointer
                        ${
                          isSelected
                            ? 'bg-bg-tertiary text-text-interactive-inverse text-xs-medium'
                            : count > 0
                              ? 'bg-bg-primary text-text-secondary text-xs-medium'
                              : 'bg-bg-secondary text-text-secondary text-xs-medium'
                        }
                      `}
                      onClick={() =>
                        handleSchedule(dayData.dayOfWeek, hhmm, isSelected)
                      }
                    >
                      {count}명
                    </td>
                  )
                })}
              </tr>
            )

            const secondRow = (
              <tr key={`${hour}-second`}>
                {filteredScheduleTable.map((dayData) => {
                  const count = dayData.scheduleCount[secondSlotIndex]
                  const hhmm = `${hour}:30`

                  const beforeHhmm = `${hour}:00`

                  // ▼ dayOfWeek, hhmm이 selectedSchedules에 있는지 체크
                  const isSelected =
                    newSchedules?.some(
                      (schedule) =>
                        schedule.day === dayData.dayOfWeek &&
                        (schedule.hhmm === hhmm ||
                          schedule.hhmm === beforeHhmm),
                    ) ?? false

                  return (
                    <td
                      key={[dayData.dayOfWeek, secondSlotIndex].join('-')}
                      className={`border border-[#f6f6f6] text-sm w-[54px] h-[34px] align-middle cursor-pointer
                        ${
                          isSelected
                            ? 'bg-bg-tertiary text-text-interactive-inverse text-xs-medium'
                            : count > 0
                              ? 'bg-bg-primary text-text-secondary text-xs-medium'
                              : 'bg-bg-secondary text-text-secondary text-xs-medium'
                        }
                      `}
                      onClick={() =>
                        handleSchedule(dayData.dayOfWeek, hhmm, isSelected)
                      }
                    >
                      {count}명
                    </td>
                  )
                })}
              </tr>
            )

            return (
              <React.Fragment key={hour}>
                {firstRow}
                {secondRow}
              </React.Fragment>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ScheduleTable
