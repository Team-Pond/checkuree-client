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

// Lazy load components
const Attendances = lazy(() => import("@/pages/attendances/Attendances"));
const ListManagement = lazy(
  () => import("@/pages/list-management/ListManagement")
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
  { path: "/attendances/:id", element: <AttendanceCheck /> },
  { path: "/list-management/:id", element: <ListManagement /> },
];

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <PageContainer>
          <Routes>
            {/* / 경로 시 로그인 페이지로 이동 */}
            <Route path="/" element={<Navigate to={"/attendances"} />} />
            <Route path="/auth/signin" element={<SignIn />} />
            <Route
              path="/checkuree-auth/signin"
              element={<CheckureeSignIn />}
            />
            <Route path="/kakao-auth/signin" element={<KakaoSignIn />} />
            <Route
              path="/attendances/attendance-check"
              element={<AttendanceCheck />}
            />

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
