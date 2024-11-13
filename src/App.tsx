import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";

interface RouteType {
  path: string;
  element: JSX.Element;
}
const routes: RouteType[] = [
  { path: "/auth/signin", element: <SignIn /> },
  { path: "/auth/signup", element: <SignUp /> },
];
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => {
          return <Route path={route.path} element={route.element} />;
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
