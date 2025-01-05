import { useState } from "react";

export default function Step1() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  return (
    <div className="flex flex-col justify-center gap-6 max-w-[342px] w-full">
      {/* 학생 이름 */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-1 items-center">
          <p className="font-bold text-m-medium">학생 이름</p>
          <p className="text-text-danger">*</p>
        </div>

        <input
          type="text"
          placeholder="학생 이름"
          className="max-w-[342px] bg-white w-full h-12 border border-[#E7E7E7] rounded-xl p-4 outline-none text-m-medium text-text-secondary"
        />
      </div>

      {/* 학생 생년월일 */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-1 items-center">
          <p className="font-bold text-m-medium">학생 생년월일/성별</p>
          <p className="text-text-danger">*</p>
        </div>

        <div className="flex items-center gap-[9px]">
          <button
            type="button"
            className="outline-none border border-[#E7E7E7] rounded-xl max-w-[163px] w-full h-12  flex items-center pl-4"
          >
            <p className="font-bold text-sm text-[#B0B0B0]">YYYY.MM.DD</p>
          </button>

          <div className="flex px-4 max-w-[170px] w-full h-12">
            <div className="flex gap-8">
              <div className="inline-flex items-center">
                <label
                  className="relative flex items-center cursor-pointer"
                  htmlFor="male"
                >
                  <input
                    name="gender"
                    value={"MALE"}
                    type="radio"
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all"
                    id="male"
                  />
                  <span className="absolute bg-bg-tertiary w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                </label>
                <label
                  className="ml-2 text-text-primary text-s-bold cursor-pointer"
                  htmlFor="male"
                >
                  남성
                </label>
              </div>
              <div className="inline-flex items-center">
                <label
                  className="relative flex items-center cursor-pointer"
                  htmlFor="female"
                >
                  <input
                    name="gender"
                    value={"FEMALE"}
                    type="radio"
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all"
                    id="female"
                  />
                  <span className="absolute bg-bg-tertiary w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                </label>
                <label
                  className="ml-2 text-text-primary text-s-bold cursor-pointer"
                  htmlFor="female"
                >
                  여성
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 학생 입학일 */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-1 items-center">
          <p className="font-bold text-m-medium">학생 입학일</p>
          <p className="text-text-danger">*</p>
        </div>

        <div className="flex items-center gap-[9px]">
          <button
            type="button"
            className="outline-none border border-[#E7E7E7] rounded-xl max-w-[163px] w-full h-12  flex items-center pl-4"
          >
            <p className="font-bold text-sm text-[#B0B0B0]">YYYY.MM.DD</p>
          </button>

          <div className="flex px-4 max-w-[170px] w-full h-12">
            <div className="flex items-center">
              <div className="inline-flex items-center">
                <label className="flex items-center cursor-pointer relative">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded border border-slate-300 checked:bg-bg-tertiary checked:border-bg-tertiary"
                    id="check4"
                  />
                  <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor"
                      stroke-width="1"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </label>
              </div>
              <label
                htmlFor="checked-checkbox"
                className="ml-2 text-text-primary text-s-bold cursor-pointer"
              >
                오늘 입학
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* 학생 연락처 */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-1 items-center">
          <p className="font-bold text-m-medium">학생 연락처</p>
        </div>

        <input
          type="text"
          placeholder="학생 연락처"
          className="max-w-[342px] bg-white w-full h-12 border border-[#E7E7E7] rounded-xl p-4 outline-none text-m-medium text-text-secondary"
        />
      </div>
      {/* 학생 주소 */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-1 items-center">
          <p className="font-bold text-m-medium">학생 주소</p>
          <p className="text-text-danger">*</p>
        </div>

        <input
          type="text"
          placeholder="학생 주소"
          className="max-w-[342px] bg-white w-full h-12 border border-[#E7E7E7] rounded-xl p-4 outline-none text-m-medium text-text-secondary"
        />
      </div>
      {/* 학교(선택)*/}
      <div className="flex flex-col gap-2">
        <div className="flex gap-1 items-center">
          <p className="font-bold text-m-medium">학교(선택)</p>
        </div>

        <input
          type="text"
          placeholder="개굴초등학교"
          className="max-w-[342px] bg-white w-full h-12 border border-[#E7E7E7] rounded-xl p-4 outline-none text-m-medium text-text-secondary"
        />
      </div>
      {/* 비고 (선택) */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-1 items-center">
          <p className="font-bold text-m-medium">비고(선택)</p>
        </div>

        <input
          type="text"
          placeholder=""
          className="max-w-[342px] bg-white w-full h-12 border border-[#E7E7E7] rounded-xl p-4 outline-none text-m-medium text-text-secondary"
        />
      </div>
    </div>
  );
}
