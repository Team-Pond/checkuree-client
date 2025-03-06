import PageContainer from "@/components/PageContainer";
import AttendanceRateChart from "./components/AttendanceRateChart";
import BarChart from "./components/BarChart";
import AttendanceCategoryChart from "./components/AttendanceCategoryChart";

export default function Dashboard() {
  return (
    <PageContainer>
      <div className="w-full bg-bg-secondary flex flex-col gap-4 p-4">
        <AttendanceRateChart />
        <AttendanceCategoryChart />
      </div>
    </PageContainer>
  );
}
