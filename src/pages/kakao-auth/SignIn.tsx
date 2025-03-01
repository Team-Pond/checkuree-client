import SEO from "@/components/SEO";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";

export interface LoginDataType {
  username: string;
  password: string;
  isAutoLogin: boolean;
}

export default function KakaoSignIn() {
  const accessToken = Cookies.get("accessToken");
  useEffect(() => {
    if (accessToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    }
  }, []);

  return (
    <section className="relative flex flex-col justify-center items-center h-screen gap-8 px-6 mb-[31px]">
      <SEO
        title="체쿠리 | 카카오 로그인"
        content="체쿠리 음악학원 출석부 서비스의 카카오 로그인 페이지입니다."
      />
      <div className="flex flex-col items-center justify-center gap-12">
        <div className="flex flex-col gap-2">
          <img
            src={"/images/logos/checkuree_logo.svg"}
            width={284}
            height={48}
            alt="로고 이미지"
          />
          <p className="font-medium text-lg text-[#454545]">
            레슨 관리와 통계까지 손쉽게
          </p>
        </div>
        <div className="absolute bottom-0">
          <button
            className="relative flex items-center justify-center w-[342px] h-[52px] rounded-xl bg-[#FEE500]"
            onClick={() =>
              (window.location.href =
                "https://dev.checkuree.com/oauth2/authorization/kakao")
            }
          >
            <img
              src="/images/icons/ico-kakao-logo.svg"
              width={18}
              height={18}
              alt="카카오 심볼 로고"
              className="absolute left-4"
            />

            {/* font 적용 */}
            <p className="ml-[30px] font-medium text-[17px]">
              카카오로 시작하기
            </p>
          </button>
        </div>
      </div>
    </section>
  );
}
