import CommonTabs from "@/components/Tabs";

export default function BookAttendeeDetail() {
  return (
    <section className="bg-bg-secondary flex-1 w-full">
      <CommonTabs />

      <div className="p-4 flex flex-col gap-4">
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
                <span className="text-text-primary">배서윤</span>
                <span className="text-text-secondary ml-2">12</span>
              </p>
              <p className="text-m-bold text-text-secondary">010-1234-5678</p>
            </div>
            <p className="text-s-medium text-text-tertiary">
              <span>입학일자</span> <span>2024.10.10</span>
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
              <p>체르니 = 체르니50</p>
              <p>재즈1 = 재즈 1단계</p>
            </div>
          </div>
          <div className="flex justify-between text-s-semibold">
            <p className="text-text-tertiary">클래스</p>
            <div className="flex flex-col text-text-primary">
              <p>(월) 오휴 12:30, (금) 오후 1:00</p>
            </div>
          </div>
        </div>

        <div className="w-full rounded-2xl bg-white p-4 flex flex-col gap-5">
          <p className="flex text-s-bold text-[#5d5d5d]">
            등록 정보 <img src="" alt="" />
          </p>
          <div className="flex justify-between text-s-semibold">
            <p className="text-text-tertiary">기본 정보</p>
            <p className="text-text-primary">2013.03.15, 여성</p>
          </div>
          <div className="flex justify-between text-s-semibold">
            <p className="text-text-tertiary">학생 주소</p>
            <p className="text-text-primary">강남구 행복아파트</p>
          </div>
          <div className="flex justify-between text-s-semibold">
            <p className="text-text-tertiary">가족 연락처</p>
            <p className="text-text-primary">010-8765-4321 (모)</p>
          </div>
          <div className="flex justify-between text-s-semibold">
            <p className="text-text-tertiary">비고</p>
            <p className="text-text-primary">예고 입학 희망</p>
          </div>
        </div>
      </div>
    </section>
  );
}
