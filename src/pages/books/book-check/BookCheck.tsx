import Header from "./components/Header";
import MainContents from "./components/MainContent";

import { useContext, useEffect, useState } from "react";
import { BookContext } from "@/context/BookContext";
import { useParams, useSearchParams } from "react-router-dom";
import { ScheduleDataType } from "@/api v2/ScheduleSchema";
import dayjs from "dayjs";
import Bottom from "../components/Bottom";
import { useBookSchedules } from "./querys";
import { BottomAddRecord } from './components/BottomAddRecord';

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
      // CODE-REVIEW 이렇게 as 로 Casting 하지 않으면 타입 에러가 발생합니다..
      const scheduleData = bookSchedules.data as ScheduleDataType;

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
    <section className="flex flex-col w-full scrollbar-hide custom-scrollbar-hide">
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
      <MainContents
        bookSchedules={bookSchedules?.data as ScheduleDataType}
        currentDate={formattedDate}
        bookId={Number(bookId!)}
        checkedScheduleCount={checkedScheduleCount}
        setCheckedCount={setCheckedScheduleCount}
      />
      <BottomAddRecord openFilter={openFilter} onDrawerChange={onDrawerChange}/>
      <div className="flex justify-between px-[44px] items-center w-full h-[92px] bg-bg-secondary" />
      <Bottom />
    </section>
  );
}
