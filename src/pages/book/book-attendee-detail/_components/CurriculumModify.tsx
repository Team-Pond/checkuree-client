import { useEffect, useState } from 'react'
import { UpdateAttendeeScheduleRequest } from '@/api/AttendeeSchema'
import { useParams } from 'react-router-dom'
import ScheduleTable from './ScheduleTable'
import SubjectSelectionDrawer from './SubjectSelectionDrawer'

import {
  useBookCourses,
  useScheduleData,
  useScheduleTimeTable,
} from '../queries'
import { DaysType } from '@/api/type'
import { getSub30MinuteHhmm } from '@/utils'
import AttendeeDrawer from '@/components/AttendeeDrawer'

interface CurriculumModifyProps {
  setAttendeeSchedules: React.Dispatch<
    React.SetStateAction<UpdateAttendeeScheduleRequest | undefined>
  >

  setIsCourseModify: React.Dispatch<React.SetStateAction<boolean>>
  onChangeGrade: (gradeId: number) => void
}

export interface ScheduleParamsType {
  dayOfWeek: string
  hhmm: string
  isSelected: boolean
}

export default function CurriculumModify({
  setAttendeeSchedules,
  onChangeGrade,
  setIsCourseModify,
}: CurriculumModifyProps) {
  const { bookId } = useParams()

  const [selectedSubject, setSelectedSubject] = useState<{
    id: number
    title: string
  }>()

  const [selectedSubjectItems, setSelectedSubjectItems] = useState<{
    level: number
    subjectItemId: number
    title: string
  }>()

  const [scheduleParams, setScheduleParams] = useState<ScheduleParamsType>({
    dayOfWeek: '',
    hhmm: '',
    isSelected: false,
  })

  const [openDrawer, setOpenDrawer] = useState<boolean>(false)
  const [attendeeOpenDrawer, setAttendeeOpenDrawer] = useState<boolean>(false)

  // 커리큘럼 선택 시 Drawer 열고/닫는 핸들러
  const handleBottomDrawer = (open: boolean) => setOpenDrawer(open)
  const onDrawerChange = () => setOpenDrawer(!openDrawer)

  // 수강생 Drawer 열고/닫는 핸들러
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

  const { data: scheduleData } = useScheduleData({
    dayOfWeek: scheduleParams.dayOfWeek,
    hhmm: scheduleParams.hhmm,
    bookId: Number(bookId),
  })
  // 시간표 정보 가져오기
  const { data: scheduleTimeTable } = useScheduleTimeTable({
    bookId: Number(bookId),
  })

  // 일정 클릭 시 자동으로 수강생 Drawer 열기
  useEffect(() => {
    if (scheduleParams.dayOfWeek && scheduleParams.hhmm) {
    }
  }, [scheduleParams.dayOfWeek, scheduleParams.hhmm])

  const handleAttendeeSchedules = (day: DaysType, hhmm: string) => {
    // 기존 로직 (attendeeSchedules에 추가)
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

  const { data: bookCourses } = useBookCourses({
    openDrawer,
    bookId: bookId!,
  })

  useEffect(() => {
    if (openDrawer) {
      setAttendeeOpenDrawer(false)
    } else if (attendeeOpenDrawer) {
      setOpenDrawer(false)
    }
  }, [openDrawer, attendeeOpenDrawer])

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

      // 30분 전도 없으면 ... ? 넌 나가라 그냥
      return prev
    })
  }
  return (
    <div className="flex bg-white flex-col justify-center gap-6  w-full p-3 rounded-2xl">
      {/* 커리큘럼 선택 영역 */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-1 items-center">
          <p className="font-bold text-m-medium">커리큘럼</p>
          <p className="text-text-danger">*</p>
        </div>

        <div
          className="w-full flex justify-center"
          onClick={() => handleBottomDrawer(true)}
        >
          <input
            type="input"
            placeholder="커리큘럼 선택"
            value={
              selectedSubject && selectedSubjectItems
                ? `${selectedSubject?.title} > ${selectedSubjectItems?.title}`
                : ''
            }
            className="max-w-[342px] bg-white w-full h-12 border border-[#E7E7E7] rounded-xl px-4 outline-none text-s-semibold text-[#5D5D5D] text-left"
            readOnly
          />
        </div>
      </div>

      {/* 클래스 일정 영역 */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-1 items-center">
          <p className="font-bold text-m-medium">클래스 일정</p>
          <p className="text-text-danger">*</p>
        </div>

        {scheduleTimeTable && (
          <ScheduleTable
            scheduleTable={scheduleTimeTable?.scheduleTable!}
            timeSlots={scheduleTimeTable?.timeSlots!}
            startHhmm={scheduleTimeTable?.startHhmm!}
            endHhmm={scheduleTimeTable?.endHhmm!}
            handleSchedule={handleSchedule}
            handleAttendeeBottomDrawer={handleAttendeeBottomDrawer}
          />
        )}
      </div>

      {/* 커리큘럼 선택 Drawer */}
      <SubjectSelectionDrawer
        isOpen={openDrawer}
        onClose={onDrawerChange}
        selectedSubject={selectedSubject}
        setSelectedSubject={setSelectedSubject}
        setSelectedSubjectItems={setSelectedSubjectItems}
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
      <div className="flex gap-4 w-full">
        <button
          type="button"
          onClick={() => {
            setIsCourseModify(false)
          }}
          className="w-full h-12 flex justify-center items-center rounded-2xl bg-bg-secondary text-text-secondary text-l-semibold"
        >
          취소
        </button>
        <button
          onClick={() => {
            //   상후님 여기에 action 넣으시면 돼요!
          }}
          type="button"
          className="w-full h-12 flex justify-center items-center rounded-2xl bg-bg-tertiary text-[#F1F8F3] text-l-semibold"
        >
          저장하기
        </button>
      </div>
    </div>
  )
}
