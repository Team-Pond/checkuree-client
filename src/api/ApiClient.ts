import { clearTokens, setTokens } from '@/lib/auth'
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'

const ApiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_DEV_ROOT,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
})

// 요청 인터셉터
ApiClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken()
    config.withCredentials = true // 쿠키를 포함한 요청을 보냅니다.
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

ApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('인증되지 않았습니다. - 401 STATUS')

      return refresh(error.config)
    }
    return Promise.reject(error)
  },
)

export default ApiClient

// 기본 access 토큰이 설정되어 있지 않다면 브라우저 쿠키에서 가져온다.
function getAccessToken(): string | undefined {
  return Cookies.get(import.meta.env.VITE_ACCESS_TOKEN)
}

// 기본 refresh 토큰이 설정되어 있지 않다면 브라우저 쿠키에서 가져온다.
function getRefreshToken(): string | undefined {
  return Cookies.get(import.meta.env.VITE_REFRESH_TOKEN)
}

async function refresh(config: AxiosRequestConfig) {
  const refreshToken = getRefreshToken()

  if (refreshToken) {
    try {
      const refreshResult = await axios.request({
        baseURL: import.meta.env.VITE_API_DEV_ROOT,
        url: '/auth/refresh',
        method: 'POST',
        data: {
          refreshToken,
        },
      })

      setTokens({
        accessToken: refreshResult.data.data!.accessToken,
        refreshToken: refreshResult.data.data!.refreshToken,
      })

      return axios.request({
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${refreshResult.data.data!.accessToken}`,
        },
      })
    } catch (e) {
      clearTokens()
      console.error('토큰 갱신 실패:', e)
      window.location.href = '/auth/signin'
    }
  } else {
    clearTokens()
    window.location.href = '/auth/signin'
  }
}
