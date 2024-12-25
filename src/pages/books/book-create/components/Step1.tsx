import { CreateBookRequest, DaysType } from "@/api v2/AttendanceBookSchema";
import React, { ChangeEvent, useRef, useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { twMerge } from "tailwind-merge";

type IProps = {
  register: UseFormRegister<CreateBookRequest>;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onDaysChange: (day: DaysType) => void;
  fileUrl?: string;
  dayArrays: DaysType[];
  DaysMatch: Record<string, DaysType>;
};

const DAYS = ["월", "화", "수", "목", "금", "토", "일"];

export default function Step1(props: IProps) {
  const {
    register,
    handleFileChange,
    fileUrl,
    dayArrays,
    DaysMatch,
    onDaysChange,
  } = props;
  const fileRef = useRef<HTMLInputElement | null>(null);
  const triggerFileInput = () => {
    fileRef.current?.click();
  };

  return (
    <React.Fragment>
      {/* 출석부 이름 */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-1 items-center">
          <p className="font-bold text-m-medium">출석부</p>
          <p className="text-text-danger">*</p>
        </div>

        <input
          {...register("title", { required: true })}
          type="text"
          placeholder="출석부 이름"
          className="max-w-[342px] bg-white w-full h-12 border border-[#E7E7E7] rounded-xl p-4 outline-none text-m-bold"
        />
      </div>

      {/* 수업 요일 */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-1 items-center">
          <p className="font-bold text-m-medium">수업 요일</p>
          <p className="text-text-danger">*</p>
        </div>

        <div className="grid grid-cols-7 gap-0">
          {DAYS.map((day, index) => {
            return (
              <div
                key={day}
                className={twMerge(
                  "max-w-11 h-11 rounded-lg flex justify-center items-center",
                  dayArrays.includes(DaysMatch[DAYS[index]])
                    ? "bg-bg-primary text-text-interactive-primary"
                    : "bg-bg-secondary text-text-secondary"
                )}
                onClick={() => onDaysChange(DAYS[index] as DaysType)}
              >
                <span className="font-semibold text-base">{DAYS[index]}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 수업 시간 */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-1 items-center">
          <p className="font-bold text-m-medium">수업 시간</p>
          <p className="text-text-danger">*</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-2 items-center max-w-[163px] w-full">
            <button
              type="button"
              className="outline-none border border-[#E7E7E7] rounded-xl max-w-[130px] w-full h-12  flex items-center pl-4"
            >
              <p className="font-bold text-sm text-[#B0B0B0] w-[53px]">
                시작 시간
              </p>
            </button>
            <p className="text-sm font-bold text-text-primary">부터</p>
          </div>
          <div className="flex gap-2 items-center max-w-[163px] w-full">
            <button
              type="button"
              className="outline-none border border-[#E7E7E7] rounded-xl max-w-[130px] w-full h-12  flex items-center pl-4"
            >
              <p className="font-bold text-sm text-[#B0B0B0] w-[53px]">
                종료 시간
              </p>
            </button>
            <p className="text-sm font-bold text-text-primary">까지</p>
          </div>
        </div>
      </div>

      {/* 커버 이미지 */}
      <div className="flex flex-col gap-2">
        <p className="font-bold text-m-medium text-left">커버 이미지(선택)</p>

        <div
          className="w-[81px] h-[81px] bg-bg-base border border-[#E7E7E7] rounded-xl flex justify-center items-center"
          onClick={triggerFileInput}
        >
          <input
            type="file"
            className="hidden"
            ref={fileRef}
            onChange={handleFileChange}
          />
          <img
            src={fileUrl ? fileUrl : "/images/icons/book-create/ico-plus.svg"}
            alt="이미지 추가 아이콘"
            className={twMerge(
              fileUrl ? "w-full h-full object-cover rounded-xl" : "w-7 h-7"
            )}
          />
        </div>
        <p className="text-xs font-medium text-text-secondary text-left">
          * JPG, PNG 파일만 업로드 가능합니다.
        </p>
      </div>

      {/* 설명*/}
      <div className="flex flex-col gap-2">
        <p className="font-bold text-m-medium text-left">설명(선택)</p>
        <input
          {...register("description")}
          type="text"
          className="max-w-[342px] bg-white w-full h-12 border border-[#E7E7E7] rounded-xl p-4 outline-none"
        />
      </div>
    </React.Fragment>
  );
}
