import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import { twMerge } from "tailwind-merge";
import { getSubjects } from "@/api v2/CourseApiClient";
import { CourseData, CreateBookRequest } from "@/api v2/AttendanceBookSchema";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { createBook } from "@/api v2/AttendanceBookApiClient";

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

  const [bookCreateParams, setBookCreateParams] = useState<CreateBookRequest>();
  const [courseCreateParam, setCourseCreateParams] = useState<CourseData[]>();

  const handleBookCreate = (params: CreateBookRequest) => {
    setBookCreateParams(params);
  };

  const handleCourseChange = (params: CourseData[]) => {
    setCourseCreateParams(params);
  };

  const methods = useForm<CreateBookRequest>({
    shouldUnregister: false, // 데이터 유지
  });

  const { mutate: bookMutation } = useMutation({
    mutationKey: ["book"],
    mutationFn: async () =>
      await createBook({
        title: "",
        imageUrl: "",
        availableDays: ["FRIDAY"],
        availableFrom: "",
        availableTo: "",
      }),
    onSuccess: () => {},
  });

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col gap-7 w-full pb-[30px]"
        onSubmit={methods.handleSubmit(() => {
          bookMutation();
        })}
      >
        <div
          className="w-full h-[64px] flex items-center justify-between px-4 py-5"
          onClick={() => navigate("/book")}
        >
          <p className="font-bold text-text-primary text-[22px]">출석부 등록</p>
          <img
            src="/images/icons/book-create/ico-close.svg"
            alt="닫기 아이콘"
            width={32}
            height={32}
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
                  handleStep2Change={handleStep2Change}
                  handleCourseChange={handleCourseChange}
                />
              ) : (
                <Step1
                  handleStep2Change={handleStep2Change}
                  handleBookCreate={handleBookCreate}
                />
              )}
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
