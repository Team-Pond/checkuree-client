import { createBook } from "@/api v2/AttendanceBookApiClient";
import { CreateBookRequest, DaysType } from "@/api v2/AttendanceBookSchema";
import { ChangeEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const DAYS = ["월", "화", "수", "목", "금", "토", "일"];

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
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [dayArrays, setDayArrays] = useState<DaysType[]>([]);
  const [fileUrl, setFileUrl] = useState<string>();

  const {
    register,
    setValue,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<CreateBookRequest>({
    mode: "onBlur", // 폼이벤트 유효성 검사 트리거
  });

  const onDaysChane = (day: DaysType) => {
    if (dayArrays.includes(DaysMatch[day])) {
      setDayArrays(dayArrays.filter((item) => item !== DaysMatch[day]));
    } else {
      setDayArrays([...dayArrays, DaysMatch[day]]);
    }
  };

  const triggerFileInput = () => {
    fileRef.current?.click();
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
          <div className="border-[2px] border-[#DDEEDF] max-w-[174px] w-full rounded-full"></div>
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
            {/* 출석부 이름 */}
            <div className="flex flex-col gap-2">
              <div className="flex gap-1 items-center">
                <p className="font-bold text-m-medium">출석부</p>
                <p className="text-text-danger">*</p>
              </div>

              <input
                {...register("title", { required: true })}
                type="text"
                className="max-w-[342px] bg-white w-full h-12 border border-[#E7E7E7] rounded-xl p-4 outline-none"
              />
            </div>

            {/* 수업 요일 */}
            <div className="flex flex-col gap-2">
              <div className="flex gap-1 items-center">
                <p className="font-bold text-m-medium">수업 요일</p>
                <p className="text-text-danger">*</p>
              </div>

              <div className="grid grid-cols-7 gap-0">
                {DAYS.map((day, index) => {
                  return (
                    <div
                      className={twMerge(
                        "max-w-11 h-11 rounded-lg flex justify-center items-center",
                        dayArrays.includes(DaysMatch[DAYS[index]])
                          ? "bg-bg-primary text-text-interactive-primary"
                          : "bg-bg-secondary text-text-secondary"
                      )}
                      onClick={() => onDaysChane(DAYS[index] as DaysType)}
                    >
                      <span className="font-semibold text-base">
                        {DAYS[index]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 수업 시간 */}
            <div className="flex flex-col gap-2">
              <div className="flex gap-1 items-center">
                <p className="font-bold text-m-medium">수업 시간</p>
                <p className="text-text-danger">*</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex gap-2 items-center max-w-[163px] w-full">
                  <button className="border border-[#E7E7E7] rounded-xl max-w-[130px] w-full h-12  flex items-center pl-4">
                    <p className="font-bold text-sm text-[#B0B0B0] w-[53px]">
                      시작 시간
                    </p>
                  </button>
                  <p className="text-sm font-bold text-text-primary">부터</p>
                </div>
                <div className="flex gap-2 items-center max-w-[163px] w-full">
                  <button className="border border-[#E7E7E7] rounded-xl max-w-[130px] w-full h-12  flex items-center pl-4">
                    <p className="font-bold text-sm text-[#B0B0B0] w-[53px]">
                      종료 시간
                    </p>
                  </button>
                  <p className="text-sm font-bold text-text-primary">까지</p>
                </div>
              </div>
            </div>

            {/* 커버 이미지 */}
            <div className="flex flex-col gap-2">
              <p className="font-bold text-m-medium text-left">
                커버 이미지(선택)
              </p>

              <div
                className="w-[81px] h-[81px] bg-bg-base border border-[#E7E7E7] rounded-xl flex justify-center items-center"
                onClick={triggerFileInput}
              >
                <input
                  type="file"
                  className="hidden"
                  ref={fileRef}
                  onChange={handleFileChange}
                />
                <img
                  src={
                    fileUrl ? fileUrl : "/images/icons/book-create/ico-plus.svg"
                  }
                  alt="이미지 추가 아이콘"
                  className={twMerge(
                    fileUrl
                      ? "w-full h-full object-cover rounded-xl"
                      : "w-7 h-7"
                  )}
                />
              </div>
              <p className="text-xs font-medium text-text-secondary text-left">
                * JPG, PNG 파일만 업로드 가능합니다.
              </p>
            </div>

            {/* 설명*/}
            <div className="flex flex-col gap-2">
              <p className="font-bold text-m-medium text-left">설명(선택)</p>
              <input
                {...register("description")}
                type="text"
                className="max-w-[342px] bg-white w-full h-12 border border-[#E7E7E7] rounded-xl p-4 outline-none"
              />
            </div>
          </form>
        </div>
        <button className="max-w-[341px] w-full h-[54px] flex justify-center items-center rounded-xl bg-bg-disabled">
          <p className="text-text-disabled font-semibold text-lg">다음으로</p>
        </button>
      </div>
    </section>
  );
}
