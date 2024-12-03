import { useQuery } from "@tanstack/react-query";

import styled from "@emotion/styled";

import { Colors } from "../styles/globalStyles";
import { convertEngDayToKorDay } from "../utils";
import { getSchedulesById } from "../api/AttendanceApiClient";

type ParsedTimeList = Record<string, string[]>;

export function ScheduleModalContent({
  attendeeId,
  onClose,
}: {
  attendeeId: string;
  onClose: () => void;
}) {
  const { data } = useQuery({
    queryKey: ["attendee-schedules-all", attendeeId],
    queryFn: async (): Promise<ParsedTimeList> => {
      const response = await getSchedulesById(attendeeId);

      if (response.success) {
        const parsedTimeList: ParsedTimeList = {
          MONDAY: [],
          TUESDAY: [],
          WEDNESDAY: [],
          THURSDAY: [],
          FRIDAY: [],
          SATURDAY: [],
          SUNDAY: [],
        };

        response.items.forEach((item: any) => {
          parsedTimeList[item.day] = parsedTimeList[item.day].concat(item.time);
        });

        return parsedTimeList;
      }

      return {} as ParsedTimeList;
    },
  });

  return (
    <ScheduleModalContentContainer>
      <section className="schedule-modal-content-box">
        <div className="title">시간표 전체 보기</div>

        <section className="schedules-table">
          {Object.keys(data || {}).map((key) => (
            <div className="schedules-table__column">
              <div className="schedules-table__header">
                {convertEngDayToKorDay(key)}
              </div>
              <div className="schedules-table__body">
                {data &&
                  data[key].map((time) => (
                    <div className="schedules-table__body-cell">
                      {`${time.substring(0, 2)}:${time.substring(2, 4)}`}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </section>
      </section>

      <button className="closeBtn" onClick={onClose}>
        닫기
      </button>
    </ScheduleModalContentContainer>
  );
}

const ScheduleModalContentContainer = styled.section`
  display: flex;
  gap: 24px;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  border-radius: 8px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${Colors.White};

  & > .schedule-modal-content-box {
    display: flex;
    gap: 12px;
    flex-direction: column;

    & > .title {
      font-size: 16px;
      font-weight: 600;
    }

    & > .schedules-table {
      display: flex;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid ${Colors.CheckureeGreen};

      & > .schedules-table__column {
        min-width: 43px;
        display: flex;
        flex-direction: column;
        border-right: 1px solid ${Colors.CheckureeGreen};

        &:last-of-type {
          border-right: none;
        }

        & > .schedules-table__header {
          padding: 2.5px 15px;
          border-bottom: 1px solid ${Colors.CheckureeGreen};
          font-size: 14px;
          font-weight: 500;
          text-align: center;
          color: ${Colors.CheckureeGreen};
          background-color: ${Colors.CheckureeGreen10};
        }

        & > .schedules-table__body {
          min-height: 76px;
          height: fit-content;
          display: flex;
          gap: 4px;
          flex-direction: column;
          padding: 4px;

          & > .schedules-table__body-cell {
            padding: 2px;
            border-radius: 4px;
            border: 1px solid ${Colors.CheckureeGreen};
            font-size: 12px;
            font-weight: 500;
            color: ${Colors.CheckureeGreen};
            background-color: ${Colors.CheckureeGreen10};
          }
        }
      }
    }
  }

  & > .closeBtn {
    width: 90px;
    height: 40px;
    border: none;
    border-radius: 4px;
    padding: 10.5px 32px;
    font-size: 14px;
    font-weight: 500;
    color: ${Colors.White};
    background-color: ${Colors.Gray60};
  }
`;
