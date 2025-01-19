import { twMerge } from "tailwind-merge";

import { ScheduleDataType } from "@/api v2/ScheduleSchema";
import { getCurrentTimeParts, scheduleCheckformatTime } from "@/utils";
import {
  createRecord,
  updateRecordLesson,
  updateRecordStatus,
} from "@/api v2/RecordApiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { STATUS } from "@/api v2/RecordSchema";

type IProps = {
  bookSchedules: ScheduleDataType;
  bookId: number;
  currentDate: string;
};
export default function MainContents(props: IProps) {
  const { bookId, bookSchedules, currentDate } = props;

  // // TODO: 낙관적 업데이트 적용
  // const checkAttendee = async (status: string, attendeeId: number) => {
  //   await statusCheckAttendee({
  //     attendanceBookId: bookId,
  //     attendeeId,
  //     status,
  //   });
  // };

  const queryClient = useQueryClient();

  const { mutate: recordMutation } = useMutation({
    mutationFn: async ({
      attendeeId,
      scheduleId,
      status,
    }: {
      attendeeId: number;
      scheduleId: number;
      status: STATUS;
    }) =>
      await createRecord({
        params: {
          attendanceBookId: bookId,
          attendeeId: attendeeId,
          scheduleId: scheduleId,
          attendDate: currentDate,
          attendTime: `${getCurrentTimeParts().hour}:${
            getCurrentTimeParts().minute
          }`,
          status: status,
        },
      }),
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["book-schedules"],
      });
    },
    onError: () => {},
  });
  const { mutate: statusMutation } = useMutation({
    mutationKey: [""],
    mutationFn: async ({
      recordId,
      scheduleId,
      status,
    }: {
      recordId: number;
      scheduleId: number;
      status: STATUS;
    }) =>
      await updateRecordStatus({
        params: {
          attendanceBookId: bookId,
          status,
          scheduleId,
          recordId,
        },
      }),
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["book-schedules"],
      });
    },
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
                        onClick={() => {
                          // await checkAttendee("", schedule.attendeeId)
                          // statusMutation("REJECTED");`

                          if (schedule.recordId) {
                            statusMutation({
                              recordId: schedule.recordId,
                              scheduleId: schedule.scheduleId,
                              status: "ABSENT",
                            });
                          } else {
                            recordMutation({
                              attendeeId: schedule.attendeeId,
                              scheduleId: schedule.scheduleId,
                              status: "ABSENT",
                            });
                          }
                        }}
                        className={twMerge(
                          "rounded-lg text-sm w-[57px] h-[33px] flex items-center justify-center",
                          schedule.recordStatus === "ABSENT"
                            ? "bg-bg-destructive text-text-interactive-destructive"
                            : "bg-bg-disabled text-text-disabled"
                        )}
                      >
                        결석
                      </button>
                      <button
                        onClick={() => {
                          if (schedule.recordId) {
                            statusMutation({
                              recordId: schedule.recordId,
                              scheduleId: schedule.scheduleId,
                              status: "ATTEND",
                            });
                          } else {
                            recordMutation({
                              attendeeId: schedule.attendeeId,
                              scheduleId: schedule.scheduleId,
                              status: "ATTEND",
                            });
                          }
                        }}
                        className={twMerge(
                          "rounded-lg text-sm w-[57px] h-[33px] flex items-center justify-center",
                          schedule.recordStatus === "ATTEND"
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
                        schedule.recordStatus === "ATTEND"
                          ? "bg-bg-tertiary"
                          : "bg-bg-disabled"
                      )}
                      disabled={
                        schedule.recordStatus === "ATTEND" ? true : false
                      }
                    >
                      <img
                        src={`/images/icons/book-check/${
                          schedule.recordStatus === "ATTEND"
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
