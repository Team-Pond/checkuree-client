import { createBook } from "@/api v2/AttendanceBookApiClient";
import { CreateBookRequest, DaysType } from "@/api v2/AttendanceBookSchema";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";

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

  const [dayArrays, setDayArrays] = useState<DaysType[]>([]);
  const onDaysChange = (day: DaysType) => {
    if (dayArrays.includes(DaysMatch[day])) {
      setDayArrays(dayArrays.filter((item) => item !== DaysMatch[day]));
    } else {
      setDayArrays([...dayArrays, DaysMatch[day]]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const file = files?.[0];
    const reader = new FileReader();
    reader.readAsDataURL(file!);
    reader.onload = () => {
      setFileUrl(reader.result as string);
    };
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
          <div className="border-[2px] border-[#DDEEDF] max-w-[174px] w-full rounded-full" />
        </div>

        <div className="flex w-full justify-center">
          <form
            action=""
            onSubmit={handleSubmit(async () => {
              setValue("imageUrl", fileUrl!);
              await createBook(getValues());
            })}
            className="flex flex-col justify-center gap-6 max-w-[342px] w-full"
          >
            <Step1
              register={register}
              fileUrl={fileUrl}
              handleFileChange={handleFileChange}
              onDaysChange={onDaysChange}
              dayArrays={dayArrays}
              DaysMatch={DaysMatch}
            />

            <Step2 register={register} />
            <button
              className={twMerge(
                "max-w-[341px] w-full h-[54px] flex justify-center items-center rounded-xl",
                !isDirty === false
                  ? "bg-bg-tertiary text-[#f1f8f3]"
                  : "bg-bg-disabled text-text-disabled"
              )}
              disabled={!isDirty}
              type="submit"
            >
              <p className="font-semibold text-lg">다음으로</p>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
