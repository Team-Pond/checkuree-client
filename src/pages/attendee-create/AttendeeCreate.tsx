import {
  redirect,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { twMerge } from "tailwind-merge";
import Step1 from "./components/Step1";
import { useState } from "react";
import Step2 from "./components/Step2";

import { getTodayYYYYMMDD } from "@/utils";

import { FormProvider, useForm } from "react-hook-form";

import { AttendeeSchema, CreateAttendeeSchema } from "./_schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAttendee } from "@/api/AttendeeApiClient";
import toast from "react-hot-toast";
import SEO from "@/components/SEO";
import { Associates, RelationType } from "@/api/type";

export default function AttendeeCreate() {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookId } = useParams();

  const [isStep2, setIsStep2] = useState<boolean>(false);
  const [guardian, setGuardian] = useState<Associates>();

  const methods = useForm<CreateAttendeeSchema>({
    resolver: zodResolver(AttendeeSchema),
    mode: "onSubmit",
  });

  const { trigger, setValue, handleSubmit } = methods;

  const onChangeGuardian = (key: RelationType | string, value: string) => {
    setGuardian((prev) => ({
      ...prev!,
      [key]: value,
    }));
  };

  const onChangeGrade = (gradeId: number) => {
    setValue("progressRequest.progresses", [
      // ...getValues("progressRequest.progresses"),
      { gradeId: gradeId, startAt: getTodayYYYYMMDD() },
    ]);
  };

  const handleStep1Next = async () => {
    const isValid = await trigger("attendeeRequest");
    if (isValid) {
      setIsStep2(true);
    }
  };
  const handleStep2Next = async (data: CreateAttendeeSchema) => {
    const isValid = await trigger("attendeeRequest");
    if (isValid) {
      await createAttendee({
        attendanceBookId: Number(bookId),
        params: {
          ...data,
          attendeeRequest: {
            ...data.attendeeRequest,
            actualName: data.attendeeRequest.name,
            associates: guardian && [
              {
                relationType: guardian.relationType,
                phoneNumber: guardian.phoneNumber,
              },
            ],
          },
        },
      })
        .then(() => {
          toast.success(`${data.attendeeRequest.name} 학생이 등록되었습니다.`);
          navigate(`/book/${bookId}/attendee${location.search}`);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    }
  };

  return (
    <FormProvider {...methods}>
      <SEO
        title="체쿠리 | 학생 등록"
        content="체쿠리 음악학원 출석부 서비스의 학생 등록 페이지입니다."
      />
      <form
        className="flex flex-col gap-7 w-full pb-[30px]"
        onSubmit={handleSubmit(handleStep2Next)}
      >
        <div className="w-full h-[64px] flex items-center justify-between px-4 py-5">
          <p className="font-bold text-text-primary text-[22px]">학생 등록</p>
          <img
            src="/images/icons/book-create/ico-close.svg"
            alt="닫기 아이콘"
            width={32}
            height={32}
            onClick={() =>
              navigate(`/book/${bookId}/attendee${location.search}`)
            }
          />
        </div>

        <div className="w-full flex flex-col gap-10 items-center">
          <div className="flex gap-2 w-full justify-center">
            <hr className="border-[2px] border-bg-tertiary max-w-[174px] w-full rounded-full" />
            <div
              className={twMerge(
                "border-[2px]  max-w-[174px] w-full rounded-full",
                isStep2 ? "border-bg-tertiary" : "border-[#DDEEDF]"
              )}
            />
          </div>

          <div className="flex w-full justify-center">
            <div className="flex flex-col justify-center gap-6 max-w-[342px] w-full">
              {isStep2 ? (
                <Step2
                  onChangeGrade={onChangeGrade}
                  attendanceBookId={Number(bookId)}
                />
              ) : (
                <Step1
                  onChangeGuardian={onChangeGuardian}
                  guardian={guardian!}
                />
              )}
              {isStep2 ? (
                <div className="flex gap-4 w-full">
                  <button
                    type="button"
                    onClick={() => {
                      setIsStep2(false);
                    }}
                    className="w-full h-[54px] flex justify-center items-center rounded-2xl bg-bg-secondary text-text-secondary text-l-semibold"
                  >
                    이전으로
                  </button>
                  <button
                    type="submit"
                    className="w-full h-[54px] flex justify-center items-center rounded-2xl bg-bg-tertiary text-[#F1F8F3] text-l-semibold"
                  >
                    생성하기
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className={twMerge(
                    "max-w-[341px] w-full h-[54px] flex justify-center items-center rounded-xl",
                    "bg-bg-tertiary text-[#f1f8f3]"
                  )}
                  onClick={handleStep1Next}
                >
                  <p className="font-semibold text-lg">다음으로</p>
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
