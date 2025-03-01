import SEO from "@/components/SEO";
import { useNavigate } from "react-router-dom";
import LoginButton from "./component/LoginButton";
import Hr from "./component/Hr";

export interface LoginDataType {
  username: string;
  password: string;
  isAutoLogin: boolean;
}

export default function SignIn() {
  const navigate = useNavigate();
  return (
    <section className="flex flex-col justify-center items-center h-full gap-8 px-6">
      <SEO
        title="체쿠리 | 로그인"
        content="체쿠리 음악학원 출석부 서비스의 로그인 페이지입니다."
      />
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

      <div className="flex flex-col gap-4">
        <LoginButton
          className={"text-[#FFFFFF] bg-[#59996B]"}
          type="submit"
          onClick={() => navigate("/checkuree-auth/signin")}
        >
          체쿠리 ID로 시작하기
        </LoginButton>
        <Hr />
        <LoginButton
          className="relative bg-[#FEE500]"
          onClick={() => navigate("/kakao-auth/signin")}
        >
          <img
            src="/images/icons/ico-kakao-logo.svg"
            width={18}
            height={18}
            alt="카카오 심볼 로고"
            className="absolute left-4"
          />

          <p className="ml-[30px] font-medium text-[17px]">카카오로 시작하기</p>
        </LoginButton>
      </div>
    </section>
  );
}
