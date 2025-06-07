import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'

import ProtectedRoute from '@/providers/ProtectedRoute'
import PageLayout from '@/PageLayout'
import Loading from '@/components/Loading'
import { lazy, Suspense } from 'react'
import ScrollToTop from './components/ScrollToTop'
import NotFound from './pages/404'

import Modal from './components/Modal'

// Lazy load components
const BooksPage = lazy(() => import('@/pages/book/page'))
const AttendeeCreatePage = lazy(
  () => import('@/pages/book/book-attendee/attendee-create/page'),
)
const ScheduleModifyPage = lazy(
  () => import('@/pages/book/book-attendee-detail/_components/ScheduleModify'),
)
const BookCreatePage = lazy(() => import('@/pages/book/book-create/page'))
const BookAttendeePage = lazy(() => import('@/pages/book/book-attendee/page'))
const KakaoSignInPage = lazy(() => import('@/pages/auth/kakao-auth/page'))
const CheckureeSignInPage = lazy(
  () => import('@/pages/auth/checkuree-auth/page'),
)
const SignInPage = lazy(() => import('@/pages/auth/page'))
const BookCheckPage = lazy(() => import('@/pages/book/book-check/page'))
const BookAttendeeDetailPage = lazy(
  () => import('@/pages/book/book-attendee-detail/page'),
)
const CounsellingCreatePage = lazy(
  () => import('@/pages/book/book-attendee-detail/counsel/page'),
)
const DashboardPage = lazy(() => import('@/pages/book/dashboard/page'))

interface RouteType {
  path: string
  element: JSX.Element
}
const routes: RouteType[] = [
  { path: '/book', element: <BooksPage /> }, // 출석부 목록
  { path: '/book/create', element: <BookCreatePage /> }, // 출석부 생성
  { path: '/book/:bookId/attendee/create', element: <AttendeeCreatePage /> }, // 학생 생성
  { path: '/book/:bookId', element: <BookCheckPage /> }, // 출석부 출석
  { path: '/book/:bookId/attendee', element: <BookAttendeePage /> }, // 출석부 명단
  {
    path: '/book/:bookId/attendee/:attendeeId',
    element: <BookAttendeeDetailPage />, // 학생 상세
  },
  {
    path: '/book/:bookId/attendee/:attendeeId/schedule',
    element: <ScheduleModifyPage />, // 학생 일정 수정
  },
  {
    path: '/book/:bookId/attendee/:attendeeId/counselling',
    element: <CounsellingCreatePage />, // 상담 생성
  },
  {
    path: '/book/:bookId/dashboard',
    element: <DashboardPage />,
  },
]

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <PageLayout>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Navigate to={'/book'} />} />
          <Route path="*" element={<NotFound />} /> {/* 404페이지 */}
          <Route path="/auth/signin" element={<SignInPage />} />
          <Route
            path="/checkuree-auth/signin"
            element={<CheckureeSignInPage />}
          />
          <Route path="/auth/login" element={<KakaoSignInPage />} />
          {/* 인증 처리 */}
          <Route element={<BookLayout />}>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<ProtectedRoute element={route.element} />}
              />
            ))}
          </Route>
        </Routes>
        <Modal />
      </PageLayout>
    </Suspense>
  )
}

export default App

import { BookProvider } from '@/context/BookContext'
import { Outlet } from 'react-router-dom'

function BookLayout() {
  return (
    <BookProvider>
      <Outlet />
    </BookProvider>
  )
}
