import useModalStore from "@/store/dialogStore";

const Modal = () => {
  const { isOpen, content, action, closeAction, closeModal } = useModalStore();
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

        <div className="flex gap-4 w-full mt-7">
          <button
            type="button"
            onClick={() => {
              closeModal();
              closeAction();
            }}
            className="w-full h-12 flex justify-center items-center rounded-2xl bg-bg-secondary text-text-secondary text-l-semibold"
          >
            취소
          </button>
          <button
            type="button"
            className="w-full h-12 flex justify-center items-center rounded-2xl bg-bg-tertiary text-[#F1F8F3] text-l-semibold"
            onClick={() => {
              action();
              closeModal();
            }}
          >
            저장하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
