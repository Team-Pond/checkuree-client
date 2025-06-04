import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { DaysType, FutureScheduleType } from '@/api/type'
import { UpdateAttendeeScheduleRequest } from '@/api/AttendeeSchema'

import { getSub30MinuteHhmm } from '@/utils'

import ScheduleTable from '../ScheduleTable'
import AttendeeDrawer from '@/components/AttendeeDrawer'

import {
  useSchedule,
  useScheduleTable,
} from '@/pages/book/book-attendee/attendee-create/queries'

type ScheduleModifyDetailProps = {
  setAttendeeSchedules: React.Dispatch<
    React.SetStateAction<
      Omit<UpdateAttendeeScheduleRequest, 'appliedFrom'> | undefined
    >
  >
  attendeeSchedules: Omit<UpdateAttendeeScheduleRequest, 'appliedFrom'>
  futureSchedules?: FutureScheduleType[]
}

interface ScheduleParamsType {
  dayOfWeek: string
  hhmm: string
  isSelected: boolean
}

export default function ScheduleModifyDetail({
  setAttendeeSchedules,
  attendeeSchedules,
  futureSchedules,
}: ScheduleModifyDetailProps) {
  const { bookId } = useParams()

  const [scheduleParams, setScheduleParams] = useState<ScheduleParamsType>({
    dayOfWeek: '',
    hhmm: '',
    isSelected: false,
  })
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)
  const [attendeeOpenDrawer, setAttendeeOpenDrawer] = useState<boolean>(false)

  // Drawer 관련 핸들러들
  const handleAttendeeBottomDrawer = (open: boolean) =>
    setAttendeeOpenDrawer(open)
  const onAttendeeDrawerChange = () =>
    setAttendeeOpenDrawer(!attendeeOpenDrawer)

  // 스케줄 클릭 시 선택된 요일/시간 저장
  const handleSchedule = (
    dayOfWeek: string,
    hhmm: string,
    isSelected: boolean = false,
  ) => {
    setScheduleParams({ dayOfWeek, hhmm, isSelected })
    handleAttendeeBottomDrawer(true)
  }

  // bookId가 string일 수 있으므로 number로 변환하여 사용
  const attendanceBookIdNumber = Number(bookId)

  // 수강생 데이터
  const { data: scheduleData } = useSchedule(
    attendanceBookIdNumber,
    scheduleParams.dayOfWeek,
    scheduleParams.hhmm,
    !!(scheduleParams.dayOfWeek && scheduleParams.hhmm),
  )

  // 시간표 데이터
  const { data: scheduleTable } = useScheduleTable(attendanceBookIdNumber)

  useEffect(() => {
    if (openDrawer) {
      setAttendeeOpenDrawer(false)
    } else if (attendeeOpenDrawer) {
      setOpenDrawer(false)
    }
  }, [openDrawer, attendeeOpenDrawer])

  const handleAttendeeSchedules = (day: DaysType, hhmm: string) => {
    setAttendeeSchedules((prev) => {
      if (!prev) {
        return {
          schedules: [
            {
              day,
              hhmm,
            },
          ],
        }
      }

      const isExist = prev.schedules.some(
        (schedule) => schedule.day === day && schedule.hhmm === hhmm,
      )

      // 이미 존재하는 경우 return
      if (isExist) return prev

      // 존재하지 않는 경우
      return {
        ...prev,
        schedules: [
          ...prev.schedules,
          {
            day,
            hhmm,
          },
        ],
      }
    })
  }

  const handleRemoveAttendeeSchedules = (day: DaysType, hhmm: string) => {
    setAttendeeSchedules((prev) => {
      // prev가 없는 경우
      if (!prev) {
        return {
          schedules: [],
        }
      }

      // prev 가 존재하는 경우 로직 시작
      // 해당 시간이 존재하는지 확인
      const isExist = prev.schedules.some(
        (schedule) => schedule.day === day && schedule.hhmm === hhmm,
      )

      // 존재하는 경우 삭제
      if (isExist) {
        return {
          ...prev,
          schedules: prev.schedules.filter(
            (schedule) => schedule.day !== day || schedule.hhmm !== hhmm,
          ),
        }
      }

      // 존재하지 않는 경우 30분 전의 시간이 존재하는지 확인
      const beforeHhmm = getSub30MinuteHhmm(hhmm)
      const isExistBefore = prev.schedules.some(
        (schedule) => schedule.day === day && schedule.hhmm === beforeHhmm,
      )

      // 30분 전의 시간이 존재하는 경우 삭제
      if (isExistBefore) {
        return {
          ...prev,
          schedules: prev.schedules.filter(
            (schedule) => schedule.day !== day || schedule.hhmm !== beforeHhmm,
          ),
        }
      }

      return prev
    })
  }

  return (
    <div className="flex flex-col justify-center gap-6 w-full">
      <div className="flex flex-col gap-2">
        <div className="flex gap-1 items-center">
          <p className="font-bold text-m-medium">클래스 일정 선택</p>
          <p className="text-text-danger">*</p>

          <div className="flex items-center gap-2 ml-auto text-xs-semibold text-text-secondary">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-bg-tertiary rounded-full inline-block" />
              <span>현재 스케쥴</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-red-500 rounded-full inline-block" />
              <span>예정 스케쥴</span>
            </div>
          </div>
        </div>
        {scheduleTable && (
          <ScheduleTable
            scheduleTable={scheduleTable.scheduleTable}
            timeSlots={scheduleTable.timeSlots}
            startHhmm={scheduleTable.startHhmm}
            endHhmm={scheduleTable.endHhmm}
            handleSchedule={handleSchedule}
            handleAttendeeBottomDrawer={handleAttendeeBottomDrawer}
            attendeeSchedules={attendeeSchedules}
            futureSchedules={futureSchedules}
          />
        )}
      </div>

      {/* 수강생 정보 Drawer */}
      <AttendeeDrawer
        isOpen={attendeeOpenDrawer}
        onClose={onAttendeeDrawerChange}
        scheduleParams={scheduleParams}
        scheduleData={scheduleData}
        handleAttendeeSchedules={handleAttendeeSchedules}
        handleRemoveAttendeeSchedules={handleRemoveAttendeeSchedules}
      />
    </div>
  )
}
