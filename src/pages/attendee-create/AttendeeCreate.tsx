import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import Step1 from "./components/Step1";
import { useState } from "react";
import Step2 from "./components/Step2";

export default function AttendeeCreate() {
  const navigate = useNavigate();

  const [isStep2, setIsStep2] = useState<boolean>(false);

  const handleStep2Change = (state: boolean) => {
    setIsStep2(state);
  };

  const [isCurriculum, setIsCurriculum] = useState<boolean>(false);
  const handleCurriculum = (state: boolean) => {
    setIsCurriculum(state);
  };

  const isStep1Valid = true;
  // (title || "").length > 2 &&
  // (availableDays || []).length > 0 &&
  // !!availableFrom &&
  // !!availableTo;

  return (
    <form className="flex flex-col gap-7 w-full pb-[30px]">
      <div className="w-full h-[64px] flex items-center justify-between px-4 py-5">
        <p className="font-bold text-text-primary text-[22px]">학생 등록</p>
        <img
          src="/images/icons/book-create/ico-close.svg"
          alt="닫기 아이콘"
          width={32}
          height={32}
          onClick={() => navigate("/book-roaster")}
        />
      </div>

      <div className="w-full flex flex-col gap-10 items-center">
        <div className="flex gap-2 w-full justify-center">
          <hr className="border-[2px] border-bg-tertiary max-w-[174px] w-full rounded-full" />
          <div
            className={twMerge(
              "border-[2px]  max-w-[174px] w-full rounded-full"
              //   isStep2 ? "border-bg-tertiary" : "border-[#DDEEDF]"
            )}
          />
        </div>

        <div className="flex w-full justify-center">
          <div className="flex flex-col justify-center gap-6 max-w-[342px] w-full">
            {isStep2 ? <Step2 /> : <Step1 />}
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
          </div>
        </div>
      </div>
    </form>
  );
}
