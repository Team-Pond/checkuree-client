import PageContainer from '@/components/PageContainer'
import AttendanceRateChart from './components/AttendanceRateChart'
import LeftArrowIcon from '@/assets/icons/ico-arrow-left.svg?react'
import RightArrowIcon from '@/assets/icons/ico-arrow-right.svg?react'
import DownArrowIcon from '@/assets/icons/ico-arrow-down.svg?react'
import AttendanceCategoryChart from './components/AttendanceCategoryChart'
import ScheduleIcon from '@/assets/icons/dashboard/ico-schedule.svg?react'
import Bottom from '../components/Bottom'
import { useParams, useSearchParams } from 'react-router-dom'
import { useAttendeeStatistic, useBookStatistic } from '../queries'
import dayjs from 'dayjs'
import { useCallback, useState } from 'react'
import { AttendeeStatisticsType, PeriodType } from '@/api/type'
import DateDrawer from '../book-check/components/DateDrawer'

export default function Dashboard() {
  const [searchParmas] = useSearchParams()

  const bookName = searchParmas.get('bookName')
  const { bookId } = useParams()
  const [attendRateTab, setAttendRateTab] = useState<PeriodType>('DAILY')
  const [categoryTab, setCategoryTab] = useState<AttendeeStatisticsType>('DAY')

  const [currentDate, setCurrentDate] = useState(dayjs()) // dayjs로 초기화
  const handlePreviousDay = () => {
    setCurrentDate((prev) => prev.subtract(1, 'day'))
  }
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)
  const handleNextDay = () => {
    setCurrentDate((prev) => prev.add(1, 'day'))
  }

  const handleCurrentDay = useCallback((date: Date) => {
    setCurrentDate(dayjs(date))
  }, [])

  const formattedDate = currentDate.format('YYYY-MM-DD')
  const displayDate = currentDate.locale('ko').format('M월 D일')

  const { data: statisticData } = useBookStatistic(Number(bookId), {
    from: dayjs(currentDate).format('YYYY-MM-DD'),
    periodType: attendRateTab,
  })

  const { data: statisticAttendeeData } = useAttendeeStatistic(Number(bookId), {
    type: categoryTab,
  })

  return (
    <PageContainer>
      <div className="w-full h-[64px] flex items-center justify-between px-4 py-5">
        <p className="font-bold text-text-primary text-[22px]">{bookName}</p>
        <ScheduleIcon width={40} height={40} className="mt-1" />
      </div>
      {/* Calendar */}
      <div className="w-full flex h-10 justify-between items-center px-4 border-b border-bg-disabled">
        <LeftArrowIcon
          width={12}
          height={12}
          onClick={handlePreviousDay}
          className="cursor-pointer"
        />
        <div
          className="flex items-center cursor-pointer select-none"
          onClick={() => setOpenDrawer(true)}
        >
          <p className="text-xl font-bold" data-value={formattedDate}>
            {displayDate}
          </p>
          <DownArrowIcon width={40} height={40} />
        </div>
        <RightArrowIcon
          width={12}
          height={12}
          onClick={handleNextDay}
          className="cursor-pointer"
        />
      </div>
      <main className="w-full flex-1 bg-bg-secondary flex flex-col gap-4 p-4">
        <AttendanceRateChart
          statisticData={statisticData!}
          currentDate={currentDate}
          tabChange={(tab: PeriodType) => setAttendRateTab(tab)}
          tab={attendRateTab}
        />

        <AttendanceCategoryChart
          statisticData={statisticAttendeeData!}
          tabChange={(tab: AttendeeStatisticsType) => setCategoryTab(tab)}
          tab={categoryTab}
        />

        <div className="h-[92px]" />
      </main>
      <DateDrawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        handleCurrentDay={handleCurrentDay}
      />
      <Bottom />
    </PageContainer>
  )
}
