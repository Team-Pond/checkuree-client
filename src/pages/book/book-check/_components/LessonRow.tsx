import useLongPress from '@/pages/book/book-check/hook/useLongPress'
import useModalStore from '@/store/dialogStore'
import tw from 'tailwind-styled-components'
import ConfirmModal from './ConfirmModal'
import { formatLocalTimeString } from '@/utils'
import { twMerge } from 'tailwind-merge'
import { useLessonUpdate, useRecordDelete } from '../queries'
import { ScheduleData } from '@/api/type'
import NoteActiveIcon from '@/assets/icons/book-check/ico-note-active.svg?react'
import NoteIcon from '@/assets/icons/book-check/ico-note.svg?react'
import React from 'react'
import Button from '@/components/Button'

type LessonRowProps = {
  bookId: number
  schedule: ScheduleData
  handleAttendanceStatusWithConfirmation: (
    targetStatus: 'ATTEND' | 'ABSENT',
    schedule: ScheduleData,
    startTIme?: string,
  ) => void
  openModifyRecordTimeModal: (schedule: ScheduleData) => void
  currentDate: string
  startTime?: string
}
function LessonRow(props: LessonRowProps) {
  const {
    bookId,
    schedule,
    handleAttendanceStatusWithConfirmation,
    openModifyRecordTimeModal,
    currentDate,
    startTime,
  } = props
  const { mutate: lessonMutation } = useLessonUpdate({
    bookId,
    currentDate,
  })

  const { mutate: deleteRecord } = useRecordDelete(bookId, currentDate)
  const openModal = useModalStore((state) => state.openModal)
  const onLongPress = () => {
    openModal(
      <ConfirmModal message="보강기록을 삭제하시겠습니까?" />,
      () =>
        deleteRecord({
          attendanceBookId: bookId,
          recordId: schedule.recordId,
        }),
      () => {},
      { text: '삭제하기', color: 'bg-bg-interactive-destructive' },
    )
  }

  const deleteRecordHandlers = useLongPress(
    () => schedule.isMakeup && onLongPress(),
    () => openModifyRecordTimeModal(schedule),
    { delay: 300 },
  )

  return (
    <LessonWrapper key={schedule.scheduleId}>
      <div
        className="flex flex-col items-start select-none"
        {...deleteRecordHandlers}
      >
        <p className="font-bold text-text-primary max-w-[78px] overflow-hidden text-ellipsis whitespace-nowrap">
          {schedule.name}
          {schedule.isMakeup && (
            <span className="text-[#EC9E14] text-xs-medium align-middle">
              {' '}
              보강
            </span>
          )}
        </p>
        {schedule.recordStatus === 'ATTEND' && (
          <p className="text-[12px] text-[#59996B] font-medium leading-[14.98px]">
            {formatLocalTimeString(schedule.recordTime) + ' 출석'}
          </p>
        )}
      </div>
      <div className="flex gap-4">
        <div className="flex gap-2">
          <Button
            onClick={() => {
              handleAttendanceStatusWithConfirmation(
                'ABSENT',
                schedule,
                startTime,
              )
            }}
            className={twMerge(
              'rounded-lg text-sm w-[57px] h-[33px] flex items-center justify-center',
              schedule.recordStatus === 'ABSENT'
                ? 'bg-bg-destructive text-text-interactive-destructive'
                : 'bg-bg-disabled text-text-disabled',
            )}
            label="결석"
          />
          <Button
            onClick={() => {
              handleAttendanceStatusWithConfirmation(
                'ATTEND',
                schedule,
                startTime,
              )
            }}
            className={twMerge(
              'rounded-lg text-sm w-[57px] h-[33px] flex items-center justify-center',
              schedule.recordStatus === 'ATTEND'
                ? 'bg-bg-primary text-text-interactive-primary'
                : 'bg-bg-disabled text-text-disabled',
            )}
            label="출석"
          />
        </div>

        <Button
          className={twMerge(
            'w-8 h-8 flex items-center justify-center rounded-lg',
            schedule.recordStatus !== 'ATTEND'
              ? 'bg-bg-disabled'
              : schedule.isTaught
                ? 'bg-bg-tertiary'
                : 'bg-bg-base', // recordStatus === "ATTEND" && isTaught === false 인 경우 bg-bg-base 맞나 ?
          )}
          onClick={() => {
            lessonMutation({
              recordId: schedule.recordId,
              isTaught: !schedule.isTaught,
            })
          }}
          disabled={schedule.recordStatus !== 'ATTEND'}
          children={schedule.isTaught ? <NoteActiveIcon /> : <NoteIcon />}
        />
      </div>
    </LessonWrapper>
  )
}

const LessonWrapper = tw.div`w-full h-[56px] flex items-center justify-between px-2`

export default React.memo(LessonRow)
