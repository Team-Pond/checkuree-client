import { useLocation, useNavigate, useParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import BookActiveIcon from "@/assets/icons/book-check/ico-book-active.svg?react";
import BookIcon from "@/assets/icons/book-check/ico-book.svg?react";
import RoasterActiveIcon from "@/assets/icons/book-check/ico-roaster-active.svg?react";
import RoasterIcon from "@/assets/icons/book-check/ico-roaster.svg?react";
import StatisticsActiveIcon from "@/assets/icons/book-check/ico-statistics-active.svg?react";
import StatisticsIcon from "@/assets/icons/book-check/ico-statistics.svg?react";

export default function Bottom() {
  const location = useLocation();
  const attendeeUrl = location.pathname.includes("attendee");
  const bookUrl = location.pathname.split("/")[1];

  const dashBoardUrl = location.pathname.includes("dashboard");

  const navigate = useNavigate();

  const { bookId } = useParams();

  const isBookActive = !!bookUrl && !!!dashBoardUrl && !!!attendeeUrl;
  const isAttendeeActive = !!attendeeUrl;
  const isDashBoardActive = !!dashBoardUrl;
  return (
    <div
      className="flex justify-between px-[44px] items-center fixed bottom-0 left-1/2 transform -translate-x-1/2 z-40
             w-full max-w-[390px] h-[92px] bg-white rounded-2xl"
    >
      <div
        className="flex flex-col gap-2 items-center"
        onClick={() => navigate(`/book/${bookId}${location.search}`)}
      >
        {isBookActive ? <BookActiveIcon width={20} /> : <BookIcon width={20} />}

        <p
          className={twMerge(
            "text-xs ",
            isBookActive ? "text-text-primary" : "text-text-tertiary"
          )}
        >
          출석부
        </p>
      </div>
      <div
        className="flex flex-col gap-2 items-center"
        onClick={() => navigate(`/book/${bookId}/attendee${location.search}`)}
      >
        {isAttendeeActive ? (
          <RoasterActiveIcon width={20} />
        ) : (
          <RoasterIcon width={20} />
        )}
        <p
          className={twMerge(
            "text-xs ",
            isAttendeeActive ? "text-text-primary" : "text-text-tertiary"
          )}
        >
          명단
        </p>
      </div>
      <div
        className="flex flex-col gap-2 items-center"
        onClick={() => navigate(`/book/${bookId}/dashboard${location.search}`)}
      >
        {isDashBoardActive ? (
          <StatisticsActiveIcon width={20} />
        ) : (
          <StatisticsIcon width={20} />
        )}
        <p
          className={twMerge(
            "text-xs",
            isDashBoardActive ? "text-text-primary" : "text-text-tertiary"
          )}
        >
          통계
        </p>
      </div>
    </div>
  );
}
