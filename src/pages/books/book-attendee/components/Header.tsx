import { useLocation, useNavigate, useParams } from "react-router-dom";
import PlusIcon from "@/assets/icons/book-roaster/ico-plus-black.svg?react";
import GlassesIcon from "@/assets/icons/book-roaster/ico-glasses.svg?react";
import SliderIcon from "@/assets/icons/book-roaster/ico-slider.svg?react";
import SettingIcon from "@/assets/icons/ico-settings.svg?react";
type HeaderProps = {
  title: string;
  onDrawerChange: () => void;
  onChangeSearch: (value: string) => void;
};

export default function Header(props: HeaderProps) {
  const { title, onDrawerChange, onChangeSearch } = props;
  const navigate = useNavigate();
  const { bookId } = useParams();
  const location = useLocation();
  return (
    <>
      <div className="flex flex-col sticky top-0 z-50 bg-white border-b border-[#f6f6f6]">
        <div className="w-full h-[64px] flex items-center justify-between px-4 py-5">
          <p
            className="text-[22px] font-bold"
            onClick={() => navigate("/book")}
          >
            {title}
          </p>
          <div className="flex gap-2 items-center">
            <PlusIcon
              width={40}
              height={40}
              onClick={() =>
                navigate(`/book/${bookId}/attendee/create${location.search}`)
              }
              className="cursor-pointer"
            />
            <SettingIcon width={32} height={32} className="cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="flex gap-2 w-full items-center justify-center p-[17px]">
        <div className="relative w-full">
          <input
            type="text"
            className="bg-bg-secondary rounded-lg w-full h-11 outline-none pl-11 text-m-bold"
            placeholder="이름 검색"
            onChange={(e) => onChangeSearch(e.target.value)}
          />
          <GlassesIcon
            width={40}
            height={40}
            className="absolute top-[2px] left-1"
          />
        </div>
        <SliderIcon
          width={42}
          height={42}
          onClick={onDrawerChange}
          className="cursor-pointer"
        />
      </div>
    </>
  );
}
