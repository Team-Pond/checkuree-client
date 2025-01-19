import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useNavigate } from "react-router-dom";

type HeaderProps = {
  title: string;
  bookId: number;
  formattedDate: string;
  handleNextDay: () => void;
  handlePreviousDay: () => void;
  currentDate: Dayjs;
};

export default function Header(props: HeaderProps) {
  const {
    title,
    bookId,
    currentDate,
    handlePreviousDay,
    handleNextDay,
    formattedDate,
  } = props;

  const navigate = useNavigate();
  const SUB_HEADER = [
    {
      src: "/images/icons/ico-zzz.svg",
      name: "휴원하기",
    },
    {
      src: "/images/icons/ico-user-add.svg",
      name: "인원 추가",
    },
    {
      src: "/images/icons/ico-check.svg",
      name: "전체 출석",
    },
  ];

  const displayDate = currentDate.locale("ko").format("M월 D일"); // 텍스트 값

  const { scrollYProgress } = useScroll();
  const smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 20,
    mass: 1,
  });

  const textY = useTransform(smoothScrollYProgress, [0, 0.15], [0, -8]);
  const iconY = useTransform(smoothScrollYProgress, [0, 0.15], [0, 8]);
  const iconOpacity = useTransform(smoothScrollYProgress, [0, 0.15], [1, 0]);
  const textOpacity = useTransform(smoothScrollYProgress, [0, 0.15], [1, 1]);
  const headerHeight = useTransform(
    smoothScrollYProgress,
    [0, 0.2],
    ["46px", "25px"]
  );
  const headerContainerHeight = useTransform(
    smoothScrollYProgress,
    [0, 0.2],
    ["78px", "49px"]
  );

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
            10/12
          </motion.p>
        </motion.div>
        <div className="flex gap-2">
          {SUB_HEADER.map((item) => (
            <motion.button
              key={item.name}
              style={{
                height: headerHeight,
              }}
              className="w-[77px] flex flex-col items-center justify-center bg-bg-secondary rounded-lg"
            >
              <motion.img
                style={{
                  y: iconY,
                  opacity: iconOpacity,
                }}
                src={item.src}
                alt={item.name}
                width={16}
                height={16}
              />
              <motion.p
                className="text-xs font-medium"
                style={{ y: textY, opacity: textOpacity }}
              >
                {item.name}
              </motion.p>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
