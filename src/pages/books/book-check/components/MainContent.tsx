import { statusCheckAttendee } from "@/api v2/AttendeeApiClient";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

import { ScheduleDataType } from "@/api v2/ScheduleSchema";
import { scheduleCheckformatTime } from "@/utils";
import {
  updateRecordLesson,
  updateRecordStatus,
} from "@/api v2/RecordApiClient";
import { useMutation } from "@tanstack/react-query";

const MOCK_DATA = [
  {
    id: 1,
    time: "오후 3:00",
    name: "배서윤",
    status: null,
  },
  {
    id: 2,
    time: "오후 4:00",
    name: "김범수",
    status: null,
  },
  {
    id: 3,
    time: "오후 5:00",
    name: "진정현",
    status: null,
  },
  {
    id: 4,
    time: "오후 6:00",
    name: "박상후",
    status: "ATTENDING",
  },
  {
    id: 5,
    time: "오후 7:00",
    name: "박상후",
    status: "ATTENDING",
  },
];

type IProps = {
  bookSchedules: ScheduleDataType;
  bookId: number;
};
export default function MainContents(props: IProps) {
  const { bookId, bookSchedules } = props;

  console.log(bookSchedules);
  const [attendees, setAttendees] = useState(MOCK_DATA);

  // TODO: 낙관적 업데이트 적용
  const checkAttendee = async (status: string, attendeeId: number) => {
    await statusCheckAttendee({
      attendanceBookId: bookId,
      attendeeId,
      status,
    });
  };

  const { mutate: statusMutation } = useMutation({
    mutationKey: [""],
    mutationFn: async (status: string) =>
      await updateRecordStatus({
        params: {
          attendanceBookId: Number(bookId!),
          status,
          scheduleId: 0,
          recordId: 0,
        },
      }),
    onSuccess: () => {},
    onError: () => {},
  });

  const { mutate: lessonMutation } = useMutation({
    mutationKey: [""],
    mutationFn: async () =>
      await updateRecordLesson({
        params: {
          attendanceBookId: Number(bookId!),
          isTaught: true,
          recordId: 0,
        },
      }),
    onSuccess: () => {},
    onError: () => {},
  });

  console.log(bookSchedules);
  return (
    <div className="w-full flex flex-col gap-4 justify-center items-center py-3 px-4 bg-bg-secondary scrollbar-hide custom-scrollbar-hide">
      {bookSchedules?.content?.map((content, index) => {
        return (
          <div
            key={index}
            className="w-full text-left rounded-2xl bg-white px-6 pt-1 flex flex-col"
          >
            <p className="text-s-bold text-text-secondary h-12 flex items-center">
              {scheduleCheckformatTime(content.startTime)}
            </p>

            {content.schedules.map((schedule) => {
              return (
                <div className="w-full h-[56px] flex items-center justify-between px-2 ">
                  <p className="font-bold  text-text-primary">
                    {schedule.name}
                  </p>

                  <div className="flex gap-4">
                    <div className="flex gap-2">
                      {/* TODO: 결석은 status명이 어떻게 되는지? */}
                      <button
                        onClick={
                          () =>
                            // await checkAttendee("", schedule.attendeeId)
                            statusMutation("REJECTED")
                          // APPROVED
                        }
                        className={twMerge(
                          "rounded-lg text-sm w-[57px] h-[33px] flex items-center justify-center",
                          schedule.recordStatus === "REJECTED"
                            ? "bg-bg-destructive text-text-interactive-destructive"
                            : "bg-bg-disabled text-text-disabled"
                        )}
                      >
                        결석
                      </button>
                      <button
                        onClick={
                          () =>
                            // await checkAttendee("", schedule.attendeeId)
                            statusMutation("APPROVED")
                          // APPROVED
                        }
                        className={twMerge(
                          "rounded-lg text-sm w-[57px] h-[33px] flex items-center justify-center",
                          schedule.recordStatus === "APPROVED"
                            ? "bg-bg-primary text-text-interactive-primary"
                            : "bg-bg-disabled text-text-disabled"
                        )}
                      >
                        출석
                      </button>
                    </div>
                    <button
                      className={twMerge(
                        "w-8 h-8 flex items-center justify-center rounded-lg",
                        schedule.recordStatus === "ATTENDING"
                          ? "bg-bg-tertiary"
                          : "bg-bg-disabled"
                      )}
                      disabled={
                        schedule.recordStatus === "ATTENDING" ? true : false
                      }
                    >
                      <img
                        src={`/images/icons/book-check/${
                          schedule.recordStatus === "ATTENDING"
                            ? "ico-note-active.svg"
                            : "ico-note.svg"
                        }`}
                        alt=""
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
