import { GenderType } from "@/api v2/AttendeeSchema";
import RelationshipSelect from "@/components/Select";
import React from "react";
import { useFormContext } from "react-hook-form";
import { CreateAttendeeSchema } from "../_schema";

interface Step1FormState {
  name: string;
  actualName: string;
  birthDate: string;
  gender: GenderType;
  enrollmentDate: string;
  // admittedToday: boolean;
  address_1: string;
  school: string;
  description: string;
}

// Step1에서 받을 props 정의
interface Step1Props {
  onChangeGuardian: (key: string, value: string) => void;
}

export default function Step1({ onChangeGuardian }: Step1Props) {
  const handleBirthdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, ""); // 숫자 이외 제거

    if (input.length > 8) {
      input = input.slice(0, 8);
    }

    if (input.length >= 5) {
      input = input.slice(0, 4) + "." + input.slice(4);
    }

    if (input.length >= 8) {
      input = input.slice(0, 7) + "." + input.slice(7);
    }

    setValue("attendeeRequest.birthDate", input);
  };

  const handleEntranceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, ""); // 숫자 이외 제거

    if (input.length > 8) {
      input = input.slice(0, 8);
    }

    if (input.length >= 5) {
      input = input.slice(0, 4) + "." + input.slice(4);
    }

    if (input.length >= 8) {
      input = input.slice(0, 7) + "." + input.slice(7);
    }
    setValue("attendeeRequest.enrollmentDate", input);
  };

  const {
    setValue,
    register,
    watch,
    formState: { errors },
  } = useFormContext<CreateAttendeeSchema>();

  // getValue를 사용하면 렌더링이 안되어 성별 선택을 실시간으로 볼 수 없기 때문에 watch 함수를 사용
  const gender = watch("attendeeRequest.gender");
  return (
    <div className="flex flex-col justify-center gap-6 max-w-[342px] w-full">
      {/* 학생 이름 */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-1 items-center">
          <p className="font-bold text-m-medium">학생 이름</p>
          <p className="text-text-danger">*</p>
        </div>
        <div className="flex flex-col gap-[1px] w-full text-left">
          <input
            type="text"
            placeholder="학생 이름"
            {...register("attendeeRequest.name")}
            className="max-w-[342px] bg-white w-full h-12 border border-[#E7E7E7] rounded-xl p-4 outline-none text-m-medium text-text-secondary"
          />
          {errors?.attendeeRequest?.name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.attendeeRequest.name.message}
            </p>
          )}
        </div>
      </div>
      {/* 학생 생년월일/성별 */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-1 items-center">
          <p className="font-bold text-m-medium">학생 생년월일/성별</p>
          <p className="text-text-danger">*</p>
        </div>

        <div className="flex flex-col gap-[1px] w-full text-left">
          <div className="flex items-center gap-[9px]">
            <input
              type="text"
              {...register("attendeeRequest.birthDate")}
              onChange={handleBirthdateChange}
              placeholder="YYYY.MM.DD"
              className="outline-none bg-white border border-[#E7E7E7] rounded-xl max-w-[163px] w-full h-12 flex items-center pl-4"
            />
            <div className="flex px-2 max-w-[170px] w-full h-12">
              <div className="flex gap-8">
                <div className="inline-flex items-center">
                  <label
                    className="relative flex items-center cursor-pointer"
                    htmlFor="male"
                  >
                    <input
                      name="gender"
                      value="MALE"
                      type="radio"
                      id="male"
                      className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all"
                      checked={gender === "MALE"}
                      onChange={(e) => {
                        setValue(
                          "attendeeRequest.gender",
                          e.target.value as "MALE" | "FEMALE"
                        );
                      }}
                    />
                    <span className="absolute bg-bg-tertiary w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                  </label>
                  <label
                    className="ml-2 text-text-primary text-s-bold cursor-pointer"
                    htmlFor="male"
                  >
                    남성
                  </label>
                </div>

                <div className="inline-flex items-center">
                  <label
                    className="relative flex items-center cursor-pointer"
                    htmlFor="female"
                  >
                    <input
                      name="gender"
                      value="FEMALE"
                      type="radio"
                      id="female"
                      className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all"
                      checked={gender === "FEMALE"}
                      onChange={(e) => {
                        setValue(
                          "attendeeRequest.gender",
                          e.target.value as "MALE" | "FEMALE"
                        );
                      }}
                    />
                    <span className="absolute bg-bg-tertiary w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                  </label>
                  <label
                    className="ml-2 text-text-primary text-s-bold cursor-pointer"
                    htmlFor="female"
                  >
                    여성
                  </label>
                </div>
              </div>
            </div>
          </div>
          {errors?.attendeeRequest?.birthDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.attendeeRequest.birthDate.message}
            </p>
          )}
          {errors?.attendeeRequest?.gender && (
            <p className="text-red-500 text-sm mt-1">
              {errors.attendeeRequest.gender.message}
            </p>
          )}
          <input type="hidden" {...register("attendeeRequest.gender")} />
        </div>
      </div>
      {/* 학생 입학일 */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-1 items-center">
          <p className="font-bold text-m-medium">학생 입학일</p>
          <p className="text-text-danger">*</p>
        </div>

        <div className="flex flex-col gap-[1px] w-full text-left">
          <div className="flex items-center gap-[9px]">
            <input
              type="text"
              {...register("attendeeRequest.enrollmentDate")}
              placeholder="YYYY.MM.DD"
              onChange={handleEntranceChange}
              className="outline-none bg-white border border-[#E7E7E7] rounded-xl max-w-[163px] w-full h-12 flex items-center pl-4"
            />
            <div className="flex px-4 max-w-[170px] w-full h-12">
              <div className="flex items-center">
                <div className="inline-flex items-center">
                  <label className="flex items-center cursor-pointer relative">
                    <input
                      type="checkbox"
                      // checked={formData.admittedToday}
                      onChange={(e) => {
                        if (e.target.checked) {
                          const today = new Date();
                          const yyyy = today.getFullYear();
                          const mm = String(today.getMonth() + 1).padStart(
                            2,
                            "0"
                          );
                          const dd = String(today.getDate()).padStart(2, "0");
                          const formattedDate = `${yyyy}.${mm}.${dd}`;

                          setValue(
                            "attendeeRequest.enrollmentDate",
                            formattedDate
                          );
                        } else {
                          setValue("attendeeRequest.enrollmentDate", "");
                        }
                      }}
                      className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded border border-slate-300 checked:bg-bg-tertiary checked:border-bg-tertiary"
                      id="admittedToday"
                    />
                    <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </label>
                </div>
                <label
                  htmlFor="admittedToday"
                  className="ml-2 text-text-primary text-s-bold cursor-pointer"
                >
                  오늘 입학
                </label>
              </div>
            </div>
          </div>

          {errors.attendeeRequest?.enrollmentDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.attendeeRequest.enrollmentDate.message}
            </p>
          )}
        </div>
      </div>
      {/* 가족 연락처 */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-1 items-center">
          <p className="font-bold text-m-medium">가족 연락처</p>
        </div>
        <div className="flex gap-2">
          <RelationshipSelect onChangeGuardian={onChangeGuardian} />
          <input
            type="text"
            placeholder="ex) 01012345678"
            className="max-w-[342px] bg-white w-full h-12 border border-[#E7E7E7] rounded-xl p-4 outline-none text-m-medium text-text-secondary"
            onChange={(e) => onChangeGuardian("phoneNumber", e.target.value)}
          />
        </div>
      </div>
      {/* 학생 주소 */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-1 items-center">
          <p className="font-bold text-m-medium">학생 주소</p>
          <p className="text-text-danger">*</p>
        </div>
        <div className="flex flex-col gap-[1px] w-full text-left">
          <input
            type="text"
            placeholder="학생 주소"
            {...register("attendeeRequest.address_1")}
            className="max-w-[342px] bg-white w-full h-12 border border-[#E7E7E7] rounded-xl p-4 outline-none text-m-medium text-text-secondary"
          />
          {errors.attendeeRequest?.address_1 && (
            <p className="text-red-500 text-sm mt-1">
              {errors.attendeeRequest.address_1.message}
            </p>
          )}
        </div>
      </div>
      {/* 학교(선택) */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-1 items-center">
          <p className="font-bold text-m-medium">학교(선택)</p>
        </div>
        <input
          type="text"
          placeholder="개굴초등학교"
          className="max-w-[342px] bg-white w-full h-12 border border-[#E7E7E7] rounded-xl p-4 outline-none text-m-medium text-text-secondary"
        />
      </div>
      {/* 비고(선택) */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-1 items-center">
          <p className="font-bold text-m-medium">비고(선택)</p>
        </div>
        <input
          type="text"
          placeholder=""
          className="max-w-[342px] bg-white w-full h-12 border border-[#E7E7E7] rounded-xl p-4 outline-none text-m-medium text-text-secondary"
        />
      </div>
    </div>
  );
}
