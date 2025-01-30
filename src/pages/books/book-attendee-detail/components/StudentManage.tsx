import { DaysType, GenderType, Progresses } from "@/api v2/AttendeeSchema";
import { formatSchedule } from "@/utils";

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

export default function StudentManage(props: IProps) {
  const { student, registerInfo, scheduleItems, associates } = props;

  const response = scheduleItems?.length > 0 && formatSchedule(scheduleItems);

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

      <div className="w-full rounded-2xl bg-white p-4 flex flex-col gap-5">
        <p className="flex text-s-bold text-[#5d5d5d]">
          수업 정보 <img src="" alt="" />
        </p>
        <div className="flex justify-between text-s-semibold">
          <p className="text-text-tertiary">커리큘럼</p>
          <div className="flex flex-col text-text-primary">
            <p>체르니 &gt; 체르니50</p>
            <p>재즈1 &gt; 재즈 1단계</p>
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
          등록 정보 <img src="" alt="" />
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
    </div>
  );
}
