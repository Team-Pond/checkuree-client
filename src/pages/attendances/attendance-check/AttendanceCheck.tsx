import Bottom from "./components/Bottom";
import Header from "./components/Header";
import MainContents from "./components/MainContent";

export default function AttendanceCheck() {
  return (
    <section className="flex flex-col w-full">
      <Header />
      <MainContents />
      <Bottom />
    </section>
  );
}
