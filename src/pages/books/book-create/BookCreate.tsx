import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import { twMerge } from "tailwind-merge";
import { getSubjects } from "@/api v2/CourseApiClient";
import { CourseData } from "@/api v2/AttendanceBookSchema";
import { FormProvider, useForm } from "react-hook-form";
import { useBookCreate } from "./queries";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const bookSchema = z.object({
  title: z.string().min(3, "제목은 최소 3자 이상이어야 합니다."),
  description: z.string().optional(),
  availableFrom: z.string().nonempty("시작 날짜를 입력하세요."),
  availableTo: z.string().nonempty("종료 날짜를 입력하세요."),
  availableDays: z
    .array(
      z.enum([
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
        "SUNDAY",
      ])
    )
    .min(1, "적어도 하나의 요일을 선택해야 합니다."),
  imageUrl: z.string().optional(),
  courses: z
    .array(
      z.object({
        title: z.string().min(1, "커리큘럼명은 최소 1자 이상이어야 합니다."),
        isPrimary: z.boolean(),
        grades: z
          .array(
            z.object({
              subjectItemId: z.number(),
              level: z.number(),
            })
          )
          .length(1, "최소 과목 1개 이상 추가해주세요 "),
      })
    )
    .optional(),
});

export type CreateBookSchema = z.infer<typeof bookSchema>;

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
  const {
    getValues,
    trigger,
    handleSubmit,
    formState: { errors },
  } = methods;

  const { mutate: bookMutation } = useBookCreate();

  const handleNextStep = async () => {
    const isValid = await trigger();
    if (isValid) {
      handleStep2Change(true);
    }
  };
  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col gap-7 w-full pb-[30px]"
        onSubmit={handleSubmit(() => {
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
        <div className="w-full h-[64px] flex items-center justify-between px-4 py-5">
          <p className="font-bold text-text-primary text-[22px]">출석부 등록</p>
          <img
            src="/images/icons/book-create/ico-close.svg"
            alt="닫기 아이콘"
            width={32}
            height={32}
            onClick={() => navigate("/book")}
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
