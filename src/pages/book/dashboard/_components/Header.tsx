import ScheduleIcon from '@/assets/icons/dashboard/ico-schedule.svg?react'
import { useNavigate } from 'react-router-dom'

export function Header({ bookName }: { bookName: string }) {
  const navigate = useNavigate()
  return (
    <div className="w-full h-[64px] flex items-center justify-between px-4 py-5">
      <p
        onClick={() => navigate('/book')}
        className="font-bold text-text-primary text-[22px] cursor-pointer"
      >
        {bookName}
      </p>
      <ScheduleIcon width={40} height={40} className="mt-1" />
    </div>
  )
}
