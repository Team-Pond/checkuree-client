import { useState } from "react";
import TimeButtons from "./TimeButtons";
import DonutChart from "./DonutChart";
import tw from "tailwind-styled-components";
import BarChart from "./BarChart";
import {
  AttendeeStatisticsType,
  AttendeeStatisticType,
  dayMap,
  DayOfWeek,
} from "@/api/type";
import CategoryButtons from "./CategoryButtons";

type TimePeriod = "DAILY" | "WEEKLY" | "MONTHLY";

const CATEGORY_TEXT = "카테고리별 학생 수";

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
  // const labelsSwitch = (tab: AttendeeStatisticsType) => {
  //   switch (tab) {
  //     case "DAY":
  //       return ["월", "화", "수", "목", "금", "토", "일"];
  //     case "AGE":
  //       return ["유아", "초등(저)", "초등(고)", "중등", "고등", "성인"];
  //     case "CURRICULUM":
  //       return ["가요", "고급반", "바이엘", "재즈1", "재즈2"];
  //   }
  // };

  let order: string[] = [];
  let sortedData: {
    name: string;
    count: number;
  }[] = [];
  let labels: string[] = [];
  let data: number[] = [];

  const labelsSwitch = (tab: AttendeeStatisticsType) => {
    switch (tab) {
      case "DAY":
        order = [
          "MONDAY",
          "TUESDAY",
          "WEDNESDAY",
          "THURSDAY",
          "FRIDAY",
          "SATURDAY",
          "SUNDAY",
        ];
        sortedData = statisticData.contents.sort((a, b) => {
          return order.indexOf(a.name) - order.indexOf(b.name);
        });
        labels = sortedData.map((data) => dayMap[data.name as DayOfWeek]);
        data = sortedData.map((data) => data.count);
        return {
          data,
          labels,
        };
      case "AGE":
        order = ["유아", "초등저학년", "중등부", "성인부"];
        sortedData = statisticData.contents.sort((a, b) => {
          return order.indexOf(a.name) - order.indexOf(b.name);
        });
        labels = sortedData.map((data) => data.name);
        data = sortedData.map((data) => data.count);
        return {
          data,
          labels,
        };
      case "CURRICULUM":
        sortedData = statisticData.contents.sort((a, b) => {
          return order.indexOf(a.name) - order.indexOf(b.name);
        });
        labels = sortedData.map((data) => data.name);
        data = sortedData.map((data) => data.count);
        return {
          labels,
          data,
        };
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <ButtonsWrapper>
        <div className="flex flex-col text-left space-y-[-3px]">
          <p className="text-m-bold">{CATEGORY_TEXT}</p>
        </div>
        <CategoryButtons
          timeStatus={tab}
          handleTimeStatus={(timeStatus) => tabChange(timeStatus)}
        />
      </ButtonsWrapper>
      <ChartWrapper>
        <BarChart
          labels={labelsSwitch(tab).labels}
          statisticData={labelsSwitch(tab).data}
        />
      </ChartWrapper>
    </div>
  );
}

const ChartWrapper = tw.div`flex flex-col items-center gap-2 w-full px-2 h-[284px] bg-white rounded-2xl mx-auto py-3`;
const ButtonsWrapper = tw.div`flex justify-between w-full items-center`;
