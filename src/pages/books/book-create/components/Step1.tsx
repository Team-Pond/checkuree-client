import { CreateBookRequest, DaysType } from "@/api v2/AttendanceBookSchema";
import TimePicker from "@/components/TimePicker";

import { ChangeEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";

const DAYS = ["월", "화", "수", "목", "금", "토", "일"];

const DaysMatch: Record<string, DaysType> = {
  월: "MONDAY",
  화: "TUESDAY",
  수: "WEDNESDAY",
  목: "THURSDAY",
  금: "FRIDAY",
  토: "SATURDAY",
  일: "SUNDAY",
};

type IProps = {
  handleStep2Change: (state: boolean) => void;
  handleBookCreate: (params: CreateBookRequest) => void;
};
export default function Step1(props: IProps) {
  const { handleStep2Change, handleBookCreate } = props;
  const [fileUrl, setFileUrl] = useState<string>();

  const [dayArrays, setDayArrays] = useState<DaysType[]>([]);

  const { register, setValue, handleSubmit, getValues } =
    useForm<CreateBookRequest>({
      mode: "onBlur", // 폼이벤트 유효성 검사 트리거
    });

  const onDaysChange = (day: DaysType) => {
    if (dayArrays.includes(DaysMatch[day])) {
      setDayArrays(dayArrays.filter((item) => item !== DaysMatch[day]));
      setValue(
        "availableDays",
        dayArrays.filter((item) => item !== DaysMatch[day])
      );
    } else {
      setDayArrays([...dayArrays, DaysMatch[day]]);
      setValue("availableDays", [...dayArrays, DaysMatch[day]]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const file = files?.[0];
    const reader = new FileReader();
    reader.readAsDataURL(file!);
    reader.onload = () => {
      setFileUrl(reader.result as string);
    };
  };

  const fileRef = useRef<HTMLInputElement | null>(null);
  const triggerFileInput = () => {
    fileRef.current?.click();
  };

  const transfer = (time: { period: string; hour: string; minute: string }) => {
    let data = "";
    if (time.period === "오후") {
      data = String(Number(time.hour) + 12) + time.minute;
    } else {
      if (Number(time.hour) < 10) {
        data = "0" + time.hour + time.minute;
      } else {
        data = time.hour + time.minute;
      }
    }

    return data;
  };
  const handleStartTimeChange = (time: {
    period: string;
    hour: string;
    minute: string;
  }) => {
    setStartTime(time);
    setValue("availableFrom", transfer(time));
    setIsStartPickerOpen(false); // TimePicker 닫기
  };

  const handleEndTimeChange = (time: {
    period: string;
    hour: string;
    minute: string;
  }) => {
    setEndTime(time);
    setValue("availableTo", transfer(time));
    setIsEndPickerOpen(false); // TimePicker 닫기
  };

  const handleOpenStartTimePicker = () => {
    setIsStartPickerOpen(true);
  };

  const handleOpenEndTimePicker = () => {
    setIsEndPickerOpen(true);
  };

  const [startTime, setStartTime] = useState<{
    period: string;
    hour: string;
    minute: string;
  } | null>(null);

  const [endTime, setEndTime] = useState<{
    period: string;
    hour: string;
    minute: string;
  } | null>(null);

  const [isStartPickerOpen, setIsStartPickerOpen] = useState<boolean>(false);
  const [isEndPickerOpen, setIsEndPickerOpen] = useState<boolean>(false);

  const PICKER_RENDER = [
    {
      text: startTime
        ? `${startTime?.period} ${startTime?.hour}시 ${startTime?.minute}분`
        : "시작 시간",
      timeText: "부터",
      onChange: handleStartTimeChange,
      handleOpen: handleOpenStartTimePicker,
    },

    {
      text: endTime
        ? `${endTime?.period} ${endTime?.hour}시 ${endTime?.minute}분`
        : "종료 시간",
      timeText: "까지",
      onchange: handleEndTimeChange,
      handleOpen: handleOpenEndTimePicker,
    },
  ];

  return (
    <div className="flex flex-col justify-center gap-6 max-w-[342px] w-full">
      {/* 출석부 이름 */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-1 items-center">
          <p className="font-bold text-m-medium">출석부</p>
          <p className="text-text-danger">*</p>
        </div>

        <input
          {...register("title", { required: true })}
          type="text"
          placeholder="출석부 이름"
          className="max-w-[342px] bg-white w-full h-12 border border-[#E7E7E7] rounded-xl p-4 outline-none text-m-medium text-text-secondary"
        />
      </div>

      {/* 수업 요일 */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-1 items-center">
          <p className="font-bold text-m-medium">수업 요일</p>
          <p className="text-text-danger">*</p>
        </div>

        <div className="grid grid-cols-7 gap-0">
          {DAYS.map((day, index) => {
            return (
              <div
                key={day}
                className={twMerge(
                  "max-w-11 h-11 rounded-lg flex justify-center items-center",
                  dayArrays.includes(DaysMatch[DAYS[index]])
                    ? "bg-bg-primary text-text-interactive-primary"
                    : "bg-bg-secondary text-text-secondary"
                )}
                onClick={() => onDaysChange(DAYS[index] as DaysType)}
              >
                <span className="font-semibold text-base">{DAYS[index]}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 수업 시간 */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-1 items-center">
          <p className="font-bold text-m-medium">수업 시간</p>
          <p className="text-text-danger">*</p>
        </div>
        <div className="flex items-center gap-4">
          {PICKER_RENDER.map((time, index) => {
            return (
              <div
                className="flex gap-2 items-center max-w-[163px] w-full"
                onClick={() => time.handleOpen()}
                key={index}
              >
                <button
                  type="button"
                  className="outline-none border border-[#E7E7E7] rounded-xl max-w-[130px] w-full h-12  flex items-center pl-4"
                >
                  <p className="font-bold text-sm text-[#B0B0B0]">
                    {time.text}
                  </p>
                </button>
                <p className="text-sm font-bold text-text-primary">
                  {time.timeText}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 커버 이미지 */}
      <div className="flex flex-col gap-2">
        <p className="font-bold text-m-medium text-left">커버 이미지(선택)</p>

        <div
          className="w-[81px] h-[81px] bg-bg-base border border-[#E7E7E7] rounded-xl flex justify-center items-center"
          onClick={triggerFileInput}
        >
          <input
            type="file"
            className="hidden"
            ref={fileRef}
            onChange={handleFileChange}
          />
          <img
            src={fileUrl ? fileUrl : "/images/icons/book-create/ico-plus.svg"}
            alt="이미지 추가 아이콘"
            className={twMerge(
              fileUrl ? "w-full h-full object-cover rounded-xl" : "w-7 h-7"
            )}
          />
        </div>
        <p className="text-xs font-medium text-text-secondary text-left">
          * JPG, PNG 파일만 업로드 가능합니다.
        </p>
      </div>

      {/* 설명*/}
      <div className="flex flex-col gap-2">
        <p className="font-bold text-m-medium text-left">설명(선택)</p>
        <input
          {...register("description")}
          type="text"
          className="max-w-[342px] bg-white w-full h-12 border border-[#E7E7E7] rounded-xl p-4 outline-none text-m-medium text-text-secondary"
        />
      </div>
      <button
        className={twMerge(
          "max-w-[341px] w-full h-[54px] flex justify-center items-center rounded-xl",
          !!(
            getValues("title") &&
            getValues("availableDays").length > 0 &&
            getValues("availableFrom") &&
            getValues("availableTo")
          )
            ? "bg-bg-tertiary text-[#f1f8f3]"
            : "bg-bg-disabled text-text-disabled"
        )}
        disabled={
          !!!(
            getValues("title") &&
            getValues("availableDays").length > 0 &&
            getValues("availableFrom") &&
            getValues("availableTo")
          )
        }
        onClick={handleSubmit(async () => {
          setValue("imageUrl", fileUrl!);
          handleBookCreate(getValues());
          handleStep2Change(true);
        })}
      >
        <p className="font-semibold text-lg">다음으로</p>
      </button>

      {/* TimePicker 모달 */}
      {isStartPickerOpen && (
        <TimePicker
          handleTimeChange={handleStartTimeChange}
          handleOpenTimePicker={setIsStartPickerOpen}
        />
      )}
      {isEndPickerOpen && (
        <TimePicker
          handleTimeChange={handleEndTimeChange}
          handleOpenTimePicker={setIsEndPickerOpen}
        />
      )}
    </div>
  );
}
