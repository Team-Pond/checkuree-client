"use client";
// Components
import { TextField } from "@mui/material";

// Styles
import { AttendanceSchedulesByDateItem } from "../api/schema";
import { twMerge } from "tailwind-merge";

export type HandleListItemType = (
  index: number,
  time: string,
  field: string,
  value: string | boolean
) => void;

interface ItemType extends AttendanceSchedulesByDateItem {
  lateTime?: string;
  etc?: string;
  absenceType?: string;
}

interface PropsType {
  index: number;
  time: string;
  item: ItemType;
  handleListItem: HandleListItemType;
}

const DetailInputBox = ({ item, time, index, handleListItem }: PropsType) => {
  const detailOptions = {
    Late: [
      { label: "5분", value: "5m" },
      { label: "10분", value: "10m" },
      { label: "15분", value: "15m" },
      { label: "20분 이상", value: "20m" },
    ],
    Absent: [
      { label: "공결", value: "OFFICIAL" },
      { label: "병결", value: "SICK" },
      { label: "무단", value: "GENERAL" },
      { label: "기타", value: "ETC" },
    ],
  };

  const status =
    item.newStatus && item.newStatus.length > 0 ? item.newStatus : item.status;

  return (
    <div className="detail-box">
      {status === "Late" ? (
        <div className="detail-buttons">
          {detailOptions.Late.map((option) => (
            <div
              className={twMerge(
                "w-fit px-3 rounded-[44px] box-border text-xs font-medium text-center",
                option.value === item.lateTime
                  ? "text-white bg-[#222222]"
                  : "text-[#222222]"
              )}
              onClick={() => {
                handleListItem(index, time, "lateTime", option.value);
                handleListItem(index, time, "newStatus", "Late");
              }}
              key={option.value}
            >
              {option.label}
            </div>
          ))}
        </div>
      ) : status === "Absent" ? (
        <div className="detail-buttons">
          {detailOptions.Absent.map((option) => (
            <div
              className={twMerge(
                "w-fit px-3 rounded-[44px] box-border text-xs font-medium text-center",
                option.value === item.lateTime
                  ? "text-white bg-[#222222]"
                  : "text-[#222222]"
              )}
              onClick={() => {
                handleListItem(index, time, "absenceType", option.value);
                handleListItem(index, time, "newStatus", "Absent");
              }}
              key={option.value}
            >
              {option.label}
            </div>
          ))}
        </div>
      ) : null}

      <TextField
        value={item.etc}
        rows={status === "Present" ? 4 : 3}
        onChange={(e) => {
          handleListItem(index, time, "etc", e.target.value);

          if (item.newStatus === "") {
            handleListItem(index, time, "newStatus", item.status || "");
          }
        }}
        multiline
      />
    </div>
  );
};

export default DetailInputBox;
