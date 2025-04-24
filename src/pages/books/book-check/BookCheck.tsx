import Header from './components/Header'
import MainContents from './components/MainContent'

import { useCallback, useContext, useEffect, useState } from 'react'
import { BookContext } from '@/context/BookContext'
import { useParams, useSearchParams } from 'react-router-dom'
import dayjs from 'dayjs'
import Bottom from '../components/Bottom'
import { useBookSchedules } from './queries'
import { BottomAddRecord } from './components/BottomAddRecord'
import SEO from '@/components/SEO'
import DateDrawer from './components/DateDrawer'

export default function BookCheck() {
  const context = useContext(BookContext)
  const [searchParams] = useSearchParams()
  const { selectedBook } = context!
  const { bookId } = useParams()

  const bookName = searchParams.get('bookName')

  const [currentDate, setCurrentDate] = useState(dayjs()) // dayjs로 초기화
  const [checkedScheduleCount, setCheckedScheduleCount] = useState<number>(0)
  const [totalScheduleCount, setTotalScheduleCount] = useState<number>(0)
  const [openFilter, setOpenFilter] = useState<boolean>(false)
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)

  // 확인 모달창의 오픈 여부, 메시지 내용, 저장버튼 클릭 시 실행할 함수

  const formattedDate = currentDate.format('YYYY-MM-DD') // 데이터 값

  const onDrawerChange = useCallback(() => {
    setOpenFilter(!openFilter)
  }, [openFilter])

  const handlePreviousDay = () => {
    setCurrentDate((prev) => prev.subtract(1, 'day'))
  }

  const handleNextDay = () => {
    setCurrentDate((prev) => prev.add(1, 'day'))
  }

  const handleCurrentDay = useCallback((date: Date) => {
    setCurrentDate(dayjs(date))
  }, [])

  const { data: bookSchedules } = useBookSchedules({
    bookId: Number(bookId),
    formattedDate: formattedDate,
  })

  useEffect(() => {
    if (bookSchedules?.status === 200) {
      const scheduleData = bookSchedules.data

      setTotalScheduleCount(scheduleData.numberOfElements)
      const checkedCount = scheduleData.content.reduce((total, schedules) => {
        return (
          total +
          schedules.schedules.filter(
            (schedule) => schedule.recordStatus !== 'PENDING',
          ).length
        )
      }, 0)
      setCheckedScheduleCount(checkedCount)
    }
  }, [bookSchedules])

  return (
    <section className="flex flex-col w-full scrollbar-hide custom-scrollbar-hide bg-bg-secondary flex-1">
      <SEO
        title="체쿠리 | 출석부 출석"
        content="체쿠리 음악학원 출석부 서비스의 출석부 출석 페이지입니다."
      />
      <Header
        title={bookName || selectedBook?.title!}
        bookId={Number(bookId)}
        handlePreviousDay={handlePreviousDay}
        handleNextDay={handleNextDay}
        currentDate={currentDate}
        formattedDate={formattedDate}
        checkedScheduleCount={checkedScheduleCount}
        totalScheduleCount={totalScheduleCount}
        setOpenFilter={setOpenFilter}
        handleDrawer={() => setOpenDrawer(true)}
      />
      {bookSchedules?.status === 200 &&
      bookSchedules.data.content.length > 0 ? (
        <MainContents
          currentDate={formattedDate}
          bookId={Number(bookId!)}
          checkedScheduleCount={checkedScheduleCount}
          setCheckedCount={setCheckedScheduleCount}
        />
      ) : (
        <div className="flex items-center h-full justify-center mb-24 font-semibold text-text-disabled">
          오늘 등원한 학생이 없습니다.
        </div>
      )}

      <BottomAddRecord
        openFilter={openFilter}
        onDrawerChange={onDrawerChange}
        attendanceBookId={Number(bookId)}
        currentDate={currentDate.format('YYYY-MM-DD')}
      />
      <DateDrawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        handleCurrentDay={handleCurrentDay}
      />
      {!openFilter && <Bottom />}
    </section>
  )
}
