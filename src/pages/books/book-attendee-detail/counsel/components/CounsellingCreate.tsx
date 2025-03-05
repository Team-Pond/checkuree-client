import { useLocation, useNavigate, useParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { useState } from "react";

import { FormProvider, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";
import SEO from "@/components/SEO";
import { Associates, RelationType } from "@/api/type";
import CounsellingCreateForm from "./CounsellingCreateForm";
import { CreateCounsellingSchema, CounsellingSchema } from "../../_schema";
import { createCounsellings } from "@/api/CounselApiClient";

export default function CounsellingCreate() {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookId, attendeeId } = useParams();
  const [counseleeId, setCounseleeId] = useState<number>();

  const methods = useForm<CreateCounsellingSchema>({
    resolver: zodResolver(CounsellingSchema),
    mode: "onSubmit",
  });

  const { handleSubmit } = methods;

  const Submit = async (data: CreateCounsellingSchema) => {
    await createCounsellings({
      params: {
        ...data,
        counseleeId: counseleeId!,
        attendeeId: Number(attendeeId),
        counsellingAt: new Date(data.counsellingAt),
      },
      attendanceBookId: Number(bookId),
    })
      .then(() => {
        toast.success("상담이 등록되었습니다.");
        navigate(`/book/${bookId}/attendee/${attendeeId}${location.search}`);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const transferCounselorName = (relationType: RelationType) => {
    switch (relationType) {
      case "FATHER":
        return "학생 부";
      case "MOTHER":
        return "학생 모";
      case "SIBLING":
        return "조부모";
      case "OTHER":
        return "기타";
    }
  };

  const counselors = location.state.map((counselor: Associates) => {
    return {
      name: transferCounselorName(counselor.relationType),
      value: String(counselor.id),
    };
  });

  return (
    <FormProvider {...methods}>
      <SEO
        title="체쿠리 | 학생 등록"
        content="체쿠리 음악학원 출석부 서비스의 학생 등록 페이지입니다."
      />
      <form
        className="flex flex-col  w-full pb-[30px]"
        onSubmit={handleSubmit(Submit)}
      >
        <div className="w-full h-[64px] flex items-center justify-between px-4 py-5">
          <p className="font-bold text-text-primary text-[22px]">상담 기록</p>
          <img
            src="/images/icons/book-create/ico-close.svg"
            alt="닫기 아이콘"
            width={32}
            height={32}
            onClick={() =>
              navigate(
                `/book/${bookId}/attendee/${attendeeId}${location.search}`
              )
            }
          />
        </div>
        <hr className="border-[2px] border-bg-tertiary max-w-[356px]  w-full rounded-full mx-auto" />

        <div className="w-full flex flex-col gap-10 items-center mt-10">
          <div className="flex w-full justify-center">
            <div className="flex flex-col justify-center gap-6 max-w-[342px] w-full">
              <CounsellingCreateForm
                onChangeCounseleeId={(id: number) => setCounseleeId(id)}
                counselors={counselors}
              />
              <button
                type="submit"
                className={twMerge(
                  "max-w-[341px] w-full h-[54px] flex justify-center items-center rounded-xl",
                  "bg-bg-tertiary text-[#f1f8f3]"
                )}
              >
                <p className="font-semibold text-lg">저장하기</p>
              </button>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
