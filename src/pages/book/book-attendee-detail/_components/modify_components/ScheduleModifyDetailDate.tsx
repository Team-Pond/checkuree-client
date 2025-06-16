import FieldTitle from '@/components/FieldTitle'
import dayjs from 'dayjs'

interface ScheduleModifyDetailDateProps {
  selectedDate: dayjs.Dayjs
  handleDrawer: () => void
  onClickStartToday: () => void
}
export default function ScheduleModifyDetailDate({
  selectedDate,
  handleDrawer,
  onClickStartToday,
}: ScheduleModifyDetailDateProps) {
  return (
    <div>
      <div className="flex justify-between">
        <FieldTitle title="변경 일자" essential />
        <div
          className="text-text-brand text-s-bold cursor-pointer"
          onClick={onClickStartToday}
        >
          오늘부터 시작하기
        </div>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <input
          data-cy="name-input"
          value={selectedDate.format('YYYY.MM.DD')}
          readOnly
          onClick={handleDrawer}
          aria-label="name-input"
          type="text"
          placeholder="YYYY.MM.DD"
          className="max-w-[167px] text-s-bold bg-white w-full h-12 border border-[#E7E7E7] rounded-xl p-4 outline-none text-text-secondary cursor-pointer"
        />
        <span className="ml-2 text-s-bold">부터 일정이 변경됩니다.</span>
      </div>
    </div>
  )
}
