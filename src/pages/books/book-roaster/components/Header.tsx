type HeaderProps = {
  title: string;
  onDrawerChange: () => void;
  onChangeSearch: (value: string) => void;
};

export default function Header(props: HeaderProps) {
  const { title, onDrawerChange, onChangeSearch } = props;

  return (
    <>
      <div className="flex flex-col sticky top-0 z-50 bg-white border-b border-[#f6f6f6]">
        <div className="w-full h-[64px] flex items-center justify-between px-4 py-5">
          <p className="text-[22px] font-bold">{title}</p>
          <div className="flex gap-2">
            <img
              src="/images/icons/book-roaster/ico-plus-black.svg"
              alt="설정 아이콘"
              width={40}
              height={40}
            />
            <img
              src="/images/icons/ico-settings.svg"
              alt="설정 아이콘"
              width={32}
              height={32}
            />
          </div>
        </div>
      </div>
      <div className="flex gap-2 w-full justify-center p-[17px]">
        <div className="relative w-full max-w-[307px]">
          <input
            type="text"
            className="bg-bg-secondary rounded-lg w-full h-11 outline-none pl-11 text-m-bold"
            placeholder="이름 검색"
            onChange={(e) => onChangeSearch(e.target.value)}
          />
          <img
            width={40}
            height={40}
            src={"/images/icons/book-roaster/ico-glasses.svg"}
            alt="input placeholder 아이콘"
            className="absolute top-[2px] left-1"
          />
        </div>
        <img
          width={40}
          height={40}
          src={"/images/icons/book-roaster/ico-slider.svg"}
          alt="필터 아이콘"
          onClick={onDrawerChange}
        />
      </div>
    </>
  );
}
