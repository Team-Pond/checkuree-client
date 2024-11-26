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
      <Routes>
        <Route path="/" key={"/"} element={<Navigate to={"/auth/signin"} />} />
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
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
    </Router>
  );
}

export default App;
