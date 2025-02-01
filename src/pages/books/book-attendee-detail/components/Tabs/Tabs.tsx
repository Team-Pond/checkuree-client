import { Root, List, Trigger, Content } from "@radix-ui/react-tabs";

import "./tabStyles.css";
import AttendanceManage from "@/pages/books/book-attendee-detail/components/AttendanceManage";
import StudentManage from "@/pages/books/book-attendee-detail/components/StudentManage";
import LearningManage from "@/pages/books/book-attendee-detail/components/LearningManage";
import CounselManage from "@/pages/books/book-attendee-detail/components/CounselManage";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useAttendeeDetail } from "../../querys";

const CommonTabs = () => {
  const { bookId, attendeeId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const scheduleDays = searchParams.get("scheduleDays");
  const grade = searchParams.get("grade");

  const { data: attendeeDetail } = useAttendeeDetail({
    attendeeId: Number(attendeeId),
    bookId: Number(bookId),
  });
  const studentAssociate = attendeeDetail?.associates?.filter(
    (fam) => fam.relationType === "MOTHER" || fam.relationType === "FATHER"
  );

  return (
    <>
      <div className="w-full h-[64px] flex items-center px-4 py-5 bg-white">
        <img
          src="/images/icons/ico-arrow-left-black.svg"
          alt="닫기 아이콘"
          width={14}
          height={14}
          onClick={() => navigate(-1)}
        />
      </div>
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
            associates={{
              relation:
                (studentAssociate || [])?.length > 0
                  ? studentAssociate![0].relationType
                  : "",
              phoneNumber:
                (studentAssociate || [])?.length > 0
                  ? studentAssociate![0].phoneNumber
                  : "",
            }}
          />
        </Content>
        <Content
          className="TabsContent"
          value="tab2"
          style={{
            background: "#f6f6f6",
          }}
        >
          <AttendanceManage
            studentInfo={{
              name: attendeeDetail?.name!,
              age: Number(attendeeDetail?.age),
              grade: grade!,
              scheduleDays: scheduleDays!,
            }}
          />
        </Content>
        <Content
          className="TabsContent"
          value="tab3"
          style={{
            background: "#f6f6f6",
          }}
        >
          <LearningManage
            progresses={attendeeDetail?.progresses!}
            studentInfo={{
              name: attendeeDetail?.name!,
              age: Number(attendeeDetail?.age),
              grade: grade!,
              scheduleDays: scheduleDays!,
            }}
          />
        </Content>
        <Content
          className="TabsContent"
          value="tab4"
          style={{
            background: "#f6f6f6",
          }}
        >
          <CounselManage
            studentInfo={{
              name: attendeeDetail?.name!,
              age: Number(attendeeDetail?.age),
              grade: grade!,
              scheduleDays: scheduleDays!,
            }}
          />
        </Content>
      </Root>
    </>
  );
};

export default CommonTabs;
