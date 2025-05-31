import { PeriodType } from '@/api/type'
import Button from '@/components/Button'
import { twMerge } from 'tailwind-merge'

type PeriodButtonsProps = {
  timeStatus: PeriodType
  handleTimeStatus: (timeStatus: PeriodType) => void
}
const BUTTON_OPTIONS = [
  {
    status: 'DAILY',
    type: '일간',
  },
  {
    status: 'WEEKLY',
    type: '주간',
  },
  {
    status: 'MONTHLY',
    type: '월간',
  },
]
export default function PeriodButtons({
  timeStatus,
  handleTimeStatus,
}: PeriodButtonsProps) {
  return (
    <div className="flex">
      {BUTTON_OPTIONS.map((option) => {
        return (
          <PeriodButton
            key={option.status}
            timeStatus={timeStatus}
            handleTimeStatus={handleTimeStatus}
            status={option.status as PeriodType}
            type={option.type}
          />
        )
      })}
    </div>
  )
}

function PeriodButton({
  timeStatus,
  handleTimeStatus,
  status,
  type,
}: PeriodButtonsProps & { status: PeriodType; type: string }) {
  return (
    <Button
      onClick={() => handleTimeStatus(status)}
      className={twMerge(
        'w-[57px] h-[33px] rounded-lg',
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
    </Button>
  )
}
