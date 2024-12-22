export default function BookRoaster() {
  return (
    <section className="flex flex-col w-full min-h-screen">
      <div className="flex flex-col sticky top-0 z-50 bg-white">
        <div className="w-full h-[64px] flex items-center justify-between px-4 py-5">
          <p className="text-[22px] font-bold">리스트반 출석부</p>
          <img
            src="/images/icons/ico-settings.svg"
            alt="설정 아이콘"
            width={32}
            height={32}
          />
        </div>
      </div>
    </section>
  );
}
