import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import SubjectSelectionDrawer from './SubjectSelectionDrawer'

import { useBookCourses, useSchedule, useScheduleTable } from '../queries'

import { useFormContext } from 'react-hook-form'
import { CreateAttendeeSchema } from '../_schema'
import { DaysType } from '@/api/type'
import ScheduleTable from './ScheduleTable'
import tw from 'tailwind-styled-components'

import { getSub30MinuteHhmm } from '@/utils'
import AttendeeDrawer from '@/components/AttendeeDrawer'
import FieldTitle from '@/components/FieldTitle'

export interface ScheduleParamsType {
  dayOfWeek: string
  hhmm: string
  isSelected: boolean
}

interface Step2Props {
  attendanceBookId: number
  onChangeGrade: (gradeId: number) => void
}

function Step2({ attendanceBookId, onChangeGrade }: Step2Props) {
  const { bookId } = useParams()
  const [scheduleParams, setScheduleParams] = useState<ScheduleParamsType>({
    dayOfWeek: '',
    hhmm: '',
    isSelected: false,
  })

  const {
    setValue,
    getValues,
    register,
    formState: { errors },
    watch,
  } = useFormContext<CreateAttendeeSchema>()

  const [openDrawer, setOpenDrawer] = useState<boolean>(false)
  const [attendeeOpenDrawer, setAttendeeOpenDrawer] = useState<boolean>(false)

  // Drawer 관련 핸들러들
  const handleBottomDrawer = (open: boolean) => setOpenDrawer(open)
  const onDrawerChange = () => setOpenDrawer(!openDrawer)
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
  const attendanceBookIdNumber = Number(bookId) || attendanceBookId

  // 수강생 데이터
  const { data: scheduleData } = useSchedule(
    attendanceBookIdNumber,
    scheduleParams.dayOfWeek,
    scheduleParams.hhmm,
    !!(scheduleParams.dayOfWeek && scheduleParams.hhmm),
  )

  // 시간표 데이터
  const { data: scheduleTable } = useScheduleTable(attendanceBookIdNumber)

  // 커리큘럼 데이터를 가져옴
  const { data: bookCourses } = useBookCourses(
    attendanceBookIdNumber,
    openDrawer,
  )

  const selectedSubject = watch('progressRequest.subject')
  const selectedSubjectItems = watch('progressRequest.subjectCourse')
  const progress = watch('progressRequest.progresses')

  // 선택된 커리큘럼이 있는 경우 subjectItem, subject 설정
  useEffect(() => {
    if (bookCourses && !selectedSubject && !selectedSubjectItems) {
      const savedProgress = progress?.[0]

      if (savedProgress) {
        // 모든 courses 순회하며 해당 subjectItemId를 포함하는 grade 찾기
        for (const course of bookCourses.courses) {
          const foundGrade = course.grades.find(
            (grade) => grade.id === savedProgress.gradeId,
          )

          if (foundGrade) {
            setValue('progressRequest.subject', {
              id: course.id,
              title: course.title,
            })
            setValue('progressRequest.subjectCourse', {
              level: foundGrade.level,
              subjectCourseId: foundGrade.subjectItemId,
              title: foundGrade.title,
            })
            break // 일치하는 첫 번째 항목 찾으면 반복 종료
          }
        }
      }
    }
  }, [bookCourses])

  useEffect(() => {
    if (openDrawer) {
      setAttendeeOpenDrawer(false)
    } else if (attendeeOpenDrawer) {
      setOpenDrawer(false)
    }
  }, [openDrawer, attendeeOpenDrawer])

  const handleAttendeeSchedules = (day: DaysType, hhmm: string) => {
    const currentSchedules = getValues('schedulesRequest.schedules')
    const newSchedule = { day, hhmm }

    if (!currentSchedules) {
      setValue('schedulesRequest.schedules', [newSchedule])
    } else {
      setValue('schedulesRequest.schedules', [...currentSchedules, newSchedule])
    }
  }

  const handleRemoveAttendeeSchedules = (day: DaysType, hhmm: string) => {
    // 현재 schedules 배열을 가져옵니다. 없으면 빈 배열로 초기화
    const currentSchedules = getValues('schedulesRequest.schedules') || []

    // 해당 시간(정확한 값)이 존재하면 이를 제거
    if (
      currentSchedules.some(
        (schedule) => schedule.day === day && schedule.hhmm === hhmm,
      )
    ) {
      setValue(
        'schedulesRequest.schedules',
        currentSchedules.filter(
          (schedule) => !(schedule.day === day && schedule.hhmm === hhmm),
        ),
      )
      return
    }

    // 해당 시간이 없으면 30분 전의 시간이 있는지 확인 후 제거
    const beforeHhmm = getSub30MinuteHhmm(hhmm)
    if (
      currentSchedules.some(
        (schedule) => schedule.day === day && schedule.hhmm === beforeHhmm,
      )
    ) {
      setValue(
        'schedulesRequest.schedules',
        currentSchedules.filter(
          (schedule) => !(schedule.day === day && schedule.hhmm === beforeHhmm),
        ),
      )
      return
    }

    // 조건에 맞는 일정이 없으면 기존 배열 그대로 설정
    setValue('schedulesRequest.schedules', currentSchedules)
  }

  return (
    <React.Fragment>
      <FieldWrapper>
        <FieldTitle title="커리큘럼" essential />
        <div
          className="w-full flex flex-col gap-[1px] text-left justify-center"
          onClick={() => handleBottomDrawer(true)}
        >
          <input
            type="input"
            placeholder="커리큘럼 선택"
            aria-label="curriculum-select"
            data-cy="curriculum-select"
            value={
              selectedSubject?.title && selectedSubjectItems?.title
                ? `${selectedSubject.title} - ${selectedSubjectItems.title}`
                : ''
            }
            className="bg-white w-full h-12 border border-[#E7E7E7] rounded-xl px-4 outline-none text-s-semibold text-[#5D5D5D] text-left cursor-pointer"
            readOnly
          />

          {(errors?.progressRequest || errors?.schedulesRequest) && (
            <p className="text-red-500 text-xs mt-1">
              커리큘럼 선택 후 클래스 일정 선택은 필수입니다.
            </p>
          )}
        </div>
        <input
          type="hidden"
          readOnly
          {...register('schedulesRequest.schedules')}
        />
      </FieldWrapper>
      <FieldWrapper>
        <FieldTitle title="클래스 일정" essential />
        {scheduleTable && (
          <ScheduleTable
            scheduleTable={scheduleTable.scheduleTable}
            timeSlots={scheduleTable.timeSlots}
            startHhmm={scheduleTable.startHhmm}
            endHhmm={scheduleTable.endHhmm}
            handleSchedule={handleSchedule}
            handleAttendeeBottomDrawer={handleAttendeeBottomDrawer}
          />
        )}
      </FieldWrapper>

      {/* 커리큘럼 선택 Drawer */}
      <SubjectSelectionDrawer
        isOpen={openDrawer}
        onClose={onDrawerChange}
        handleBottomDrawer={handleBottomDrawer}
        bookCourses={bookCourses!}
        onChangeGrade={onChangeGrade}
      />

      {/* 수강생 정보 Drawer */}
      <AttendeeDrawer
        isOpen={attendeeOpenDrawer}
        onClose={onAttendeeDrawerChange}
        scheduleParams={scheduleParams}
        scheduleData={scheduleData}
        handleAttendeeSchedules={handleAttendeeSchedules}
        handleRemoveAttendeeSchedules={handleRemoveAttendeeSchedules}
      />
    </React.Fragment>
  )
}

export default React.memo(Step2)
const FieldWrapper = tw.div`flex flex-col gap-2`
