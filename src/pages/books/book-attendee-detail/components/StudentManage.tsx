import {
  DaysType,
  GenderType,
  Progresses,
  UpdateAttendeeScheduleRequest,
} from "@/api v2/AttendeeSchema";
import { formatSchedule, getTodayYYYYMMDD } from "@/utils";
import { useState } from "react";
import CurriculumModify from "./CurriculumModify";
import { useParams } from "react-router-dom";

type ScheduleItem = {
  id: number;
  day: DaysType;
  time: string;
}[];

type studentInfo = {
  name: string;
  age: number;
  phoneNumber: string;
  enrollDate: string;
};

type IProps = {
  student: studentInfo;
  lessonInfo: Progresses;
  registerInfo: {
    address_1: string;
    birthDate: string;
    gender: GenderType;
    phoneNumber: string;
    description: string;
  };
  scheduleItems: ScheduleItem;
  associates?: {
    relation?: string | "";
    phoneNumber?: string | "";
  };
};

interface progressGrade {
  startAt: string;
  gradeId: number;
}
export default function StudentManage(props: IProps) {
  const { student, registerInfo, scheduleItems, associates, lessonInfo } =
    props;

  const response = scheduleItems?.length > 0 && formatSchedule(scheduleItems);

  const [isCourseModify, setIsCourseModify] = useState<boolean>(false);
  const [progressGrade, setProgressGrade] = useState<progressGrade[] | []>([]);
  const onChangeGrade = (gradeId: number) => {
    setProgressGrade([
      ...progressGrade,
      { gradeId: gradeId, startAt: getTodayYYYYMMDD() },
    ]);
  };
  const { bookId } = useParams();

  const [attendeeSchedules, setAttendeeSchedules] = useState<
    UpdateAttendeeScheduleRequest | undefined
  >();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-8 items-center w-full h-[120px] rounded-2xl bg-white">
        <img
          src="/images/icons/book-roaster/ico-student.svg"
          alt="학생 아이콘"
          width={80}
          height={80}
          className="rounded-full ml-[23px]"
        />
        <div className="flex flex-col gap-2 text-left">
          <div className="flex flex-col gap-1">
            <p className="text-xl-bold">
              <span className="text-text-primary">{student.name}</span>
              <span className="text-text-secondary ml-2">{student.age}</span>
            </p>
            <p className="text-m-bold text-text-secondary">
              {student.phoneNumber}
            </p>
          </div>
          <p className="text-s-medium text-text-tertiary">
            <span>입학일자</span>{" "}
            <span>{student.enrollDate?.replaceAll("-", ".")}</span>
          </p>
        </div>
      </div>
      {isCourseModify ? (
        <CurriculumModify
          onChangeGrade={onChangeGrade}
          attendanceBookId={Number(bookId)}
          setAttendeeSchedules={setAttendeeSchedules}
          attendeeSchedules={attendeeSchedules}
          setIsCourseModify={setIsCourseModify}
        />
      ) : (
        <>
          <div className="w-full rounded-2xl bg-white p-4 flex flex-col gap-5">
            <p className="flex text-s-bold text-[#5d5d5d]">
              <span>수업 정보</span>{" "}
              <img
                src="/images/icons/ico-pencil.svg"
                width={20}
                height={20}
                alt=""
                onClick={() => setIsCourseModify(true)}
              />
            </p>
            <div className="flex justify-between text-s-semibold">
              <p className="text-text-tertiary">커리큘럼</p>
              <div className="flex flex-col text-text-primary">
                {lessonInfo?.map((course) => {
                  return (
                    <p key={course.id}>
                      {course.courseTitle} &gt; {course.gradeTitle}
                    </p>
                  );
                })}
              </div>
            </div>
            <div className="flex items-center justify-between text-s-semibold">
              <p className="text-text-tertiary w-12">클래스</p>
              <div className="flex flex-col text-text-primary text-xs">
                <p className="break-keep text-left">
                  {response
                    ? response?.map((day, index) => {
                        return <span key={index}>{day} &nbsp;</span>;
                      })
                    : ""}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full rounded-2xl bg-white p-4 flex flex-col gap-5">
            <p className="flex text-s-bold text-[#5d5d5d]">
              <span>등록 정보</span>{" "}
              <img
                src="/images/icons/ico-pencil.svg"
                width={20}
                height={20}
                alt=""
              />
            </p>
            <div className="flex justify-between text-s-semibold">
              <p className="text-text-tertiary">기본 정보</p>
              <p className="text-text-primary">
                {registerInfo.birthDate?.replaceAll("-", ".")},{" "}
                {registerInfo.gender === "MALE" ? "남성" : "여성"}
              </p>
            </div>
            <div className="flex justify-between text-s-semibold">
              <p className="text-text-tertiary">학생 주소</p>
              <p className="text-text-primary">{registerInfo.address_1}</p>
            </div>
            <div className="flex justify-between text-s-semibold">
              <p className="text-text-tertiary">가족 연락처</p>
              <p className="text-text-primary">
                {associates?.phoneNumber}{" "}
                {associates?.relation === "MOTHER" ? "(모)" : "(부)"}
              </p>
            </div>
            <div className="flex justify-between text-s-semibold">
              <p className="text-text-tertiary">비고</p>
              <p className="text-text-primary">{registerInfo.description}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
