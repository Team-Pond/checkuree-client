export type IProps = {
  studentInfo: {
    name: string;
    age: number;
    grade: string;
    scheduleDays: string;
  };
};
export default function CounselManage(props: IProps) {
  const { studentInfo } = props;
  return (
    <div className="flex flex-col gap-4">
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

      <div className="w-full rounded-2xl text-left bg-white p-4 flex flex-col gap-5">
        <p className="flex text-s-bold text-[#5d5d5d]">
          상담 내역 <img src="" alt="" />
        </p>
        <p className="text-m-semibold text-text-primary">2024.12.31</p>
        <div className="flex items-center justify-between text-s-semibold">
          <p className="text-text-tertiary">유형</p>
          <p className="text-text-primary">전화</p>
        </div>
        <div className="flex items-center justify-between text-s-semibold">
          <p className="text-text-tertiary">주제</p>
          <p className="text-text-primary">진로 상담</p>
        </div>
        <div className="flex items-center justify-between text-s-semibold">
          <p className="text-text-tertiary">상담자</p>
          <p className="text-text-primary">학생 모</p>
        </div>
      </div>
      <div className="w-full rounded-2xl text-left bg-white p-4 flex flex-col gap-5">
        <p className="flex text-s-bold text-[#5d5d5d]">
          상담 내역 <img src="" alt="" />
        </p>
        <p className="text-m-semibold text-text-primary">2024.12.31</p>
        <div className="flex items-center justify-between text-s-semibold">
          <p className="text-text-tertiary">유형</p>
          <p className="text-text-primary">전화</p>
        </div>
        <div className="flex items-center justify-between text-s-semibold">
          <p className="text-text-tertiary">주제</p>
          <p className="text-text-primary">진로 상담</p>
        </div>
        <div className="flex items-center justify-between text-s-semibold">
          <p className="text-text-tertiary">상담자</p>
          <p className="text-text-primary">학생 모</p>
        </div>
      </div>
    </div>
  );
}
