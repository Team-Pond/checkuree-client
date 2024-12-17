const MOCK_DATA = [
  {
    imgUrl: "/images/img-test.png",
    name: "리스트반 출석부",
    roasterCount: 12,
    availableDays: "평일",
    availableTime: "오전 11시 ~ 오후 8시",
  },
  {
    imgUrl: "/images/img-test.png",
    name: "리스트반 출석부",
    roasterCount: 12,
    availableDays: "평일",
    availableTime: "오전 11시 ~ 오후 8시",
  },
  {
    imgUrl: "/images/img-test.png",
    name: "리스트반 출석부",
    roasterCount: 12,
    availableDays: "평일",
    availableTime: "오전 11시 ~ 오후 8시",
  },
  {
    imgUrl: "/images/img-test.png",
    name: "리스트반 출석부",
    roasterCount: 12,
    availableDays: "평일",
    availableTime: "오전 11시 ~ 오후 8시",
  },
  {
    imgUrl: "/images/img-test.png",
    name: "리스트반 출석부",
    roasterCount: 12,
    availableDays: "평일",
    availableTime: "오전 11시 ~ 오후 8시",
  },
  {
    imgUrl: "/images/img-test.png",
    name: "리스트반 출석부",
    roasterCount: 12,
    availableDays: "평일",
    availableTime: "오전 11시 ~ 오후 8시",
  },
  {
    imgUrl: "/images/img-test.png",
    name: "리스트반 출석부",
    roasterCount: 12,
    availableDays: "평일",
    availableTime: "오전 11시 ~ 오후 8시",
  },
  {
    imgUrl: "/images/img-test.png",
    name: "리스트반 출석부",
    roasterCount: 12,
    availableDays: "평일",
    availableTime: "오전 11시 ~ 오후 8시",
  },
  {
    imgUrl: "/images/img-test.png",
    name: "리스트반 출석부",
    roasterCount: 12,
    availableDays: "평일",
    availableTime: "오전 11시 ~ 오후 8시",
  },
];

export default function Attendances() {
  return (
    <section className="flex flex-col w-full min-h-screen">
      <div className="w-full h-[64px] flex items-center justify-between px-4 py-5">
        <img
          src="/images/logos/checkuree_logo.svg"
          alt="알림 아이콘"
          width={170}
          height={20}
        />
        <img
          src="/images/icons/attendance/ico-notification.svg"
          alt="알림 아이콘"
          width={20}
          height={20}
        />
      </div>

      <div className="w-full flex-1 bg-bg-secondary py-5 grid grid-cols-2 gap-y-5 justify-items-center  ">
        {MOCK_DATA.map((attendance) => {
          return (
            <div className="max-w-[162px] w-full  ">
              <img
                src={attendance.imgUrl}
                className="w-full h-[97px] rounded-t-2xl"
                alt=""
              />
              <div className="flex flex-col gap-2 px-3 py-4 text-left rounded-b-2xl bg-white">
                <div className="flex gap-2">
                  <p className="font-bold text-text-primary">
                    {attendance.name}
                  </p>
                  <p className="font-semibold text-text-secondary">
                    {attendance.roasterCount}
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-text-brand font-bold text-sm">
                    {attendance.availableDays}
                  </p>
                  <p className="text-text-secondary font-medium text-sm">
                    {attendance.availableTime}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button className="w-[104px] h-[46px] border border-black fixed bottom-[44px] right-[18px] rounded-full flex gap-2 justify-center items-center bg-bg-tertiary">
        <img
          src="/images/icons/attendance/ico-plus.svg"
          alt="플러스 아이콘"
          width={18}
          height={18}
        />
        <p className="text-white font-semibold text-lg">출석부</p>
      </button>
    </section>
  );
}
