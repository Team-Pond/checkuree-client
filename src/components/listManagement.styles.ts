import styled from "@emotion/styled";
import { Colors } from "../styles/globalStyles";

export const ListManagementContainer = styled.section`
  width: 100%;

  position: relative;

  & > .attendance-header {
    width: 393px;
    position: fixed;
    top: 0;
    padding: 42px 0 12px;
    position: fixed;
    top: 0;
    padding: 42px 0 12px;
    box-sizing: border-box;
    background: ${Colors.White};

    & > .attendance-img {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      background-color: ${Colors.Gray40};
      margin-bottom: 12px;
    }

    & > .attendance-info {
      & > .name {
        text-align: left;
        font-size: 20px;
        font-weight: 600;
        color: ${Colors.Black01};
      }
    }
  }

  & > .attendance-list {
    display: flex;
    gap: 12px;
    flex-direction: column;
    padding: 12px 0 120px;
    margin-top: 125px;
  }

  & > .MuiFab-root {
    width: 48px;
    height: 48px;
    position: fixed;
    right: 24px;
    bottom: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 24px;
    box-sizing: border-box;
    background-color: ${Colors.CheckureeGreen};
    box-shadow: none;
    cursor: pointer;

    &:hover {
      background-color: ${Colors.CheckureeGreen};
    }
  }
`;

export const AttendanceItemContainer = styled.div`
  & > .attendance-item__container {
    width: 100%;
    height: 58px;
    padding: 9px 18px 10px;
    border: 1px solid ${Colors.CheckureeGreen};
    border-radius: 8px;
    box-sizing: border-box;
    background-color: ${Colors.White};

    & > .name {
      display: flex;
      gap: 4px;
      align-items: center;
      font-weight: 500;
    }

    & > .bottom-container {
      display: flex;
      align-items: center;
      justify-content: space-between;

      & > div {
        font-size: 12px;
        font-weight: 500;
        color: ${Colors.Gray80};
      }

      & > .status-container {
        display: flex;
        gap: 4px;

        & > .status {
          display: flex;
          gap: 2px;
          align-items: center;

          & > .count {
            line-height: 14.34px;
          }
        }
      }
    }
  }
`;

export const FormContentsContainer = styled.section<{ gender: string }>`
  height: 786px;
  overflow: auto;
  padding: 30px 0px;
  display: flex;
  justify-content: center;
  & > form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;

    max-width: 330px;
    & > .form-row {
      & > .label {
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 8px;
      }

      & > .value {
        z-index: 1;

        & > .calendar-input {
          width: 100%;
          height: 40px;
          padding: 8px 13px;
          border: 1px solid ${Colors.Gray50};
          border-radius: 8px;
          box-sizing: border-box;

          & > span {
            color: ${Colors.Gray60};
          }
        }

        & > .MuiFormControl-root > .MuiFormGroup-root {
          display: flex;
          flex-direction: row;

          & .MuiFormControlLabel-root {
            height: 22px;
            gap: 8px;
            margin-left: 0;

            &:first-of-type {
              margin-right: 66px;
            }

            & .MuiRadio-root {
              width: 18px;
              height: 18px;
              padding: 0;
            }
          }
        }
      }
    }

    & > .days-times-container {
      & > .days-container {
        display: flex;
        gap: 6px;
        margin-bottom: 4px;

        & > .day {
          height: 40px;
          flex: 1;
          border-radius: 8px;
          border: 1px solid ${Colors.Gray60};
          font-weight: 500;
          text-align: center;
          line-height: 40px;
          color: ${Colors.Gray60};
        }

        & > .selected {
          border: 1px solid ${Colors.CheckureeGreen};
          color: ${Colors.CheckureeGreen};
          background: ${Colors.CheckureeGreen10};
        }
      }

      & > .time-container {
        height: 164px;
        display: flex;
        padding: 12px 12px 0;
        border-radius: 8px;
        box-sizing: border-box;
        border: 1px solid ${Colors.Gray60};

        & > .selected-times {
          display: flex;
          flex: 1;
          gap: 6px;
          flex-direction: column;
          padding: 0 12px 12px 0;
          box-sizing: border-box;
          border-right: 1px solid ${Colors.Gray60};
          overflow-y: auto;

          & > .selected-time {
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 4px 11px 4px 15px;
            box-sizing: border-box;
            border-radius: 15px;
            border: 1px solid ${Colors.CheckureeGreen};
            color: ${Colors.CheckureeGreen};
            background: ${Colors.CheckureeGreen10};
          }
        }

        & > .time-options {
          flex: 1.8;
          padding: 0 16px 0 12px;
          box-sizing: border-box;
          overflow-y: auto;

          & > .time-option {
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid ${Colors.Gray60};
            font-weight: 500;
            color: ${Colors.Gray60};

            &:last-child {
              border-bottom: none;
            }
          }

          & > .selected {
            color: ${Colors.CheckureeGreen};
          }
        }
      }
    }

    & > .additional-button-container {
      display: flex;
      justify-content: space-between;

      & > .additional-button {
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 12px;
        box-sizing: border-box;
        border-radius: 4px;
        border: 1px solid ${Colors.CheckureeGreen};
        font-weight: 500;
        color: ${Colors.CheckureeGreen};
        background: ${Colors.CheckureeGreen10};
      }
    }

    & > .disabled-button {
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      font-weight: 600;
      color: ${Colors.White};
      background: ${Colors.WarningRed};
    }
  }

  & > .button-container {
    width: 100%;
    height: 60px;
    display: flex;
    position: absolute;
    bottom: 0;

    & > .button {
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      color: ${Colors.White};
      border-radius: 0px;
    }

    & > .cancel {
      flex: 1;
      background-color: ${Colors.Gray60};
    }

    & > .confirm {
      flex: 2.5;
      border: none;
      font-size: 16px;
      background-color: ${Colors.CheckureeGreen};
    }
  }
`;

export const CalendarContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  & .react-calendar {
    border-radius: 8px;

    & .react-calendar__month-view__days__day--weekend {
      color: ${Colors.WarningRed};
    }

    & .react-calendar__tile--now {
      background: none;
    }

    & .react-calendar__tile--active,
    .react-calendar__tile--active:enabled:hover,
    .react-calendar__tile--active:enabled:focus {
      font-weight: 600;
      background: ${Colors.CheckureeGreen};
    }
  }
`;
