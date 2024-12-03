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
import Icon from "./Icon";
import { Colors, Icons } from "../styles/globalStyles";
import { dateFormat, sortWeekdays } from "../utils/index";
import { ScheduleModalContent } from "./ScheduleModalContent";
import useFormContents from "../lib/hooks/useFormContents";
import { twMerge } from "tailwind-merge";

// Utils

// Styles
import "./FormContents.css";

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

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      // 월간 뷰에서만 스타일 적용
      const today = new Date();
      if (
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate()
      ) {
        return "highlight"; // 현재 날짜에 'highlight' 클래스 추가
      }
      const day = date.getDay(); // 0: 일요일, 6: 토요일
      if (day === 0) return "sunday"; // 일요일
      if (day === 6) return "saturday"; // 토요일
    }

    return null;
  };

  return (
    <section
      className="h-[786px] overflow-auto "
      // gender={watch("gender")}
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
        className="w-full flex flex-col gap-6  pt-8 pl-[27px] pb-9 pr-[27px] mb-16"
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
          <div className="text-sm font-medium mb-2">생년월일</div>
          <div className="z-[1]">
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
              <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                <Calendar
                  className={".react-calendar__month-view__weekdays"}
                  formatDay={(_, date: any) => date.getDate()}
                  tileClassName={tileClassName}
                  value={watch("birth")}
                  onChange={(date) => {
                    if (date && date instanceof Date) {
                      setValue("birth", dateFormat(date, "dash"));
                    }
                    setShowCalendar(false);
                  }}
                />
              </div>
            </Modal>
          </div>
        </div>

        <div className="form-row">
          <div className="text-sm font-medium mb-2">핸드폰 번호</div>
          <div className="z-[1]">
            <TextField {...register("mobileNumber")} />
          </div>
        </div>

        <div className="form-row">
          <div className="text-sm font-medium mb-2">보호자 핸드폰 번호</div>
          <div className="z-[1]">
            <TextField {...register("subMobileNumber")} />
          </div>
        </div>

        <div className="days-times-container">
          <div className="flex gap-[6px] mb-1">
            {sortWeekdays(data?.days).map((day) => (
              <div
                className={twMerge(
                  `h-10 flex-[1] rounded-lg border  font-medium text-center items-center leading-10 `,
                  selectedDay === day
                    ? "border-[#59996B] text-[#59996B] bg-[#F0FFF4]"
                    : "border-[#C9C9C9] text-[#C9C9C9]"
                )}
                onClick={() => setSelectedDay(day)}
                key={day}
              >
                {days[day]}
              </div>
            ))}
          </div>
          <div className="h-[164px] flex p-3 pb-0 rounded-lg box-border border border-[#C9C9C9]">
            <div className="flex flex-[1] gap-[6px] flex-col pt-0 pr-3 pb-3 pl-0 box-border border-r overflow-y-auto">
              {watch("times") &&
                _.has(watch("times"), selectedDay) &&
                watch("times")[selectedDay].map((item) => (
                  <div
                    className="h-[30px] flex items-center justify-between py-1 pr-[11px] pl-[15px] box-border border rounded-[15px] border-[#59996B] text-[#59996B] bg-[#F0FFF4]"
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
            <div className="flex-[1.8] pr-4 pl-3 box-border overflow-y-auto">
              {timeOptions.map((item) => {
                const isSelected =
                  watch("times") &&
                  _.has(watch("times"), selectedDay) &&
                  watch("times")[selectedDay].includes(item.value);

                return (
                  <div
                    className={twMerge(
                      `h-10 flex items-center justify-between border-b border-[#C9C9C9] font-medium text-[#C9C9C9] last:border-b-0`,
                      isSelected ? "text-[#59996B]" : ""
                    )}
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
            <section className="flex justify-between">
              <div
                className="h-7 flex items-center justify-center px-3 box-border rounded-sm border border-[#59996B] font-medium text-[#59996B] bg-[#F0FFF4]"
                onClick={() => setIsScheduleModalOpen(true)}
              >
                전체 스케줄보기
              </div>
              <div className="h-7 flex items-center justify-center px-3 box-border rounded-sm border border-[#59996B] font-medium text-[#59996B] bg-[#F0FFF4]">
                출석 히스토리
              </div>
            </section>

            {/* <div
              className="h-10 flex items-center justify-center rounded-[4px] font-semibold text-white bg-[#DE6161]"
              onClick={() => {
                if (confirm("출석대상을 삭제하시겠습니까?"))
                  deleteAttendees({
                    ids: attendeeId ? [attendeeId] : [""],
                    attendanceId: attendanceId,
                  });
              }}
            >
              비활성화
            </div> */}
          </>
        )}
      </form>

      <section className="w-full h-[60px] flex absolute bottom-0">
        <div
          className="flex items-center justify-center font-medium text-white rounded-none flex-[1] bg-[#C9C9C9]"
          onClick={onClose}
        >
          취소
        </div>
        <button
          type="submit"
          className="flex items-center justify-center font-medium text-white rounded-none flex-[2.5] border-none bg-[#59996B]"
          form="create-attendees"
        >
          저장
        </button>
      </section>
    </section>
  );
};

export default FormContents;
