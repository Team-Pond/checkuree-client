import { AttendeeStatisticsType } from '@/api/type'
import React from 'react'
import { twMerge } from 'tailwind-merge'

type CategoryButtonsProps = {
  timeStatus: AttendeeStatisticsType
  handleTimeStatus: (timeStatus: AttendeeStatisticsType) => void
}
const BUTTON_OPTIONS = [
  {
    status: 'DAY',
    type: '요일',
  },
  {
    status: 'AGE',
    type: '나이',
  },
  {
    status: 'CURRICULUM',
    type: '커리큘럼',
  },
]
function CategoryButtons({
  timeStatus,
  handleTimeStatus,
}: CategoryButtonsProps) {
  return (
    <div className="flex">
      {BUTTON_OPTIONS.map((option) => {
        return (
          <Button
            key={option.status}
            timeStatus={timeStatus}
            handleTimeStatus={handleTimeStatus}
            status={option.status as AttendeeStatisticsType}
            type={option.type}
          />
        )
      })}
    </div>
  )
}

export default React.memo(CategoryButtons)

function Button({
  timeStatus,
  handleTimeStatus,
  status,
  type,
}: CategoryButtonsProps & { status: AttendeeStatisticsType; type: string }) {
  return (
    <button
      onClick={() => handleTimeStatus(status)}
      className={twMerge(
        'px-4 h-[33px] rounded-lg',
        timeStatus === status ? 'bg-bg-interactive-primary' : '',
      )}
    >
      <span
        className={twMerge(
          'text-[14px]',
          timeStatus === status
            ? 'text-text-interactive-primary-press'
            : 'text-text-interactive-secondary',
        )}
      >
        {type}
      </span>
    </button>
  )
}
