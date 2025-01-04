export default function Step1() {
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
          placeholder="출석부 이름"
          className="max-w-[342px] bg-white w-full h-12 border border-[#E7E7E7] rounded-xl p-4 outline-none text-m-medium text-text-secondary"
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex gap-1 items-center">
          <p className="font-bold text-m-medium">학생 생년월일/성별</p>
          <p className="text-text-danger">*</p>
        </div>
        <div className="flex items-center mb-4"></div>

        <button
          type="button"
          className="outline-none border border-[#E7E7E7] rounded-xl max-w-[130px] w-full h-12  flex items-center pl-4"
        >
          <p className="font-bold text-sm text-[#B0B0B0]">YYYY.MM.DD</p>
        </button>

        <div className="flex gap-8 ">
          <div className="flex gap-2">
            <div className="inline-flex items-center">
              <label
                className="relative flex items-center cursor-pointer"
                htmlFor="html"
              >
                <input
                  name="gender"
                  value={"MALE"}
                  type="radio"
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all"
                  id="html"
                />
                <span className="absolute bg-bg-tertiary w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
              </label>
              <label
                className="ml-2 text-text-primary text-s-bold cursor-pointer"
                htmlFor="html"
              >
                남성
              </label>
            </div>
            <div className="inline-flex items-center">
              <label
                className="relative flex items-center cursor-pointer"
                htmlFor="html"
              >
                <input
                  name="gender"
                  value={"FEMALE"}
                  type="radio"
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all"
                  id="html"
                />
                <span className="absolute bg-bg-tertiary w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
              </label>
              <label
                className="ml-2 text-text-primary text-s-bold cursor-pointer"
                htmlFor="html"
              >
                여성
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
