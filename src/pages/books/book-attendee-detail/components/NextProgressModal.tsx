import CommonModal from "@/components/CommonModal";
import React, { useState } from "react";
import NextProgressSelect from "./NextProgressSelect";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const NextProgressModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    endDate: "",
    startDate: "",
    courseTitle: "",
  });
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, "");

    if (input.length > 8) {
      input = input.slice(0, 8);
    }

    if (input.length >= 5) {
      input = input.slice(0, 4) + "." + input.slice(4);
    }

    if (input.length >= 8) {
      input = input.slice(0, 7) + "." + input.slice(7);
    }

    setFormData((prev) => ({
      ...prev,
      startDate: input,
    }));
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, "");

    if (input.length > 8) {
      input = input.slice(0, 8);
    }

    if (input.length >= 5) {
      input = input.slice(0, 4) + "." + input.slice(4);
    }

    if (input.length >= 8) {
      input = input.slice(0, 7) + "." + input.slice(7);
    }

    setFormData((prev) => ({
      ...prev,
      endDate: input,
    }));
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      isClose={false}
      className="max-w-xs flex items-center justify-between  w-full"
    >
      <div className="flex flex-col gap-6 justify-center items-center  w-full">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex gap-1 items-center">
            <p className="font-bold text-m-medium">과정 종료일</p>
            <p className="text-text-danger">*</p>
          </div>

          <input
            type="text"
            placeholder="YYYY.MM.DD"
            className="outline-none bg-white border border-[#E7E7E7] rounded-xl  w-full h-12 flex items-center pl-4"
            value={formData.endDate}
            onChange={handleEndDateChange}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex gap-1 items-center">
            <p className="font-bold text-m-medium">다음 과정 시작</p>
            <p className="text-text-danger">*</p>
          </div>
          <NextProgressSelect />
          <input
            type="text"
            placeholder="YYYY.MM.DD"
            className="outline-none bg-white border border-[#E7E7E7] rounded-xl w-full h-12 flex items-center pl-4"
            value={formData.startDate}
            onChange={handleStartDateChange}
          />
        </div>

        <div className="flex gap-4 w-full">
          <button
            type="button"
            onClick={onClose}
            className="w-full h-12 flex justify-center items-center rounded-2xl bg-bg-secondary text-text-secondary text-l-semibold"
          >
            취소
          </button>
          <button
            onClick={() => {
              // scheduleMutation();
            }}
            type="button"
            className="w-full h-12 flex justify-center items-center rounded-2xl bg-bg-tertiary text-[#F1F8F3] text-l-semibold"
          >
            생성하기
          </button>
        </div>
      </div>
    </CommonModal>
  );
};

export default NextProgressModal;
