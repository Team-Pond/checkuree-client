import { BookType } from '@/context/BookContext'
import { formatTimeRange, getDayGroupFromInput } from '@/utils'

interface MainContentProps {
  bookList: BookType[]
  handleNavigation: (bookData: BookType) => void
}
export default function MainContent({
  bookList,
  handleNavigation,
}: MainContentProps) {
  return (
    <div className=" bg-bg-secondary w-full h-full">
      <div className="w-full py-5 grid grid-cols-2 gap-y-6 gap-x-4 justify-items-stretch mx-auto">
        {bookList.map((attendance, index) => {
          return (
            <Book
              key={attendance.id}
              attendance={attendance}
              index={index}
              handleNavigation={handleNavigation}
            />
          )
        })}
      </div>
    </div>
  )
}

function Book({
  attendance,
  index,
  handleNavigation,
}: {
  attendance: BookType
  index: number
  handleNavigation: (bookData: BookType) => void
}) {
  return (
    <div
      key={attendance.id}
      data-cy={`book-${index}`}
      aria-label={`book-${index}`}
      className={`max-w-[162px] cursor-pointer w-full h-[195px] ${index % 2 === 1 ? 'justify-self-start' : 'justify-self-end'}`}
      onClick={() => {
        handleNavigation({
          id: attendance.id,
          title: attendance.title,
          attendeeCount: attendance.attendeeCount,
          availableDays: attendance.availableDays,
          availableFrom: attendance.availableFrom,
          availableTo: attendance.availableTo,
        })
      }}
    >
      <img
        src={'/images/img-test.png'}
        className="w-full h-[97px] rounded-t-2xl"
        alt=""
      />
      <div className="flex flex-col gap-2 px-3 py-4 text-left rounded-b-2xl h-[98px] bg-white">
        <div className="flex gap-2">
          <p className="font-bold leading-5 text-text-primary max-w-[119px] truncate">
            {attendance.title}
          </p>
          <p className="font-semibold leading-5 text-text-secondary">
            {attendance.attendeeCount}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-text-brand font-bold text-sm leading-4">
            {getDayGroupFromInput(attendance.availableDays)}
          </p>
          <p className="text-text-secondary font-medium text-sm leading-4">
            {formatTimeRange('1200', '2000')}
          </p>
        </div>
      </div>
    </div>
  )
}
