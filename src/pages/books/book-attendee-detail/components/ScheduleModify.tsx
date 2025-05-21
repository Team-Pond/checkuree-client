import { useNavigate, useParams } from 'react-router-dom'
import ScheduleModifyDetail from './modify_components/ScheduleModifyDetail'
import { useOnlyScheduleUpdate } from '../../../attendee-create/queries'
import { useEffect, useState } from 'react'
import { UpdateAttendeeScheduleRequest } from '../../../../api/AttendeeSchema'
import { useAttendeeDetail } from '../queries'
import SEO from '@/components/SEO'
import FieldTitle from '@/components/FieldTitle'

export const ScheduleModify = () => {
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
      <div className="w-full h-[64px] flex items-center justify-between px-4 py-5">
        <p className="font-bold text-text-primary text-[22px]">클래스 수정</p>
        <img
          src="/images/icons/book-create/ico-close.svg"
          alt="닫기 아이콘"
          width={32}
          height={32}
          onClick={() => navigate(-1)}
        />
      </div>

      <div className="w-full flex flex-col gap-10 items-center">
        <div className="flex gap-2 w-full justify-center">
          <hr className="border-[2px] border-bg-tertiary max-w-[356px] w-full rounded-full" />
        </div>

        <div className="flex flex-col w-full max-w-[342px] ">
          <div className="flex flex-col justify-center gap-6 w-full">
            <ScheduleModifyDetail
              setAttendeeSchedules={setAttendeeSchedules}
              attendeeSchedules={attendeeSchedules!}
            />
            <div>
              <div className="flex justify-between">
                <FieldTitle title="변경 일자" essential />
                <div className="text-text-brand text-s-bold">
                  오늘부터 시작하기
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <input
                  data-cy="name-input"
                  aria-label="name-input"
                  type="text"
                  placeholder="YYYY.MM.DD"
                  className="max-w-[167px] text-s-bold bg-white w-full h-12 border border-[#E7E7E7] rounded-xl p-4 outline-none text-text-secondary"
                />
                <span className="ml-2 text-s-bold">
                  부터 일정이 변경됩니다.
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-4 w-full mt-20">
            <button
              type="button"
              onClick={() => {
                navigate(-1)
              }}
              className="w-full h-[54px] flex justify-center items-center rounded-2xl bg-bg-secondary text-text-secondary text-l-semibold"
            >
              이전으로
            </button>
            <button
              onClick={() => {
                scheduleMutation()
                navigate(-1)
              }}
              type="button"
              className="w-full h-[54px] flex justify-center items-center rounded-2xl bg-bg-tertiary text-[#F1F8F3] text-l-semibold"
            >
              저장하기
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
