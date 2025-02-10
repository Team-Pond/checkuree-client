import CommonModal from "../../../../components/CommonModal";
import React, { useEffect, useState } from "react";
import { useRecordUpdate } from "../queries";
import { twMerge } from "tailwind-merge";

interface Props {
  isOpen: boolean;
  record: {
    id: number;
    formattedTime: string;
  };
  onClose: () => void;
  bookId: number;
}

export const ModifyRecordTimeModal: React.FC<Props> = ({
  isOpen,
  onClose,
  record,
  bookId,
}) => {
  const [formData, setFormData] = useState({
    hour: "",
    minute: "",
  });

  // 화면을 다시 열 때마다 기존의 시간을 입력창에 표시
  useEffect(() => {
    const [initialHour, initialMinute] = record.formattedTime.split(":");

    setFormData({
      hour: initialHour,
      minute: initialMinute,
    });
  }, [isOpen]);

  const resetFormData = () => {
    setFormData({
      hour: "",
      minute: "",
    });
  };

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, "");

    if (input.length > 2) {
      input = input.slice(0, 2);
    }

    setFormData((prev) => ({ ...prev, hour: input }));
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, "");

    if (input.length > 2) {
      input = input.slice(0, 2);
    }

    setFormData((prev) => ({ ...prev, minute: input }));
  };

  const { mutate: recordMutation } = useRecordUpdate({
    bookId: Number(bookId),
    recordId: Number(record.id),
    formattedTime: `${formData?.hour}:${formData?.minute}`,
  });

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      isClose={false}
      className="max-w-xs flex items-center justify-between  w-full"
    >
      <div className="flex flex-col gap-6 justify-center items-center w-full">
        <p className="text-m-bold text-text-primary">출석 시간 변경</p>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex gap-1 items-center">
            <p className="font-bold text-m-medium">시간을 입력해 주세요</p>
            <p className="text-text-danger">*</p>
          </div>
          {/* <NextProgressSelect /> */}
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="시"
              className="outline-none bg-white border border-[#E7E7E7] rounded-xl w-full h-12 flex items-center pl-4"
              value={formData.hour}
              onChange={handleHourChange}
            />
            <input
              type="text"
              placeholder="분"
              className="outline-none bg-white border border-[#E7E7E7] rounded-xl w-full h-12 flex items-center pl-4"
              value={formData.minute}
              onChange={handleMinuteChange}
            />
          </div>
        </div>
        <div className="flex gap-4 w-full">
          <button
            type="button"
            onClick={() => {
              resetFormData();
              onClose();
            }}
            className="w-full h-12 flex justify-center items-center rounded-2xl bg-bg-secondary text-text-secondary text-l-semibold"
          >
            취소
          </button>
          <button
            onClick={() => {
              recordMutation();
              onClose();
            }}
            type="button"
            className={twMerge(
              "w-full h-12 flex justify-center items-center rounded-2xl ",
              !!formData.minute && !!formData.hour
                ? "bg-bg-tertiary text-[#F1F8F3] text-l-semibold"
                : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-50",
            )}
            disabled={!formData.minute || !formData.hour}
          >
            저장하기
          </button>
        </div>
      </div>
    </CommonModal>
  );
};

export default ModifyRecordTimeModal;
