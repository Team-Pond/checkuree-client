import Header from "./components/Header";
import MainContents from "./components/MainContent";
import Bottom from "../components/Bottom";
import { useContext } from "react";
import { BookContext } from "@/context/BookContext";
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getScheduleAttendee } from "@/api v2/ScheduleApiClient";
import { ScheduleDataType } from "@/api v2/ScheduleSchema";

export default function BookCheck() {
  const context = useContext(BookContext);
  const { selectedBook } = context!;
  const { bookId } = useParams();
  const [searchParams] = useSearchParams();
  const bookName = searchParams.get("bookName");

  const { data: bookSchedules } = useQuery({
    queryKey: ["book-schedules", bookId],
    queryFn: async () =>
      await getScheduleAttendee({
        attendanceBookId: Number(bookId!),
        params: {
          date: "2025-01-14",
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
