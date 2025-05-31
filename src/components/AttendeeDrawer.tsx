import BottomDrawer from '@/components/BottomDrawer'
import { convertEngDayToKorDay, getAddMinuteHhmm } from '@/utils'
import { DaysType } from '@/api/type'
import Button from './Button'

type Attendee = {
  name: string
  age: number
}

type ScheduleParamsType = {
  dayOfWeek: string
  hhmm: string
  isSelected: boolean
}

interface AttendeeDrawerProps {
  isOpen: boolean
  onClose: () => void
  scheduleParams: ScheduleParamsType
  scheduleData?: Attendee[]
  handleAttendeeSchedules: (day: DaysType, hhmm: string) => void
  handleRemoveAttendeeSchedules: (day: DaysType, hhmm: string) => void
}

export default function AttendeeDrawer({
  isOpen,
  onClose,
  scheduleParams,
  scheduleData,
  handleAttendeeSchedules,
  handleRemoveAttendeeSchedules,
}: AttendeeDrawerProps) {
  const { dayOfWeek, hhmm, isSelected } = scheduleParams

  return (
    <BottomDrawer isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4 items-center h-[249px] overflow-auto">
        {/* Drawer 상단 영역 */}
        <div className="text-left w-full h-10 px-4 border-b border-[#f6f6f6] flex items-center text-s-semibold text-text-secondary">
          ({convertEngDayToKorDay(dayOfWeek)}) {hhmm}-{' '}
          {getAddMinuteHhmm(hhmm, 30)}
        </div>

        {/* 수강생 목록 */}
        <div className="grid grid-cols-2 px-6">
          {scheduleData?.map((attendee, index) => (
            <div
              // 중복 데이터가 발생하는 현상이 있어 key 변경
              key={[attendee.name, attendee.age, index].join('-')}
              className="flex gap-2 w-[171px] h-9"
            >
              <span className="text-m-bold text-text-primary">
                {attendee.name}
              </span>
            </div>
          ))}
        </div>

        <div className="flex gap-4 w-full fixed bottom-5 max-w-[357px]">
          <Button
            data-cy="close-schedule-button"
            aria-label="close-schedule-button"
            onClick={() => onClose()}
            className="w-full h-[54px] flex justify-center items-center rounded-2xl bg-bg-secondary text-text-secondary text-l-semibold"
          >
            닫기
          </Button>
          <Button
            data-cy="add-schedule-button"
            aria-label="add-schedule-button"
            className="w-full h-[54px] flex justify-center items-center rounded-2xl bg-bg-tertiary text-[#F1F8F3] text-l-semibold"
            onClick={() => {
              !isSelected
                ? handleAttendeeSchedules(dayOfWeek as DaysType, hhmm)
                : handleRemoveAttendeeSchedules(dayOfWeek as DaysType, hhmm),
                onClose()
            }}
          >
            {isSelected ? '삭제하기' : '추가하기'}
          </Button>
        </div>
      </div>
    </BottomDrawer>
  )
}
