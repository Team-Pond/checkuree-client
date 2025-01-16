import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getSubjects, getSubjectItems } from "@/api v2/CourseApiClient";
import {
  getBookCourse,
  getBookScheduleTable,
} from "@/api v2/AttendanceBookApiClient";
import { getScheduleAttendee } from "@/api v2/AttendeeApiClient";

import ScheduleTable from "./ScheduleTable";
import SubjectSelectionDrawer from "./SubjectSelectionDrawer";
import AttendeeDrawer from "./AttendeeDrawer";
import { DaysType } from "@/api v2/AttendanceBookSchema";
import { UpdateAttendeeScheduleRequest } from "@/api v2/AttendeeSchema";

interface Step2Props {
  // AttendeeCreate에서 내려받을 두 개의 Setter
  // setBookProgress: React.Dispatch<
  //   React.SetStateAction<UpdateBookProgressRequest | undefined>
  // >;
  setAttendeeSchedules: React.Dispatch<
    React.SetStateAction<UpdateAttendeeScheduleRequest | undefined>
  >;
  attendanceBookId: number;
  onChangeGrade: (gradeId: number) => void;
}

export default function Step2({
  setAttendeeSchedules,
  attendanceBookId,
  onChangeGrade,
}: Step2Props) {
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
  };

  // 선택된 스케줄에 따라 수강생 목록 가져오기
  const { data: scheduleData } = useQuery({
    enabled: !!scheduleParams.dayOfWeek && !!scheduleParams.hhmm,
    queryKey: ["table-attendee", scheduleParams.dayOfWeek, scheduleParams.hhmm],
    queryFn: async () => {
      const res = await getScheduleAttendee({
        attendanceBookId: 5,
        dayOfWeek: scheduleParams.dayOfWeek,
        hhmm: scheduleParams.hhmm,
      });
      if (res.status === 200) return res.data;
    },
  });

  // 시간표 정보 가져오기
  const { data: tableScheduleTable } = useQuery({
    queryKey: ["table-schedule"],
    queryFn: async () => {
      const res = await getBookScheduleTable({
        attendanceBookId: attendanceBookId,
      });
      if (res.status === 200) return res.data;
    },
  });

  // 일정 클릭 시 자동으로 수강생 Drawer 열기
  useEffect(() => {
    if (scheduleParams.dayOfWeek && scheduleParams.hhmm) {
      handleAttendeeBottomDrawer(true);
    }
  }, [scheduleParams.dayOfWeek, scheduleParams.hhmm]);

  const handleAttendeeSchedules = (day: DaysType, hhmm: string) => {
    setAttendeeSchedules((prev) => {
      // prev가 없다면 기본값을 설정
      if (!prev) {
        return {
          schedules: [
            {
              day: scheduleParams.dayOfWeek as DaysType,
              hhmm: scheduleParams.hhmm,
            },
          ],
        };
      }
      // 만약 prev가 이미 있다면, 기존 스케줄 + 새 스케줄
      return {
        ...prev,
        schedules: [
          ...prev.schedules,
          {
            day: scheduleParams.dayOfWeek as DaysType,
            hhmm: scheduleParams.hhmm,
          },
        ],
      };
    });
  };

  const { data: bookCourses } = useQuery({
    enabled: openDrawer,
    queryKey: ["book-courses", attendanceBookId],
    queryFn: async () => {
      const res = await getBookCourse(String(attendanceBookId));
      if (res.status === 200) return res.data;
    },
  });

  return (
    <div className="flex flex-col justify-center gap-6 max-w-[342px] w-full">
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
          <img
            width={8}
            height={8}
            src="/images/icons/attendee-create/ico-arrow-down.svg"
            alt="input placeholder 아이콘"
            className="absolute top-[22px] right-4"
          />
        </div>
      </div>

      {/* 클래스 일정 영역 */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-1 items-center">
          <p className="font-bold text-m-medium">클래스 일정</p>
          <p className="text-text-danger">*</p>
        </div>

        {tableScheduleTable && (
          <ScheduleTable
            scheduleTable={tableScheduleTable?.scheduleTable!}
            timeSlots={tableScheduleTable?.timeSlots!}
            startHhmm={tableScheduleTable?.startHhmm!}
            endHhmm={tableScheduleTable?.endHhmm!}
            handleSchedule={handleSchedule}
          />
        )}
      </div>

      {/* 커리큘럼 선택 Drawer */}

      {bookCourses && openDrawer && (
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
      )}

      {/* 수강생 정보 Drawer */}
      <AttendeeDrawer
        isOpen={attendeeOpenDrawer}
        onClose={onAttendeeDrawerChange}
        scheduleParams={scheduleParams}
        scheduleData={scheduleData}
        handleAttendeeSchedules={handleAttendeeSchedules}
      />
    </div>
  );
}
