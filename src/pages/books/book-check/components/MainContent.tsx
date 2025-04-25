import { useRecordCreate, useRecordUpdate, useStatusUpdate } from '../queries'
import React, { useMemo, useState } from 'react'
import { ConfirmModal } from './ConfirmModal'
import ModifyRecordTimeModal from './ModifyRecordTimeModal'

import useModalStore from '@/store/dialogStore'
import NeedLessonTable from './NeedLessonTable'
import NoNeedLessonTable from './NoNeedLessonTable'
import tw from 'tailwind-styled-components'
import useFormDataStore from '@/store/recordStore'
import {
  ScheduleData,
  ScheduleDataContentType,
  ScheduleDataType,
  STATUS,
} from '@/api/type'
import { useQueryClient } from '@tanstack/react-query'
import { bookKeys } from '@/queryKeys'

type MainContentsProps = {
  bookSchedules: ScheduleDataType
  bookId: number
  currentDate: string
  checkedScheduleCount: number
  setCheckedCount: (count: number) => void
}

const CANCLE_CHECK = '출석체크를 취소하시겠어요?'
const ATTEND_CHECK = '출석상태로 변경하시겠어요?'
const ABSENT_CHECK = '결석상태로 변경하시겠어요?'

function MainContents(props: MainContentsProps) {
  const openModal = useModalStore((state) => state.openModal)

  const {
    bookId,
    bookSchedules,
    currentDate,
    checkedScheduleCount,
    setCheckedCount,
  } = props

  const [record, setRecord] = useState({
    id: 0,
    formattedTime: '',
  })

  const { formData, setFormData } = useFormDataStore()

  // 출석체크
  const { mutate: recordCreate } = useRecordCreate({
    bookId,
    currentDate,
  })

  //
  const { mutate: statusMutation } = useStatusUpdate({ bookId, currentDate })

  // 출석시간 변경
  const { mutate: recordUpdate } = useRecordUpdate({
    bookId: Number(bookId),
    recordId: Number(record.id),
    formattedTime: `${formData?.hour}:${formData?.minute}`,
    currentDate: currentDate,
  })

  // 출석체크 화면의 체크 인원 수 변경
  const handleCheckedCountChange = ({
    schedule,
    targetStatus,
  }: {
    schedule: ScheduleData
    targetStatus: Omit<STATUS, 'PENDING'>
  }) => {
    if (!schedule.recordId) {
      setCheckedCount(checkedScheduleCount + 1)
      return
    }
    const currentStatus = schedule.recordStatus

    const adjustment =
      currentStatus === targetStatus ? -1 : currentStatus === 'PENDING' ? 1 : 0
    setCheckedCount(checkedScheduleCount + adjustment)
  }

  // 출석체크 상태 변경
  const handleStatusChange = ({
    schedule,
    targetStatus,
    startTime,
  }: {
    schedule: ScheduleData
    targetStatus: Omit<STATUS, 'PENDING'>
    startTime?: string
  }) => {
    // 출석 기록이 없는 경우 출석 기록 생성
    if (!schedule.recordId) {
      recordCreate({
        attendeeId: schedule.attendeeId,
        scheduleId: schedule.scheduleId,
        status: targetStatus as STATUS,
        startTime: startTime,
      })
      return
    }
    // 이미 출석인 경우 다시 누르면 PENDING 상태로 수정
    if (schedule.recordStatus === targetStatus) {
      statusMutation({
        recordId: schedule.recordId,
        scheduleId: schedule.scheduleId,
        status: 'PENDING',
        startTime: startTime,
      })
      return
    } else {
      // 출석 상태를 targetStatus로 변경
      statusMutation({
        recordId: schedule.recordId,
        scheduleId: schedule.scheduleId,
        status: targetStatus as STATUS,
        startTime: startTime,
      })
    }
  }

  console.log(bookSchedules)

  const computedLessonData = useMemo(() => {
    if (!bookSchedules?.content) {
      return {
        computedNeedLessonStudents: [],
        computedNoNeedLessonTimeScheduleTable: [],
      }
    }

    const tempNeedLessonStudents: ScheduleData[] = []
    const tempNoNeedLessonTimeScheduleTable: ScheduleDataContentType = []

    // bookSchedules.content의 변경을 감지
    bookSchedules.content.forEach((content) => {
      const beforeLessonStudents = content.schedules.filter(
        (schedule) => schedule.recordStatus === 'ATTEND' && !schedule.isTaught,
      )
      const noNeedToLessonSchedules = content.schedules.filter(
        (schedule) => schedule.recordStatus !== 'ATTEND' || schedule.isTaught,
      )

      tempNeedLessonStudents.push(...beforeLessonStudents)
      tempNoNeedLessonTimeScheduleTable.push({
        ...content,
        schedules: noNeedToLessonSchedules,
      })
    })

    tempNeedLessonStudents.sort((a, b) =>
      a.recordTime > b.recordTime ? 1 : -1,
    )

    return {
      computedNeedLessonStudents: tempNeedLessonStudents,
      computedNoNeedLessonTimeScheduleTable: tempNoNeedLessonTimeScheduleTable,
    }
  }, [bookSchedules]) // bookSchedules를 의존성 배열에 추가

  const handleAttendanceStatusWithConfirmation = (
    targetStatus: Omit<STATUS, 'PENDING'>,
    schedule: ScheduleData,
    startTime?: string,
  ) => {
    // targetStatus에 따라 메시지를 즉시 결정
    const message =
      schedule.recordStatus === targetStatus
        ? CANCLE_CHECK
        : targetStatus === 'ATTEND'
          ? ATTEND_CHECK
          : ABSENT_CHECK

    // 출석기록이 이미 있는 경우 확인 메시지 출력
    if (schedule.recordStatus !== 'PENDING') {
      openModal(<ConfirmModal message={message} />, () => {
        handleCheckedCountChange({ schedule, targetStatus })
        handleStatusChange({ schedule, targetStatus })
      })
      return
    }
    // 출석기록이 없는 경우 바로 상태 변경
    handleCheckedCountChange({ schedule, targetStatus })
    handleStatusChange({ schedule, targetStatus, startTime })
  }

  const openModifyRecordTimeModal = (schedule: ScheduleData) => {
    if (schedule.recordStatus === 'ATTEND') {
      setRecord({ id: schedule.recordId, formattedTime: schedule.recordTime })
      setFormData({
        hour: schedule.recordTime.split(':')[0],
        minute: schedule.recordTime.split(':')[1],
      })
      openModal(
        <ModifyRecordTimeModal />,
        () => {
          recordUpdate()
        },
        () => {
          setFormData({ hour: '', minute: '' })
        },
      )
    }
  }

  return (
    <MainContentWrapper>
      {/* 수업중인 학생들 */}
      <NeedLessonTable
        needLessonStudents={computedLessonData.computedNeedLessonStudents}
        bookId={Number(bookId)}
        handleAttendanceStatusWithConfirmation={
          handleAttendanceStatusWithConfirmation
        }
        currentDate={currentDate}
        openModifyRecordTimeModal={openModifyRecordTimeModal}
      />

      {/* 수업중이 아닌 학생들 */}
      <NoNeedLessonTable
        noNeedLessonTimeScheduleTable={
          computedLessonData.computedNoNeedLessonTimeScheduleTable
        }
        currentDate={currentDate}
        bookId={Number(bookId)}
        handleAttendanceStatusWithConfirmation={
          handleAttendanceStatusWithConfirmation
        }
        openModifyRecordTimeModal={openModifyRecordTimeModal}
      />
      <div className="mt-[92px]" />
    </MainContentWrapper>
  )
}

export default React.memo(MainContents)

const MainContentWrapper = tw.div`w-full flex flex-col gap-4 justify-center items-center py-3 px-4 scrollbar-hide custom-scrollbar-hide`
