import { Dayjs } from "dayjs";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
} from "framer-motion";
import { useNavigate } from "react-router-dom";
import { updateBookStatus } from "@/api v2/AttendanceBookApiClient";
import { BookStatus } from "@/api v2/AttendanceBookSchema";
import { useRecordAllUpdate } from "../queries";
import { Dispatch, SetStateAction } from "react";

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
  setConfirmModalIsOpen: Dispatch<SetStateAction<boolean>>;
  setConfirmMessage: Dispatch<SetStateAction<string>>;
  setOnSave: Dispatch<SetStateAction<() => void>>;
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
    setConfirmModalIsOpen,
    setConfirmMessage,
    setOnSave
  } = props;

  const navigate = useNavigate();
  const displayDate = currentDate.locale("ko").format("M월 D일");

  // 스크롤 관련 훅 설정
  const { scrollYProgress } = useScroll();
  const smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 10,
    mass: 1,
  });

  // 스크롤 가능 여부 체크 (초기 렌더링 시)
  const isScrollable =
    document.documentElement.scrollHeight > window.innerHeight;

  // 항상 훅을 호출하여 MotionValue 를 생성한 후,
  // 스크롤 가능 여부에 따라 fallback MotionValue를 미리 생성해둡니다.
  const _textY = useTransform(smoothScrollYProgress, [0, 0.05], [0, -8]);
  const _iconY = useTransform(smoothScrollYProgress, [0, 0.05], [0, 8]);
  const _iconOpacity = useTransform(smoothScrollYProgress, [0, 0.05], [1, 0]);
  const _textOpacity = useTransform(smoothScrollYProgress, [0, 0.05], [1, 1]);
  const _headerHeight = useTransform(
    smoothScrollYProgress,
    [0, 0.05],
    ["46px", "25px"]
  );
  const _headerContainerHeight = useTransform(
    smoothScrollYProgress,
    [0, 0.05],
    ["78px", "49px"]
  );

  // fallback 모션 값들을 생성 (항상 훅은 호출)
  const fallbackTextY = useMotionValue(0);
  const fallbackIconY = useMotionValue(0);
  const fallbackIconOpacity = useMotionValue(1);
  const fallbackTextOpacity = useMotionValue(1);
  const fallbackHeaderHeight = useMotionValue("46px");
  const fallbackHeaderContainerHeight = useMotionValue("78px");

  // 스크롤이 가능하면 계산된 모션 값을, 아니면 fallback 값을 사용
  const textY = isScrollable ? _textY : fallbackTextY;
  const iconY = isScrollable ? _iconY : fallbackIconY;
  const iconOpacity = isScrollable ? _iconOpacity : fallbackIconOpacity;
  const textOpacity = isScrollable ? _textOpacity : fallbackTextOpacity;
  const headerHeight = isScrollable ? _headerHeight : fallbackHeaderHeight;
  const headerContainerHeight = isScrollable
    ? _headerContainerHeight
    : fallbackHeaderContainerHeight;

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
        setConfirmModalIsOpen(true);
        setConfirmMessage("전체 출석하시겠습니까?");
        setOnSave(() => () => recordAllMutation());
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
      <motion.div
        style={{
          height: headerContainerHeight,
        }}
        className="w-full flex gap-[26px] justify-center items-center bg-white border-t border-bg-disabled"
      >
        <motion.div
          style={{
            height: headerHeight,
          }}
          className="flex flex-col justify-center items-center text-sm font-medium"
        >
          <motion.p
            style={{
              y: iconY,
              opacity: iconOpacity,
            }}
          >
            체크 인원
          </motion.p>
          <motion.p
            style={{
              y: textY,
              opacity: textOpacity,
            }}
          >
            {checkedScheduleCount + "/" + totalScheduleCount}
          </motion.p>
        </motion.div>
        <div className="flex gap-2">
          {SUB_HEADER.map((header) => (
            <motion.button
              key={header.name}
              style={{
                height: headerHeight,
              }}
              onClick={header.onClick}
              className="w-[77px] flex flex-col items-center justify-center bg-bg-secondary rounded-lg"
            >
              <motion.img
                style={{
                  y: iconY,
                  opacity: iconOpacity,
                }}
                src={header.src}
                alt={header.name}
                width={16}
                height={16}
              />
              <motion.p
                className="text-xs font-medium"
                style={{ y: textY, opacity: textOpacity }}
              >
                {header.name}
              </motion.p>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
