import { CoursesResponse } from '@/api/AttendanceBookSchema'

import DownArrowIcon from '@/assets/icons/ico-arrow-down.svg?react'
import { NextProgressFormData } from '@/store/progressStore'
export default function NextProgressSelect({
  bookCourses,
  nextGradeId,
  updateFormData,
}: {
  bookCourses: CoursesResponse | undefined
  nextGradeId: string
  updateFormData: (key: keyof NextProgressFormData, value: string) => void
}) {
  return (
    <div className="relative">
      <select
        value={nextGradeId}
        onChange={(e) => updateFormData('nextGradeId', e.target.value)}
        className=" outline-none bg-white border border-[#E7E7E7] rounded-xl w-full h-12 px-4 text-m-medium appearance-none"
      >
        <option value="">과정을 선택하세요</option>

        {(bookCourses?.courses.flatMap((course) => course.grades) || []).map(
          (grade) => (
            <option key={grade.id} value={grade.id}>
              {grade.title}
            </option>
          ),
        )}
      </select>
      <DownArrowIcon
        className="pointer-events-none absolute inset-y-0 right-0 top-1/2 -translate-y-1/2"
        color="#5d5d5d"
      />
    </div>
  )
}
