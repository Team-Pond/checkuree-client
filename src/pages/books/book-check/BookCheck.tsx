import Header from "./components/Header";
import MainContents from "./components/MainContent";

import { useContext, useState } from "react";
import { BookContext } from "@/context/BookContext";
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getScheduleAttendee } from "@/api v2/ScheduleApiClient";
import { ScheduleDataType } from "@/api v2/ScheduleSchema";
import dayjs from "dayjs";
import Bottom from "../components/Bottom";

export default function BookCheck() {
  const context = useContext(BookContext);

  const { selectedBook } = context!;
  const { bookId } = useParams();
  const [searchParams] = useSearchParams();
  const bookName = searchParams.get("bookName");
  const [currentDate, setCurrentDate] = useState(dayjs()); // dayjs로 초기화

  const formattedDate = currentDate.format("YYYY-MM-DD"); // 데이터 값

  // 날짜 변경 핸들러
  const handlePreviousDay = () => {
    setCurrentDate((prev) => prev.subtract(1, "day"));
  };

  const handleNextDay = () => {
    setCurrentDate((prev) => prev.add(1, "day"));
  };

  const { data: bookSchedules } = useQuery({
    queryKey: ["book-schedules", bookId, currentDate],
    queryFn: async () =>
      await getScheduleAttendee({
        attendanceBookId: Number(bookId!),
        params: {
          date: formattedDate,
          pageable: {
            page: 0,
            size: 100,
            sort: ["asc"],
          },
        },
      }),
  });

  return (
    <section className="flex flex-col w-full scrollbar-hide custom-scrollbar-hide">
      <Header
        title={bookName || selectedBook?.title!}
        bookId={Number(bookId)}
        handlePreviousDay={handlePreviousDay}
        handleNextDay={handleNextDay}
        currentDate={currentDate}
        formattedDate={formattedDate}
      />
      <MainContents
        bookSchedules={bookSchedules?.data as ScheduleDataType}
        bookId={Number(bookId!)}
      />
      <div className="flex justify-between px-[44px] items-center w-full h-[92px] bg-bg-secondary" />
      <Bottom />
    </section>
  );
}
