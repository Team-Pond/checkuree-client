import React, { useState } from "react";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useUser from "../../lib/hooks/useUser";
import { DayOfWeek, sortWeekdays } from "../../utils";
import BottomDrawer from "../../components/BottomDrawer";
import AttendanceCreateForm from "../../components/AttendanceCreate";
import { getAttendanceList } from "../../api/AttendanceApiClient";

interface Attendance {
  attendeeCount: number;
  createId: string;
  createdAt: string;
  deletedAt: string | null;
  description: string;
  id: string;
  title: string;
  type: string;
  imageUrl: string;
  updateId: string | null;
  updatedAt: string;
  days: DayOfWeek[];
}

interface AttendanceId {
  attendance: Attendance;
  attendanceId: string;
  createId: string;
  createdAt: string;
  deletedAt: string | null;
  role: string;
  updateId: string | null;
  updatedAt: string;
  userAttendanceId: number;
  userId: string;
}

function mapDaysToKorean(daysArray: DayOfWeek[]): string {
  const dayMap: Record<DayOfWeek, string> = {
    MONDAY: "월",
    TUESDAY: "화",
    WEDNESDAY: "수",
    THURSDAY: "목",
    FRIDAY: "금",
    SATURDAY: "토",
    SUNDAY: "일",
  };

  const koreanDays = sortWeekdays(daysArray).map((day) => dayMap[day]);

  return koreanDays.join(", ");
}
const Attendances: React.FC = () => {
  const navigate = useNavigate();
  const today = dayjs(); // 오늘 날짜
  const todayFormat = today.format("YYYY년 MM월 DD일 dddd");

  // 사용자 정보
  const user = useUser();

  // State
  const [isCreate, setIsCreate] = useState<boolean>(false);

  const { data: attendancyList, refetch: attendancesRefetch } = useQuery({
    queryKey: ["attendancy-list"],
    queryFn: async () => {
      const response = await getAttendanceList();
      if (!response.success) return undefined;
      return response;
    },
  });
  return (
    <section className="flex justify-center">
      {attendancyList ? (
        <div className="flex flex-col gap-[10px] flex-wrap">
          <div className="text-left">
            <p className="text-sm leading-[19px] text-[#797979]">
              {todayFormat}
            </p>
            <p className="text-[20px] leading-[27px] font-semibold">
              {user?.name || ""}님, 안녕하세요.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-5 px-[9px]">
            {attendancyList?.items.map((item: AttendanceId) => {
              return (
                <div
                  onClick={() => navigate(`/attendances/${item.attendanceId}`)}
                  key={`attendance-item__${item.attendanceId}`}
                  className="w-[150px] h-[185px] border border-[green] rounded-lg flex gap-3 cursor-pointer flex-col items-center p-2"
                >
                  <img
                    src={
                      item.attendance.imageUrl || "images/sckeleton-image.svg"
                    }
                    alt="스켈레톤 이미지"
                    className="object-cover max-w-140 w-full h-[90px]"
                    style={
                      {
                        // objectPosition:
                        //     '0px -10px',
                      }
                    }
                  />
                  <div className="flex flex-col gap-[3px] w-full">
                    <div className="text-left">
                      <p className="text-[16px] font-semibold leading-[21px] overflow-hidden whitespace-nowrap text-ellipsis">
                        {item.attendance.title}
                      </p>
                      <p className="text-sm font-medium text-[#797979] overflow-hidden whitespace-nowrap text-ellipsis">
                        {item.attendance.description || "출석부 설명입니다."}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium text-[#797979]">
                        {mapDaysToKorean(item.attendance.days)}
                      </p>
                      <p className="text-sm font-medium border border-[#F0FFF4]">
                        {item.attendance.attendeeCount}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="fixed bottom-6 right-6 bg-[#59996B] rounded-full">
              <img
                src={"/images/icons/add-icon.svg"}
                alt=""
                width={48}
                height={48}
                onClick={() => setIsCreate(true)}
              />
            </div>
          </div>
        </div>
      ) : (
        <>...Loading</>
      )}
      <BottomDrawer
        open={isCreate}
        onClose={() => {}}
        children={
          <AttendanceCreateForm
            setIsCreate={setIsCreate}
            attendancesRefetch={attendancesRefetch}
          />
        }
      />
    </section>
  );
};

export default Attendances;
