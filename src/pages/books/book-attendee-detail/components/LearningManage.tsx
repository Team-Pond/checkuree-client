export default function LearningManage() {
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
              <span className="text-text-primary">배서윤</span>
              <span className="text-text-secondary text-m-semibold ml-2">
                12
              </span>
            </p>
            <p className="text-s-medium text-text-secondary">010-1234-5678</p>
          </div>
        </div>
      </div>

      <div className="w-full rounded-2xl bg-white p-4 flex flex-col gap-5">
        <p className="flex text-s-bold text-[#5d5d5d]">
          커리큘럼 정보 <img src="" alt="" />
        </p>
        <div className="flex items-center justify-between text-s-semibold">
          <p className="text-text-tertiary">커리큘럼 1</p>
          <p className="text-text-primary">체르니 50</p>
          <button
            className="max-w-[109px] w-full h-[33px] rounded-lg bg-[#f6f6f6] text-s-medium text-text-secondary"
            type="button"
          >
            다음 과정으로
          </button>
        </div>
        <div className="flex items-center justify-between text-s-semibold">
          <p className="text-text-tertiary">시작일</p>
          <p className="text-text-primary">2024.12.01</p>
        </div>

        <div className="flex items-center justify-between text-s-semibold">
          <p className="text-text-tertiary">커리큘럼 2</p>
          <p className="text-text-primary">재즈 1단계</p>
          <button
            className="max-w-[109px] w-full h-[33px] rounded-lg bg-[#f6f6f6] text-s-medium text-text-secondary"
            type="button"
          >
            다음 과정으로
          </button>
        </div>
        <div className="flex items-center justify-between text-s-semibold">
          <p className="text-text-tertiary">시작일</p>
          <p className="text-text-primary">2024.12.01</p>
        </div>
      </div>

      <div className="w-full rounded-2xl bg-white p-4 flex flex-col gap-5">
        <p className="flex text-s-bold text-[#5d5d5d]">성장 이력</p>

        <div className="flex justify-between">
          <div className="flex flex-col justify-center gap-4 text-s-semibold">
            <div className="text-[#B0B0B0]">과정명</div>
            <div>체르니 40</div>
            <div>체르니 100</div>
          </div>
          <div className="flex flex-col justify-center gap-4 text-s-semibold">
            <div className="text-[#B0B0B0]">소요 기간</div>
            <div>11.01-11.29</div>
            <div>10.11-10.28</div>
          </div>
          <div className="flex flex-col justify-center gap-4 text-s-semibold">
            <div className="text-[#B0B0B0]">소요 레슨</div>
            <div>9회</div>
            <div>6회</div>
          </div>
          <div className="flex flex-col justify-center gap-4 text-s-semibold">
            <div className="text-[#B0B0B0]">소요 일자</div>
            <div>4주</div>
            <div>3주</div>
          </div>
        </div>
      </div>
    </div>
  );
}
