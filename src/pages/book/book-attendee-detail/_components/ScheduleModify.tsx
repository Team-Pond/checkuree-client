import { useNavigate, useParams } from 'react-router-dom'
import ScheduleModifyDetail from './modify_components/ScheduleModifyDetail'

import { useEffect, useState } from 'react'

import { useAttendeeDetail } from '../queries'
import SEO from '@/components/SEO'

import { UpdateAttendeeScheduleRequest } from '@/api/AttendeeSchema'
import { useOnlyScheduleUpdate } from '../../book-attendee/attendee-create/queries'
import Button from '@/components/Button'
import FormHeader from '../../_components/FormHeader'

export default function ScheduleModify() {
  const { bookId, attendeeId } = useParams()
  const navigate = useNavigate()

  const attendeeDetail = useAttendeeDetail({
    bookId: Number(bookId),
    attendeeId: Number(attendeeId),
  })

  const [attendeeSchedules, setAttendeeSchedules] =
    useState<UpdateAttendeeScheduleRequest>()

  const { mutate: scheduleMutation } = useOnlyScheduleUpdate({
    paramBookId: Number(bookId),
    attendeeId: Number(attendeeId),
    attendeeSchedules: attendeeSchedules!,
  })

  useEffect(() => {
    if (attendeeDetail.data) {
      setAttendeeSchedules({
        schedules: attendeeDetail.data.schedules.map((schedule) => ({
          day: schedule.day,
          hhmm: schedule.time.substring(0, 5),
        })),
      })
    }
  }, [attendeeDetail?.data])

  return (
    <form className="flex flex-col gap-7 w-full">
      <SEO
        title="체쿠리 | 스케줄 변경"
        content="체쿠리 음악학원 출석부 서비스의 스케줄 변경 페이지입니다."
      />
      <FormHeader isStep2={false} text="클래스 수정" />

      <div className="w-full flex flex-col gap-10 items-center px-6">
        <div className="flex w-full justify-center">
          <div className="flex flex-col justify-center gap-6 w-full">
            <ScheduleModifyDetail
              setAttendeeSchedules={setAttendeeSchedules}
              attendeeSchedules={attendeeSchedules!}
            />
            <div className="flex gap-4 w-full">
              <Button
                onClick={() => navigate(-1)}
                className="w-full h-[54px] flex justify-center items-center rounded-2xl bg-bg-secondary text-text-secondary text-l-semibold"
              >
                이전으로
              </Button>
              <Button
                onClick={() => {
                  scheduleMutation()
                  navigate(-1)
                }}
                className="w-full h-[54px] flex justify-center items-center rounded-2xl bg-bg-tertiary text-[#F1F8F3] text-l-semibold"
              >
                저장하기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
