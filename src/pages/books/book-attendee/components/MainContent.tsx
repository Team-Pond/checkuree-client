import { GetAttendeeListResponse } from '@/api/AttendeeSchema'
import { getDayGroupFromInput } from '@/utils'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import IconStudent from '@/assets/icons/book-roaster/ico-student.svg?react'
type MainContentProps = {
  roaster: GetAttendeeListResponse
  getGrades: (grades: { id: number; name: string }[]) => string
  searchName: string
}
export default function MainContent(props: MainContentProps) {
  const { roaster, getGrades, searchName } = props
  const { bookId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  return (
    <div className="w-full px-[17px]">
      <p className="text-left text-s-semibold text-text-secondary mb-1">전체</p>
      <div className="border-t border-[#F6F6F6] mb-[92px]">
        {roaster.data.content
          .filter((student) => {
            return !searchName || student.name.includes(searchName)
          })
          .map((student) => (
            <div
              key={student.id}
              className="py-4 px-2 flex gap-4 cursor-pointer"
              onClick={() =>
                navigate(
                  `/book/${bookId}/attendee/${student.id}${
                    location.search
                  }&scheduleDays=${getDayGroupFromInput(
                    Array.from(new Set(student.scheduleDays)),
                  )}&grade=${getGrades(student.grades)}`,
                  { state: { from: location.pathname + location.search } },
                )
              }
            >
              <IconStudent width={40} height={40} className="rounded-full" />
              <div className="gap-1 text-left">
                <div className="flex gap-2">
                  <p className="text-m-bold text-text-primary">
                    {student.name}
                  </p>
                  <p className="text-m-semibold text-text-secondary">
                    {student.age + '세'}
                  </p>
                </div>
                <div className="flex gap-2">
                  <p className="text-text-brand text-s-semibold">
                    {getDayGroupFromInput(
                      Array.from(new Set(student.scheduleDays)),
                    )}
                  </p>
                  <p className="text-[#B0B0B0] text-s-medium">
                    {getGrades(student.grades)}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
