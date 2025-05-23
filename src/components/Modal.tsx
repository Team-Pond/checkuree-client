import useModalStore from '@/store/dialogStore'
import { twMerge } from 'tailwind-merge'
import tw from 'tailwind-styled-components'
import { createPortal } from 'react-dom'

const Modal = () => {
  const { isOpen, content, action, closeAction, closeModal, buttonProps } =
    useModalStore()
  if (!isOpen) return null

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={closeModal}
    >
      <div
        className={`
          relative bg-white rounded-xl shadow-xl p-6 max-w-xs items-center justify-between w-full
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {content}

        <div className="flex gap-4 w-full mt-7">
          <Button
            type="button"
            onClick={() => {
              closeModal()
              closeAction()
            }}
            className=" bg-bg-secondary"
          >
            <span className="text-text-secondary text-l-semibold">취소</span>
          </Button>
          <Button
            type="button"
            className={twMerge(
              buttonProps?.color ? buttonProps?.color : 'bg-bg-tertiary',
            )}
            onClick={() => {
              action()
              closeModal()
            }}
          >
            <span className="text-[#F1F8F3] text-l-semibold">
              {buttonProps?.text ? buttonProps.text : '저장하기'}
            </span>
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  )
}

export default Modal

const Button = tw.button`w-full h-12 flex justify-center items-center rounded-2xl`
