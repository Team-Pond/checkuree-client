import { twMerge } from "tailwind-merge";

type TimePeriod = "DAILY" | "WEEKLY" | "MONTHLY";
interface IProps {
  timeStatus: TimePeriod;
  handleTimeStatus: (timeStatus: TimePeriod) => void;
}
export default function TimeButtons({ timeStatus, handleTimeStatus }: IProps) {
  return (
    <div className="flex">
      <button
        onClick={() => handleTimeStatus("DAILY")}
        className={twMerge(
          "w-[57px] h-[33px] rounded-lg",
          timeStatus === "DAILY" ? "bg-bg-interactive-primary" : ""
        )}
      >
        <span
          className={twMerge(
            "text-[14px]",
            timeStatus === "DAILY"
              ? "text-text-interactive-primary-press"
              : "text-text-interactive-secondary"
          )}
        >
          일간
        </span>
      </button>
      <button
        onClick={() => handleTimeStatus("WEEKLY")}
        className={twMerge(
          "w-[57px] h-[33px]  rounded-lg",
          timeStatus === "WEEKLY" ? "bg-bg-interactive-primary" : ""
        )}
      >
        <span
          className={twMerge(
            "text-[14px]",
            timeStatus === "WEEKLY"
              ? "text-text-interactive-primary-press"
              : "text-text-interactive-secondary"
          )}
        >
          주간
        </span>
      </button>
      <button
        onClick={() => handleTimeStatus("MONTHLY")}
        className={twMerge(
          "w-[57px] h-[33px] rounded-lg",
          timeStatus === "MONTHLY" ? "bg-bg-interactive-primary" : ""
        )}
      >
        <span
          className={twMerge(
            "text-[14px]",
            timeStatus === "MONTHLY"
              ? "text-text-interactive-primary-press"
              : "text-text-interactive-secondary"
          )}
        >
          월간
        </span>
      </button>
    </div>
  );
}
