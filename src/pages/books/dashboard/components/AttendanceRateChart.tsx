import React, { Fragment } from "react";
import TimeButtons from "./TimeButtons";
import DonutChart from "./DonutChart";
import tw from "tailwind-styled-components";
import { PeriodType, StatisticType } from "@/api/type";
import { statisticPeriodText } from "@/utils";

const TODAY_TEXT = "오늘의 출석률";
const WEEKLY_TEXT = "이번 주 출석률";
const MONTHLY_TEXT = "이번 달의 출석률";

type Statistic = {
  label: string;
  rate: number;
  bgColor: string;
  textColor: string;
};
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

  const statistics: Statistic[] = [
    {
      label: "출석",
      rate: statisticData.attendRate,
      bgColor: "bg-border-brand",
      textColor: "text-text-brand",
    },
    {
      label: "보강",
      rate: statisticData.makeupRate,
      bgColor: "bg-[#F2BD2D]",
      textColor: "text-[#EC9E14]",
    },
    {
      label: "결석",
      rate: statisticData.absentRate,
      bgColor: "bg-[#EA5353]",
      textColor: "text-[#EA5353]",
    },
    {
      label: "미출석",
      rate: statisticData.unCheckedRate,
      bgColor: "bg-[#E7E7E7]",
      textColor: "text-[#B0B0B0]",
    },
  ];

  const StatisticItem = ({ label, rate, bgColor, textColor }: Statistic) => (
    <div className="flex gap-2 items-center">
      <div className="flex items-center gap-[6px]">
        <Squre bg={bgColor} />
        <p className="text-xs-medium">{label}</p>
      </div>
      <Ratio color={textColor}>{rate}%</Ratio>
    </div>
  );

  return (
    <div className="flex flex-col gap-2">
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
        <div className="flex gap-3">
          <div>
            <p className="text-xs-medium text-text-interactive-secondary text-left">
              단위: 명
            </p>
            <DonutChart
              data={[
                statisticData.attendCount,
                statisticData.makeupCount,
                statisticData.absentCount,
                statisticData.unCheckedCount,
              ]}
              labels={labels}
            />
          </div>
          <StatisticItemWrapper>
            {statistics.map((stat) => (
              <StatisticItem
                key={stat.label}
                label={stat.label}
                rate={stat.rate}
                bgColor={stat.bgColor}
                textColor={stat.textColor}
              />
            ))}
          </StatisticItemWrapper>
        </div>
        <Summation>
          오늘은 약 {statisticData.attendRate}%의 학생들이 출석했어요.
        </Summation>
      </ChartWrapper>
    </div>
  );
}

const Squre = tw.div`${({ bg }: { bg: string }) =>
  bg && bg} w-3 h-3 rounded-[4px]`;

const Ratio = tw.div`${({ color }: { color: string }) =>
  color && color} text-[13px] font-semibold mt-[1px]`;

const ChartWrapper = tw.div`flex flex-col items-center gap-2 w-full h-[284px] bg-white rounded-2xl mx-auto py-4`;
const ButtonsWrapper = tw.div`flex justify-between w-full items-center`;
const StatisticItemWrapper = tw.p`flex flex-col gap-2px`;
const Summation = tw.p`flex flex-col gap-2px`;

export default React.memo(AttendanceRateChart);
