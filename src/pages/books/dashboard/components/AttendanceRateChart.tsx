import { useState } from "react";
import TimeButtons from "./TimeButtons";
import DonutChart from "./DonutChart";
import tw from "tailwind-styled-components";

type TimePeriod = "DAILY" | "WEEKLY" | "MONTHLY";

const TODAY_TEXT = "오늘의 출석률";
const WEEKLY_TEXT = "이번 주 출석률";
const MONTHLY_TEXT = "이번 달의 출석률";
export default function AttendanceRateChart() {
  const data = [300, 50, 100]; // 도넛 차트의 데이터
  const labels = ["Red", "Blue", "Yellow"]; // 각 부분에 대한 레이블
  const [timeStatus, setTimeStatus] = useState<TimePeriod>("DAILY");

  const attendanceTextChange = (timeStatus: TimePeriod) => {
    switch (timeStatus) {
      case "DAILY":
        return TODAY_TEXT;
      case "WEEKLY":
        return WEEKLY_TEXT;
      case "MONTHLY":
        return MONTHLY_TEXT;
    }
  };
  return (
    <>
      <ButtonsWrapper>
        <div className="flex flex-col text-left space-y-[-3px]">
          <p className="text-m-bold">{attendanceTextChange(timeStatus)}</p>
          <p className="text-s-semibold text-text-secondary">
            오늘 2025.01.24(금)
          </p>
        </div>
        <TimeButtons
          timeStatus={timeStatus}
          handleTimeStatus={(timeStatus) => setTimeStatus(timeStatus)}
        />
      </ButtonsWrapper>
      <ChartWrapper>
        <DonutChart data={data} labels={labels} />
        <div className="flex gap-[10px]">
          <div className="flex gap-2 items-center">
            <div className="flex items-center gap-[6px]">
              <Squre bg="bg-border-brand" />
              <p className="text-xs-medium">출석</p>
            </div>
            <Ratio color="text-text-brand">80%</Ratio>
          </div>
          <div className="flex gap-2 items-center">
            <div className="flex items-center gap-[6px]">
              <Squre bg="bg-[#F2BD2D]" />
              <p className="text-xs-medium">보강</p>
            </div>
            <Ratio color="text-[#EC9E14]">80%</Ratio>
          </div>
          <div className="flex gap-2 items-center">
            <div className="flex items-center gap-[6px]">
              <Squre bg="bg-[#EA5353]" />
              <p className="text-xs-medium">결석</p>
            </div>
            <Ratio color="text-[#EA5353]">80%</Ratio>
          </div>
        </div>
        <p className="mt-4 text-s-semibold">
          오늘은 약 80%의 학생들이 출석했어요.
        </p>
      </ChartWrapper>
    </>
  );
}

const Squre = tw.div`${({ bg }: { bg: string }) =>
  bg && bg} w-3 h-3 rounded-[4px]`;

const Ratio = tw.div`${({ color }: { color: string }) =>
  color && color} text-[13px] font-semibold mt-[1px]`;

const ChartWrapper = tw.div`flex flex-col items-center gap-2 w-[358px] h-[284px] bg-white rounded-2xl mx-auto py-4`;
const ButtonsWrapper = tw.div`flex justify-between w-full items-center`;
