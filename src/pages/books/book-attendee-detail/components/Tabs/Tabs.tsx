import { Root, List, Trigger, Content } from "@radix-ui/react-tabs";

import "./tabStyles.css";
import AttendanceManage from "@/pages/books/book-attendee-detail/components/AttendanceManage";
import StudentManage from "@/pages/books/book-attendee-detail/components/StudentManage";
import LearningManage from "@/pages/books/book-attendee-detail/components/LearningManage";
import CounselManage from "@/pages/books/book-attendee-detail/components/CounselManage";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useAttendeeDetail } from "../../queries";
import { useEffect } from "react";

const CommonTabs = () => {
  const { bookId, attendeeId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const scheduleDays = searchParams.get("scheduleDays");
  const grade = searchParams.get("grade");

  const { data: attendeeDetail, refetch } = useAttendeeDetail({
    attendeeId: Number(attendeeId),
    bookId: Number(bookId),
  });

  // 뒤로가기 후 데이터를 강제로 다시 불러오기
  // 커리큘럼/클래스(스케쥴) 수정 후 뒤로가기 시 데이터 갱신
  useEffect(() => {
    refetch(); // React Query의 refetch 기능 실행
  }, []);

  const studentAssociate = attendeeDetail?.associates?.filter(
    (fam) => fam.relationType === "MOTHER" || fam.relationType === "FATHER",
  );

  return (
    <>
      <div className="w-full h-[64px] flex items-center px-4 py-5 bg-white">
        <img
          src="/images/icons/ico-arrow-left-black.svg"
          alt="닫기 아이콘"
          width={14}
          height={14}
          onClick={() =>
            navigate(
              location.state?.from ||
                `/book/${bookId}/attendee${location.search}`,
            )
          }
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
              school: attendeeDetail?.school!,
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
