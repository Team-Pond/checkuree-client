import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

import BookActiveIcon from '@/assets/icons/bottom-menu/ico-book-active.svg?react'
import BookIcon from '@/assets/icons/bottom-menu/ico-book.svg?react'
import AttendeeIconActive from '@/assets/icons/bottom-menu/ico-attendee-active.svg?react'
import ActtendeeIcon from '@/assets/icons/bottom-menu/ico-attendee.svg?react'
import DashboardIconActive from '@/assets/icons/book-check/ico-statistics-active.svg?react'
import Dashboardicon from '@/assets/icons/book-check/ico-statistics.svg?react'
import tw from 'tailwind-styled-components'

export default function Footer() {
  const location = useLocation()
  const attendeeUrl = location.pathname.includes('attendee')

  const bookUrl = location.pathname.split('/')[1]
  const dashBoardUrl = location.pathname.includes('dashboard')
  const navigate = useNavigate()
  const { bookId } = useParams()

  const isBookActive = !!bookUrl && !dashBoardUrl && !attendeeUrl
  const isAttendeeActive = !!attendeeUrl
  const isDashBoardActive = !!dashBoardUrl

  return (
    <BottomContainer>
      <Button
        data-cy="navigate-check"
        aria-label="navigate-check"
        onClick={() => navigate(`/book/${bookId}${location.search}`)}
      >
        {isBookActive ? <BookActiveIcon /> : <BookIcon />}
        <p
          className={twMerge(
            'text-xs ',
            isBookActive ? 'text-text-primary' : 'text-text-tertiary',
          )}
        >
          출석부
        </p>
      </Button>
      <Button
        data-cy="navigate-attendee"
        aria-label="navigate-attendee"
        onClick={() => navigate(`/book/${bookId}/attendee${location.search}`)}
      >
        {isAttendeeActive ? <AttendeeIconActive /> : <ActtendeeIcon />}
        <p
          className={twMerge(
            'text-xs',
            isAttendeeActive ? 'text-text-primary' : 'text-text-tertiary',
          )}
        >
          명단
        </p>
      </Button>
      <Button
        data-cy="navigate-statistics"
        aria-label="navigate-statistics"
        onClick={() => navigate(`/book/${bookId}/dashboard${location.search}`)}
      >
        {isDashBoardActive ? <DashboardIconActive /> : <Dashboardicon />}
        <p
          className={twMerge(
            'text-xs',
            isDashBoardActive ? 'text-text-primary' : 'text-text-tertiary',
          )}
        >
          통계
        </p>
      </Button>
    </BottomContainer>
  )
}

const Button = tw.div`flex flex-col gap-2 items-center cursor-pointer`
const BottomContainer = tw.div`border-[#f6f6f6] border-t-[1px] border-x-[1px] flex justify-between px-[44px] items-center fixed bottom-0 left-1/2 transform -translate-x-1/2 z-40
             w-full max-w-[430px] h-[92px] bg-white rounded-t-2xl`
