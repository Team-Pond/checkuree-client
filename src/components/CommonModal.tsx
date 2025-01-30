import React from "react";

interface CommonModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  isClose?: boolean;
}

const CommonModal: React.FC<CommonModalProps> = ({
  isOpen,
  onClose,
  children,
  isClose = true,
  className = "",
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={onClose}
    >
      <div
        className={`
          relative bg-white rounded-xl shadow-xl p-6
          ${className}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {isClose && (
          <button
            className="
            absolute top-3 right-3
            text-gray-400 hover:text-gray-600
            text-4xl font-bold
          "
            onClick={onClose}
          >
            &times;
          </button>
        )}

        {children}
      </div>
    </div>
  );
};

export default CommonModal;
