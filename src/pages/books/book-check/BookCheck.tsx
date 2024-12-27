import Bottom from "./components/Bottom";
import Header from "./components/Header";
import MainContents from "./components/MainContent";

export default function BookCheck() {
  return (
    <section className="flex flex-col w-full">
      <Header />
      <MainContents />
      <div className="flex justify-between px-[44px] items-center w-full h-[92px] bg-bg-secondary" />
      <Bottom />
    </section>
  );
}
