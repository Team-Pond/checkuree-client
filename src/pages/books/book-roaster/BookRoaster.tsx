import BottomDrawer from "@/components/BottomDrawer";
import { useState } from "react";

export default function BookRoaster() {
  const MOCK_DATA = [
    {
      name: "배서윤",
      availableDays: "월, 화, 수",
      lesson: "바이엘 & 체르니",
      age: 12,
    },
    {
      name: "배서윤",
      availableDays: "월, 화, 수",
      lesson: "바이엘 & 체르니",
      age: 12,
    },
    {
      name: "배서윤",
      availableDays: "월, 화, 수",
      lesson: "바이엘 & 체르니",
      age: 12,
    },
    {
      name: "배서윤",
      availableDays: "월, 화, 수",
      lesson: "바이엘 & 체르니",
      age: 12,
    },
    {
      name: "배서윤",
      availableDays: "월, 화, 수",
      lesson: "바이엘 & 체르니",
      age: 12,
    },
    {
      name: "배서윤",
      availableDays: "월, 화, 수",
      lesson: "바이엘 & 체르니",
      age: 12,
    },
    {
      name: "배서윤",
      availableDays: "월, 화, 수",
      lesson: "바이엘 & 체르니",
      age: 12,
    },
    {
      name: "배서윤",
      availableDays: "월, 화, 수",
      lesson: "바이엘 & 체르니",
      age: 12,
    },
    {
      name: "배서윤",
      availableDays: "월, 화, 수",
      lesson: "바이엘 & 체르니",
      age: 12,
    },
    {
      name: "배서윤",
      availableDays: "월, 화, 수",
      lesson: "바이엘 & 체르니",
      age: 12,
    },
    {
      name: "배서윤",
      availableDays: "월, 화, 수",
      lesson: "바이엘 & 체르니",
      age: 12,
    },
    {
      name: "배서윤",
      availableDays: "월, 화, 수",
      lesson: "바이엘 & 체르니",
      age: 12,
    },
    {
      name: "배서윤",
      availableDays: "월, 화, 수",
      lesson: "바이엘 & 체르니",
      age: 12,
    },
    {
      name: "배서윤",
      availableDays: "월, 화, 수",
      lesson: "바이엘 & 체르니",
      age: 12,
    },
    {
      name: "배서윤",
      availableDays: "월, 화, 수",
      lesson: "바이엘 & 체르니",
      age: 12,
    },
    {
      name: "배서윤",
      availableDays: "월, 화, 수",
      lesson: "바이엘 & 체르니",
      age: 12,
    },
  ];

  const [openFilter, setOpenFilter] = useState<boolean>(false);

  const onDrawerChange = () => {
    setOpenFilter(!openFilter);
  };
  return (
    <section className="flex flex-col w-full min-h-screen">
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
        <input
          type="text"
          className="bg-bg-secondary rounded-lg max-w-[307px] w-full h-11 outline-none"
        />
        <img
          width={40}
          height={40}
          src={"/images/icons/book-roaster/ico-slider.svg"}
          alt="이미지 추가 아이콘"
          className="text-black"
          onClick={onDrawerChange}
        />
      </div>

      <div className="w-full px-[17px] ">
        <p className="text-left text-s-semibold text-text-secondary mb-1">
          전체
        </p>
        <div className="border-t border-[#F6F6F6]">
          {MOCK_DATA.map((student) => {
            return (
              <div className="py-4 px-2 flex gap-4">
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
                      {student.availableDays}
                    </p>
                    <p className="text-[#B0B0B0] text-s-medium">
                      {student.lesson}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <BottomDrawer isOpen={openFilter} onClose={onDrawerChange} children />
    </section>
  );
}
