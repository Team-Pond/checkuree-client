const MOCK_DATA = [
  {
    time: "오후 3:00",
    name: "배서윤",
  },
  {
    time: "오후 4:00",
    name: "김범수",
  },
  {
    time: "오후 5:00",
    name: "진정현",
  },
  {
    time: "오후 6:00",
    name: "박상후",
  },
  {
    time: "오후 7:00",
    name: "박상후",
  },
  // {
  //   time: "오후 8:00",
  //   name: "이예은",
  // },
  // {
  //   time: "오후 9:00",
  //   name: "나루토",
  // },
  // {
  //   time: "오후 10:00",
  //   name: "사스케",
  // },
  // {
  //   time: "오후 11:00",
  //   name: "이치고",
  // },
];

export default function MainContents() {
  return (
    <div className="w-full flex flex-col gap-4 justify-center items-center py-3 px-4 bg-bg-secondary">
      {MOCK_DATA.map((item, index) => {
        return (
          <div
            key={index}
            className="w-full text-left rounded-2xl bg-white px-6 pt-4 flex flex-col gap-3"
          >
            <p className=" font-bold text-sm text-text-secondary">
              {item.time}
            </p>

            <div className="w-full h-[56px] flex items-center justify-between px-2 ">
              <p className="font-bold  text-text-primary">{item.name}</p>

              <div className="flex gap-4">
                <div className="flex gap-2">
                  <button className="rounded-xl w-[57px] h-[33px] flex items-center justify-center bg-bg-destructive text-text-interactive-destructive">
                    결석
                  </button>
                  <button className="rounded-xl w-[57px] h-[33px] flex items-center justify-center bg-bg-disabled text-text-disabled">
                    출석
                  </button>
                </div>
                <button className="w-8 h-8 bg-bg-disabled flex items-center justify-center rounded-lg">
                  <img src="/images/icons/ico-note.svg" alt="" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
