import React from 'react'
import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'

interface ProtectedRouteProps {
  element: JSX.Element
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const isAuthenticated: boolean = !!Cookies.get(
    import.meta.env.VITE_ACCESS_TOKEN,
  )

  // 인증되지 않은 경우 "/auth/signin"으로 리다이렉트
  return isAuthenticated ? element : <Navigate to="/auth/signin" />
}

export default ProtectedRoute
