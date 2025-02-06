import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useScheduleAttendee,
  useScheduleTable,
} from "../../../../attendee-create/queries.ts";
import { useBookCourses } from "../../queries.ts";
import { DaysType } from "../../../../../api v2/AttendeeSchema.ts";
import AttendeeDrawer from "../../../../attendee-create/components/AttendeeDrawer.tsx";
import ScheduleTable from "../ScheduleTable.tsx";

export default function ScheduleTableDetail() {
  const { bookId, attendeeId } = useParams();

  const [scheduleParams, setScheduleParams] = useState<{
    dayOfWeek: string;
    hhmm: string;
  }>({
    dayOfWeek: "",
    hhmm: "",
  });
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [attendeeOpenDrawer, setAttendeeOpenDrawer] = useState<boolean>(false);
  const [attendeeSchedules, setAttendeeSchedules] = useState<{
    schedules: {
      day: DaysType;
      hhmm: string;
    }[];
  }>({ schedules: [] });

  // Drawer 관련 핸들러들
  const handleBottomDrawer = (open: boolean) => setOpenDrawer(open);
  const onDrawerChange = () => setOpenDrawer(!openDrawer);
  const handleAttendeeBottomDrawer = (open: boolean) =>
    setAttendeeOpenDrawer(open);
  const onAttendeeDrawerChange = () =>
    setAttendeeOpenDrawer(!attendeeOpenDrawer);

  // 스케줄 클릭 시 선택된 요일/시간 저장
  const handleSchedule = (dayOfWeek: string, hhmm: string) => {
    setScheduleParams({ dayOfWeek, hhmm });
    handleAttendeeBottomDrawer(true);
  };

  // bookId가 string일 수 있으므로 number로 변환하여 사용
  const attendanceBookIdNumber = Number(bookId);

  // 수강생 데이터
  const { data: scheduleData } = useScheduleAttendee(
    attendanceBookIdNumber,
    scheduleParams.dayOfWeek,
    scheduleParams.hhmm,
    !!(scheduleParams.dayOfWeek && scheduleParams.hhmm),
  );

  // 시간표 데이터
  const { data: scheduleTable } = useScheduleTable(attendanceBookIdNumber);

  useEffect(() => {
    if (openDrawer) {
      setAttendeeOpenDrawer(false);
    } else if (attendeeOpenDrawer) {
      setOpenDrawer(false);
    }
  }, [openDrawer, attendeeOpenDrawer]);

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

  return (
    <div className="flex flex-col justify-center gap-6 max-w-[342px] w-full">
      <div className="flex flex-col gap-2">
        <div className="flex gap-1 items-center">
          <p className="font-bold text-m-medium">클래스 일정</p>
          <p className="text-text-danger">*</p>
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
      />
    </div>
  );
}
