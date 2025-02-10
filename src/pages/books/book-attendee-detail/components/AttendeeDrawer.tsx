import { DaysType } from "@/api v2/AttendanceBookSchema";
import BottomDrawer from "@/components/BottomDrawer";
import { convertEngDayToKorDay } from "../../../../utils";

type Attendee = {
  name: string;
  age: number;
};

interface AttendeeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  scheduleParams: {
    dayOfWeek: string;
    hhmm: string;
  };
  scheduleData?: Attendee[];
  handleAttendeeSchedules: (day: DaysType, hhmm: string) => void;
}

export default function AttendeeDrawer({
  isOpen,
  onClose,
  scheduleParams,
  scheduleData,
  handleAttendeeSchedules,
}: AttendeeDrawerProps) {
  const { dayOfWeek, hhmm } = scheduleParams;

  return (
    <BottomDrawer isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4 items-center h-[249px] overflow-auto">
        <div className="px-4 w-full">
          {/* Drawer 상단 영역 */}
          <div className="text-left w-full h-10 border-b border-[#f6f6f6] flex items-center">
            <p className="text-s-semibold text-text-secondary">
              ({convertEngDayToKorDay(dayOfWeek)}) {hhmm} -
              {Number(hhmm.substring(0, 2)) + 1}:{hhmm.substring(3, 5)}
            </p>
          </div>
        </div>

        {/* 수강생 목록 */}
        <div className="grid grid-cols-2 px-[24px]">
          {scheduleData?.map((attendee) => (
            <div key={attendee.name} className="flex gap-2 w-[171px] h-9">
              <p className="text-m-bold text-text-primary">{attendee.name}</p>
              {/*<p className="text-m-semibold text-text-secondary">*/}
              {/*  {attendee.age}*/}
              {/*</p>*/}
            </div>
          ))}
        </div>

        <div className="flex gap-4 w-full fixed bottom-5 max-w-[357px]">
          <button
            type="button"
            onClick={() => onClose()}
            className="w-full h-[54px] flex justify-center items-center rounded-2xl bg-bg-secondary text-text-secondary text-l-semibold"
          >
            닫기
          </button>
          <button
            type="button"
            className="w-full h-[54px] flex justify-center items-center rounded-2xl bg-bg-tertiary text-[#F1F8F3] text-l-semibold"
            onClick={() => {
              handleAttendeeSchedules(dayOfWeek as DaysType, hhmm);
              onClose();
            }}
          >
            추가하기
          </button>
        </div>
      </div>
    </BottomDrawer>
  );
}
