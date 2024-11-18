import styled from "@emotion/styled";
import { Colors } from "../globalStyles";

export const AttendanceIdContainer = styled.section`
  width: 393px;
  display: flex;
  justify-content: center;
  & > .attendance-header {
    position: fixed;
    top: 0;
    padding: 42px 0 12px;
    background: ${Colors.White};

    & > .attendance-header-wrapper {
      min-width: 339px;
      width: 100%;
      box-sizing: border-box;

      & > .attendance-img {
        height: 32px;
        border-radius: 8px;
        // background-color: ${Colors.Gray40};
        margin-bottom: 12px;
        // overflow: hidden;
        display: flex;
        align-items: center;
      }

      & > .attendance-info {
        padding-left: 5px;
        padding-right: 5px;
        & > .attendance-status-container {
          display: flex;
          gap: 4px;

          & > .status {
            display: flex;
            gap: 2px;
            align-items: center;

            & > .count {
              font-size: 12px;
              font-weight: 500;
              color: ${Colors.Gray80};
            }
          }
        }
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        margin-bottom: 4px;

        & > .name {
          font-size: 20px;
          font-weight: 600;
          color: ${Colors.Black01};
        }

        & > .date-box {
          display: flex;
          align-items: center;
          & .date-container {
            width: 71px;
            height: 23px;
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            border-radius: 4px;
            box-sizing: border-box;
            background-color: ${Colors.Gray40};
            z-index: 1000;

            & > .date {
              width: 21px;
              height: 19px;
              border-radius: 2px;
              box-sizing: border-box;
              font-size: 14px;
              text-align: center;
              line-height: 19px;
              background-color: ${Colors.White};
            }
          }

          & .react-datepicker__tab-loop {
            & .react-datepicker-popper {
              left: unset !important;
              right: 0;
              top: 44px !important;
              transform: none !important;

              & .react-datepicker {
                border: 1px solid ${Colors.CheckureeGreen};
              }

              & .react-datepicker__header {
                padding: 10px 0;
                background-color: ${Colors.CheckureeGreen10};

                & .react-datepicker__current-month {
                  margin-bottom: 8px;
                }
              }

              & .react-datepicker__navigation {
                top: 3px;
              }

              & .react-datepicker__day--selected {
                background-color: ${Colors.CheckureeGreen};
              }
            }

            & .react-datepicker__triangle {
              left: 82% !important;
              color: ${Colors.CheckureeGreen10} !important;
              fill: ${Colors.CheckureeGreen10} !important;
              stroke: ${Colors.CheckureeGreen};
            }
          }
        }
      }
    }
  }

  & > .attendance-list {
    min-width: 339px;
    display: flex;
    gap: 24px;
    flex-direction: column;
    padding: 12px 0 120px;
    margin-top: 146px;

    & > .attendance-list-by-time {
      & > .attendance-time {
        text-align: left;
        font-size: 15px;
        font-weight: 600;
        margin-bottom: 4px;
      }
      & > .attendee-list {
        display: flex;
        gap: 12px;
        flex-direction: column;
      }
    }
  }
`;

export const AttendanceItemContainer = styled.div<{
  status: string;
  isDetailOpen: boolean;
}>`
  & > .attendance-item__container {
    width: 339px;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px 0 18px;
    border: ${(props) =>
      props.status === "" ? `1px solid ${Colors.CheckureeGreen}` : "none"};
    border-radius: 8px;
    box-sizing: border-box;
    background-color: ${(props) => {
      if (props.status === "Present") return Colors.LightGreen;
      if (props.status === "Late") return Colors.Orange;
      if (props.status === "Absent") return Colors.Red;
      return Colors.White;
    }};
    margin-bottom: ${(props) => (props.isDetailOpen ? "4px" : 0)};

    & > .name {
      display: flex;
      gap: 4px;
      align-items: center;
      font-weight: 500;

      & > img {
        cursor: pointer;
      }

      & .detail-open {
        transform: rotate(180deg);
      }
    }

    & > .status-buttons {
      width: 154px;
      display: flex;
      justify-content: space-between;
    }
  }

  & > .detail-box {
    height: ${(props) => (props.isDetailOpen ? "104px" : 0)};
    padding: ${(props) => (props.isDetailOpen ? "4px" : 0)};
    border-radius: 8px;
    background-color: ${(props) =>
      props.status === "Late"
        ? Colors.Orange
        : props.status === "Absent"
        ? Colors.Red
        : Colors.LightGreen};
    transition: height 0.2s ease-in;

    & > .detail-buttons {
      height: 24px;
      display: ${(props) => (props.isDetailOpen ? "flex" : "none")};
      line-height: 24px;
      margin-bottom: 4px;
    }

    & > .MuiTextField-root {
      width: 100%;
      height: 100%;

      & > .MuiInputBase-root {
        width: 100%;
        height: ${(props) =>
          props.isDetailOpen
            ? props.status === "Late" || props.status === "Absent"
              ? "68px"
              : "96px"
            : 0};
        padding: 0;
        border-radius: 4px;
        border: none;
        background: ${Colors.White};
        transition: height 0.2s ease-in;

        & > textarea {
          height: ${(props) =>
            props.isDetailOpen
              ? props.status === "Late" || props.status === "Absent"
                ? "68px"
                : "96px"
              : 0} !important;
          padding: 0 8px;
          box-sizing: border-box;
          font-size: 12px;
          font-weight: 500;
          transition: height 0.2s ease-in;
        }

        & > fieldset {
          border: none;
        }
      }
    }
  }
`;

export const StatusButton = styled.div<{ isSelected: boolean }>`
  width: 54px;
  height: 32px;
  border-radius: 21px;
  box-sizing: border-box;
  font-weight: 500;
  text-align: center;
  line-height: 32px;
  color: ${(props) => (props.isSelected ? Colors.White : Colors.Black01)};
  background-color: ${(props) => (props.isSelected ? Colors.Black01 : "")};
  cursor: pointer;
`;

export const DetailButton = styled.div<{ isSelected: boolean }>`
  width: fit-content;
  padding: 0 12px;
  border-radius: 44px;
  box-sizing: border-box;
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  color: ${(props) => (props.isSelected ? Colors.White : Colors.Black01)};
  background-color: ${(props) => (props.isSelected ? Colors.Black01 : "")};
  cursor: pointer;
`;
