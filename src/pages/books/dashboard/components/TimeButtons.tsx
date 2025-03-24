import { PeriodType } from "@/api/type";
import { twMerge } from "tailwind-merge";

type IProps = {
  timeStatus: PeriodType;
  handleTimeStatus: (timeStatus: PeriodType) => void;
};
const BUTTON_OPTIONS = [
  {
    status: "DAILY",
    type: "일간",
  },
  {
    status: "WEEKLY",
    type: "주간",
  },
  {
    status: "MONTHLY",
    type: "월간",
  },
];
export default function TimeButtons({ timeStatus, handleTimeStatus }: IProps) {
  return (
    <div className="flex">
      {BUTTON_OPTIONS.map((option) => {
        return (
          <Button
            timeStatus={timeStatus}
            handleTimeStatus={handleTimeStatus}
            status={option.status as PeriodType}
            type={option.type}
          />
        );
      })}
    </div>
  );
}

function Button({
  timeStatus,
  handleTimeStatus,
  status,
  type,
}: IProps & { status: PeriodType; type: string }) {
  return (
    <button
      onClick={() => handleTimeStatus(status)}
      className={twMerge(
        "w-[57px] h-[33px] rounded-lg",
        timeStatus === status ? "bg-bg-interactive-primary" : ""
      )}
    >
      <span
        className={twMerge(
          "text-[14px]",
          timeStatus === status
            ? "text-text-interactive-primary-press"
            : "text-text-interactive-secondary"
        )}
      >
        {type}
      </span>
    </button>
  );
}
