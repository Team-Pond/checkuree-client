import React from "react";
import { useFormContext } from "react-hook-form";

import { Associates } from "@/api/type";

import CounsellerSelect from "./Select";

import { CreateCounsellingSchema } from "../../_schema";
import { CounsellingTopicType } from "@/api/CounselSchema";
import Radio from "@/components/Radio";
import CheckBox from "@/components/CheckBox";

interface Step1Props {
  onChangeCounseleeId: (id: number) => void;
  counselors: {
    name: string;
    value: string;
  }[];
}

export default function CounsellingCreateForm({
  onChangeCounseleeId,
  counselors,
}: Step1Props) {
  const handleDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    parameter: "counsellingAt"
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

    setValue(parameter, input.replaceAll(".", "-"));
  };

  const {
    setValue,
    register,
    watch,
    formState: { errors },
  } = useFormContext<CreateCounsellingSchema>();

  // getValue를 사용하면 렌더링이 안되어 성별 선택을 실시간으로 볼 수 없기 때문에 watch 함수를 사용
  const counsellingType = watch("type");

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    topic: CounsellingTopicType
  ) => {
    const updatedTopics = watch("topics") || [];

    if (e.target.checked) {
      setValue("topics", [...updatedTopics, topic]);
    } else {
      setValue(
        "topics",
        updatedTopics.filter((item) => item !== topic)
      );
    }
  };

  return (
    <div className="flex flex-col justify-center gap-6 max-w-[342px] w-full">
      <div className="flex flex-col gap-2">
        <div className="flex gap-1 items-center">
          <p className="font-bold text-m-medium">상담자</p>
          <p className="text-text-danger">*</p>
        </div>
        <div className="flex flex-col gap-[1px] w-full text-left">
          <CounsellerSelect
            onChange={onChangeCounseleeId}
            options={counselors}
            placeholder="관계"
          />
        </div>
      </div>

      {/* 상담 유형 */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-1 items-center">
          <p className="font-bold text-m-medium">상담 유형</p>
          <p className="text-text-danger">*</p>
        </div>

        <div className="flex px-2 w-full h-12">
          <div className="flex gap-8">
            <Radio
              label="방문"
              onChange={() => setValue("type", "VISIT")}
              id="visit"
              checked={counsellingType === "VISIT"}
            />
            <Radio
              label="카카오톡"
              onChange={() => setValue("type", "KAKAOTALK")}
              id="kakaoTalk"
              checked={counsellingType === "KAKAOTALK"}
            />
            <Radio
              label="전화"
              onChange={() => setValue("type", "PHONE")}
              id="phone"
              checked={counsellingType === "PHONE"}
            />
          </div>
        </div>
        {errors?.type && (
          <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
        )}
      </div>

      {/* 상담일시 */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-1 items-center">
          <p className="font-bold text-m-medium">상담일시</p>
          <p className="text-text-danger">*</p>
        </div>

        <div className="flex flex-col gap-[1px] w-full text-left">
          <div className="flex items-center gap-[9px]">
            <input
              type="text"
              {...register("counsellingAt")}
              onChange={(e) => handleDateChange(e, "counsellingAt")}
              placeholder="YYYY.MM.DD"
              className="outline-none bg-white border border-[#E7E7E7] rounded-xl w-full h-12 flex items-center pl-4"
            />
          </div>
        </div>
        {errors?.counsellingAt && (
          <p className="text-red-500 text-sm mt-1">
            {errors.counsellingAt.message}
          </p>
        )}
      </div>

      {/* 상담 주제 */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-1 items-center">
          <p className="font-bold text-m-medium">상담 주제</p>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex gap-2">
            <CheckBox
              label={"오늘 입학"}
              checked={watch("topics")?.includes("FUTURE_PATH")}
              onChange={(e) => handleCheckboxChange(e, "FUTURE_PATH")}
              id="0"
            />
            <CheckBox
              label={"진도 상담"}
              checked={watch("topics")?.includes("STUDY_PROGRESS")}
              onChange={(e) => handleCheckboxChange(e, "STUDY_PROGRESS")}
              id="1"
            />
          </div>

          <div className="flex gap-2">
            <CheckBox
              label={"교우 관계"}
              checked={watch("topics")?.includes("PEER_RELATIONS")}
              onChange={(e) => handleCheckboxChange(e, "PEER_RELATIONS")}
              id="2"
            />
            <CheckBox
              label={"기타"}
              checked={watch("topics")?.includes("ETC")}
              onChange={(e) => handleCheckboxChange(e, "ETC")}
              id="3"
            />
          </div>
        </div>
        {errors?.topics && (
          <p className="text-red-500 text-sm mt-1">{errors.topics.message}</p>
        )}
      </div>

      {/* 비고(선택) */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-1 items-center">
          <p className="font-bold text-m-medium">상담 내용(선택)</p>
        </div>
        <textarea
          {...register("description")}
          placeholder=""
          className="max-w-[342px] h-[92px] bg-white w-full border border-[#E7E7E7] rounded-xl p-4 outline-none text-m-medium text-text-secondary"
        />
      </div>
    </div>
  );
}
