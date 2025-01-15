import { getSubjectItems, getSubjects } from "@/api v2/CourseApiClient";
import BottomDrawer from "@/components/BottomDrawer";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

import { getBookScheduleTable } from "@/api v2/AttendanceBookApiClient";
import ScheduleTable from "./ScheduleTable";

export default function Step2() {
  const { data: subjects } = useQuery({
    queryKey: ["subjects"],
    queryFn: async () =>
      await getSubjects().then((res) => {
        if (res.status === 200) return res.data;
      }),
  });

  const [selectedSubject, setSelectedSubject] = useState<{
    id: number;
    title: string;
  }>();

  const [selectedSubjectItems, setSelectedSubjectItems] = useState<{
    level: number;
    subjectItemId: number;
    title: string;
  }>();

  const { data: subjectItems } = useQuery({
    enabled: !!selectedSubject?.id,
    queryKey: ["subject-items", selectedSubject?.title],
    queryFn: async () =>
      await getSubjectItems({ subjectId: String(selectedSubject?.id) }).then(
        (res) => {
          if (res.status === 200) {
            return res.data;
          }
        }
      ),
  });

  const { data: tableScheduleTable } = useQuery({
    queryKey: ["table-schedule"],
    queryFn: async () =>
      await getBookScheduleTable({
        attendanceBookId: 5,
      }).then((res) => {
        if (res.status === 200) {
          return res.data;
        }
      }),
  });

  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const onDrawerChange = () => {
    setOpenDrawer(!openDrawer);
  };
  const handleBottomDrawer = (open: boolean) => {
    setOpenDrawer(open);
  };

  console.log(tableScheduleTable);
  return (
    <div className="flex flex-col justify-center gap-6 max-w-[342px] w-full">
      {/* 커리큘럼 선택 */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-1 items-center">
          <p className="font-bold text-m-medium">커리큘럼</p>
          <p className="text-text-danger">*</p>
        </div>

        <div
          className="relative w-full max-w-[307px]"
          onClick={() => handleBottomDrawer(true)}
        >
          <input
            type="input"
            placeholder="커리큘럼 선택"
            value={
              selectedSubject &&
              selectedSubjectItems &&
              `${selectedSubject?.title} > ${selectedSubjectItems?.title}`
            }
            className="max-w-[342px] bg-white w-full h-12 border border-[#E7E7E7] rounded-xl px-4 outline-none text-s-semibold text-[#B0B0B0] text-left"
          ></input>
          <img
            width={8}
            height={8}
            src={"/images/icons/attendee-create/ico-arrow-down.svg"}
            alt="input placeholder 아이콘"
            className="absolute top-[22px] right-4"
          />
        </div>
      </div>

      {/* 커리큘럼 선택 */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-1 items-center">
          <p className="font-bold text-m-medium">클래스 일정</p>
          <p className="text-text-danger">*</p>
        </div>

        {tableScheduleTable && (
          <ScheduleTable
            scheduleTable={tableScheduleTable?.scheduleTable!}
            timeSlots={tableScheduleTable?.timeSlots!}
            startHhmm={tableScheduleTable?.startHhmm!}
            endHhmm={tableScheduleTable?.endHhmm!}
          />
        )}
      </div>

      <BottomDrawer
        isOpen={openDrawer}
        onClose={onDrawerChange}
        children={
          <div className="flex flex-col gap-4 items-center">
            <div className="relative w-full">
              <input
                type="text"
                className="bg-bg-secondary rounded-lg w-full h-11 outline-none pl-11 text-m-bold text-border-secondary-hover"
                placeholder="과목 검색"
              />
              <img
                width={40}
                height={40}
                src={"/images/icons/book-roaster/ico-glasses.svg"}
                alt="검색 아이콘"
                className="absolute top-[2px] left-1"
              />
            </div>

            <div className="w-full max-w-[345px] h-[234px] flex bg-white ">
              <ul className="w-full max-w-[107px] overflow-y-scroll scrollbar-hide rounded-tl-lg">
                {subjects?.map((subject) => {
                  return (
                    <li
                      key={subject.id}
                      className={twMerge(
                        "bg-white h-[52px] flex items-center justify-center",
                        selectedSubject?.title === subject.title
                          ? "text-text-brand font-bold bg-bg-base"
                          : "text-text-primary text-m-medium"
                      )}
                      onClick={() => setSelectedSubject(subject)}
                    >
                      {subject.title}
                    </li>
                  );
                })}
              </ul>
              <ul className="w-full overflow-y-scroll bg-[#f6f6f6] px-[14px] rounded-tr-lg">
                {subjectItems?.map((subjectItem) => {
                  return (
                    <li
                      key={subjectItem.level}
                      className="h-[52px] flex items-center justify-between"
                    >
                      <p className="text-text-primary text-s-semibold">
                        {subjectItem.title}
                      </p>
                      <img
                        src="/images/icons/book-create/ico-plus.svg"
                        alt="플러스 아이콘"
                        width={19}
                        height={19}
                        onClick={() => {
                          setSelectedSubjectItems({
                            subjectItemId: subjectItem.id,
                            level: subjectItem.level,
                            title: subjectItem.title,
                          });
                          handleBottomDrawer(false);
                        }}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        }
      />
    </div>
  );
}
