import { CreateBookRequest } from "@/api v2/AttendanceBookSchema";
import React, { useState } from "react";
import { useForm, UseFormRegister } from "react-hook-form";

import BottomDrawer from "@/components/BottomDrawer";
import { twMerge } from "tailwind-merge";
import { createBook } from "@/api v2/AttendanceBookApiClient";

export default function Step2() {
  const {
    register,
    setValue,
    handleSubmit,
    getValues,
    watch,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<CreateBookRequest>({
    mode: "onBlur", // 폼이벤트 유효성 검사 트리거
  });

  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [curriculumData, setCurriCulumData] = useState<string[]>([]);
  const [isCurriculum, setIsCurriculum] = useState<boolean>(false);

  const onDrawerChange = () => {
    setOpenFilter(!openFilter);
  };

  const handleCurriculumChange = (curriCulumName: string) => {
    setCurriCulumData([...curriculumData, curriCulumName]);
  };

  return (
    <form
      onSubmit={handleSubmit(async () => {})}
      className="flex flex-col justify-center gap-6 max-w-[342px] w-full"
    >
      {/* 커리큘럼 추가된 것 */}
      {curriculumData.map((curriculum) => {
        return (
          <div className="border-t border-b border-[#f6f6f6] w-full h-16 flex justify-between items-center">
            <p className="text-m-bold text-text-primary pl-2">
              {curriculum} <span className="text-text-danger">*</span>
            </p>
            <img
              src={"/images/icons/book-create/ico-right-arrow.svg"}
              alt="이미지 추가 아이콘"
              width={32}
              height={32}
              className=""
            />
          </div>
        );
      })}

      {/* 커리큘럼 버튼 추가 */}

      {isCurriculum ? (
        <>
          {/* 커리큘럼 이름 */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-1 items-center">
              <p className="font-bold text-m-medium">커리큘럼 이름</p>
              <p className="text-text-danger">*</p>
            </div>

            <input
              {...register("curriculumName", { required: true })}
              type="text"
              placeholder="커리큘럼 이름"
              className="max-w-[342px] bg-white w-full h-12 border border-[#E7E7E7] rounded-xl p-4 outline-none text-m-medium text-text-secondary"
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
                <div
                  onClick={() => setOpenFilter(true)}
                  className="h-11 w-[326px] text-s-semibold text-text-primary flex gap-[1px] justify-center items-center"
                >
                  <img
                    src={"/images/icons/book-create/ico-plus.svg"}
                    alt="이미지 추가 아이콘"
                    width={15}
                    height={15}
                    className=""
                  />
                  <p className="text-s-medium text-border-secondary-hover">
                    과목 추가하기
                  </p>
                </div>
              </ul>
            </div>
            <BottomDrawer
              isOpen={openFilter}
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
                      alt="이미지 추가 아이콘"
                      className="absolute top-[2px] left-1"
                      onClick={onDrawerChange}
                    />
                  </div>

                  <div className="w-full max-w-[345px] h-[234px] flex bg-white ">
                    <ul className="w-full max-w-[107px] overflow-y-scroll scrollbar-hide rounded-tl-lg">
                      <li className="h-[52px] flex items-center justify-center text-text-brand text-m-bold bg-bg-base">
                        체르니
                      </li>
                      <li className="bg-white h-[52px] flex items-center justify-center text-m-medium text-text-primary">
                        하농
                      </li>
                      <li className="bg-white h-[52px] flex items-center justify-center text-m-medium text-text-primary">
                        재즈
                      </li>
                      <li className="bg-white h-[52px] flex items-center justify-center text-m-medium text-text-primary">
                        OST
                      </li>
                      <li className="bg-white h-[52px] flex items-center justify-center text-m-medium text-text-primary">
                        가요
                      </li>
                    </ul>
                    <ul className="w-full overflow-y-scroll bg-[#f6f6f6] px-[14px] rounded-tr-lg">
                      <li className="h-[52px] flex items-center justify-between">
                        <p className="text-text-primary text-s-semibold">
                          체르니
                        </p>
                        <img
                          src="/images/icons/book-roaster/ico-plus-black.svg"
                          alt="플러스 아이콘"
                          width={24}
                          height={24}
                        />
                      </li>
                    </ul>
                  </div>
                </div>
              }
            />
          </div>
          <button
            className={twMerge(
              "max-w-[341px] w-full h-[54px] flex justify-center items-center rounded-xl bg-bg-tertiary text-[#f1f8f3]"
            )}
            onClick={() => {
              handleCurriculumChange("curriculumData1");
              setIsCurriculum(false);
            }}
            type="submit"
          >
            <p className="font-semibold text-lg">확인</p>
          </button>
        </>
      ) : (
        <>
          <button className="w-full h-10 flex justify-center items-center bg-bg-secondary">
            <img
              src={"/images/icons/book-create/ico-plus.svg"}
              alt="이미지 추가 아이콘"
              width={24}
              height={24}
              onClick={() => setIsCurriculum(true)}
            />
            <p className="text-m-medium text-[#B0B0B0]">커리큘럼 추가하기 </p>
          </button>
          <div className="flex gap-4">
            <button className="w-full h-[54px] flex justify-center items-center rounded-2xl bg-bg-secondary text-text-secondary text-l-semibold">
              이전으로
            </button>
            <button className="w-full h-[54px] flex justify-center items-center rounded-2xl bg-bg-tertiary text-[#F1F8F3] text-l-semibold">
              생성하기
            </button>
          </div>
        </>
      )}
    </form>
  );
}
