import { motion, useScroll, useTransform } from "framer-motion";

type HeaderProps = {
  title: string;
};

export default function Header(props: HeaderProps) {
  const { title } = props;

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

  // useScroll 훅을 사용하여 스크롤 진행도를 가져옵니다.
  const { scrollYProgress } = useScroll();

  // 스크롤 진행도에 따라 텍스트와 아이콘의 애니메이션을 정의합니다.

  // 애니메이션 정의
  // 스크롤 진행도에 따라 텍스트와 아이콘의 Y 위치를 변경
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, -8]); // 텍스트는 아래로 이동
  const iconY = useTransform(scrollYProgress, [0, 0.2], [0, 8]); // 아이콘은 위로 이동
  // 스크롤 진행도에 따라 아이콘의 투명도 감소
  const iconOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  // 스크롤 진행도에 따라 텍스트의 투명도 유지
  const textOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 1]);
  // 헤더의 높이를 스크롤 진행도에 따라 줄임
  const headerHeight = useTransform(
    scrollYProgress,
    [0, 0.3],
    ["46px", "25px"]
  );
  const headerContainerHeight = useTransform(
    scrollYProgress,
    [0, 0.3],
    ["78px", "49px"]
  );

  return (
    <div className="flex flex-col sticky top-0 z-50 bg-white">
      <div className="w-full h-[64px] flex items-center justify-between px-4 py-5">
        <p className="text-[22px] font-bold">{title}</p>
        <img
          src="/images/icons/ico-settings.svg"
          alt="설정 아이콘"
          width={32}
          height={32}
        />
      </div>
      {/* Calendar */}
      <div className="w-full flex h-10  justify-between items-center px-4 border-b border-bg-disabled">
        <img
          src="/images/icons/ico-arrow-left.svg"
          alt="왼쪽 화살"
          width={9}
          height={9}
        />
        <p className="text-xl font-bold">12월 10일</p>
        <img
          src="/images/icons/ico-arrow-right.svg"
          alt="오른쪽 화살"
          width={9}
          height={9}
        />
      </div>
      {/* SubHeader */}

      <motion.div
        style={{
          height: headerContainerHeight,
        }}
        className="w-full flex gap-[26px] h-[78px] justify-center items-center bg-white border-t border-bg-disabled"
      >
        <motion.div
          style={{
            height: headerHeight,
            transition: "height 0.1s",
          }}
          className="flex flex-col justify-center items-center text-sm font-medium"
        >
          <motion.p
            style={{
              y: iconY,
              opacity: iconOpacity,
              transition: "opacity 0.3s, y 0.3s",
            }}
          >
            체크 인원
          </motion.p>
          <motion.p
            style={{
              y: textY,
              opacity: textOpacity,
              transition: "opacity 0.3s, y 0.3s",
            }}
          >
            10/12
          </motion.p>
        </motion.div>
        <div className="flex gap-2">
          {SUB_HEADER.map((item) => {
            return (
              <motion.button
                key={item.name}
                style={{
                  height: headerHeight,
                  transition: "height 0.1s",
                }}
                className="w-[77px] h-[46px] flex flex-col items-center justify-center bg-bg-secondary rounded-lg "
              >
                <motion.img
                  style={{
                    y: iconY,
                    opacity: iconOpacity,
                    transition: "opacity 0.3s, y 0.3s",
                  }}
                  src={item.src}
                  alt=""
                  width={16}
                  height={16}
                />
                <motion.p
                  className="text-xs font-medium"
                  style={{
                    y: textY,
                    opacity: textOpacity,
                    transition: "opacity 0.3s, y 0.3s",
                  }}
                >
                  {item.name}
                </motion.p>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
