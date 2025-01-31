import { updateAttendeeDetail } from "@/api v2/AttendeeApiClient";
import { GenderType } from "@/api v2/AttendeeSchema";
import { QueryClient, useMutation } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

interface AttendeeModifyFormState {
  birthDate: string;
  gender: GenderType;
  address_1: string;
  description: string;
}

// Step1에서 받을 props 정의
interface AttendeeModifyProps {
  formData: AttendeeModifyFormState;
  setIsAttendeeModify: React.Dispatch<React.SetStateAction<boolean>>;
  setFormData: React.Dispatch<React.SetStateAction<AttendeeModifyFormState>>;
  bookId: number;
  attendeeId: number;
}

export default function AttendeeModify({
  formData,
  setFormData,
  setIsAttendeeModify,
  attendeeId,
  bookId,
}: AttendeeModifyProps) {
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

  const queryClinet = new QueryClient();
  const { mutate: attendeeMutation } = useMutation({
    mutationFn: async () =>
      await updateAttendeeDetail({
        attendanceBookId: Number(bookId),
        attendeeId: Number(attendeeId),
        params: {
          birthDate: formData.birthDate.replaceAll(".", "-"),
          gender: formData.gender,
          address_1: formData.address_1,
          description: formData.description,
        },
      }),
    onSuccess: () => {
      queryClinet.invalidateQueries({
        queryKey: ["attendee-detail", String(attendeeId)],
      });

      toast.success("학생 정보가 저장되었습니다.");
      setIsAttendeeModify(false);
    },
  });

  const isFormInvalid =
    !formData.address_1 || !formData.birthDate || !formData.gender;

  return (
    <div className="flex flex-col justify-center gap-6 max-w-[342px] w-full bg-white p-5 rounded-2xl">
      {/* 학생 생년월일/성별 */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-1 items-center">
          <p className="font-bold text-m-medium">학생 생년월일/성별</p>
          <p className="text-text-danger">*</p>
        </div>

        <div className="flex items-center gap-[9px]">
          {/* 생년월일은 실제로는 datepicker 등을 사용하거나, 텍스트 입력으로 처리 가능 */}
          <input
            type="text"
            placeholder="YYYY.MM.DD"
            className="outline-none bg-white border border-[#E7E7E7] rounded-xl max-w-[163px] w-full h-12 flex items-center pl-[10px]"
            value={formData.birthDate}
            onChange={handleBirthdateChange}
          />

          {/* 성별 라디오 버튼 */}
          <div className="flex px-4 max-w-[170px] w-full h-12">
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
                  className="ml-1  w-7 text-text-primary text-s-semibold cursor-pointer"
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
                  className="ml-1 w-7 text-text-primary text-s-semibold cursor-pointer"
                  htmlFor="female"
                >
                  여성
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 학생 주소 */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-1 items-center">
          <p className="font-bold text-m-medium">학생 주소</p>
          <p className="text-text-danger">*</p>
        </div>
        <input
          type="text"
          placeholder="학생 주소"
          className="max-w-[342px] bg-white w-full h-12 border border-[#E7E7E7] rounded-xl p-4 outline-none text-m-medium text-text-secondary"
          value={formData.address_1}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              address_1: e.target.value,
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
      <div className="flex gap-4 w-full">
        <button
          type="button"
          onClick={() => {
            setIsAttendeeModify(false);
          }}
          className="w-full h-12 flex justify-center items-center rounded-2xl bg-bg-secondary text-text-secondary text-l-semibold"
        >
          취소
        </button>
        <button
          onClick={() => {
            attendeeMutation();
          }}
          disabled={isFormInvalid}
          type="button"
          className={twMerge(
            "w-full h-12 flex justify-center items-center rounded-2xl bg-bg-tertiary font-semibold text-[18px]",
            !isFormInvalid
              ? "bg-bg-tertiary text-[white]"
              : "bg-bg-disabled text-text-disabled"
          )}
        >
          저장하기
        </button>
      </div>
    </div>
  );
}
