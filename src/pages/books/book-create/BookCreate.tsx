import { DaysType } from "@/api v2/AttendanceBookSchema";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import { twMerge } from "tailwind-merge";
import { getSubjects } from "@/api v2/CourseApiClient";

export default function BookCreate() {
  const navigate = useNavigate();

  const [isStep2, setIsStep2] = useState<boolean>(false);
  const [bookId, setBookId] = useState<number>();
  const handleStep2Change = (id: number) => {
    setIsStep2(true);
    setBookId(id);
  };

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
          <div className="flex flex-col justify-center gap-6 max-w-[342px] w-full">
            {isStep2 ? (
              <Step2 id={bookId!} />
            ) : (
              <Step1 handleStep2Change={handleStep2Change} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
