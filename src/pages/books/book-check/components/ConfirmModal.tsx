import CommonModal from "../../../../components/CommonModal";
import React from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  message: string;
}

export const ConfirmModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSave,
  message,
}) => {
  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      isClose={false}
      className="max-w-xs flex items-center justify-between  w-full"
    >
      <div className="flex flex-col gap-6 justify-center items-center w-full">
        <p className="text-m-bold text-text-primary">{message}</p>
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
              onSave();
            }}
            type="button"
            className="w-full h-12 flex justify-center items-center rounded-2xl bg-bg-tertiary text-[#F1F8F3] text-l-semibold"
          >
            저장하기
          </button>
        </div>
      </div>
    </CommonModal>
  );
};

export default ConfirmModal;
