import BottomDrawer from "@/components/BottomDrawer";
import { useState } from "react";
import Bottom from "../book-check/components/Bottom";
import { useQuery } from "@tanstack/react-query";
import { getAttendee } from "@/api v2/AttendeeApiClient";

import { getDayGroupFromInput } from "@/utils";
import { DaysType } from "@/api v2/AttendanceBookSchema";
import { twMerge } from "tailwind-merge";

const DAYS = ["월", "화", "수", "목", "금", "토", "일"];

const DaysMatch: Record<string, DaysType> = {
  월: "MONDAY",
  화: "TUESDAY",
  수: "WEDNESDAY",
  목: "THURSDAY",
  금: "FRIDAY",
  토: "SATURDAY",
  일: "SUNDAY",
};
export default function BookRoaster() {
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const attendanceBookId = location.pathname.split("/")[2];
  const onDrawerChange = () => {
    setOpenFilter(!openFilter);
  };

  const [dayArrays, setDayArrays] = useState<DaysType[]>([]);
  const [gender, setGenrder] = useState<"MALE" | "FEMALE" | "">("");

  const onDaysChange = (day: DaysType) => {
    if (dayArrays.includes(DaysMatch[day])) {
      setDayArrays(dayArrays.filter((item) => item !== DaysMatch[day]));
    } else {
      setDayArrays([...dayArrays, DaysMatch[day]]);
    }
  };

  const { data: roaster } = useQuery({
    queryKey: ["roaster", attendanceBookId, dayArrays, gender],
    queryFn: async () => {
      const response = await getAttendee({
        attendanceBookId: attendanceBookId,
        filter: {
          age: {
            min: 30,
            max: 1,
          },
          gradeIds: [0],
          scheduleDays: dayArrays,
          gender: gender,
          status: "ATTENDING",
        },
      });
      if (response.status === 200) return response;
    },
  });

  const getGrades = (grades: { id: number; name: string }[]) => {
    const gradesBooks = grades.map((grade) => grade.name);
    return gradesBooks.join(" / ");
  };

  return (
    <section className="flex flex-col w-full">
      <div className="flex flex-col sticky top-0 z-50 bg-white border-b border-[#f6f6f6]">
        <div className="w-full h-[64px] flex items-center justify-between px-4 py-5">
          <p className="text-[22px] font-bold">리스트반 출석부</p>
          <div className="flex gap-2">
            <img
              src="/images/icons/book-roaster/ico-plus-black.svg"
              alt="설정 아이콘"
              width={40}
              height={40}
            />
            <img
              src="/images/icons/ico-settings.svg"
              alt="설정 아이콘"
              width={32}
              height={32}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-2 w-full justify-center p-[17px]">
        <div className="relative w-full max-w-[307px]">
          <input
            type="text"
            className="bg-bg-secondary rounded-lg w-full h-11 outline-none pl-11 text-m-bold"
            placeholder="이름 검색"
          />
          <img
            width={40}
            height={40}
            src={"/images/icons/book-roaster/ico-glasses.svg"}
            alt="이미지 추가 아이콘"
            className="absolute top-[2px] left-1"
            onClick={onDrawerChange}
          />
        </div>
        <img
          width={40}
          height={40}
          src={"/images/icons/book-roaster/ico-slider.svg"}
          alt="이미지 추가 아이콘"
          onClick={onDrawerChange}
        />
      </div>

      <div className="w-full px-[17px] ">
        <p className="text-left text-s-semibold text-text-secondary mb-1">
          전체
        </p>

        <div className="border-t border-[#F6F6F6]">
          {/* <div>
            <img src="" alt="" />
            <p className="text-s-medium text-[#B0B0B0]">
              일치하는 학생이 없습니다.
            </p>
          </div> */}
          {roaster?.data.content.map((student) => {
            return (
              <div key={student.id} className="py-4 px-2 flex gap-4">
                <img
                  src="/images/icons/book-roaster/ico-student.svg"
                  alt="학생 아이콘"
                  width={40}
                  height={40}
                  className="rounded-full"
                />

                <div className="gap-1 text-left">
                  <div className="flex gap-2">
                    <p className="text-m-bold text-text-primary">
                      {student.name}
                    </p>
                    <p className="text-m-semibold text-text-secondary">
                      {student.age}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <p className="text-text-brand text-s-semibold">
                      {getDayGroupFromInput(student.scheduleDays)}
                    </p>
                    <p className="text-[#B0B0B0] text-s-medium">
                      {getGrades(student.grades)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <BottomDrawer
        isOpen={openFilter}
        onClose={onDrawerChange}
        children={
          <>
            {/* 성별 필터 */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3 text-left">
                <p className="text-m-bold text-text-primary">학생 성별</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setGenrder(gender === "MALE" ? "" : "MALE")}
                    className={twMerge(
                      "rounded-lg border border-[#d1d1d1] w-[61px] h-[33px] text-s-medium text-border-secondary-hover",
                      gender === "MALE"
                        ? "border-border-brand text-text-brand"
                        : "text-border-secondary-hover"
                    )}
                  >
                    남성
                  </button>
                  <button
                    onClick={() =>
                      setGenrder(gender === "FEMALE" ? "" : "FEMALE")
                    }
                    className={twMerge(
                      "rounded-lg border border-[#d1d1d1] w-[61px] h-[33px] text-s-medium text-border-secondary-hover",
                      gender === "FEMALE"
                        ? "border-border-brand text-text-brand"
                        : "text-border-secondary-hover"
                    )}
                  >
                    여성
                  </button>
                </div>
              </div>

              {/* 학생 나이 */}
              <div className="flex flex-col gap-3 text-left">
                <p className="text-m-bold text-text-primary">학생 성별</p>
                <div className="flex gap-2">
                  <button className="rounded-lg border border-[#d1d1d1] w-[61px] h-[33px] text-s-medium text-border-secondary-hover">
                    미취학
                  </button>
                  <button className="rounded-lg border border-[#d1d1d1] w-[61px] h-[33px] text-s-medium text-border-secondary-hover">
                    초등
                  </button>
                  <button className="rounded-lg border border-[#d1d1d1] w-[61px] h-[33px] text-s-medium text-border-secondary-hover">
                    중등
                  </button>
                  <button className="rounded-lg border border-[#d1d1d1] w-[61px] h-[33px] text-s-medium text-border-secondary-hover">
                    고등
                  </button>
                  <button className="rounded-lg border border-[#d1d1d1] w-[61px] h-[33px] text-s-medium text-border-secondary-hover">
                    성인
                  </button>
                </div>
              </div>

              {/* 수업 구분 */}
              <div className="flex flex-col gap-3 text-left">
                <p className="text-m-bold text-text-primary">학생 성별</p>
                <div className="flex gap-2">
                  {DAYS.map((day, index) => {
                    return (
                      <button
                        key={day}
                        className={twMerge(
                          "rounded-lg border border-[#d1d1d1] w-[41px] h-[33px] text-s-medium text-border-secondary-hover",
                          dayArrays.includes(DaysMatch[DAYS[index]])
                            ? "border-border-brand text-text-brand"
                            : "text-border-secondary-hover"
                        )}
                        onClick={() => onDaysChange(DAYS[index] as DaysType)}
                      >
                        {DAYS[index]}
                      </button>
                    );
                  })}
                </div>
                <div className="flex gap-2">
                  <button className="rounded-lg border border-[#d1d1d1] w-[61px] h-[33px] text-s-medium text-border-secondary-hover">
                    휴원
                  </button>
                  <button className="rounded-lg border border-[#d1d1d1] w-[61px] h-[33px] text-s-medium text-border-secondary-hover">
                    퇴원
                  </button>
                </div>
              </div>
            </div>

            <button
              className="w-full h-[54px] bg-bg-tertiary text-[#f1f8f3] rounded-2xl text-l-semibold"
              onClick={() => {}}
            >
              필터 적용
            </button>
          </>
        }
      />
      {!openFilter && (
        <>
          <div className="flex justify-between px-[44px] items-center w-full h-[92px]" />
          <Bottom />
        </>
      )}
    </section>
  );
}
