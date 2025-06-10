// src/utils/handleError.ts
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'

export const handleError = (err: AxiosError) => {
  const errorData = err.response?.data as { description: string } | undefined
  if (errorData && errorData.description) {
    toast.error(errorData.description)
  } else {
    toast.error('알 수 없는 오류가 발생했습니다.')
  }
}
