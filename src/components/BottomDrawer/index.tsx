// BottomDrawer.tsx
import React, { useEffect } from "react";

interface BottomDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const BottomDrawer: React.FC<BottomDrawerProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  // onBlur close하기
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // 드로어가 열려 있을 때 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    // 배경 오버레이
    <div
      className={` fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      {/* 드로어 콘텐츠 */}
      <div
        className={`w-full max-w-[389px] bg-white rounded-t-lg shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
        onClick={(e) => e.stopPropagation()} // 클릭 이벤트 전파 방지
      >
        {/* 드로어 내용 */}
        <div className="px-4 py-[26px] pb-8 flex flex-col gap-8">
          {/* 성별 필터 */}

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3 text-left">
              <p className="text-m-bold text-text-primary">학생 성별</p>
              <div className="flex gap-2">
                <button className="rounded-lg border border-[#d1d1d1] w-[61px] h-[33px] text-s-medium text-border-secondary-hover">
                  남성
                </button>
                <button className="rounded-lg border border-[#d1d1d1] w-[61px] h-[33px] text-s-medium text-border-secondary-hover">
                  여성
                </button>
              </div>
            </div>

            {/* 학생 나이 */}
            <div className="flex flex-col gap-3 text-left">
              <p className="text-m-bold text-text-primary">학생 성별</p>
              <div className="flex gap-2">
                <button className="rounded-lg border border-[#d1d1d1] w-[61px] h-[33px] text-s-medium text-border-secondary-hover">
                  미취학
                </button>
                <button className="rounded-lg border border-[#d1d1d1] w-[61px] h-[33px] text-s-medium text-border-secondary-hover">
                  초등
                </button>
                <button className="rounded-lg border border-[#d1d1d1] w-[61px] h-[33px] text-s-medium text-border-secondary-hover">
                  중등
                </button>
                <button className="rounded-lg border border-[#d1d1d1] w-[61px] h-[33px] text-s-medium text-border-secondary-hover">
                  고등
                </button>
                <button className="rounded-lg border border-[#d1d1d1] w-[61px] h-[33px] text-s-medium text-border-secondary-hover">
                  성인
                </button>
              </div>
            </div>

            {/* 수업 구분 */}
            <div className="flex flex-col gap-3 text-left">
              <p className="text-m-bold text-text-primary">학생 성별</p>
              <div className="flex gap-2">
                <button className="rounded-lg border border-[#d1d1d1] w-[41px] h-[33px] text-s-medium text-border-secondary-hover">
                  월
                </button>
                <button className="rounded-lg border border-[#d1d1d1] w-[41px] h-[33px] text-s-medium text-border-secondary-hover">
                  화
                </button>
                <button className="rounded-lg border border-[#d1d1d1] w-[41px] h-[33px] text-s-medium text-border-secondary-hover">
                  수
                </button>
                <button className="rounded-lg border border-[#d1d1d1] w-[41px] h-[33px] text-s-medium text-border-secondary-hover">
                  목
                </button>
                <button className="rounded-lg border border-[#d1d1d1] w-[41px] h-[33px] text-s-medium text-border-secondary-hover">
                  금
                </button>
                <button className="rounded-lg border border-[#d1d1d1] w-[41px] h-[33px] text-s-medium text-border-secondary-hover">
                  토
                </button>
                <button className="rounded-lg border border-[#d1d1d1] w-[41px] h-[33px] text-s-medium text-border-secondary-hover">
                  일
                </button>
              </div>
              <div className="flex gap-2">
                <button className="rounded-lg border border-[#d1d1d1] w-[61px] h-[33px] text-s-medium text-border-secondary-hover">
                  휴원
                </button>
                <button className="rounded-lg border border-[#d1d1d1] w-[61px] h-[33px] text-s-medium text-border-secondary-hover">
                  퇴원
                </button>
              </div>
            </div>
          </div>

          <button className="w-full h-[54px] bg-bg-tertiary text-[#f1f8f3] rounded-2xl text-l-semibold">
            필터 적용
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomDrawer;
