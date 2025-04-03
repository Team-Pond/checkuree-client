import { Book } from '@/context/BookContext'
import { formatTimeRange, getDayGroupFromInput } from '@/utils'

interface IProps {
  bookList: Book[]
  handleNavigation: (bookData: Book) => void
}
export default function MainContent({ bookList, handleNavigation }: IProps) {
  return (
    <div className="flex-1 bg-bg-secondary flex flex-col items-center">
      <div className="w-full max-w-[340px]  border-spacing-0 py-5 grid grid-cols-2  gap-y-6 gap-x-4 ">
        {bookList.map((attendance, index) => {
          return (
            <div
              key={attendance.id}
              data-cy={`book-${index}`}
              aria-label={`book-${index}`}
              className="max-w-[162px] w-full"
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
                  <p className="font-bold text-text-primary max-w-[119px] truncate">
                    {attendance.title}
                  </p>
                  <p className="font-semibold text-text-secondary">
                    {attendance.attendeeCount}
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-text-brand font-bold text-sm">
                    {getDayGroupFromInput(attendance.availableDays)}
                  </p>
                  <p className="text-text-secondary font-medium text-sm">
                    {formatTimeRange('1200', '2000')}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
