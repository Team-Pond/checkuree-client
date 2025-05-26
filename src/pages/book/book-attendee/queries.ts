import { DaysType, GenderType } from '@/api/type'
import { attendeeKeys } from '@/queryKeys'
import { useQuery } from '@tanstack/react-query'

export const useAttendeeList = ({
  bookId,
  dayArrays,
  gender,
  age,
}: {
  bookId: number
  dayArrays: DaysType[]
  gender: GenderType
  age: { min: number; max: number }
}) => useQuery(attendeeKeys.list(bookId, dayArrays, gender, age))
