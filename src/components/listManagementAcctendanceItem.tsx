"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

import _ from "lodash";
import { AttendeeData } from "../api/schema";
import { compareDays, ScheduleType } from "../utils";
import Icon from "./Icon";
import { Colors, Icons } from "../styles/globalStyles";

// Styles

// Components

// Types

interface ItemType extends AttendeeData {
  absenceCount: number;
  date: string;
  lateCount: number;
  presentCount: number;
}

interface PropsType {
  item: ItemType;
  setIsUpdateOpen: Dispatch<SetStateAction<string>>;
}

const ListManagementAttendanceItem = (props: PropsType) => {
  const { item, setIsUpdateOpen } = props;

  const statusIcons: { icon: string; count: number }[] = [
    { icon: "sentiment_satisfied_alt", count: item.presentCount },
    { icon: "watch_later", count: item.lateCount },
    { icon: "highlight_off", count: item.absenceCount },
  ];

  const days: Record<string, string> = {
    MONDAY: "월",
    TUESDAY: "화",
    WEDNESDAY: "수",
    THURSDAY: "목",
    FRIDAY: "금",
    SATURDAY: "토",
    SUNDAY: "일",
  };

  const [attendanceDay, setAttendanceDay] = useState<string>("");

  useEffect(() => {
    if (!_.isEmpty(item.schedules)) {
      const attendanceDays: string[] = [];

      item.schedules.sort(compareDays);

      item.schedules.forEach((schedule: ScheduleType) => {
        const day = days[schedule.day];

        if (!attendanceDays.includes(day)) {
          attendanceDays.push(day);
        }
      });

      setAttendanceDay(attendanceDays.join(", "));
    }
  }, [item.schedules]);

  return (
    <div key={`attendance-item__${item.id}`}>
      <div
        className={
          "w-full h-[58px] pt-[9px] px-[18px] pb-[10px] border border-[#59996B] rounded-lg box-border bg-white"
        }
        onClick={() => {
          setIsUpdateOpen(item.id);
        }}
      >
        <div className="flex gap-1 items-center font-medium">{item.name}</div>

        <div className={"flex items-center justify-between"}>
          <div className={"text-sm font-medium text-[#8E8E8E]"}>
            {attendanceDay}
          </div>
          <div className={"flex gap-1"}>
            {statusIcons.map((item) => (
              <div className="flex gap-[2px] items-center" key={item.icon}>
                <Icon icon={Icons[item.icon]} color={Colors.Gray80} size={16} />
                <div className="leading-[14px]">{item.count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListManagementAttendanceItem;
