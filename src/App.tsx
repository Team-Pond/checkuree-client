import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Attendances from "./pages/attendances/Attendances";
import AttendancesRoaster from "./pages/attendances/attendances-roaster/AttendancesRoaster";
import ListManagement from "./pages/list-management/ListManagement";
import ProtectedRoute from "./ProtectedRoute";
import PageContainer from "./components/PageContainer";
import KakaoSignIn from "./pages/kakao-auth/SignIn";

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
      <PageContainer>
        <Routes>
          {/* / 경로 시 로그인 페이지로 이동 */}
          <Route path="/" element={<Navigate to={"/auth/signin"} />} />
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/kakao-auth/signin" element={<KakaoSignIn />} />
          <Route path="/kakao-auth/signup" element={<SignUp />} />
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
    </Router>
  );
}

export default App;
