import React, { Fragment } from "react";
import TimeButtons from "./TimeButtons";
import DonutChart from "./DonutChart";
import tw from "tailwind-styled-components";
import { PeriodType, StatisticType } from "@/api/type";
import { statisticPeriodText } from "@/utils";

const TODAY_TEXT = "오늘의 출석률";
const WEEKLY_TEXT = "이번 주 출석률";
const MONTHLY_TEXT = "이번 달의 출석률";

interface IProps {
  statisticData: StatisticType;
  tabChange: (tab: PeriodType) => void;
  tab: PeriodType;
}
function AttendanceRateChart({ statisticData, tabChange, tab }: IProps) {
  const labels = ["Red", "Blue", "Yellow"];

  const attendanceTextChange = (timeStatus: PeriodType) => {
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
    <Fragment>
      <ButtonsWrapper>
        <div className="flex flex-col text-left space-y-[-3px]">
          <p className="text-m-bold">{attendanceTextChange(tab)}</p>
          <p className="text-xs-semibold text-text-secondary">
            {statisticPeriodText(tab)}
          </p>
        </div>
        <TimeButtons
          timeStatus={tab}
          handleTimeStatus={(timeStatus) => tabChange(timeStatus)}
        />
      </ButtonsWrapper>
      <ChartWrapper>
        <DonutChart
          data={[
            statisticData.attendCount,
            statisticData.makeupCount,
            statisticData.absentCount,
          ]}
          labels={labels}
        />
        <div className="flex gap-[10px]">
          <div className="flex gap-2 items-center">
            <div className="flex items-center gap-[6px]">
              <Squre bg="bg-border-brand" />
              <p className="text-xs-medium">출석</p>
            </div>
            <Ratio color="text-text-brand">{statisticData.attendRate}%</Ratio>
          </div>
          <div className="flex gap-2 items-center">
            <div className="flex items-center gap-[6px]">
              <Squre bg="bg-[#F2BD2D]" />
              <p className="text-xs-medium">보강</p>
            </div>
            <Ratio color="text-[#EC9E14]">{statisticData.makeupRate}%</Ratio>
          </div>
          <div className="flex gap-2 items-center">
            <div className="flex items-center gap-[6px]">
              <Squre bg="bg-[#EA5353]" />
              <p className="text-xs-medium">결석</p>
            </div>
            <Ratio color="text-[#EA5353]">{statisticData.absentRate}%</Ratio>
          </div>
        </div>
        <p className="mt-4 text-s-semibold">
          오늘은 약 {statisticData.attendRate}%의 학생들이 출석했어요.
        </p>
      </ChartWrapper>
    </Fragment>
  );
}

const Squre = tw.div`${({ bg }: { bg: string }) =>
  bg && bg} w-3 h-3 rounded-[4px]`;

const Ratio = tw.div`${({ color }: { color: string }) =>
  color && color} text-[13px] font-semibold mt-[1px]`;

const ChartWrapper = tw.div`flex flex-col items-center gap-2 w-full h-[284px] bg-white rounded-2xl mx-auto py-4`;
const ButtonsWrapper = tw.div`flex justify-between w-full items-center`;

export default React.memo(AttendanceRateChart);
