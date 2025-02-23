import CounselList from './CounselList';

type IProps = {
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
      <CounselList counselType={'전화'} counselSubjects={['진로 상담', '진도 상담']} counsellee={'학생 모'}></CounselList>
      <CounselList counselType={'전화'} counselSubjects={['진로 상담', '진도 상담']} counsellee={'학생 모'}></CounselList>
    </div>
  );
}
