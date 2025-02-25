import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { bookSchema, CreateBookSchema } from "../../book-create/_schema";
import { zodResolver } from "@hookform/resolvers/zod";
import SEO from "../../../../components/SEO";
import { useNavigate } from "react-router-dom";
import { CounsellingSchema, CreateCounsellingSchema } from "../_schema";
import { getTodayYYYYMMDD } from "../../../../utils";

export default function CounsellingCreate() {
  const navigate = useNavigate();

  const methods = useForm<CreateCounsellingSchema>({
    shouldUnregister: false,
    mode: "onSubmit",
    defaultValues: {
      counsellingType: "VISIT",
      counsellingTopicTypes: [],
      counsellingDate: getTodayYYYYMMDD(),
      description: "",
      counseleeId: 0,
    },
    // resolver는 폼 제출 시 실행되는 함수를 정의, Promise로 유효성 검사 결과를 반환
    resolver: zodResolver(CounsellingSchema),
  });
  const {
    getValues,
    trigger,
    handleSubmit,
    formState: { errors },
  } = methods;

  return (
    <FormProvider {...methods}>
      <SEO
        title="체쿠리 | 출석부 등록"
        content="체쿠리 음악학원 출석부 서비스의 출석부 등록 페이지입니다."
      />

      <form
        className="flex flex-col gap-7 w-full pb-[30px]"
        onSubmit={() => {}}
      >
        <div className="w-full h-[64px] flex items-center justify-between px-4 py-5">
          <p className="font-bold text-text-primary text-[22px]">상담 기록</p>
          <img
            src="/images/icons/book-create/ico-close.svg"
            alt="닫기 아이콘"
            width={32}
            height={32}
            onClick={() => navigate(-1)}
          />
        </div>

        <div className="w-full flex flex-col gap-10 items-center">
          <div className="flex gap-2 w-full justify-center">
            <hr className="border-[2px] border-bg-tertiary max-w-[356px] w-full rounded-full" />
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
