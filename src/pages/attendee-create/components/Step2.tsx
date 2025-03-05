import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import SubjectSelectionDrawer from "./SubjectSelectionDrawer";
import AttendeeDrawer from "./AttendeeDrawer";

import {
  useBookCourses,
  useScheduleAttendee,
  useScheduleTable,
} from "../queries";
import { getSub30MinuteHhmm } from "../../../utils";

import { useFormContext } from "react-hook-form";
import { CreateAttendeeSchema } from "../_schema";
import { DaysType } from "@/api/type";
import ScheduleTable from "./ScheduleTable";
import tw from "tailwind-styled-components";
import FieldHeader from "./FieldTitle";

interface Step2Props {
  attendanceBookId: number;
  onChangeGrade: (gradeId: number) => void;
}

export default function Step2({ attendanceBookId, onChangeGrade }: Step2Props) {
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
    isSelected: boolean;
  }>({
    dayOfWeek: "",
    hhmm: "",
    isSelected: false,
  });
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [attendeeOpenDrawer, setAttendeeOpenDrawer] = useState<boolean>(false);

  // Drawer 관련 핸들러들
  const handleBottomDrawer = (open: boolean) => setOpenDrawer(open);
  const onDrawerChange = () => setOpenDrawer(!openDrawer);
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
  const attendanceBookIdNumber = Number(bookId) || attendanceBookId;

  // 수강생 데이터
  const { data: scheduleData } = useScheduleAttendee(
    attendanceBookIdNumber,
    scheduleParams.dayOfWeek,
    scheduleParams.hhmm,
    !!(scheduleParams.dayOfWeek && scheduleParams.hhmm)
  );

  // 시간표 데이터
  const { data: scheduleTable } = useScheduleTable(attendanceBookIdNumber);

  // 커리큘럼 데이터를 가져옴
  const { data: bookCourses } = useBookCourses(
    attendanceBookIdNumber,
    openDrawer
  );

  useEffect(() => {
    if (openDrawer) {
      setAttendeeOpenDrawer(false);
    } else if (attendeeOpenDrawer) {
      setOpenDrawer(false);
    }
  }, [openDrawer, attendeeOpenDrawer]);

  const {
    setValue,
    getValues,
    register,
    formState: { errors },
  } = useFormContext<CreateAttendeeSchema>();
  const handleAttendeeSchedules = (day: DaysType, hhmm: string) => {
    const currentSchedules = getValues("schedulesRequest.schedules");
    const newSchedule = { day, hhmm };

    if (!currentSchedules) {
      setValue("schedulesRequest.schedules", [newSchedule]);
    } else {
      setValue("schedulesRequest.schedules", [
        ...currentSchedules,
        newSchedule,
      ]);
    }
  };

  const handleRemoveAttendeeSchedules = (day: DaysType, hhmm: string) => {
    // 현재 schedules 배열을 가져옵니다. 없으면 빈 배열로 초기화
    const currentSchedules = getValues("schedulesRequest.schedules") || [];

    // 해당 시간(정확한 값)이 존재하면 이를 제거
    if (
      currentSchedules.some(
        (schedule) => schedule.day === day && schedule.hhmm === hhmm
      )
    ) {
      setValue(
        "schedulesRequest.schedules",
        currentSchedules.filter(
          (schedule) => !(schedule.day === day && schedule.hhmm === hhmm)
        )
      );
      return;
    }

    // 해당 시간이 없으면 30분 전의 시간이 있는지 확인 후 제거
    const beforeHhmm = getSub30MinuteHhmm(hhmm);
    if (
      currentSchedules.some(
        (schedule) => schedule.day === day && schedule.hhmm === beforeHhmm
      )
    ) {
      setValue(
        "schedulesRequest.schedules",
        currentSchedules.filter(
          (schedule) => !(schedule.day === day && schedule.hhmm === beforeHhmm)
        )
      );
      return;
    }

    // 조건에 맞는 일정이 없으면 기존 배열 그대로 설정
    setValue("schedulesRequest.schedules", currentSchedules);
  };

  return (
    <div className="flex flex-col justify-center gap-6 max-w-[342px] w-full">
      <FieldWrapper>
        <FieldHeader title="커리큘럼" essential />
        <div
          className="w-full flex justify-center"
          onClick={() => handleBottomDrawer(true)}
        >
          <div className="flex flex-col gap-[1px] w-full text-left">
            <input
              type="input"
              {...register("progressRequest.progresses", {
                required: "필수입니다.",
              })}
              placeholder="커리큘럼 선택"
              value={
                selectedSubject && selectedSubjectItems
                  ? `${selectedSubject.title} > ${selectedSubjectItems.title}`
                  : ""
              }
              className="max-w-[342px] bg-white w-full h-12 border border-[#E7E7E7] rounded-xl px-4 outline-none text-s-semibold text-[#5D5D5D] text-left"
              readOnly
            />
            {errors?.progressRequest?.progresses && (
              <p className="text-red-500 text-sm mt-1">
                커리큘럼 선택 후 클래스 일정 선택은 필수입니다.
              </p>
            )}
          </div>
        </div>
        <input type="hidden" {...register("schedulesRequest.schedules")} />
      </FieldWrapper>
      <FieldWrapper>
        <FieldHeader title="클래스 일정" essential />
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
    </div>
  );
}

const FieldWrapper = tw.div`flex flex-col gap-2`;
