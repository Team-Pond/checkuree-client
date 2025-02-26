import useFormDataStore from "@/store/recordStore";
import React, { useEffect } from "react";
import tw from "tailwind-styled-components";

interface Props {
  bookId: number;
  setFormData: (data: { hour: string; minute: string }) => void;
  record: {
    id: number;
    formattedTime: string;
  };
  handleTimeChange: (
    key: "hour" | "minute",
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

export const ModifyRecordTimeModal: React.FC<Props> = ({
  setFormData,
  record,
  handleTimeChange,
}) => {
  const { formData } = useFormDataStore(); // 전역 상태 formData 사용

  return (
    <div className="flex flex-col gap-6 justify-center items-center w-full">
      <p className="text-m-bold text-text-primary">출석 시간 변경</p>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex gap-1 items-center">
          <p className="font-bold text-m-medium">시간을 입력해 주세요</p>
          <p className="text-text-danger">*</p>
        </div>

        <div className="flex gap-4">
          <TimeInput
            type="text"
            placeholder="시"
            value={formData.hour}
            onChange={(e) => handleTimeChange("hour", e)}
          />
          <TimeInput
            type="text"
            placeholder="분"
            value={formData.minute}
            onChange={(e) => handleTimeChange("minute", e)}
          />
        </div>
      </div>
    </div>
  );
};

export default ModifyRecordTimeModal;

const TimeInput = tw.input`outline-none bg-white border border-[#E7E7E7] rounded-xl w-full h-12 flex items-center pl-4`;
