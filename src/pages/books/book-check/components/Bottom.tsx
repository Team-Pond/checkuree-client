import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export default function Bottom() {
  const location = useLocation();
  const currentPath = location.pathname;
  const attendanceBookId = location.pathname.split("/")[2];

  const navigate = useNavigate();

  return (
    <div
      className="flex justify-between px-[44px] items-center fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50 
             w-full max-w-[390px] h-[92px] bg-white rounded-2xl"
    >
      <div
        className="flex flex-col gap-2 items-center"
        onClick={() => navigate(`/book/${attendanceBookId}`)}
      >
        <img
          src={`/images/icons/book-check/${
            currentPath.split("/")[1] === "book"
              ? "ico-book-active"
              : "ico-book"
          }.svg`}
          alt="출석부 아이콘"
          width={20}
        />
        <p
          className={twMerge(
            "text-xs ",
            currentPath.split("/")[1] === "book"
              ? "text-text-primary"
              : "text-text-tertiary"
          )}
        >
          출석부
        </p>
      </div>
      <div
        className="flex flex-col gap-2 items-center"
        onClick={() => navigate(`/roaster/${attendanceBookId}`)}
      >
        <img
          src={`/images/icons/book-check/${
            currentPath.split("/")[1] === "roaster"
              ? "ico-roaster-active"
              : "ico-roaster"
          }.svg`}
          alt="출석부 아이콘"
          width={20}
          height={20}
        />
        <p
          className={twMerge(
            "text-xs ",
            currentPath.split("/")[1] === "roaster"
              ? "text-text-primary"
              : "text-text-tertiary"
          )}
        >
          명단
        </p>
      </div>
      <div
        className="flex flex-col gap-2 items-center"
        onClick={() => toast("준비중인 기능입니다.")}
      >
        <img
          src="/images/icons/book-check/ico-statistics.svg"
          alt="출석부 아이콘"
          width={20}
          height={20}
        />
        <p className="text-xs text-text-tertiary">통계</p>
      </div>
    </div>
  );
}
