import { GenderType } from "@/api v2/AttendeeSchema";
import RelationshipSelect from "@/components/Select";
import React from "react";
import { useFormContext } from "react-hook-form";

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
  formData: Step1FormState;
  setFormData: React.Dispatch<React.SetStateAction<Step1FormState>>;
  onChangeGuardian: (key: string, value: string) => void;
}

export default function Step1({
  formData,
  setFormData,
  onChangeGuardian,
}: Step1Props) {
  const handleBirthdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 1) 숫자만 남기기
    let input = e.target.value.replace(/\D/g, ""); // 숫자 이외 제거

    // 2) 최대 8자리(YYYYMMDD)까지만 허용
    if (input.length > 8) {
      input = input.slice(0, 8);
    }

    // 3) 4자리 넘어가면 YYYY. 형식으로
    if (input.length >= 5) {
      input = input.slice(0, 4) + "." + input.slice(4);
    }
    // 4) 6자리 넘어가면 YYYY.MM. 형식으로
    if (input.length >= 8) {
      input = input.slice(0, 7) + "." + input.slice(7);
    }

    // 최종 formData 갱신
    setFormData((prev) => ({
      ...prev,
      birthDate: input,
    }));
  };

  const handleEntranceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 1) 숫자만 남기기
    let input = e.target.value.replace(/\D/g, ""); // 숫자 이외 제거

    // 2) 최대 8자리(YYYYMMDD)까지만 허용
    if (input.length > 8) {
      input = input.slice(0, 8);
    }

    // 3) 4자리 넘어가면 YYYY. 형식으로
    if (input.length >= 5) {
      input = input.slice(0, 4) + "." + input.slice(4);
    }
    // 4) 6자리 넘어가면 YYYY.MM. 형식으로
    if (input.length >= 8) {
      input = input.slice(0, 7) + "." + input.slice(7);
    }

    // 최종 formData 갱신
    setFormData((prev) => ({
      ...prev,
      enrollmentDate: input,
    }));
  };

  const {
    setValue,
    register,
    formState: { errors },
  } = useFormContext();

  console.log(errors);
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
            {...register("name", {
              required: "이름은 최소 2글자 이상 입력해주세요.",
            })}
            className="max-w-[342px] bg-white w-full h-12 border border-[#E7E7E7] rounded-xl p-4 outline-none text-m-medium text-text-secondary"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          {/* {errors?.attendeeRequest.name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.attendeeRequest.name.message}
            </p>
          )} */}
        </div>
      </div>
      {/* 학생 생년월일/성별 */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-1 items-center">
          <p className="font-bold text-m-medium">학생 생년월일/성별</p>
          <p className="text-text-danger">*</p>
        </div>

        <div className="flex items-center gap-[9px]">
          {/* 생년월일은 실제로는 datepicker 등을 사용하거나, 텍스트 입력으로 처리 가능 */}
          <div className="flex flex-col gap-[1px] w-full text-left">
            <input
              type="text"
              {...register("birthDate", {
                required: "생년월일은 필수 입니다.",
              })}
              placeholder="YYYY.MM.DD"
              className="outline-none bg-white border border-[#E7E7E7] rounded-xl max-w-[163px] w-full h-12 flex items-center pl-4"
              value={formData.birthDate}
              onChange={handleBirthdateChange}
            />
            {/* {errors.birthDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.birthDate.message}
              </p>
            )} */}
          </div>

          {/* 성별 라디오 버튼 */}
          <div className="flex flex-col gap-[1px] w-full text-left">
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
                      checked={formData.gender === "MALE"}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          gender: e.target.value as "MALE" | "FEMALE",
                        }));
                        setValue("gender", e.target.value as "MALE" | "FEMALE");
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
                      checked={formData.gender === "FEMALE"}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          gender: e.target.value as "MALE" | "FEMALE",
                        }))
                      }
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
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">
                {"성별은 필수 입니다."}
              </p>
            )}
          </div>
          <input
            type="hidden"
            {...register("gender", { required: "성별은 필수 입니다." })}
          />
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
              {...register("enrollmentDate", {
                required: "학생 입학일은 필수입니다.",
              })}
              placeholder="YYYY.MM.DD"
              className="outline-none bg-white border border-[#E7E7E7] rounded-xl max-w-[163px] w-full h-12 flex items-center pl-4"
              value={formData.enrollmentDate}
              onChange={handleEntranceChange}
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
                          setFormData((prev) => ({
                            ...prev,
                            // admittedToday: true,
                            enrollmentDate: formattedDate,
                          }));
                          setValue("enrollmentDate", formattedDate);
                        } else {
                          setFormData((prev) => ({
                            ...prev,
                            // admittedToday: false,
                            enrollmentDate: "",
                          }));
                          setValue("enrollmentDate", "");
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

          {/* {errors.enrollmentDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.enrollmentDate.message}
            </p>
          )} */}
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
            {...register("address_1", {
              required: "학생 주소는 필수입니다.",
            })}
            className="max-w-[342px] bg-white w-full h-12 border border-[#E7E7E7] rounded-xl p-4 outline-none text-m-medium text-text-secondary"
            value={formData.address_1}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                address_1: e.target.value,
              }))
            }
          />
          {/* {errors.address_1 && (
            <p className="text-red-500 text-sm mt-1">
              {errors.address_1.message}
            </p>
          )} */}
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
          value={formData.school}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              school: e.target.value,
            }))
          }
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
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
        />
      </div>
    </div>
  );
}
