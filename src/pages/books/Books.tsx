import { DayOfWeek } from "../../utils";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { formatTimeRange, getDayGroupFromInput } from "@/utils";
import { BookContext } from "@/context/BookContext";
import { useBookList } from "./queries";
import SEO from "@/components/SEO";

export default function Books() {
  const navigate = useNavigate();
  const context = useContext(BookContext);

  const { setSelectedBook } = context!;

  const handleNavigation = (args: {
    id: number;
    title: string;
    attendeeCount: number;
    availableDays: DayOfWeek[];
    availableFrom: string;
    availableTo: string;
  }) => {
    setSelectedBook({
      id: args.id,
      title: args.title,
      attendeeCount: args.attendeeCount,
      availableDays: args.availableDays,
      availableFrom: args.availableFrom,
      availableTo: args.availableTo,
    });
    navigate(`/book/${args.id}?bookName=${args.title}`);
  };

  const { data: bookList } = useBookList();

  return (
    <section className="relative flex flex-col w-full min-h-screen">
      <SEO
        title="체쿠리 | 출석부 목록"
        content="체쿠리 음악학원 출석부 서비스의 출석부 목록 페이지입니다."
      />
      <div className="w-full h-[64px] flex items-center justify-between px-4 py-5">
        <img
          src="/images/logos/checkuree_logo.svg"
          alt="체쿠리 아이콘"
          width={170}
          height={20}
        />
        <img
          src="/images/icons/book/ico-notification.svg"
          alt="알림 아이콘"
          width={20}
          height={20}
        />
      </div>
      <div className="flex-1 bg-bg-secondary flex flex-col items-center">
        <div className="w-full max-w-[340px]  border-spacing-0 py-5 grid grid-cols-2  gap-y-6 gap-x-4 ">
          {bookList?.data.map((attendance) => {
            return (
              <div
                key={attendance.id}
                className="max-w-[162px] w-full"
                onClick={() => {
                  handleNavigation({
                    id: attendance.id,
                    title: attendance.title,
                    attendeeCount: attendance.attendeeCount,
                    availableDays: attendance.availableDays,
                    availableFrom: attendance.availableFrom,
                    availableTo: attendance.availableTo,
                  });
                }}
              >
                <img
                  src={
                    attendance.imageUrl === "string"
                      ? "/images/img-test.png"
                      : "/images/img-test.png"
                  }
                  className="w-full h-[97px] rounded-t-2xl"
                  alt=""
                />
                <div className="flex flex-col gap-2 px-3 py-4 text-left rounded-b-2xl h-[98px] bg-white">
                  <div className="flex gap-2">
                    <p className="font-bold text-text-primary">
                      {attendance.title}
                    </p>
                    <p className="font-semibold text-text-secondary">
                      {attendance.attendeeCount}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-text-brand font-bold text-sm">
                      {getDayGroupFromInput(attendance.availableDays)}
                    </p>
                    <p className="text-text-secondary font-medium text-sm">
                      {formatTimeRange("1200", "2000")}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="fixed bottom-11 right-[5%] max-w-[390px]">
        <button
          onClick={() => navigate("/book/create")}
          className="w-[104px] h-[46px] rounded-full flex gap-2 justify-center items-center bg-bg-tertiary"
        >
          <img
            src="/images/icons/book/ico-plus.svg"
            alt="플러스 아이콘"
            width={16}
            height={16}
          />
          <p className="text-white font-semibold text-lg">출석부</p>
        </button>
      </div>
    </section>
  );
}
