import { UpdateAttendeeScheduleRequest } from "@/api/AttendeeSchema";
import { formatSchedule, getTodayYYYYMMDD } from "@/utils";
import { useState } from "react";
import CurriculumModify from "./CurriculumModify";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AttendeeModify from "./AttendeeModify";
import { DaysType, GenderType, Progresses } from "@/api/type";

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
    school: string;
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

interface AttendeeModifyFormState {
  birthDate: string;
  gender: GenderType;
  address_1: string;
  description: string;
}

export default function StudentManage(props: IProps) {
  const { student, registerInfo, scheduleItems, associates, lessonInfo } =
    props;

  const location = useLocation();

  const navigate = useNavigate();

  const response = scheduleItems?.length > 0 && formatSchedule(scheduleItems);

  const [isCourseModify, setIsCourseModify] = useState<boolean>(false);
  const [isAttendeeModify, setIsAttendeeModify] = useState<boolean>(false);
  const [progressGrade, setProgressGrade] = useState<progressGrade[] | []>([]);
  const onChangeGrade = (gradeId: number) => {
    setProgressGrade([
      ...progressGrade,
      { gradeId: gradeId, startAt: getTodayYYYYMMDD() },
    ]);
  };
  const { bookId, attendeeId } = useParams();

  const [attendeeSchedules, setAttendeeSchedules] = useState<
    UpdateAttendeeScheduleRequest | undefined
  >();

  const [formData, setFormData] = useState<AttendeeModifyFormState>({
    birthDate: "",
    gender: "",
    address_1: "",
    description: "",
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-8 items-center w-full rounded-2xl bg-white">
        <img
          src="/images/icons/book-roaster/ico-student.svg"
          alt="학생 아이콘"
          width={80}
          height={80}
          className="rounded-full ml-[23px]"
        />
        <div className="flex flex-col gap-2 text-left">
          <div className="flex flex-col gap-1 mt-4">
            <p className="text-xl-bold">
              <span className="text-text-primary">{student.name}</span>
              <span className="text-text-secondary ml-2">
                {student.age + "세"}
              </span>
            </p>
            <p className="text-m-bold text-text-secondary">
              {student.phoneNumber}
            </p>
          </div>
          <p className="text-s-medium text-text-tertiary">
            <span>입학일자</span>{" "}
            <span>{student.enrollDate?.replaceAll("-", ".")}</span>
          </p>
          <p className="text-s-medium text-text-primary mb-4">
            {lessonInfo?.map((course) => {
              return (
                <p key={course.id}>
                  {course.courseTitle} &gt; {course.gradeTitle}
                </p>
              );
            })}
          </p>
        </div>
      </div>
      {isCourseModify ? (
        <CurriculumModify
          onChangeGrade={onChangeGrade}
          setAttendeeSchedules={setAttendeeSchedules}
          setIsCourseModify={setIsCourseModify}
        />
      ) : isAttendeeModify ? (
        <AttendeeModify
          bookId={Number(bookId)}
          formData={formData}
          setFormData={setFormData}
          setIsAttendeeModify={setIsAttendeeModify}
          attendeeId={Number(attendeeId)}
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
                onClick={() => {
                  navigate(
                    `/book/${bookId}/attendee/${attendeeId}/schedule${location.search}`
                  );
                }}
              />
            </p>
            <div className="flex items-center justify-between text-s-semibold">
              <p className="text-text-tertiary w-12">클래스</p>
              <div className="flex flex-col text-text-primary text-xs">
                {response
                  ? response
                      .sort((a, b) => a[0].localeCompare(b[0]))
                      .reduce<string[][]>((acc, cur, index) => {
                        if (index % 3 === 0) acc.push([]); // 3개 단위로 배열 생성
                        acc[acc.length - 1].push(cur);
                        return acc;
                      }, [])
                      .map((row, rowIndex) => (
                        <p key={rowIndex} className="break-keep text-left">
                          {row.map((day, index) => (
                            <span key={index}>{day} &nbsp;</span>
                          ))}
                        </p>
                      ))
                  : ""}
              </div>
            </div>
          </div>
          <div className="w-full rounded-2xl bg-white p-4 flex flex-col gap-5">
            <p className="flex text-s-bold text-[#5d5d5d]">
              <span>등록 정보</span> {/*<img*/}
              {/*현재 수정 불가능하기 때문에 임시 주석처리*/}
              {/*  src="/images/icons/ico-pencil.svg"*/}
              {/*  width={20}*/}
              {/*  height={20}*/}
              {/*  alt=""*/}
              {/*  onClick={() => {*/}
              {/*    setIsAttendeeModify(true);*/}
              {/*    setIsCourseModify(false);*/}
              {/*  }}*/}
              {/*/>*/}
            </p>
            <div className="flex justify-between text-s-semibold">
              <p className="text-text-tertiary">기본 정보</p>
              <p className="text-text-primary">
                {registerInfo.birthDate?.replaceAll("-", ".")},{" "}
                {registerInfo.gender === "MALE" ? "남" : "여"}
              </p>
            </div>
            <div className="flex justify-between text-s-semibold">
              <p className="text-text-tertiary">학교</p>
              <p className="text-text-primary">{registerInfo.school}</p>
            </div>
            <div className="flex justify-between text-s-semibold">
              <p className="text-text-tertiary">학생 주소</p>
              <p className="text-text-primary max-w-[250px] overflow-wrap break-word">
                {registerInfo.address_1}
              </p>
            </div>
            <div className="flex justify-between text-s-semibold">
              <p className="text-text-tertiary">가족 연락처</p>
              <p className="text-text-primary">
                {associates?.relation === "MOTHER" ? "(모)" : "(부)"}
                {associates?.phoneNumber}{" "}
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
