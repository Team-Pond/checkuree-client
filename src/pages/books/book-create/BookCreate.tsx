import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import { twMerge } from "tailwind-merge";
import { getSubjects } from "@/api v2/CourseApiClient";
import { CourseData, CreateBookRequest } from "@/api v2/AttendanceBookSchema";
import { useForm, useWatch } from "react-hook-form";
import { useBookCreate } from "./queries";

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

  const { getValues, setValue, register, handleSubmit, control } =
    useForm<CreateBookRequest>({
      shouldUnregister: false, // 데이터 유지
    });

  const { mutate: bookMutation } = useBookCreate();

  // 특정 필드만 감시
  const { title, availableDays, availableFrom, availableTo } = useWatch({
    control,
  });

  const isStep1Valid =
    (title || "").length > 2 &&
    (availableDays || []).length > 0 &&
    !!availableFrom &&
    !!availableTo;

  return (
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
              <Step1
                register={register}
                setValue={setValue}
                getValues={getValues}
              />
            )}

            {isStep2 === false && (
              <button
                className={twMerge(
                  "max-w-[341px] w-full h-[54px] flex justify-center items-center rounded-xl",
                  isStep1Valid
                    ? "bg-bg-tertiary text-[#f1f8f3]"
                    : "bg-bg-disabled text-text-disabled"
                )}
                disabled={!isStep1Valid}
                onClick={() => handleStep2Change(true)}
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
  );
}
