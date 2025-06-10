import { Link } from 'react-router-dom'
import tw from 'tailwind-styled-components'

const NOT_FOUND_MESSAGE = {
  heading: '해당 페이지를 찾을 수 없습니다.',
  instruction: '출석부로 돌아가시려면',
}
const CLICK_PROMPT = '를 눌러주세요!'

const NotFound = () => {
  return (
    <Section>
      <img
        src="/images/icons/book-roaster/ico-error-frog.svg"
        alt=" 아이콘"
        width={70}
        height={70}
        className="mb-4"
      />

      <MessageContainer>
        <p>{NOT_FOUND_MESSAGE.heading}</p>
        <p>
          {NOT_FOUND_MESSAGE.instruction}&nbsp;
          <Link
            to="/auth/signin"
            className="font-semibold text-bg-tertiary underline"
          >
            여기
          </Link>
          {CLICK_PROMPT}
        </p>
      </MessageContainer>
    </Section>
  )
}

export default NotFound

const Section = tw.section`w-[393px] flex flex-col gap-5 items-center justify-center h-full`
const MessageContainer = tw.section`text-center mb-12 font-appleLiGothic font-semibold`
