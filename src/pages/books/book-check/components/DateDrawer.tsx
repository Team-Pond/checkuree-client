import BottomDrawer from '@/components/BottomDrawer'
import Calendar from '@/components/Calendar'
import { useState } from 'react'
import tw from 'tailwind-styled-components'

type DateDrawerProps = {
  open: boolean
  onClose: () => void
  handleCurrentDay: (date: Date) => void
  saveButtonText?: string
}
export default function DateDrawer({
  onClose,
  open = false,
  handleCurrentDay,
  saveButtonText = '이동하기',
}: DateDrawerProps) {
  const [selectedDay, setSelectedDay] = useState<Date>(new Date())
  const handleDay = (date: Date) => {
    setSelectedDay(date)
  }
  return (
    <BottomDrawer isOpen={open} onClose={onClose}>
      {open && <Calendar className="mx-auto" handleCurrentDay={handleDay} />}
      <div className="flex gap-4 w-full">
        <Button type="button" onClick={onClose} className=" bg-bg-secondary">
          <span className="text-text-secondary text-l-semibold select-none">
            취소
          </span>
        </Button>
        <Button
          type="button"
          className={'bg-bg-tertiary'}
          onClick={() => {
            handleCurrentDay(selectedDay)
            onClose()
          }}
        >
          <span className="text-[#F1F8F3] text-l-semibold select-none">
            {saveButtonText}
          </span>
        </Button>
      </div>
    </BottomDrawer>
  )
}

const Button = tw.button`w-full h-[54px] flex justify-center items-center rounded-2xl`
