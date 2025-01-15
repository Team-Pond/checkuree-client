import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import Step1 from "./components/Step1";
import { useContext, useState } from "react";
import Step2 from "./components/Step2";
import { useMutation } from "@tanstack/react-query";
import { createAttendee } from "@/api v2/AttendeeApiClient";
import toast from "react-hot-toast";
import { BookContext } from "@/context/BookContext";
import { GenderType } from "@/api v2/AttendeeSchema";

interface Step1FormState {
  name: string;
  actualName: string;
  birthDate: string;
  gender: GenderType;
  enrollmentDate: string;
  // admittedToday: boolean;
  phoneNumber: string;
  address_1: string;
  school: string;
  description: string;
}

export default function AttendeeCreate() {
  const navigate = useNavigate();

  const context = useContext(BookContext);
  const { selectedBook } = context!;

  const [isStep2, setIsStep2] = useState<boolean>(false);
  const [formData, setFormData] = useState<Step1FormState>({
    name: "",
    actualName: "3344444",
    birthDate: "",
    gender: "",
    enrollmentDate: "",
    phoneNumber: "01027840955",
    address_1: "",
    school: "범구초등학교",
    description: "범범",
  });

  const handleStep2Change = (state: boolean) => {
    setIsStep2(state);
  };

  const isStep1Valid =
    formData.name.length > 2 && formData.address_1.length > 0;

  const { mutate: attendeeMutation } = useMutation({
    mutationKey: ["book"],
    mutationFn: async () =>
      await createAttendee({
        attendanceBookId: selectedBook?.id!,
        params: {
          ...formData,
          birthDate: formData.birthDate.replaceAll(".", "-"),
          enrollmentDate: formData.enrollmentDate.replaceAll(".", "-"),
        },
      }),
    onSuccess: () => {
      toast.success("학생 등록되었습니다.");
      handleStep2Change(true);
    },
    onError: (error) => {},
  });

  return (
    <form className="flex flex-col gap-7 w-full pb-[30px]">
      <div className="w-full h-[64px] flex items-center justify-between px-4 py-5">
        <p className="font-bold text-text-primary text-[22px]">학생 등록</p>
        <img
          src="/images/icons/book-create/ico-close.svg"
          alt="닫기 아이콘"
          width={32}
          height={32}
          onClick={() => navigate("/book/roaster")}
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
              <Step2 />
            ) : (
              <Step1 formData={formData} setFormData={setFormData} />
            )}
            {isStep2 === false && (
              <button
                type="button"
                className={twMerge(
                  "max-w-[341px] w-full h-[54px] flex justify-center items-center rounded-xl",
                  isStep1Valid
                    ? "bg-bg-tertiary text-[#f1f8f3]"
                    : "bg-bg-disabled text-text-disabled"
                )}
                disabled={!isStep1Valid}
                onClick={() => attendeeMutation()}
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
