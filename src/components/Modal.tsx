import useModalStore from '@/store/dialogStore'
import { twMerge } from 'tailwind-merge'
import tw from 'tailwind-styled-components'
import { createPortal } from 'react-dom'
import Button from './Button'

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
            onClick={() => {
              closeModal()
              closeAction()
            }}
            className="w-full h-12 flex justify-center items-center rounded-2xl bg-bg-secondary"
            label="취소"
            labelClassName="text-text-secondary text-l-semibold"
          />
          <Button
            className={`bg-bg-tertiary w-full h-12 flex justify-center items-center rounded-2xl ${buttonProps?.color ? buttonProps?.color : ''}`}
            onClick={() => {
              action()
              closeModal()
            }}
            label={buttonProps?.text ? buttonProps.text : '저장하기'}
            labelClassName="text-[#F1F8F3] text-l-semibold"
          />
        </div>
      </div>
    </div>,
    document.body,
  )
}

export default Modal
