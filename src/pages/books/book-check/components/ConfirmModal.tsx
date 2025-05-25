import React from 'react'

interface Props {
  message: string | React.ReactNode
}

export const ConfirmModal: React.FC<Props> = ({ message }) => {
  return (
    <div className="flex flex-col gap-6 justify-center items-center w-full">
      <p className="text-m-bold text-text-primary">{message}</p>
    </div>
  )
}

export default ConfirmModal
