import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import {
  getBookCourse,
  getBookScheduleTable,
} from "@/api v2/AttendanceBookApiClient";
import { getScheduleAttendee } from "@/api v2/AttendeeApiClient";

import { DaysType } from "@/api v2/AttendanceBookSchema";
import { UpdateAttendeeScheduleRequest } from "@/api v2/AttendeeSchema";
import { useParams } from "react-router-dom";
import ScheduleTable from "./ScheduleTable";
import SubjectSelectionDrawer from "./SubjectSelectionDrawer";
import AttendeeDrawer from "./AttendeeDrawer";

interface CurriculumModifyProps {
  setAttendeeSchedules: React.Dispatch<
    React.SetStateAction<UpdateAttendeeScheduleRequest | undefined>
  >;
  attendeeSchedules: UpdateAttendeeScheduleRequest | undefined;
  attendanceBookId: number;
  setIsCourseModify: React.Dispatch<React.SetStateAction<boolean>>;
  onChangeGrade: (gradeId: number) => void;
}

export default function CurriculumModify({
  setAttendeeSchedules,
  attendeeSchedules,
  attendanceBookId,
  onChangeGrade,
  setIsCourseModify,
}: CurriculumModifyProps) {
  const { bookId } = useParams();

  const [selectedSubject, setSelectedSubject] = useState<{
    id: number;
    title: string;
  }>();

  const [selectedSubjectItems, setSelectedSubjectItems] = useState<{
    level: number;
    subjectItemId: number;
    title: string;
  }>();

  const [scheduleParams, setScheduleParams] = useState<{
    dayOfWeek: string;
    hhmm: string;
  }>({
    dayOfWeek: "",
    hhmm: "",
  });

  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [attendeeOpenDrawer, setAttendeeOpenDrawer] = useState<boolean>(false);

  // 커리큘럼 선택 시 Drawer 열고/닫는 핸들러
  const handleBottomDrawer = (open: boolean) => setOpenDrawer(open);
  const onDrawerChange = () => setOpenDrawer(!openDrawer);

  // 수강생 Drawer 열고/닫는 핸들러
  const handleAttendeeBottomDrawer = (open: boolean) =>
    setAttendeeOpenDrawer(open);

  const onAttendeeDrawerChange = () =>
    setAttendeeOpenDrawer(!attendeeOpenDrawer);

  // 스케줄 클릭 시 선택된 요일/시간 저장
  const handleSchedule = (dayOfWeek: string, hhmm: string) => {
    setScheduleParams({ dayOfWeek, hhmm });
    handleAttendeeBottomDrawer(true);
  };

  // 선택된 스케줄에 따라 수강생 목록 가져오기
  const { data: scheduleData } = useQuery({
    enabled: !!scheduleParams.dayOfWeek && !!scheduleParams.hhmm,
    queryKey: ["table-attendee", scheduleParams.dayOfWeek, scheduleParams.hhmm],
    queryFn: async () => {
      const res = await getScheduleAttendee({
        attendanceBookId: Number(bookId)!,
        dayOfWeek: scheduleParams.dayOfWeek,
        hhmm: scheduleParams.hhmm,
      });
      if (res.status === 200) return res.data;
    },
  });

  // 시간표 정보 가져오기
  const { data: scheduleTable } = useQuery({
    queryKey: ["table-schedule"],
    queryFn: async () => {
      const res = await getBookScheduleTable({
        attendanceBookId: Number(bookId)!,
      });
      if (res.status === 200) return res.data;
    },
  });

  // 일정 클릭 시 자동으로 수강생 Drawer 열기
  useEffect(() => {
    if (scheduleParams.dayOfWeek && scheduleParams.hhmm) {
    }
  }, [scheduleParams.dayOfWeek, scheduleParams.hhmm]);

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
        };
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
      };
    });
  };

  const { data: bookCourses } = useQuery({
    enabled: openDrawer,
    queryKey: ["book-courses", bookId || attendanceBookId],
    queryFn: async () => {
      const res = await getBookCourse(String(bookId || attendanceBookId));
      if (res.status === 200) return res.data;
    },
  });

  useEffect(() => {
    if (openDrawer) {
      setAttendeeOpenDrawer(false);
    } else if (attendeeOpenDrawer) {
      setOpenDrawer(false);
    }
  }, [openDrawer, attendeeOpenDrawer]);

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
                : ""
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

        {scheduleTable && (
          <ScheduleTable
            scheduleTable={scheduleTable?.scheduleTable!}
            timeSlots={scheduleTable?.timeSlots!}
            startHhmm={scheduleTable?.startHhmm!}
            endHhmm={scheduleTable?.endHhmm!}
            handleSchedule={handleSchedule}
            handleAttendeeBottomDrawer={handleAttendeeBottomDrawer}
            attendeeSchedules={attendeeSchedules}
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
      />
      <div className="flex gap-4 w-full">
        <button
          type="button"
          onClick={() => {
            setIsCourseModify(false);
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
  );
}
