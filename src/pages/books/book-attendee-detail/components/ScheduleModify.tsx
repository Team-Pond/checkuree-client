import Step2 from "../../../attendee-create/components/Step2";
import { useNavigate, useParams } from "react-router-dom";
import ScheduleTableDetail from "./modify_components/ScheduleTableDetail.tsx";

interface IProps {
  bookId: string;
  attendeeId: number;
}
export const ScheduleModify = () => {
  const { bookId, attendeeId } = useParams();

  const navigate = useNavigate();

  return (
    <form className="flex flex-col gap-7 w-full pb-[30px]">
      <div className="w-full h-[64px] flex items-center justify-between px-4 py-5">
        <p className="font-bold text-text-primary text-[22px]">클래스 수정</p>
        <img
          src="/images/icons/book-create/ico-close.svg"
          alt="닫기 아이콘"
          width={32}
          height={32}
          onClick={() => navigate(`/book/${bookId}/attendee${location.search}`)}
        />
      </div>

      <div className="w-full flex flex-col gap-10 items-center">
        <div className="flex gap-2 w-full justify-center">
          <hr className="border-[2px] border-bg-tertiary max-w-[356px] w-full rounded-full" />
        </div>

        <div className="flex w-full justify-center">
          <div className="flex flex-col justify-center gap-6 max-w-[342px] w-full">
            {/*<Step2*/}
            {/*  // Step2로 내려줄 함수*/}
            {/*  // setBookProgress={setBookProgress}*/}
            {/*  onChangeGrade={() => {}}*/}
            {/*  attendanceBookId={12}*/}
            {/*  setAttendeeSchedules={() => {}}*/}
            {/*  attendeeSchedules={undefined}*/}
            {/*/>*/}
            <ScheduleTableDetail />
            <div className="flex gap-4 w-full">
              <button
                type="button"
                onClick={() => {}}
                className="w-full h-[54px] flex justify-center items-center rounded-2xl bg-bg-secondary text-text-secondary text-l-semibold"
              >
                이전으로
              </button>
              <button
                // onClick={() => {
                //   scheduleMutation();
                // }}
                type="button"
                className="w-full h-[54px] flex justify-center items-center rounded-2xl bg-bg-tertiary text-[#F1F8F3] text-l-semibold"
              >
                생성하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
