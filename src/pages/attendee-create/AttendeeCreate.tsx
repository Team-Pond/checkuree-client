import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import Step1 from "./components/Step1";

export default function AttendeeCreate() {
  const navigate = useNavigate();
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
            <Step1 />

            <button
              className={twMerge(
                "max-w-[341px] w-full h-[54px] flex justify-center items-center rounded-xl",
                "bg-bg-disabled text-text-disabled"
              )}
            >
              <p className="font-semibold text-lg">다음으로</p>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
