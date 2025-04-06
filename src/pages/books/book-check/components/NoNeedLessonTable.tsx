import tw from 'tailwind-styled-components'
import { scheduleCheckformatTime } from '@/utils'
import LessonRow from './LessonRow'
import { ScheduleData, ScheduleDataContentType } from '@/api/type'
import React from 'react'

interface IProps {
  noNeedLessonTimeScheduleTable: ScheduleDataContentType
  bookId: number
  handleAttendanceStatusWithConfirmation: (
    targetStatus: 'ATTEND' | 'ABSENT',
    schedule: ScheduleData,
  ) => void
  currentDate: string

  openModifyRecordTimeModal: (schedule: ScheduleData) => void
}
export default function NoNeedLessonTable(props: IProps) {
  const {
    noNeedLessonTimeScheduleTable,
    bookId,
    handleAttendanceStatusWithConfirmation,
    openModifyRecordTimeModal,
    currentDate,
  } = props

  return (
    <React.Fragment>
      {noNeedLessonTimeScheduleTable?.map((content, index) => {
        return (
          content.schedules.length > 0 && (
            <LessonContainer key={[content.schedules, index].join('-')}>
              <LessonStatusTime>
                {scheduleCheckformatTime(content.startTime)}
              </LessonStatusTime>

              {content.schedules.map((schedule, index) => (
                <LessonRow
                  key={[schedule.scheduleId, index].join('-')}
                  schedule={schedule}
                  bookId={bookId}
                  handleAttendanceStatusWithConfirmation={
                    handleAttendanceStatusWithConfirmation
                  }
                  openModifyRecordTimeModal={openModifyRecordTimeModal}
                  currentDate={currentDate}
                />
              ))}
            </LessonContainer>
          )
        )
      })}
    </React.Fragment>
  )
}

const LessonContainer = tw.div`w-full text-left rounded-2xl bg-white px-6 pt-1 flex flex-col`
const LessonStatusTime = tw.p`text-[#5d5d5d] text-s-bold h-12 flex items-center`
