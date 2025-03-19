import Select from "@/components/Select";
import React from "react";
import { useFormContext } from "react-hook-form";
import { CreateAttendeeSchema } from "../_schema";
import { twMerge } from "tailwind-merge";
import { RelationType } from "@/api/type";
import Radio from "@/components/Radio";
import CheckBox from "@/components/CheckBox";
import tw from "tailwind-styled-components";
import FieldHeader from "../../../components/FieldTitle";
import { relationTypeToKor } from "@/utils/enumMapper";
import Input from "@/components/Input";

export default function Step1() {
  const handleDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    parameter: "attendeeRequest.birthDate" | "attendeeRequest.enrollmentDate"
  ) => {
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

    if (input.length >= 4) {
      const year = parseInt(input.slice(0, 4));
      const convertedYear = Math.min(
        Math.max(year, 1900),
        new Date().getFullYear() + 1
      ); // 내년에 입학할 수도 있으니 최대 + 1 까지는 가능하도록
      input = convertedYear + input.slice(4);
    }

    if (input.length >= 7) {
      const month = parseInt(input.slice(5, 7));
      const convertedMonth = Math.min(Math.max(month, 1), 12);
      input =
        input.slice(0, 5) +
        String(convertedMonth).padStart(2, "0") +
        input.slice(7);
    }

    if (input.length >= 10) {
      const day = parseInt(input.slice(8, 10));
      const convertedDay = Math.min(Math.max(day, 1), 31);
      input = input.slice(0, 8) + String(convertedDay).padStart(2, "0");
    }

    setValue(parameter, input.replaceAll(".", "-"));
  };

  const {
    setValue,
    register,
    watch,
    formState: { errors },
  } = useFormContext<CreateAttendeeSchema>();

  // getValue를 사용하면 렌더링이 안되어 성별 선택을 실시간으로 볼 수 없기 때문에 watch 함수를 사용
  const gender = watch("attendeeRequest.gender");
  const associate = watch("attendeeRequest.associates");

  return (
    <div className="flex flex-col justify-center gap-6 max-w-[342px] w-full">
      {/* 학생 이름 */}
      <FieldWrapper>
        <FieldHeader title="학생 이름" essential />
        <div className="flex flex-col gap-[1px] w-full text-left">
          <Input
            placeholder="학생 이름"
            {...register("attendeeRequest.name")}
            onChange={(e) => {
              setValue("attendeeRequest.name", e.target.value);
            }}
          />
          {errors?.attendeeRequest?.name && (
            <p className="text-red-500 text-xs mt-1">
              {errors.attendeeRequest.name.message}
            </p>
          )}
        </div>
      </FieldWrapper>
      {/* 학생 생년월일/성별 */}
      <FieldWrapper>
        <FieldHeader title="학생 생년월일/성별" essential />
        <div className="flex flex-col gap-[1px] w-full text-left">
          <div className="flex items-center gap-[9px]">
            <Input
              {...register("attendeeRequest.birthDate")}
              onChange={(e) => handleDateChange(e, "attendeeRequest.birthDate")}
              placeholder="YYYY.MM.DD"
            />

            <div className="flex px-2 max-w-[170px] w-full h-12">
              <div className="flex gap-8">
                <Radio
                  label="남성"
                  onChange={() => setValue("attendeeRequest.gender", "MALE")}
                  id="gender"
                  checked={gender === "MALE"}
                />
                <Radio
                  label="여성"
                  onChange={() => setValue("attendeeRequest.gender", "FEMALE")}
                  id="gender"
                  checked={gender === "FEMALE"}
                />
              </div>
            </div>
          </div>
          <div>
            {errors.attendeeRequest?.birthDate && (
              <p className="text-red-500 text-xs mt-1">
                {errors.attendeeRequest.birthDate.message}
              </p>
            )}
            {errors.attendeeRequest?.gender && (
              <p className="text-red-500 text-xs mt-1">
                {errors.attendeeRequest.gender.message}
              </p>
            )}
          </div>

          <Input type="hidden" {...register("attendeeRequest.gender")} />
        </div>
      </FieldWrapper>

      {/* 학생 입학일 */}
      <FieldWrapper>
        <FieldHeader title="학생 입학일" essential />

        <div className="flex flex-col gap-[1px] w-full text-left">
          <div className="flex items-center gap-[9px]">
            <Input
              {...register("attendeeRequest.enrollmentDate")}
              placeholder="YYYY.MM.DD"
              onChange={(e) =>
                handleDateChange(e, "attendeeRequest.enrollmentDate")
              }
            />

            <CheckBox
              label="오늘 입학"
              id="admittedToday"
              onChange={(e) => {
                if (e.target.checked) {
                  const today = new Date();
                  const yyyy = today.getFullYear();
                  const mm = String(today.getMonth() + 1).padStart(2, "0");
                  const dd = String(today.getDate()).padStart(2, "0");
                  const formattedDate = `${yyyy}.${mm}.${dd}`;
                  setValue(
                    "attendeeRequest.enrollmentDate",
                    formattedDate.replaceAll(".", "-")
                  );
                } else {
                  setValue("attendeeRequest.enrollmentDate", "");
                }
              }}
            />
          </div>

          {errors.attendeeRequest?.enrollmentDate && (
            <p className="text-red-500 text-xs mt-1">
              {errors.attendeeRequest.enrollmentDate.message}
            </p>
          )}
        </div>
      </FieldWrapper>
      {/* 가족 연락처 */}
      <FieldWrapper>
        <FieldHeader title="가족 연락처" />
        <div className="flex gap-2">
          <Select
            value={
              associate && associate[0]?.relationType
                ? relationTypeToKor(
                    associate?.[0]?.relationType as RelationType
                  )
                : "관계"
            }
            onChange={(value: string) => {
              setValue("attendeeRequest.associates", [
                {
                  relationType: value as RelationType,
                  phoneNumber: "",
                },
              ]);
            }}
            options={[
              { name: "모", value: "MOTHER" },
              { name: "부", value: "FATHER" },
              { name: "형제", value: "SIBLING" },
              { name: "기타", value: "OTHER" },
            ]}
            placeholder="관계"
          />
          <Input
            value={associate?.[0]?.phoneNumber}
            disabled={!associate?.[0]?.relationType}
            onChange={(e) => {
              setValue(
                "attendeeRequest.associates.0.phoneNumber",
                e.target.value.replace(/[^0-9]/g, "")
              );
            }}
            placeholder="01012345678"
            className={twMerge(
              "max-w-[342px] text-m-medium",
              !(associate && associate[0].relationType) && "bg-gray-100"
            )}
          />
        </div>
      </FieldWrapper>
      {/* 학생 주소 */}
      <FieldWrapper>
        <FieldHeader title="학생 주소" />
        <div className="flex flex-col gap-[1px] w-full text-left">
          <Input
            placeholder="학생 주소"
            {...register("attendeeRequest.address_1")}
          />
        </div>
      </FieldWrapper>
      {/* 학교(선택) */}
      <FieldWrapper>
        <FieldHeader title="학교" />
        <Input
          type="text"
          placeholder="개굴초등학교"
          {...register("attendeeRequest.school")}
        />
      </FieldWrapper>
      {/* 비고(선택) */}
      <FieldWrapper>
        <FieldHeader title="비고" />
        <Input {...register("attendeeRequest.description")} />
      </FieldWrapper>
    </div>
  );
}

const FieldWrapper = tw.div`flex flex-col gap-2`;
