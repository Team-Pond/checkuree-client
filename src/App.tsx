import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Attendances from "./pages/attendances/Attendances";
import AttendancesRoaster from "./pages/attendances/attendances-roaster/AttendancesRoaster";
import ListManagement from "./pages/list-management/ListManagement";
import ProtectedRoute from "./ProtectedRoute";
import PageContainer from "./components/PageContainer";
import KakaoSignIn from "./pages/kakao-auth/SignIn";
import CheckureeSignIn from "./pages/checkuree-auth/SignIn";
import SignIn from "./pages/auth/SignIn";
import AttendanceCheck from "./pages/attendances/attendance-check/AttendanceCheck";
import { Suspense } from "react";
import Loading from "./components/Loading";

interface RouteType {
  path: string;
  element: JSX.Element;
}
const routes: RouteType[] = [
  { path: "/attendances", element: <Attendances /> },
  { path: "/attendances/:id", element: <AttendancesRoaster /> },
  { path: "/list-management/:id", element: <ListManagement /> },
];

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <PageContainer>
          <Routes>
            {/* / 경로 시 로그인 페이지로 이동 */}
            <Route path="/" element={<Navigate to={"/auth/signin"} />} />
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
            <Route path="/loading" element={<Loading />} />

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
