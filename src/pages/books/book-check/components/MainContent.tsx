import {
  ScheduleData,
  ScheduleDataContentType,
  ScheduleDataType,
} from "@/api/ScheduleSchema";
import { STATUS } from "@/api/RecordSchema";

import { useRecordCreate, useRecordUpdate, useStatusUpdate } from "../queries";
import { useEffect, useState } from "react";
import { ConfirmModal } from "./ConfirmModal";
import ModifyRecordTimeModal from "./ModifyRecordTimeModal";

import useModalStore from "@/store/dialogStore";
import NeedLessonTable from "./NeedLessonTable";
import NoNeedLessonTable from "./NoNeedLessonTable";
import tw from "tailwind-styled-components";
import useFormDataStore from "@/store/recordStore";

type IProps = {
  bookSchedules: ScheduleDataType;
  bookId: number;
  currentDate: string;
  checkedScheduleCount: number;
  setCheckedCount: (count: number) => void;
};

export default function MainContents(props: IProps) {
  const openModal = useModalStore((state) => state.openModal);

  const {
    bookId,
    bookSchedules,
    currentDate,
    checkedScheduleCount,
    setCheckedCount,
  } = props;

  const [record, setRecord] = useState({
    id: 0,
    formattedTime: "",
  });

  // 수업 중( 등원 후 && 수업 전)인 학생
  const [needLessonStudents, setNeedLessonStudents] = useState<ScheduleData[]>(
    []
  );
  // 출선 전 or 수업 완료 학생
  const [noNeedLessonTimeScheduleTable, setNoNeedLessonTimeScheduleTable] =
    useState<ScheduleDataContentType>([]);

  const { mutate: recordCreate } = useRecordCreate({
    bookId,
    currentDate,
  });
  const { mutate: statusMutation } = useStatusUpdate({ bookId });
  const { mutate: recordUpdate } = useRecordUpdate({
    bookId: Number(bookId),
    recordId: Number(record.id),
  });

  // 출석체크 화면의 체크 인원 수 변경
  const handleCheckedCountChange = ({
    schedule,
    targetStatus,
  }: {
    schedule: ScheduleData;
    targetStatus: Omit<STATUS, "PENDING">;
  }) => {
    if (!schedule.recordId) {
      setCheckedCount(checkedScheduleCount + 1);
      return;
    }
    const currentStatus = schedule.recordStatus;

    const adjustment =
      currentStatus === targetStatus ? -1 : currentStatus === "PENDING" ? 1 : 0;
    setCheckedCount(checkedScheduleCount + adjustment);
  };

  // 출석체크 상태 변경
  const handleStatusChange = ({
    schedule,
    targetStatus,
  }: {
    schedule: ScheduleData;
    targetStatus: Omit<STATUS, "PENDING">;
  }) => {
    // 출석 기록이 없는 경우 출석 기록 생성
    if (!schedule.recordId) {
      recordCreate({
        attendeeId: schedule.attendeeId,
        scheduleId: schedule.scheduleId,
        status: targetStatus as STATUS,
      });
      return;
    }

    // 이미 출석인 경우 다시 누르면 PENDING 상태로 수정
    if (schedule.recordStatus === targetStatus) {
      statusMutation({
        recordId: schedule.recordId,
        scheduleId: schedule.scheduleId,
        status: "PENDING",
      });
      return;
    }

    // 출석 상태를 targetStatus로 변경
    statusMutation({
      recordId: schedule.recordId,
      scheduleId: schedule.scheduleId,
      status: targetStatus as STATUS,
    });
  };

  useEffect(() => {
    if (bookSchedules?.content) {
      const newNeedLessonStudents: ScheduleData[] = [];
      const newNoNeedLessonTimeScheduleTable: ScheduleDataContentType = [];

      bookSchedules.content.forEach((content) => {
        const beforeLessonStudents = content.schedules.filter((schedule) => {
          return schedule.recordStatus === "ATTEND" && !schedule.isTaught;
        });
        const noNeedToLessonSchedules = content.schedules.filter((schedule) => {
          return schedule.recordStatus !== "ATTEND" || schedule.isTaught;
        });

        newNeedLessonStudents.push(...beforeLessonStudents);
        newNoNeedLessonTimeScheduleTable.push({
          ...content,
          schedules: noNeedToLessonSchedules,
        });
      });

      // 상태 업데이트
      setNeedLessonStudents(
        newNeedLessonStudents.sort((a, b) =>
          a.recordTime > b.recordTime ? 1 : -1
        )
      );
      setNoNeedLessonTimeScheduleTable(newNoNeedLessonTimeScheduleTable);
    }
  }, [bookSchedules?.content]);

  const handleAttendanceStatusWithConfirmation = (
    targetStatus: "ATTEND" | "ABSENT",
    schedule: ScheduleData
  ) => {
    // targetStatus에 따라 메시지를 즉시 결정
    const message =
      schedule.recordStatus === targetStatus
        ? "출석체크를 취소하시겠어요?"
        : targetStatus === "ATTEND"
        ? "출석상태로 변경하시겠어요?"
        : "결석상태로 변경하시겠어요?";

    // 출석기록이 이미 있는 경우 확인 메시지 출력
    if (schedule.recordStatus !== "PENDING") {
      openModal(<ConfirmModal message={message} />, () => {
        handleCheckedCountChange({ schedule, targetStatus });
        handleStatusChange({ schedule, targetStatus });
      });
      return;
    }
    // 출석기록이 없는 경우 바로 상태 변경
    handleCheckedCountChange({ schedule, targetStatus });
    handleStatusChange({ schedule, targetStatus });
  };

  const { updateFormData, formData, setFormData } = useFormDataStore();

  const handleTimeChange = (
    key: "hour" | "minute",
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let input = e.target.value.replace(/\D/g, "");
    if (input.length > 2) {
      input = input.slice(0, 2);
    }
    updateFormData(key, input);
  };
  const handleRecord = (id: number, formattedTime: string) => {
    setRecord({
      id,
      formattedTime,
    });
  };

  const openModifyRecordTimeModal = (schedule: ScheduleData) => {
    if (schedule.recordStatus === "ATTEND") {
      handleRecord(schedule.recordId, schedule.recordTime);
      openModal(
        <ModifyRecordTimeModal
          bookId={bookId}
          record={record}
          setFormData={setFormData}
          handleTimeChange={handleTimeChange}
        />,
        () => {
          recordUpdate(`${formData?.hour}:${formData?.minute}`);
          setFormData({ hour: "", minute: "" });
        },
        () => setFormData({ hour: "", minute: "" })
      );
    }
  };

  return (
    <MainContentWrapper>
      {/* 수업중인 학생들 */}
      <NeedLessonTable
        needLessonStudents={needLessonStudents}
        bookId={Number(bookId)}
        handleAttendanceStatusWithConfirmation={
          handleAttendanceStatusWithConfirmation
        }
        handleRecord={handleRecord}
      />
      {/* 수업중이 아닌 학생들 */}
      <NoNeedLessonTable
        noNeedLessonTimeScheduleTable={noNeedLessonTimeScheduleTable}
        bookId={Number(bookId)}
        handleAttendanceStatusWithConfirmation={
          handleAttendanceStatusWithConfirmation
        }
        openModifyRecordTimeModal={openModifyRecordTimeModal}
      />
      <div className="mt-[92px]"></div>
    </MainContentWrapper>
  );
}

const MainContentWrapper = tw.div`w-full flex flex-col gap-4 justify-center items-center py-3 px-4 scrollbar-hide custom-scrollbar-hide`;
