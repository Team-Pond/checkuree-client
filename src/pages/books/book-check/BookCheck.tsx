import { useLocation } from "react-router-dom";

import Header from "./components/Header";
import MainContents from "./components/MainContent";
import Bottom from "../components/Bottom";

export default function BookCheck() {
  const location = useLocation();
  const { title } = location.state || {};

  return (
    <section className="flex flex-col w-full">
      <Header title={title} />
      <MainContents />
      <div className="flex justify-between px-[44px] items-center w-full h-[92px] bg-bg-secondary" />
      <Bottom />
    </section>
  );
}
