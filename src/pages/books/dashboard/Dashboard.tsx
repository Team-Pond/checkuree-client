import PageContainer from "@/components/PageContainer";
import AttendanceRateChart from "./components/AttendanceRateChart";

import AttendanceCategoryChart from "./components/AttendanceCategoryChart";
import Bottom from "../components/Bottom";
import { useSearchParams } from "react-router-dom";

export default function Dashboard() {
  const [searchParmas] = useSearchParams();
  const bookName = searchParmas.get("bookName");
  return (
    <PageContainer>
      <div className="w-full h-[64px] flex items-center justify-between px-4 py-5">
        <p className="font-bold text-text-primary text-[22px]">{bookName}</p>
        <img
          src="/images/icons/book-create/ico-close.svg"
          alt="닫기 아이콘"
          width={32}
          height={32}
          onClick={() => {}}
        />
      </div>
      <main className="w-full bg-bg-secondary flex flex-col gap-4 p-4">
        <AttendanceRateChart />
        <AttendanceCategoryChart />
        <div className="h-[92px]" />
      </main>

      <Bottom />
    </PageContainer>
  );
}
