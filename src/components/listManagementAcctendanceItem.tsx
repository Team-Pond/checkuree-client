"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

import _ from "lodash";
import { AttendeeData } from "../api/schema";
import { compareDays, ScheduleType } from "../utils";
import { AttendanceItemContainer } from "./listManagement.styles";
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
    <AttendanceItemContainer key={`attendance-item__${item.id}`}>
      <div
        className={"attendance-item__container"}
        onClick={() => {
          setIsUpdateOpen(item.id);
        }}
      >
        <div className="name">{item.name}</div>

        <div className={"bottom-container"}>
          <div className={"days"}>{attendanceDay}</div>
          <div className={"status-container"}>
            {statusIcons.map((item) => (
              <div className="status" key={item.icon}>
                <Icon icon={Icons[item.icon]} color={Colors.Gray80} size={16} />
                <div className="count">{item.count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AttendanceItemContainer>
  );
};

export default ListManagementAttendanceItem;
