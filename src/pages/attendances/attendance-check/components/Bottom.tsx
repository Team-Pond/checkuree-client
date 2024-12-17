import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export default function Bottom() {
  const location = useLocation();
  const currentPath = location.pathname;

  const navigate = useNavigate();
  return (
    <div className="flex justify-between px-[44px] items-center  sticky bottom-0 z-50 w-full h-[92px] bg-white rounded-2xl">
      <div
        className="flex flex-col gap-2 items-center"
        onClick={() => navigate(currentPath)}
      >
        <img
          src={`/images/icons/attendance-check/${
            currentPath.split("/")[1] === "attendances"
              ? "ico-attendance-active"
              : "ico-attendance"
          }.svg`}
          alt="출석부 아이콘"
          width={20}
        />
        <p
          className={twMerge(
            "text-xs ",
            currentPath.split("/")[1] === "attendances"
              ? "text-text-primary"
              : "text-text-tertiary"
          )}
        >
          출석부
        </p>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <img
          src="/images/icons/attendance-check/ico-roaster.svg"
          alt="출석부 아이콘"
          width={20}
          height={20}
        />
        <p className="text-xs text-text-tertiary">명단</p>
      </div>
      <div
        className="flex flex-col gap-2 items-center"
        onClick={() => toast("준비중인 기능입니다.")}
      >
        <img
          src="/images/icons/attendance-check/ico-statistics.svg"
          alt="출석부 아이콘"
          width={20}
          height={20}
        />
        <p className="text-xs text-text-tertiary">통계</p>
      </div>
    </div>
  );
}
