import { useMutation } from '@tanstack/react-query'
import { LoginDataType } from './SignIn'
import axios from 'axios'
import { setTokens } from '@/lib/auth'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { SignIn } from '@/api/AuthApiClient'

export const useAuthLogin = () => {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: async (params: LoginDataType) => await SignIn(params),
    onSuccess: (response) => {
      const accessToken = response.data.accessToken
      const refreshToken = response.data.refreshToken
      const token = response.data.accessToken
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setTokens({
        accessToken: accessToken as string,
        refreshToken: refreshToken as string,
      })
      toast.success('로그인 되었습니다.')
      navigate('/')
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data.message ||
            '서버에 오류가 발생했습니다.\n잠시 후 다시 시도해 주세요.',
        )
      } else {
        toast.error('서버에 오류가 발생했습니다.\n잠시 후 다시 시도해 주세요.')
      }
    },
  })
}
