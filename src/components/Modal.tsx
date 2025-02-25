import useModalStore from "@/store/dialogStore";
import React from "react";

interface ModalProps {
  className?: string;
}

const Modal: React.FC<ModalProps> = () => {
  const { isOpen, content } = useModalStore();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div
        className={`
          relative bg-white rounded-xl shadow-xl p-6 max-w-xs items-center justify-between  w-full
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {content}
      </div>
    </div>
  );
};

export default Modal;
