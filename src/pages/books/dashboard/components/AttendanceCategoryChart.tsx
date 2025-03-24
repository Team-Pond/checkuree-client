import { useState } from "react";
import TimeButtons from "./TimeButtons";
import DonutChart from "./DonutChart";
import tw from "tailwind-styled-components";
import BarChart from "./BarChart";
import { AttendeeStatisticsType, AttendeeStatisticType } from "@/api/type";

type TimePeriod = "DAILY" | "WEEKLY" | "MONTHLY";

const TODAY_TEXT = "오늘의 출석률";
const WEEKLY_TEXT = "이번 주 출석률";
const MONTHLY_TEXT = "이번 달의 출석률";

interface IProps {
  statisticData: AttendeeStatisticType;
  tabChange: (tab: AttendeeStatisticsType) => void;
  tab: AttendeeStatisticsType;
}

export default function AttendanceCategoryChart({
  statisticData,
  tabChange,
  tab,
}: IProps) {
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
        <BarChart />
      </ChartWrapper>
    </>
  );
}

const Squre = tw.div`${({ bg }: { bg: string }) =>
  bg && bg} w-3 h-3 rounded-[4px]`;

const Ratio = tw.div`${({ color }: { color: string }) =>
  color && color} text-[13px] font-semibold mt-[1px]`;

const ChartWrapper = tw.div`flex flex-col items-center gap-2 w-full px-2 h-[284px] bg-white rounded-2xl mx-auto py-4`;
const ButtonsWrapper = tw.div`flex justify-between w-full items-center`;
