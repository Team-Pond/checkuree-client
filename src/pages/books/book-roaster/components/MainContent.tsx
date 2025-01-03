import { GetAttendeeListResponse } from "@/api v2/AttendeeSchema";
import { getDayGroupFromInput } from "@/utils";

type IProps = {
  roaster: GetAttendeeListResponse;
  getGrades: (grades: { id: number; name: string }[]) => string;
};
export default function MainContent(props: IProps) {
  const { roaster, getGrades } = props;
  return (
    <div className="w-full px-[17px] ">
      <p className="text-left text-s-semibold text-text-secondary mb-1">전체</p>

      <div className="border-t border-[#F6F6F6]">
        {/* <div>
                <img src="" alt="" />
                <p className="text-s-medium text-[#B0B0B0]">
                  일치하는 학생이 없습니다.
                </p>
              </div> */}
        {roaster?.data.content.map((student) => {
          return (
            <div key={student.id} className="py-4 px-2 flex gap-4">
              <img
                src="/images/icons/book-roaster/ico-student.svg"
                alt="학생 아이콘"
                width={40}
                height={40}
                className="rounded-full"
              />

              <div className="gap-1 text-left">
                <div className="flex gap-2">
                  <p className="text-m-bold text-text-primary">
                    {student.name}
                  </p>
                  <p className="text-m-semibold text-text-secondary">
                    {student.age}
                  </p>
                </div>
                <div className="flex gap-2">
                  <p className="text-text-brand text-s-semibold">
                    {getDayGroupFromInput(student.scheduleDays)}
                  </p>
                  <p className="text-[#B0B0B0] text-s-medium">
                    {getGrades(student.grades)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
