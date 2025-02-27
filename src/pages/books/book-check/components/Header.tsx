import { Dayjs } from "dayjs";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { updateBookStatus } from "@/api/AttendanceBookApiClient";
import { BookStatus } from "@/api/AttendanceBookSchema";
import { useRecordAllUpdate } from "../queries";
import { Dispatch, SetStateAction } from "react";
import useModalStore from "@/store/dialogStore";
import ConfirmModal from "./ConfirmModal";

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
      src: "/images/icons/ico-zzz.svg",
      name: "휴원하기",
      onClick: async () => await handleBookStatus(formattedDate, "PAUSED"),
    },
    {
      src: "/images/icons/ico-user-add.svg",
      name: "인원 추가",
      onClick: () => {
        setOpenFilter(true);
      },
    },
    {
      src: "/images/icons/ico-check.svg",
      name: "전체 출석",
      onClick: () => {
        openModal(<ConfirmModal message="전체 출석하시겠습니까?" />, () =>
          recordAllMutation()
        );
      },
    },
  ];

  return (
    <div className="flex flex-col sticky top-0 z-50 bg-white">
      <div className="w-full h-[64px] flex items-center justify-between px-4 py-5">
        <p className="text-[22px] font-bold" onClick={() => navigate("/book")}>
          {title}
        </p>
        <img
          src="/images/icons/ico-settings.svg"
          alt="설정 아이콘"
          width={32}
          height={32}
        />
      </div>
      {/* Calendar */}
      <div className="w-full flex h-10 justify-between items-center px-4 border-b border-bg-disabled">
        <img
          src="/images/icons/ico-arrow-left.svg"
          alt="왼쪽 화살"
          width={9}
          height={9}
          onClick={handlePreviousDay}
        />
        <p className="text-xl font-bold" data-value={formattedDate}>
          {displayDate}
        </p>
        <img
          src="/images/icons/ico-arrow-right.svg"
          alt="오른쪽 화살"
          width={9}
          height={9}
          onClick={handleNextDay}
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
              <motion.img
                src={header.src}
                alt={header.name}
                width={16}
                height={16}
              />
              <motion.p className="text-xs font-medium">{header.name}</motion.p>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
