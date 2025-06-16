import React from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
  message: string | React.ReactNode
  className?: string
}

export const ConfirmModal: React.FC<Props> = ({ message, className }) => {
  return (
    <p className={`text-m-bold text-text-primary ${className ?? ''}`}>
      {message}
    </p>
  )
}

export default ConfirmModal
