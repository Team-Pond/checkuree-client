// Next

// Styles

// Components

// Types

import { AttendanceSchedulesByDateItem } from "@/api/schema";
import { HandleListItemType } from "@/pages/attendances/attendances-roaster/AttendancesRoaster";
import {
  AttendanceItemContainer,
  StatusButton,
} from "@/styles/app/attendancesId.styles";

import { Images } from "@/styles/globalStyles";
import DetailInputBox from "./DetailInputBox";

interface PropsType {
  index: number;
  time: string;
  item: AttendanceSchedulesByDateItem;
  handleListItem: HandleListItemType;
}

const AttendanceItem = (props: PropsType) => {
  const { item, time, index, handleListItem } = props;

  const statusButtons: { label: string; value: string }[] = [
    { label: "출석", value: "Present" },
    { label: "지각", value: "Late" },
    { label: "결석", value: "Absent" },
  ];

  const status =
    item.newStatus && item.newStatus.length > 0 ? item.newStatus : item.status;

  return (
    <AttendanceItemContainer
      status={status || ""}
      isDetailOpen={item.isDetailOpen || false}
      key={`attendance-item__${item.id}`}
    >
      <div className={"attendance-item__container"}>
        <div className="name">
          {item.attendee.name}
          <img
            className={item.isDetailOpen ? "detail-open" : ""}
            src={Images.DetailOpen}
            alt={`open-detail__${item.attendee.name}`}
            onClick={() =>
              handleListItem(index, time, "isDetailOpen", !item.isDetailOpen)
            }
          />
        </div>

        <div className="status-buttons">
          {statusButtons.map((button) => (
            <StatusButton
              isSelected={status === button.value}
              onClick={() => {
                handleListItem(index, time, "newStatus", button.value);
                // handleListItem(index, time, 'status', '');

                // if (button.value === 'Present') {
                //     handleListItem(index, time, 'etc', '');
                // }
              }}
              key={`status-button__${button.label}`}
            >
              {button.label}
            </StatusButton>
          ))}
        </div>
      </div>

      {/* 출석/지각/상세 사유 입력 박스 */}
      <DetailInputBox
        item={item}
        time={time}
        index={index}
        handleListItem={handleListItem}
      />
    </AttendanceItemContainer>
  );
};

export default AttendanceItem;
