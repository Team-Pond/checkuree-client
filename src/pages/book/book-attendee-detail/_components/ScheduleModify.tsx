import { useNavigate, useParams } from 'react-router-dom'
import ScheduleModifyDetail from './modify_components/ScheduleModifyDetail'
import React, { useCallback, useEffect, useState } from 'react'
import { UpdateAttendeeScheduleRequest } from '../../../../api/AttendeeSchema'
import { useAttendeeDetail } from '../queries'
import SEO from '@/components/SEO'

import ScheduleModifyDetailDate from './modify_components/ScheduleModifyDetailDate'
import dayjs from 'dayjs'
import useModalStore from '@/store/dialogStore'
import { dayMap } from '@/api/type'
import ConfirmModal from '../../book-check/_components/ConfirmModal'
import DateDrawer from '../../book-check/_components/DateDrawer'
import { useOnlyScheduleUpdate } from '../../book-attendee/attendee-create/queries'
import tw from 'tailwind-styled-components'
import FormHeader from '../../_components/FormHeader'
import Button from '@/components/Button'
import { twMerge } from 'tailwind-merge'

const weekDaySorter: Record<string, number> = {
  월: 1,
  화: 2,
  수: 3,
  목: 4,
  금: 5,
  토: 6,
  일: 7,
}

export default function ScheduleModify() {
  const { bookId, attendeeId } = useParams()
  const navigate = useNavigate()
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)
  const [selectedDate, setSelectedDate] = useState(dayjs()) // dayjs로 초기화
  const openModal = useModalStore((state) => state.openModal)
  const attendeeDetail = useAttendeeDetail({
    bookId: Number(bookId),
    attendeeId: Number(attendeeId),
  })

  const [attendeeSchedules, setAttendeeSchedules] =
    useState<Omit<UpdateAttendeeScheduleRequest, 'appliedFrom'>>()

  const handleCurrentDay = useCallback((date: Date) => {
    setSelectedDate(dayjs(date))
  }, [])

  const { mutate: scheduleMutation } = useOnlyScheduleUpdate({
    paramBookId: Number(bookId),
    attendeeId: Number(attendeeId),
    attendeeSchedules: {
      schedules: attendeeSchedules?.schedules!,
      appliedFrom: selectedDate.format('YYYY-MM-DD'),
    },
  })

  const onClickStartToday = () => {
    setSelectedDate(dayjs())
  }

  const beforeDate = dayjs(
    attendeeDetail.data?.futureSchedules?.appliedFrom ||
      attendeeDetail.data?.schedules.appliedFrom,
  )

  useEffect(() => {
    const data = attendeeDetail.data
    if (data) {
      setAttendeeSchedules({
        schedules: data.schedules.schedules.map((schedule) => ({
          day: schedule.day,
          hhmm: schedule.time.substring(0, 5),
        })),
      })

      if (data.futureSchedules) {
        setSelectedDate(
          dayjs(
            data.futureSchedules.appliedFrom || data.schedules.appliedFrom,
            'YYYY-MM-DD',
          ),
        )
      }
    }
  }, [attendeeDetail?.data])

  return (
    <React.Fragment>
      <SEO
        title="체쿠리 | 스케줄 변경"
        content="체쿠리 음악학원 출석부 서비스의 스케줄 변경 페이지입니다."
      />
      <FormHeader text="클래스 수정" />
      <Form className="mt-10 px-[17px] pb-[30px]">
        <div className="flex flex-col w-full">
          <div className="flex flex-col justify-center gap-6 w-full">
            <ScheduleModifyDetail
              setAttendeeSchedules={setAttendeeSchedules}
              attendeeSchedules={attendeeSchedules!}
              futureSchedules={attendeeDetail.data?.futureSchedules?.schedules}
            />
            <ScheduleModifyDetailDate
              selectedDate={selectedDate}
              onClickStartToday={onClickStartToday}
              handleDrawer={() => setOpenDrawer(true)}
            />
          </div>
          <div className="flex gap-4 w-full mt-20">
            <Button
              onClick={() => {
                navigate(-1)
              }}
              className="w-full h-[54px] flex justify-center items-center rounded-2xl bg-bg-secondary text-text-secondary text-l-semibold"
              label="이전으로"
            />
            <Button
              onClick={() =>
                openModal(
                  <ConfirmModal
                    className="text-center break-keep"
                    message={
                      <React.Fragment>
                        {selectedDate.format('M월 D일부터 일정을')} <br />
                        {Array.from(
                          new Set(
                            attendeeSchedules?.schedules.map(
                              (schedule) => dayMap[schedule.day],
                            ),
                          ),
                        )
                          .sort((a, b) => weekDaySorter[a] - weekDaySorter[b])
                          .map((day) => `(${day})`)
                          .join(', ')}
                        으로 저장하시겠습니까?
                        <br />
                        <span className="text-border-danger text-xs-semibold">
                          ({beforeDate.format('M월 D일')}에 적용 예정이던
                          스케쥴은 삭제됩니다)
                        </span>
                      </React.Fragment>
                    }
                  />,
                  () => {
                    scheduleMutation()
                    navigate(-1)
                  },
                )
              }
              label="저장하기"
              disabled={beforeDate.isSame(selectedDate, 'day')}
              className={twMerge(
                'w-full h-[54px] flex justify-center items-center rounded-2xl text-l-semibold',
                beforeDate.isSame(selectedDate, 'day')
                  ? 'bg-bg-interactive-disabled text-text-disabled'
                  : 'bg-bg-tertiary text-[#F1F8F3]',
              )}
            />
          </div>
        </div>
      </Form>
      <DateDrawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        handleCurrentDay={handleCurrentDay}
        saveButtonText="선택하기"
        value={beforeDate.toDate()}
      />
    </React.Fragment>
  )
}
const Form = tw.form`flex flex-col gap-10 w-full`
