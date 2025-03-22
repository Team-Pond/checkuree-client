import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import { twMerge } from "tailwind-merge";
import { getSubjects } from "@/api/CourseApiClient";

import { FormProvider, useForm } from "react-hook-form";
import { useBookCreate } from "./queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookSchema, CreateBookSchema } from "./_schema";
import SEO from "@/components/SEO";
import { CourseData } from "@/api/type";
import FormHeader from "./components/FormHeader";

export default function BookCreate() {
  const navigate = useNavigate();
  const [isStep2, setIsStep2] = useState<boolean>(false);

  const handleStep2Change = (state: boolean) => {
    setIsStep2(state);
  };

  const getSubject = async () => {
    await getSubjects();
  };

  useEffect(() => {
    getSubject();
  }, []);

  const [courseCreateParam, setCourseCreateParams] = useState<CourseData[]>([]);
  const [isCurriculum, setIsCurriculum] = useState<boolean>(false);

  const handleCurriculum = (state: boolean) => {
    setIsCurriculum(state);
  };

  const handleCourseChange = (params: CourseData) => {
    setCourseCreateParams([...courseCreateParam, params]);
  };

  const methods = useForm<CreateBookSchema>({
    shouldUnregister: false,
    mode: "onSubmit",
    defaultValues: {
      availableTo: "",
      availableFrom: "",
      availableDays: [],
      title: "",
    },
    // resolver는 폼 제출 시 실행되는 함수를 정의, Promise로 유효성 검사 결과를 반환
    resolver: zodResolver(bookSchema),
  });
  const { getValues, trigger, handleSubmit } = methods;

  const { mutate: bookMutation } = useBookCreate();

  const handleNextStep = async () => {
    const isValid = await trigger();
    if (isValid) {
      handleStep2Change(true);
    }
  };
  return (
    <FormProvider {...methods}>
      <SEO
        title="체쿠리 | 출석부 등록"
        content="체쿠리 음악학원 출석부 서비스의 출석부 등록 페이지입니다."
      />
      <form
        className="flex flex-col gap-10 w-full pb-[30px]"
        onSubmit={handleSubmit(() => {
          courseCreateParam.length > 0 &&
            bookMutation({
              title: getValues("title"),
              imageUrl: JSON.stringify(getValues("imageUrl")),
              availableDays: getValues("availableDays"),
              availableFrom: getValues("availableFrom"),
              availableTo: getValues("availableTo"),
              courses: courseCreateParam,
            });
        })}
      >
        <FormHeader isStep2={isStep2} />
        <div className="w-full flex flex-col gap-10 items-center">
          <div className="flex w-full justify-center">
            <div className="flex flex-col justify-center gap-6 max-w-[342px] w-full">
              {isStep2 ? (
                <Step2
                  handleCourseChange={handleCourseChange}
                  courseCreateParam={courseCreateParam}
                  handleCurriculum={handleCurriculum}
                  isCurriculum={isCurriculum}
                />
              ) : (
                <Step1 />
              )}

              {isStep2 === false && (
                <button
                  type="button" // submit 대신 버튼 타입을 일반 button으로 변경
                  className={twMerge(
                    "max-w-[341px] w-full h-[54px] flex justify-center items-center rounded-xl bg-bg-tertiary text-[#f1f8f3]"
                  )}
                  onClick={handleNextStep}
                >
                  <p className="font-semibold text-lg">다음으로</p>
                </button>
              )}

              {!isCurriculum && isStep2 && (
                <div className="flex gap-4 w-full">
                  <button
                    onClick={() => handleStep2Change(false)}
                    className="w-full h-[54px] flex justify-center items-center rounded-2xl bg-bg-secondary text-text-secondary text-l-semibold"
                  >
                    이전으로
                  </button>
                  <button className="w-full h-[54px] flex justify-center items-center rounded-2xl bg-bg-tertiary text-[#F1F8F3] text-l-semibold">
                    생성하기
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
