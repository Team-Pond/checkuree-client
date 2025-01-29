import CommonTabs from "@/components/Tabs";
import StudentManage from "./components/StudentManage";
import AttendanceManage from "./components/AttendanceManage";
import LearningManage from "./components/LearningManage";
import CounselManage from "./components/CounselManage";

export default function BookAttendeeDetail() {
  return (
    <section className="bg-bg-secondary flex-1 w-full">
      <CommonTabs />
      {/* <CounselManage /> */}
    </section>
  );
}
