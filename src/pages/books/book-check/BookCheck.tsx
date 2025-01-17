import Header from "./components/Header";
import MainContents from "./components/MainContent";
import Bottom from "../components/Bottom";
import { useContext } from "react";
import { BookContext } from "@/context/BookContext";
import { useSearchParams } from "react-router-dom";

export default function BookCheck() {
  const context = useContext(BookContext);
  const { selectedBook } = context!;

  const [searchParams] = useSearchParams();
  const bookName = searchParams.get("bookName");
  return (
    <section className="flex flex-col w-full scrollbar-hide custom-scrollbar-hide">
      <Header title={bookName || selectedBook?.title!} />
      <MainContents />
      <div className="flex justify-between px-[44px] items-center w-full h-[92px] bg-bg-secondary" />
      <Bottom />
    </section>
  );
}
