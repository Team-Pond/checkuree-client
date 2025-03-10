import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";

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
        <img
          src={`/images/icons/book-check/${
            isBookActive ? "ico-book-active" : "ico-book"
          }.svg`}
          alt="출석부 아이콘"
          width={20}
        />
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
        <img
          src={`/images/icons/book-check/${
            isAttendeeActive ? "ico-roaster-active" : "ico-roaster"
          }.svg`}
          alt="출석부 아이콘"
          width={20}
          height={20}
        />
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
        <img
          src={`/images/icons/book-check/${
            isDashBoardActive ? "ico-statistics-active" : "ico-statistics"
          }.svg`}
          alt="출석부 아이콘"
          width={20}
          height={20}
        />
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
