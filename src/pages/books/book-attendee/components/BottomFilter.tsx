import { DaysType } from "@/api/AttendanceBookSchema";
import { GenderType } from "@/api/AttendeeSchema";
import BottomDrawer from "@/components/BottomDrawer";
import { twMerge } from "tailwind-merge";

type IProps = {
  openFilter: boolean;
  onDrawerChange: () => void;
  onChangeGender: (gender: GenderType) => void;
  onDaysChange: (day: DaysType) => void;
  gender: GenderType;
  dayArrays: DaysType[];
  DaysMatch: Record<string, DaysType>;
};

const DAYS = ["월", "화", "수", "목", "금", "토", "일"];

const GENDER_BUTTONS: { gender: GenderType; name: string }[] = [
  {
    gender: "MALE",
    name: "남성",
  },
  {
    gender: "FEMALE",
    name: "여성",
  },
];

export default function BottomFilter(props: IProps) {
  const {
    openFilter,
    onDrawerChange,
    onChangeGender,
    onDaysChange,
    gender,
    dayArrays,
    DaysMatch,
  } = props;
  return (
    <BottomDrawer
      isOpen={openFilter}
      onClose={onDrawerChange}
      children={
        <>
          {/* 성별 필터 */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3 text-left">
              <p className="text-m-bold text-text-primary">학생 성별</p>
              <div className="flex gap-2">
                {GENDER_BUTTONS.map((button) => {
                  return (
                    <button
                      key={button.gender}
                      onClick={() => onChangeGender(button.gender)}
                      className={twMerge(
                        "rounded-lg border border-[#d1d1d1] w-[61px] h-[33px] text-s-medium text-border-secondary-hover",
                        gender === button.gender
                          ? "border-border-brand text-text-brand"
                          : "text-border-secondary-hover"
                      )}
                    >
                      {button.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 학생 나이 */}
            <div className="flex flex-col gap-3 text-left">
              <p className="text-m-bold text-text-primary">학생 연령</p>
              <div className="flex gap-2">
                <button className="rounded-lg border border-[#d1d1d1] w-[61px] h-[33px] text-s-medium text-border-secondary-hover">
                  미취학
                </button>
                <button className="rounded-lg border border-[#d1d1d1] w-[61px] h-[33px] text-s-medium text-border-secondary-hover">
                  초등
                </button>
                <button className="rounded-lg border border-[#d1d1d1] w-[61px] h-[33px] text-s-medium text-border-secondary-hover">
                  중등
                </button>
                <button className="rounded-lg border border-[#d1d1d1] w-[61px] h-[33px] text-s-medium text-border-secondary-hover">
                  고등
                </button>
                <button className="rounded-lg border border-[#d1d1d1] w-[61px] h-[33px] text-s-medium text-border-secondary-hover">
                  성인
                </button>
              </div>
            </div>

            {/* 수업 구분 */}
            <div className="flex flex-col gap-3 text-left">
              <p className="text-m-bold text-text-primary">수업 요일</p>
              <div className="flex gap-2">
                {DAYS.map((day, index) => {
                  return (
                    <button
                      key={day}
                      className={twMerge(
                        "rounded-lg border border-[#d1d1d1] w-[41px] h-[33px] text-s-medium text-border-secondary-hover",
                        dayArrays.includes(DaysMatch[DAYS[index]])
                          ? "border-border-brand text-text-brand"
                          : "text-border-secondary-hover"
                      )}
                      onClick={() => onDaysChange(DAYS[index] as DaysType)}
                    >
                      {DAYS[index]}
                    </button>
                  );
                })}
              </div>
              {/*<div className="flex gap-2">*/}
              {/*  <button className="rounded-lg border border-[#d1d1d1] w-[61px] h-[33px] text-s-medium text-border-secondary-hover">*/}
              {/*    휴원*/}
              {/*  </button>*/}
              {/*  <button className="rounded-lg border border-[#d1d1d1] w-[61px] h-[33px] text-s-medium text-border-secondary-hover">*/}
              {/*    퇴원*/}
              {/*  </button>*/}
              {/*</div>*/}
            </div>
          </div>

          {/*<div className="absolute bottom-0 left-0 right-0 p-4 flex flex-row gap-2 shadow-md">*/}
          {/*  <button*/}
          {/*    className="w-full h-[54px] bg-gray-300 rounded-2xl text-l-semibold"*/}
          {/*    onClick={onBack}*/}
          {/*  >*/}
          {/*    이전으로*/}
          {/*  </button>*/}
          {/*  <button*/}
          {/*    className={twMerge(*/}
          {/*      "w-full h-[54px] rounded-2xl text-l-semibold",*/}
          {/*      selectedTime === ""*/}
          {/*        ? "bg-gray-300 text-gray-500 cursor-not-allowed opacity-50" // 비활성화 스타일*/}
          {/*        : "bg-bg-tertiary text-[#f1f8f3]", // 활성화 스타일*/}
          {/*    )}*/}
          {/*    onClick={() => onConfirm(selectedTime)}*/}
          {/*    disabled={!selectedTime}*/}
          {/*  >*/}
          {/*    추가하기*/}
          {/*  </button>*/}
          {/*</div>*/}
          <div className={"flex gap-4 w-full"}>
            <button
              className="w-full h-[54px] bg-gray-300 rounded-2xl text-l-semibold"
              onClick={() => {}}
            >
              초기화
            </button>
            <button
              className="w-full h-[54px] bg-bg-tertiary text-[#f1f8f3] rounded-2xl text-l-semibold"
              onClick={() => {}}
            >
              필터 적용
            </button>
          </div>
        </>
      }
    />
  );
}
