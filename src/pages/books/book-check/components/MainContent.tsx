import { useLocation } from "react-router-dom";
import { statusCheckAttendee } from "@/api v2/AttendeeApiClient";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

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

export default function MainContents() {
  const location = useLocation();
  const attendanceBookId = location.pathname.split("/")[2];

  const [attendees, setAttendees] = useState(MOCK_DATA);

  // TODO: 낙관적 업데이트 적용
  const checkAttendee = async (status: string, attendeeId: number) => {
    await statusCheckAttendee({
      attendanceBookId,
      attendeeId,
      status,
    });
  };
  return (
    <div className="w-full flex flex-col gap-4 justify-center items-center py-3 px-4 bg-bg-secondary">
      {attendees.map((attendee) => {
        return (
          <div
            key={attendee.id}
            className="w-full text-left rounded-2xl bg-white px-6 pt-4 flex flex-col gap-3"
          >
            <p className=" font-bold text-sm text-text-secondary">
              {attendee.time}
            </p>

            <div className="w-full h-[56px] flex items-center justify-between px-2 ">
              <p className="font-bold  text-text-primary">{attendee.name}</p>

              <div className="flex gap-4">
                <div className="flex gap-2">
                  {/* TODO: 결석은 status명이 어떻게 되는지? */}
                  <button
                    onClick={async () => await checkAttendee("", attendee.id)}
                    className={twMerge(
                      "rounded-lg text-sm w-[57px] h-[33px] flex items-center justify-center",
                      attendee.status !== "ATTENDING"
                        ? "bg-bg-destructive text-text-interactive-destructive"
                        : "bg-bg-disabled text-text-disabled"
                    )}
                  >
                    결석
                  </button>
                  <button
                    onClick={async () =>
                      await checkAttendee("ATTENDING", attendee.id)
                    }
                    className={twMerge(
                      "rounded-lg text-sm w-[57px] h-[33px] flex items-center justify-center",
                      attendee.status === "ATTENDING"
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
                    attendee.status === "ATTENDING"
                      ? "bg-bg-tertiary"
                      : "bg-bg-disabled"
                  )}
                  disabled={attendee.status === "ATTENDING" ? true : false}
                >
                  <img
                    src={`/images/icons/book-check/${
                      attendee.status === "ATTENDING"
                        ? "ico-note-active.svg"
                        : "ico-note.svg"
                    }`}
                    alt=""
                  />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
