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

// Lazy load components
const Attendances = lazy(() => import("@/pages/attendances/Attendances"));
const AttendanceCreate = lazy(
  () => import("@/pages/attendances/attendance-create/AttendanceCreate")
);
const KakaoSignIn = lazy(() => import("@/pages/kakao-auth/SignIn"));
const CheckureeSignIn = lazy(() => import("@/pages/checkuree-auth/SignIn"));

const SignIn = lazy(() => import("@/pages/auth/SignIn"));
const AttendanceCheck = lazy(
  () => import("@/pages/attendances/attendance-check/AttendanceCheck")
);
interface RouteType {
  path: string;
  element: JSX.Element;
}
const routes: RouteType[] = [
  { path: "/attendances", element: <Attendances /> }, // 출석부
  { path: "/attendances/attendance-create", element: <AttendanceCreate /> }, // 출석부
  { path: "/attendances/:id", element: <AttendanceCheck /> },
  { path: "/attendances/attendance-check", element: <AttendanceCheck /> },
];

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <PageContainer>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Navigate to={"/attendances"} />} />
            <Route path="*" element={<Navigate to={""} />} /> {/* 404페이지 */}
            <Route path="/auth/signin" element={<SignIn />} />
            <Route
              path="/checkuree-auth/signin"
              element={<CheckureeSignIn />}
            />
            <Route path="/kakao-auth/signin" element={<KakaoSignIn />} />
            {/* 인증 처리 */}
            {routes.map((route) => {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <ProtectedRoute element={route.element}></ProtectedRoute>
                  }
                />
              );
            })}
          </Routes>
        </PageContainer>
      </Suspense>
    </Router>
  );
}

export default App;
