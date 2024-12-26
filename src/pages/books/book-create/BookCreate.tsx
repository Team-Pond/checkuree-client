import { createBook } from "@/api v2/AttendanceBookApiClient";
import { CreateBookRequest, DaysType } from "@/api v2/AttendanceBookSchema";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import { twMerge } from "tailwind-merge";
import { getSubjects } from "@/api v2/CourseApiClient";

const DaysMatch: Record<string, DaysType> = {
  월: "MONDAY",
  화: "TUESDAY",
  수: "WEDNESDAY",
  목: "THURSDAY",
  금: "FRIDAY",
  토: "SATURDAY",
  일: "SUNDAY",
};

export default function BookCreate() {
  const navigate = useNavigate();

  const [fileUrl, setFileUrl] = useState<string>();
  const [isNext, setIsNext] = useState<boolean>(false);
  const [isStep2, setIsStep2] = useState<boolean>(false);
  const [dayArrays, setDayArrays] = useState<DaysType[]>([]);

  const handleStep2Change = () => {
    setIsStep2(true);
  };

  const {
    register,
    setValue,
    handleSubmit,
    getValues,
    watch,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<CreateBookRequest>({
    mode: "onBlur", // 폼이벤트 유효성 검사 트리거
  });

  const title = watch("title");
  const availableDays = dayArrays;

  useEffect(() => {
    setIsNext(!!title && availableDays.length > 0);
  }, [title, availableDays]);

  const getSubject = async () => {
    await getSubjects();
  };

  useEffect(() => {
    getSubject();
  }, []);
  return (
    <section className="flex flex-col gap-7 w-full pb-[30px]">
      <div
        className="w-full h-[64px] flex items-center justify-between px-4 py-5"
        onClick={() => navigate("/book")}
      >
        <p className="font-bold text-text-primary text-[22px]">출석부 등록</p>
        <img
          src="/images/icons/book-create/ico-close.svg"
          alt="닫기 아이콘"
          width={40}
          height={40}
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
          <div
            onSubmit={handleSubmit(async () => {
              setValue("imageUrl", fileUrl!);
              await createBook({
                ...getValues(),
                availableFrom: "2024",
                availableTo: "0022",
                availableDays: ["MONDAY"],
                description: "",
                imageUrl: "",
              });
              handleStep2Change();
            })}
            className="flex flex-col justify-center gap-6 max-w-[342px] w-full"
          >
            {isStep2 ? (
              <Step2 />
            ) : (
              <Step1 handleStep2Change={handleStep2Change} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
