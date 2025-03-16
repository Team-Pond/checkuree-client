import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { DaysType } from "@/api/type";
import { UpdateAttendeeScheduleRequest } from "@/api/AttendeeSchema";
import {
  useScheduleAttendee,
  useScheduleTable,
} from "@/pages/attendee-create/queries";
import { getSub30MinuteHhmm } from "@/utils";
import AttendeeDrawer from "../AttendeeDrawer";
import ScheduleTable from "../ScheduleTable";

interface IProps {
  setAttendeeSchedules: React.Dispatch<
    React.SetStateAction<UpdateAttendeeScheduleRequest | undefined>
  >;
  attendeeSchedules: UpdateAttendeeScheduleRequest | undefined;
}
export default function ScheduleModifyDetail({
  setAttendeeSchedules,
  attendeeSchedules,
}: IProps) {
  const { bookId } = useParams();

  const [scheduleParams, setScheduleParams] = useState<{
    dayOfWeek: string;
    hhmm: string;
    isSelected: boolean;
  }>({
    dayOfWeek: "",
    hhmm: "",
    isSelected: false,
  });
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [attendeeOpenDrawer, setAttendeeOpenDrawer] = useState<boolean>(false);

  // Drawer 관련 핸들러들
  const handleAttendeeBottomDrawer = (open: boolean) =>
    setAttendeeOpenDrawer(open);
  const onAttendeeDrawerChange = () =>
    setAttendeeOpenDrawer(!attendeeOpenDrawer);

  // 스케줄 클릭 시 선택된 요일/시간 저장
  const handleSchedule = (
    dayOfWeek: string,
    hhmm: string,
    isSelected: boolean = false
  ) => {
    setScheduleParams({ dayOfWeek, hhmm, isSelected });
    handleAttendeeBottomDrawer(true);
  };

  // bookId가 string일 수 있으므로 number로 변환하여 사용
  const attendanceBookIdNumber = Number(bookId);

  // 수강생 데이터
  const { data: scheduleData } = useScheduleAttendee(
    attendanceBookIdNumber,
    scheduleParams.dayOfWeek,
    scheduleParams.hhmm,
    !!(scheduleParams.dayOfWeek && scheduleParams.hhmm)
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

      const isExist = prev.schedules.some(
        (schedule) => schedule.day === day && schedule.hhmm === hhmm
      );

      // 이미 존재하는 경우 return
      if (isExist) return prev;

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
      };
    });
  };

  const handleRemoveAttendeeSchedules = (day: DaysType, hhmm: string) => {
    setAttendeeSchedules((prev) => {
      // prev가 없는 경우
      if (!prev) {
        return {
          schedules: [],
        };
      }

      // prev 가 존재하는 경우 로직 시작
      // 해당 시간이 존재하는지 확인
      const isExist = prev.schedules.some(
        (schedule) => schedule.day === day && schedule.hhmm === hhmm
      );

      // 존재하는 경우 삭제
      if (isExist) {
        return {
          ...prev,
          schedules: prev.schedules.filter(
            (schedule) => schedule.day !== day || schedule.hhmm !== hhmm
          ),
        };
      }

      // 존재하지 않는 경우 30분 전의 시간이 존재하는지 확인
      const beforeHhmm = getSub30MinuteHhmm(hhmm);
      const isExistBefore = prev.schedules.some(
        (schedule) => schedule.day === day && schedule.hhmm === beforeHhmm
      );

      // 30분 전의 시간이 존재하는 경우 삭제
      if (isExistBefore) {
        return {
          ...prev,
          schedules: prev.schedules.filter(
            (schedule) => schedule.day !== day || schedule.hhmm !== beforeHhmm
          ),
        };
      }

      // 30분 전도 없으면 ... ? 넌 나가라 그냥
      return prev;
    });
  };

  console.log(scheduleTable);
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
