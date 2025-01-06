import { BookProvider } from "@/context/BookContext";
import { Outlet } from "react-router-dom";

export default function BookLayout() {
  return (
    <BookProvider>
      <Outlet />
    </BookProvider>
  );
}
