import Header from "./components/Header";
import MainContents from "./components/MainContent";

import { useContext, useEffect, useState } from "react";
import { BookContext } from "@/context/BookContext";
import { useParams, useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import Bottom from "../components/Bottom";
import { useBookSchedules } from "./queries";
import { BottomAddRecord } from "./components/BottomAddRecord";
import SEO from "@/components/SEO";

export default function BookCheck() {
  const context = useContext(BookContext);

  const { selectedBook } = context!;
  const { bookId } = useParams();
  const [searchParams] = useSearchParams();
  const bookName = searchParams.get("bookName");
  const [currentDate, setCurrentDate] = useState(dayjs()); // dayjs로 초기화
  const [checkedScheduleCount, setCheckedScheduleCount] = useState<number>(0);
  const [totalScheduleCount, setTotalScheduleCount] = useState<number>(0);
  const [openFilter, setOpenFilter] = useState<boolean>(false);

  // 확인 모달창의 오픈 여부, 메시지 내용, 저장버튼 클릭 시 실행할 함수

  const formattedDate = currentDate.format("YYYY-MM-DD"); // 데이터 값

  const onDrawerChange = () => {
    setOpenFilter(!openFilter);
  };

  const handlePreviousDay = () => {
    setCurrentDate((prev) => prev.subtract(1, "day"));
  };

  const handleNextDay = () => {
    setCurrentDate((prev) => prev.add(1, "day"));
  };

  const { data: bookSchedules } = useBookSchedules({
    bookId: Number(bookId),
    formattedDate: formattedDate,
  });

  useEffect(() => {
    if (bookSchedules?.status === 200) {
      const scheduleData = bookSchedules.data;

      setTotalScheduleCount(scheduleData.numberOfElements);
      const checkedCount = scheduleData.content.reduce((total, schedules) => {
        return (
          total +
          schedules.schedules.filter(
            (schedule) => schedule.recordStatus !== "PENDING"
          ).length
        );
      }, 0);
      setCheckedScheduleCount(checkedCount);
    }
  }, [bookSchedules]);

  return (
    <section className="flex flex-col w-full scrollbar-hide custom-scrollbar-hide bg-bg-secondary flex-1">
      <SEO
        title="체쿠리 | 출석부 출석"
        content="체쿠리 음악학원 출석부 서비스의 출석부 출석 페이지입니다."
      />
      <Header
        title={bookName || selectedBook?.title!}
        bookId={Number(bookId)}
        handlePreviousDay={handlePreviousDay}
        handleNextDay={handleNextDay}
        currentDate={currentDate}
        formattedDate={formattedDate}
        checkedScheduleCount={checkedScheduleCount}
        totalScheduleCount={totalScheduleCount}
        setOpenFilter={setOpenFilter}
      />
      {bookSchedules?.status === 200 ? (
        <MainContents
          bookSchedules={bookSchedules.data}
          currentDate={formattedDate}
          bookId={Number(bookId!)}
          checkedScheduleCount={checkedScheduleCount}
          setCheckedCount={setCheckedScheduleCount}
        />
      ) : (
        <></>
      )}

      <BottomAddRecord
        openFilter={openFilter}
        onDrawerChange={onDrawerChange}
        attendanceBookId={Number(bookId)}
        currentDate={currentDate.format("YYYY-MM-DD")}
      />
      {!openFilter && <Bottom />}
    </section>
  );
}
