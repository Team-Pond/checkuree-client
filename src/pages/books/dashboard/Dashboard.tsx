import PageContainer from "@/components/PageContainer";
import AttendanceRateChart from "./components/AttendanceRateChart";

import AttendanceCategoryChart from "./components/AttendanceCategoryChart";
import ScheduleIcon from "@/assets/icons/dashboard/ico-schedule.svg?react";
import Bottom from "../components/Bottom";
import { useParams, useSearchParams } from "react-router-dom";
import { useBookStatistic } from "../queries";
import dayjs from "dayjs";
import { useState } from "react";
import { PeriodType } from "@/api/type";

export default function Dashboard() {
  const [searchParmas] = useSearchParams();

  const bookName = searchParmas.get("bookName");
  const { bookId } = useParams();

  // ✅ tab에 따라 from 날짜 계산
  const getFromDate = (tab: PeriodType) => {
    if (tab === "DAILY") return dayjs().format("YYYY-MM-DD");
    if (tab === "WEEKLY")
      return dayjs().subtract(7, "day").format("YYYY-MM-DD");
    if (tab === "MONTHLY")
      return dayjs().subtract(1, "month").format("YYYY-MM-DD");
    return dayjs().format("YYYY-MM-DD"); // fallback
  };

  const [attendRateTab, setAttendRateTab] = useState<PeriodType>("DAILY");
  const { data: statisticData } = useBookStatistic(Number(bookId), {
    from: getFromDate(attendRateTab), // ✅ 동적으로 계산된 from 날짜 사용
    to: dayjs().format("YYYY-MM-DD"),
    periodType: attendRateTab,
  });

  return (
    <PageContainer>
      <div className="w-full h-[64px] flex items-center justify-between px-4 py-5">
        <p className="font-bold text-text-primary text-[22px]">{bookName}</p>
        <ScheduleIcon width={40} height={40} className="mt-1" />
      </div>
      <main className="w-full flex-1 bg-bg-secondary flex flex-col gap-4 p-4">
        {statisticData?.status === 200 && (
          <AttendanceRateChart
            statisticData={statisticData.data}
            tabChange={(tab: PeriodType) => setAttendRateTab(tab)}
            tab={attendRateTab}
          />
        )}

        <AttendanceCategoryChart />
        <div className="h-[92px]" />
      </main>

      <Bottom />
    </PageContainer>
  );
}
