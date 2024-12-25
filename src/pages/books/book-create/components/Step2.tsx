import { CreateBookRequest } from "@/api v2/AttendanceBookSchema";
import React, { useState } from "react";
import { UseFormRegister } from "react-hook-form";

import BottomDrawer from "@/components/BottomDrawer";

type IProps = {
  register: UseFormRegister<CreateBookRequest>;
};
export default function Step2(props: IProps) {
  const { register } = props;

  const [openFilter, setOpenFilter] = useState<boolean>(false);

  const onDrawerChange = () => {
    setOpenFilter(!openFilter);
  };
  return (
    <React.Fragment>
      {/* 커리큘럼 이름 */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-1 items-center">
          <p className="font-bold text-m-medium">커리큘럼 이름</p>
          <p className="text-text-danger">*</p>
        </div>

        <input
          {...register("title", { required: true })}
          type="text"
          placeholder="커리큘럼 이름"
          className="max-w-[342px] bg-white w-full h-12 border border-[#E7E7E7] rounded-xl p-4 outline-none text-m-bold"
        />
      </div>

      {/* 커리큘럼 내용 */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-1 items-center">
          <p className="font-bold text-m-medium">커리큘럼 내용</p>
          <p className="text-text-danger">*</p>
        </div>

        <div className="max-w-[343px] rounded-2xl py-1 px-2 text-left bg-bg-base">
          <ul>
            <li className="h-11 w-[326px] py-4 text-s-semibold text-text-primary">
              <p className="ml-8 px-[2px]">올챙이(기본)</p>
            </li>
            <li className="h-11 w-[326px] px-1 py-4 text-s-semibold text-text-primary flex items-center gap-1">
              <img
                src={"/images/icons/book-create/ico-plus.svg"}
                alt="이미지 추가 아이콘"
                width={24}
                height={24}
                className=""
              />
              <p className="px-[2px]">바이엘1</p>
            </li>
            <li className="h-11 w-[326px] px-1 py-4 text-s-semibold text-text-primary flex items-center gap-1">
              <img
                src={"/images/icons/book-create/ico-plus.svg"}
                alt="이미지 추가 아이콘"
                width={24}
                height={24}
                className=""
              />
              <p className="px-[2px]">바이엘1</p>
            </li>
            <li className="h-11 w-[326px] px-1 py-4 text-s-semibold text-text-primary flex items-center gap-1">
              <img
                src={"/images/icons/book-create/ico-plus.svg"}
                alt="이미지 추가 아이콘"
                width={24}
                height={24}
                className=""
              />
              <p className="px-[2px]">바이엘1</p>
            </li>
            <li className="h-11 w-[326px] px-1 py-4 text-s-semibold text-text-primary flex items-center gap-1">
              <img
                src={"/images/icons/book-create/ico-plus.svg"}
                alt="이미지 추가 아이콘"
                width={24}
                height={24}
                className=""
              />
              <p className="px-[2px]">바이엘1</p>
            </li>
            <div className="h-11 w-[326px] text-s-semibold text-text-primary flex gap-[1px] justify-center items-center">
              <img
                src={"/images/icons/book-create/ico-plus.svg"}
                alt="이미지 추가 아이콘"
                width={19}
                height={19}
                className=""
              />
              <p className="text-s-medium text-border-secondary-hover">
                과목 추가하기
              </p>
            </div>
          </ul>
        </div>
        <BottomDrawer
          isOpen
          onClose={() => {}}
          children={
            <>
              <div className="relative w-full">
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

              <div className="w-full px-[22px] flex bg-white">
                <ul>
                  <li className="w-full max-w-[107px] h-[52px] flex items-center justify-center text-text-brand text-m-bold bg-bg-base">
                    체르니
                  </li>
                  <li className="bg-white max-w-[107px] h-[52px] flex items-center justify-center text-m-medium text-text-primary">
                    하농
                  </li>
                  <li>재즈</li>
                  <li>OST</li>
                  <li>가요</li>
                </ul>
                <div></div>
              </div>
            </>
          }
        />
      </div>
    </React.Fragment>
  );
}
