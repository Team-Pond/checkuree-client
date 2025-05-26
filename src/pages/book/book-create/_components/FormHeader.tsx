import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export default function FormHeader({ isStep2 }: { isStep2: boolean }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col">
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
      <div className="flex gap-2 w-full justify-center">
        <hr className="border-[2px] border-bg-tertiary max-w-[174px] w-full rounded-full" />
        <div
          className={twMerge(
            "border-[2px]  max-w-[174px] w-full rounded-full",
            isStep2 ? "border-bg-tertiary" : "border-[#DDEEDF]"
          )}
        />
      </div>
    </div>
  );
}
