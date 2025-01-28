import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import ProtectedRoute from "@/ProtectedRoute";
import PageContainer from "@/components/PageContainer";
import Loading from "@/components/Loading";
import { lazy, Suspense } from "react";
import ScrollToTop from "./components/ScrollToTop";
import BookLayout from "./layouts/BookLayout";
import NotFound from "./pages/404";
import BookAttendeeDetail from "./pages/books/book-attendee-detail/BookAttendeeDetail";

// Lazy load components
const Books = lazy(() => import("@/pages/books/Books"));
const AttendeeCreate = lazy(
  () => import("@/pages/attendee-create/AttendeeCreate")
);
const BookCreate = lazy(() => import("@/pages/books/book-create/BookCreate"));
const BookRoaster = lazy(
  () => import("@/pages/books/book-attendee/BookAttendee")
);
const KakaoSignIn = lazy(() => import("@/pages/kakao-auth/SignIn"));
const CheckureeSignIn = lazy(() => import("@/pages/checkuree-auth/SignIn"));

const SignIn = lazy(() => import("@/pages/auth/SignIn"));
const BookCheck = lazy(() => import("@/pages/books/book-check/BookCheck"));
interface RouteType {
  path: string;
  element: JSX.Element;
}
const routes: RouteType[] = [
  { path: "/book", element: <Books /> }, // 출석부 목록
  { path: "/book/create", element: <BookCreate /> }, // 출석부 생성
  { path: "/book/:bookId/attendee/create", element: <AttendeeCreate /> }, // 출석부 생성
  { path: "/book/:bookId", element: <BookCheck /> }, // 출석부 출석
  { path: "/book/:bookId/attendee", element: <BookRoaster /> }, // 출석부 명단
  { path: "/book/:bookId/attendee/detail", element: <BookAttendeeDetail /> }, // 출석부 명단
];

function App() {
  return (
    <Router>
      {/* <ErrorBoundary fallback={<Loading />}> */}
      <Suspense fallback={<Loading />}>
        <PageContainer>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Navigate to={"/book"} />} />
            <Route path="*" element={<NotFound />} /> {/* 404페이지 */}
            <Route path="/auth/signin" element={<SignIn />} />
            <Route
              path="/checkuree-auth/signin"
              element={<CheckureeSignIn />}
            />
            <Route path="/kakao-auth/signin" element={<KakaoSignIn />} />
            {/* 인증 처리 */}
            {/* Book 관련 라우트 그룹 */}
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
        </PageContainer>
      </Suspense>
      {/* </ErrorBoundary> */}
    </Router>
  );
}

export default App;
