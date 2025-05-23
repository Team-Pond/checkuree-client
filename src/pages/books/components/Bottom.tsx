import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

import BookActiveIcon from '@/assets/icons/book-check/ico-book-active.svg?react'
import BookIcon from '@/assets/icons/book-check/ico-book.svg?react'
import RoasterActiveIcon from '@/assets/icons/book-check/ico-roaster-active.svg?react'
import RoasterIcon from '@/assets/icons/book-check/ico-roaster.svg?react'
import StatisticsActiveIcon from '@/assets/icons/book-check/ico-statistics-active.svg?react'
import StatisticsIcon from '@/assets/icons/book-check/ico-statistics.svg?react'
import tw from 'tailwind-styled-components'

export default function Bottom() {
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
    <div
      className="flex justify-between px-[44px] items-center fixed bottom-0 left-1/2 transform -translate-x-1/2 z-40
             w-full max-w-[390px] h-[92px] bg-white rounded-2xl"
    >
      <Button
        data-cy="navigate-check"
        aria-label="navigate-check"
        onClick={() => navigate(`/book/${bookId}${location.search}`)}
      >
        {isBookActive ? <BookActiveIcon width={20} /> : <BookIcon width={20} />}
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
        {isAttendeeActive ? (
          <RoasterActiveIcon width={20} />
        ) : (
          <RoasterIcon width={20} />
        )}
        <p
          className={twMerge(
            'text-xs ',
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
        {isDashBoardActive ? (
          <StatisticsActiveIcon width={20} />
        ) : (
          <StatisticsIcon width={20} />
        )}
        <p
          className={twMerge(
            'text-xs',
            isDashBoardActive ? 'text-text-primary' : 'text-text-tertiary',
          )}
        >
          통계
        </p>
      </Button>
    </div>
  )
}

const Button = tw.div`flex flex-col gap-2 items-center cursor-pointer`
