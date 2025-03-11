import { Dayjs } from "dayjs";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { updateBookStatus } from "@/api/AttendanceBookApiClient";

import { useRecordAllUpdate } from "../queries";
import { Dispatch, SetStateAction } from "react";
import useModalStore from "@/store/dialogStore";
import ConfirmModal from "./ConfirmModal";
import toast from "react-hot-toast";
import { BookStatus } from "@/api/type";
import ZzzIcon from "@/assets/icons/ico-zzz.svg?react";
import UserAddIcon from "@/assets/icons/ico-user-add.svg?react";
import CheckIcon from "@/assets/icons/ico-check.svg?react";
import SettingIcon from "@/assets/icons/ico-settings.svg?react";
import LeftArrowIcon from "@/assets/icons/ico-arrow-left.svg?react";
import RightArrowIcon from "@/assets/icons/ico-arrow-right.svg?react";
type HeaderProps = {
  title: string;
  bookId: number;
  formattedDate: string;
  handleNextDay: () => void;
  handlePreviousDay: () => void;
  currentDate: Dayjs;
  checkedScheduleCount: number;
  totalScheduleCount: number;
  setOpenFilter: Dispatch<SetStateAction<boolean>>;
  handleDrawer: () => void;
};

export default function Header(props: HeaderProps) {
  const {
    title,
    bookId,
    currentDate,
    handlePreviousDay,
    handleNextDay,
    formattedDate,
    checkedScheduleCount,
    totalScheduleCount,
    setOpenFilter,
    handleDrawer,
  } = props;

  const navigate = useNavigate();
  const displayDate = currentDate.locale("ko").format("M월 D일");

  const { mutate: recordAllMutation } = useRecordAllUpdate({
    bookId,
    formattedDate,
  });

  const handleBookStatus = async (date: string, status: BookStatus) => {
    await updateBookStatus({
      attendanceBookId: bookId,
      params: {
        date,
        status,
      },
    });
  };

  const openModal = useModalStore((state) => state.openModal);
  const SUB_HEADER = [
    {
      Icon: <ZzzIcon width={16} height={16} />,
      name: "휴원하기",
      onClick: async () => await handleBookStatus(formattedDate, "PAUSED"),
    },
    {
      Icon: <UserAddIcon width={16} height={16} />,
      name: "인원 추가",
      onClick: () => {
        setOpenFilter(true);
      },
    },
    {
      Icon: <CheckIcon width={16} height={16} />,
      name: "전체 출석",
      onClick: () =>
        totalScheduleCount > 0
          ? openModal(<ConfirmModal message="전체 출석하시겠습니까?" />, () =>
              recordAllMutation()
            )
          : toast("출석할 수 있는 학생이 없습니다."),
    },
  ];

  return (
    <div className="flex flex-col sticky top-0 z-50 bg-white">
      <div className="w-full h-[64px] flex items-center justify-between px-4 py-5">
        <p
          className="text-[22px] font-bold cursor-pointer"
          onClick={() => navigate("/book")}
        >
          {title}
        </p>
        <SettingIcon className="cursor-pointer" width={32} height={32} />
      </div>
      {/* Calendar */}
      <div className="w-full flex h-10 justify-between items-center px-4 border-b border-bg-disabled">
        <LeftArrowIcon
          width={12}
          height={12}
          onClick={handlePreviousDay}
          className="cursor-pointer"
        />
        <p
          className="text-xl font-bold cursor-pointer select-none"
          data-value={formattedDate}
          onClick={handleDrawer}
        >
          {displayDate}
        </p>
        <RightArrowIcon
          width={12}
          height={12}
          onClick={handleNextDay}
          className="cursor-pointer"
        />
      </div>
      {/* SubHeader */}
      <motion.div className="w-full flex gap-[26px] justify-center items-center bg-white border-t border-bg-disabled py-4">
        <motion.div className="flex flex-col justify-center items-center text-sm font-medium h-[46px]">
          <motion.p>체크 인원</motion.p>
          <motion.p>{checkedScheduleCount + "/" + totalScheduleCount}</motion.p>
        </motion.div>
        <div className="flex gap-2">
          {SUB_HEADER.map((header) => (
            <motion.button
              key={header.name}
              onClick={header.onClick}
              className="w-[77px] h-[46px] flex flex-col items-center justify-center bg-bg-secondary rounded-lg"
            >
              {header.Icon}
              <motion.p className="text-xs font-medium">{header.name}</motion.p>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
