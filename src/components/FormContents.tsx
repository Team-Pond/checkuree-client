"use client";

import { useEffect, useState } from "react";

// Libraries
import _ from "lodash";
import Calendar from "react-calendar";
import { useForm } from "react-hook-form";
// Components
import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Modal,
  FormControl,
} from "@mui/material";
import { Attendance, SingleSchedulesType } from "../api/schema";
import {
  CalendarContainer,
  FormContentsContainer,
} from "./listManagement.styles";
import Icon from "./Icon";
import { Colors, Icons } from "../styles/globalStyles";
import { dateFormat, sortWeekdays } from "../utils/index";
import { ScheduleModalContent } from "./ScheduleModalContent";
import useFormContents from "../lib/hooks/useFormContents";

// Utils

// Styles

// Types

export interface Inputs {
  name: string;
  gender: string;
  birth: string;
  mobileNumber: string;
  subMobileNumber: string;
  times: Record<string, string[]>;
  schedules: SingleSchedulesType;
}

const FormContents = ({
  data,
  attendeeId,
  attendanceId,
  onClose,
}: {
  data: Attendance;
  attendeeId?: string;
  attendanceId: string;
  onClose: () => void;
}) => {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string>(data?.days[0] || "");
  const [timeOptions, setTimeOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [showCalendar, setShowCalendar] = useState(false);

  const { watch, register, handleSubmit, setValue, reset } = useForm<Inputs>({
    defaultValues: { gender: "MALE" },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const {
    attendeeDetail,
    isSuccess,
    createAttendee,
    updateAttendee,
    deleteAttendees,
    generateTimeOptions,
  } = useFormContents({
    watch,
    attendeeId,
    attendanceId,
    onClose,
  });

  const onSubmit = handleSubmit((data) => {
    // TODO: times 정보는 schedule로 보내야 함.
    const { times, schedules, ...rest } = data;

    if (attendanceId) {
      if (attendeeId) {
        updateAttendee({
          attendeeId: attendeeId,
          parameters: { ...rest, attendanceId },
        });
      } else {
        createAttendee({ ...rest, attendanceId });
      }
    }
  });

  const days: Record<string, string> = {
    MONDAY: "월",
    TUESDAY: "화",
    WEDNESDAY: "수",
    THURSDAY: "목",
    FRIDAY: "금",
    SATURDAY: "토",
    SUNDAY: "일",
  };

  const handleSelectTime = (day: string, time: string) => {
    const updatedTimes = watch("times") || {};

    const index = _.has(updatedTimes, day)
      ? updatedTimes[day].indexOf(time)
      : -1;
    if (index !== -1) {
      updatedTimes[day].splice(index, 1);
    } else {
      if (!_.has(updatedTimes, day)) {
        Object.assign(updatedTimes, { [day]: [] });
      }
      updatedTimes[day].push(time);
    }
    setValue("times", updatedTimes);
  };

  useEffect(() => {
    if (isSuccess && attendeeDetail) {
      const initialTimes: Record<string, string[]> = {};
      attendeeDetail.schedules.forEach(({ day, time }) => {
        initialTimes[day] = Array.isArray(initialTimes[day])
          ? initialTimes[day].concat(time)
          : [time];
      });
      reset({ ...attendeeDetail, times: initialTimes } as Inputs);
    }
  }, [isSuccess, attendeeDetail]);

  useEffect(() => {
    if (data && data?.availableFrom && data?.availableTo) {
      const fromMinutes =
        parseInt(data.availableFrom.substring(0, 2)) * 60 +
        parseInt(data.availableFrom.substring(2));
      const toMinutes =
        parseInt(data.availableTo.substring(0, 2)) * 60 +
        parseInt(data.availableTo.substring(2));

      // 생성된 시간 중에서 from에서 to까지의 범위에 해당하는 시간들을 필터링
      const timeOptions = generateTimeOptions().filter((option) => {
        const currentTimeInMinutes =
          parseInt(option.value.substring(0, 2)) * 60 +
          parseInt(option.value.substring(2));
        return (
          currentTimeInMinutes >= fromMinutes &&
          currentTimeInMinutes <= toMinutes
        );
      });

      setTimeOptions(timeOptions);
    }

    if (data && data.days && !attendeeDetail) {
      let initialDays = {};
      data.days.forEach((day) => {
        Object.assign(initialDays, { [day]: [] });
      });
      setValue("times", initialDays);
    }
  }, [data]);

  return (
    <section
      className="h-[786px] overflow-auto py-[30px] flex justify-center"
      gender={watch("gender")}
    >
      {/* 전체 스케쥴보기 모달은 수정일때만 노출 */}
      {attendeeId && (
        <Modal
          open={isScheduleModalOpen}
          onClose={() => setIsScheduleModalOpen(false)}
          aria-labelledby="전체 스케쥴보기 모달"
          aria-describedby="전체 스케쥴보기 모달"
        >
          <ScheduleModalContent
            attendeeId={attendeeId}
            onClose={() => setIsScheduleModalOpen(false)}
          />
        </Modal>
      )}

      <form
        className="w-full flex flex-col gap-6 max-w-[330px]"
        id="create-attendees"
        onSubmit={onSubmit}
      >
        <div className="form-row">
          <div className="text-sm font-medium mb-2">이름</div>
          <div className="z-[1]">
            <TextField {...register("name")} />
          </div>
        </div>

        <div className="form-row">
          <div className="text-sm font-medium mb-2">성별</div>
          <div className="z-[1]">
            <FormControl>
              <RadioGroup
                defaultValue="MALE"
                aria-labelledby="gender-radio-buttons-group-label"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="MALE"
                  control={
                    <Radio
                      {...register("gender")}
                      checked={watch("gender") === "MALE"}
                      sx={{
                        color:
                          watch("gender") === "MALE"
                            ? Colors.CheckureeGreen
                            : Colors.Gray60,
                        "&.Mui-checked": {
                          color:
                            watch("gender") === "MALE"
                              ? Colors.CheckureeGreen
                              : Colors.Gray60,
                        },
                        "&.MuiFormControlLabel-label": {
                          color: Colors.Gray60,
                        },
                      }}
                    />
                  }
                  label="남"
                />
                <FormControlLabel
                  value="FEMALE"
                  control={
                    <Radio
                      {...register("gender")}
                      checked={watch("gender") === "FEMALE"}
                      sx={{
                        color:
                          watch("gender") === "FEMALE"
                            ? Colors.CheckureeGreen
                            : Colors.Gray60,
                        "&.Mui-checked": {
                          color:
                            watch("gender") === "FEMALE"
                              ? Colors.CheckureeGreen
                              : Colors.Gray60,
                        },
                        "&.MuiFormControlLabel-label": {
                          color: Colors.Gray60,
                        },
                      }}
                    />
                  }
                  label="여"
                />
              </RadioGroup>
            </FormControl>
          </div>
        </div>

        <div className="form-row">
          <div className="label">생년월일</div>
          <div className="value">
            <div
              className="w-full h-10 py-2 px-[13px] border border-[#D5D5D5] rounded-lg box-border"
              onClick={() => setShowCalendar(true)}
            >
              {watch("birth") ? (
                dateFormat(new Date(watch("birth")), "slash")
              ) : (
                <span className="text-[#C9C9C9]">YYYY/MM/DD</span>
              )}
            </div>
            <Modal open={showCalendar} onClose={() => setShowCalendar(false)}>
              <CalendarContainer>
                <Calendar
                  value={watch("birth")}
                  onChange={(date) => {
                    if (date && date instanceof Date) {
                      setValue("birth", dateFormat(date, "dash"));
                    }
                    setShowCalendar(false);
                  }}
                />
              </CalendarContainer>
            </Modal>
          </div>
        </div>

        <div className="form-row">
          <div className="label">핸드폰 번호</div>
          <div className="value">
            <TextField {...register("mobileNumber")} />
          </div>
        </div>

        <div className="form-row">
          <div className="label">보호자 핸드폰 번호</div>
          <div className="value">
            <TextField {...register("subMobileNumber")} />
          </div>
        </div>

        <div className="days-times-container">
          <div className="days-container">
            {sortWeekdays(data?.days).map((day) => (
              <div
                className={`day ${selectedDay === day ? "selected" : ""}`}
                onClick={() => setSelectedDay(day)}
                key={day}
              >
                {days[day]}
              </div>
            ))}
          </div>
          <div className="time-container">
            <div className="selected-times">
              {watch("times") &&
                _.has(watch("times"), selectedDay) &&
                watch("times")[selectedDay].map((item) => (
                  <div
                    className="selected-time"
                    onClick={() => handleSelectTime(selectedDay, item)}
                  >
                    {`${item.slice(0, 2)}:${item.slice(2)}`}
                    <Icon
                      icon={Icons.highlight_off}
                      size={20}
                      color={Colors.CheckureeGreen}
                    />
                  </div>
                ))}
            </div>
            <div className="time-options">
              {timeOptions.map((item) => {
                const isSelected =
                  watch("times") &&
                  _.has(watch("times"), selectedDay) &&
                  watch("times")[selectedDay].includes(item.value);

                return (
                  <div
                    className={`time-option ${isSelected ? "selected" : ""}`}
                    onClick={() => handleSelectTime(selectedDay, item.value)}
                  >
                    {item.label}
                    <Icon
                      icon={
                        Icons[
                          isSelected ? "check_circle" : "radio_button_unchecked"
                        ]
                      }
                      size={20}
                      color={isSelected ? Colors.CheckureeGreen : Colors.Gray60}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {attendeeId && (
          <>
            <section className="additional-button-container">
              <div
                className="additional-button"
                onClick={() => setIsScheduleModalOpen(true)}
              >
                전체 스케줄보기
              </div>
              <div className="additional-button">출석 히스토리</div>
            </section>

            <div
              className="disabled-button"
              onClick={() => {
                if (confirm("출석대상을 삭제하시겠습니까?"))
                  deleteAttendees({
                    ids: attendeeId ? [attendeeId] : [""],
                    attendanceId: attendanceId,
                  });
              }}
            >
              비활성화
            </div>
          </>
        )}
      </form>

      <section className="button-container">
        <div className="button cancel" onClick={onClose}>
          취소
        </div>
        <button
          type="submit"
          className="button confirm"
          form="create-attendees"
        >
          저장
        </button>
      </section>
    </section>
  );
};

export default FormContents;
