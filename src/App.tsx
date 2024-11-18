import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Cookies from "js-cookie";
import { useEffect } from "react";
import Attendances from "./pages/attendances/Attendances";
import AttendancesRoaster from "./pages/attendances/attendances-roaster/AttendancesRoaster";
import ListManagement from "./pages/list-management/ListManagement";

interface RouteType {
  path: string;
  element: JSX.Element;
}
const routes: RouteType[] = [
  { path: "/auth/signin", element: <SignIn /> },
  { path: "/auth/signup", element: <SignUp /> },
  { path: "/attendances", element: <Attendances /> },
  { path: "/attendances/:id", element: <AttendancesRoaster /> },
  { path: "/list-management/:id", element: <ListManagement /> },
];
function App() {
  // Boolean type으로 변하기 위함 js에서 null undefined,0 NaN, "", false등이 Falsy값으로 평가됨

  const isAuthenticated: boolean = !!Cookies.get(
    import.meta.env.VITE_ACCESS_TOKEN
  );

  useEffect(() => {
    if (isAuthenticated) {
    }
  }, []);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          key={"/"}
          element={
            <Navigate to={isAuthenticated ? "/attendances" : "/auth/signin"} />
          }
        />
        {routes.map((route) => {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                // isAuthenticated ? (
                //   <Navigate to={"/attendances"} />
                // ) : (
                //   route.element
                // )
                route.element
              }
            />
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;
