import { getAttendeeProgressLog } from "@/api v2/AttendeeApiClient";
import { Progresses } from "@/api v2/AttendeeSchema";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import NextProgressModal from "./NextProgressModal";
import { Fragment, useState } from "react";

type IProps = {
  studentInfo: {
    name: string;
    age: number;
    grade: string;
    scheduleDays: string;
  };
  progresses: Progresses;
};

export default function LearningManage(props: IProps) {
  const { progresses, studentInfo } = props;

  const { bookId, attendeeId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data: progressLog } = useQuery({
    queryKey: ["progressLog", bookId, attendeeId],
    queryFn: async () =>
      await getAttendeeProgressLog({
        attendanceBookId: Number(bookId),
        attendeeId: Number(attendeeId),
      }).then((res) => res.data),
  });
  const [attendeeProgressId, setAttendeeProgressId] = useState<number>(0);
  return (
    <div className="flex flex-col gap-4">
      {/* 학생 정보 섹션 */}
      <div className="flex gap-8 items-center w-full h-[81px] rounded-2xl bg-white">
        <img
          src="/images/icons/book-roaster/ico-student.svg"
          alt="학생 아이콘"
          width={40}
          height={40}
          className="rounded-full ml-[23px]"
        />
        <div className="flex flex-col gap-2 text-left">
          <div className="flex flex-col gap-1">
            <p className="text-m-bold">
              <span className="text-text-primary">{studentInfo.name}</span>
              <span className="text-text-secondary text-m-semibold ml-2">
                {studentInfo.age}
              </span>
            </p>
            <p className="text-s-medium">
              <span className="text-text-brand">
                {studentInfo.scheduleDays}
              </span>{" "}
              <span className="text-[#b0b0b0]"> {studentInfo.grade}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="w-full rounded-2xl bg-white p-4 flex flex-col gap-5">
        <p className="flex text-s-bold text-[#5d5d5d]">
          커리큘럼 정보 <img src="" alt="" />
        </p>
        {progresses?.map((progress) => {
          return (
            <Fragment key={progress.id}>
              <div className="flex items-center justify-between text-s-semibold">
                <p className="text-text-tertiary">커리큘럼 1</p>
                <p className="text-text-primary">{progress.gradeTitle}</p>
                <button
                  className="max-w-[109px] w-full h-8 rounded-lg bg-[#f6f6f6] text-s-medium text-text-secondary"
                  type="button"
                  onClick={() => {
                    setIsModalOpen(true);
                    setAttendeeProgressId(Number(progress.id));
                  }}
                >
                  다음 과정으로
                </button>
              </div>
              <div className="flex items-center justify-between text-s-semibold">
                <p className="text-text-tertiary">시작일</p>
                <p className="text-text-primary">{progress.startDate}</p>
              </div>
            </Fragment>
          );
        })}
      </div>

      {/* 성장 이력 섹션 */}
      <div className="w-full rounded-2xl bg-white p-4 flex flex-col gap-3">
        <p className="flex text-s-bold text-[#5d5d5d]">성장 이력</p>
        {/* 헤더 */}
        <div className="grid grid-cols-4 gap-4 text-s-semibold">
          <div className="text-[#B0B0B0] text-center">과정명</div>
          <div className="text-[#B0B0B0] text-center">소요 기간</div>
          <div className="text-[#B0B0B0] text-center">소요 레슨</div>
          <div className="text-[#B0B0B0] text-center">소요 일자</div>
        </div>
        {/* 데이터 */}
        <div className="flex flex-col gap-3">
          {progressLog?.map((progress) => (
            <div
              key={progress.progressLogId}
              className="grid grid-cols-4 gap-4 text-[11px] font-semibold"
            >
              <div className="text-center truncate">{progress.gradeTitle}</div>
              <div className="text-center">
                {progress.startedAt.substring(5).replaceAll("-", ".")}-
                {progress.endedAt.substring(5).replaceAll("-", ".")}
              </div>
              <div className="text-center">{progress.lessonCount}</div>
              <div className="text-center">2주</div>
            </div>
          ))}
        </div>
      </div>

      {/* 모달 */}
      <NextProgressModal
        onClose={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
        bookId={Number(bookId)}
        attendeeProgressId={attendeeProgressId}
      />
    </div>
  );
}
