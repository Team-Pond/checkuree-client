import SEO from '@/components/SEO'
import { useNavigate } from 'react-router-dom'
import LoginButton from './_component/LoginButton'
import Hr from './_component/Hr'
import HeaderBanner from './_component/HeaderBanner'

export interface LoginDataType {
  username: string
  password: string
  isAutoLogin: boolean
}

export default function Page() {
  const navigate = useNavigate()
  return (
    <section className="flex flex-col justify-center items-center h-full gap-8 ">
      <SEO
        title="체쿠리 | 음악 학원 출석부 서비스"
        content="체쿠리의 로그인 페이지입니다."
      />
      <HeaderBanner />
      <div className="flex flex-col gap-4">
        <LoginButton
          className={'text-[#FFFFFF] bg-[#59996B]'}
          type="submit"
          onClick={() => navigate('/checkuree-auth/signin')}
        >
          체쿠리 ID로 시작하기
        </LoginButton>
        <Hr />
        <LoginButton
          className="relative bg-[#FEE500]"
          onClick={() => navigate('/auth/login')}
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
  )
}
