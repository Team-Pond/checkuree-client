import { Root, List, Trigger, Content } from "@radix-ui/react-tabs";

import "./tabStyles.css";
import AttendanceManage from "@/pages/books/book-attendee-detail/components/AttendanceManage";
import StudentManage from "@/pages/books/book-attendee-detail/components/StudentManage";
import LearningManage from "@/pages/books/book-attendee-detail/components/LearningManage";
import CounselManage from "@/pages/books/book-attendee-detail/components/CounselManage";
import { useQuery } from "@tanstack/react-query";

import { getAttendeeDetail } from "@/api v2/AttendeeApiClient";
import { useParams } from "react-router-dom";

const CommonTabs = () => {
  const { bookId, attendeeId } = useParams();
  const { data: attendeeDetail } = useQuery({
    enabled: attendeeId !== null,
    queryKey: ["attendee-detail", attendeeId],
    queryFn: async () =>
      await getAttendeeDetail({
        attendanceBookId: Number(bookId),
        attendeeId: Number(attendeeId),
      }).then((res) => res.data),
  });
  console.log(attendeeDetail);
  return (
    <Root
      className="TabsRoot"
      defaultValue="tab1"
      style={{
        width: "100%",
      }}
    >
      <List className="TabsList" aria-label="Manage your account">
        <Trigger className="TabsTrigger" value="tab1">
          학생관리
        </Trigger>
        <Trigger className="TabsTrigger" value="tab2">
          출석관리
        </Trigger>
        <Trigger className="TabsTrigger" value="tab3">
          학습관리
        </Trigger>
        <Trigger className="TabsTrigger" value="tab4">
          상담관리
        </Trigger>
      </List>
      <Content
        className="TabsContent"
        value="tab1"
        style={{
          background: "#f6f6f6",
        }}
      >
        <StudentManage
          student={{
            name: attendeeDetail?.name!,
            age: Number(attendeeDetail?.age),
            phoneNumber: attendeeDetail?.phoneNumber!,
            enrollDate: attendeeDetail?.enrollmentDate!,
          }}
          lessonInfo={attendeeDetail?.progresses!}
          registerInfo={{
            address_1: attendeeDetail?.address_1!,
            birthDate: attendeeDetail?.birthDate!,
            gender: attendeeDetail?.gender!,
            phoneNumber: attendeeDetail?.phoneNumber!,
            description: attendeeDetail?.description!,
          }}
          scheduleItems={attendeeDetail?.schedules!}
        />
      </Content>
      <Content
        className="TabsContent"
        value="tab2"
        style={{
          background: "#f6f6f6",
        }}
      >
        <AttendanceManage />
      </Content>
      <Content
        className="TabsContent"
        value="tab3"
        style={{
          background: "#f6f6f6",
        }}
      >
        <LearningManage progresses={attendeeDetail?.progresses!} />
      </Content>
      <Content
        className="TabsContent"
        value="tab4"
        style={{
          background: "#f6f6f6",
        }}
      >
        <CounselManage />
      </Content>
    </Root>
  );
};

export default CommonTabs;
