import { createBook } from '@/api/AttendanceBookApiClient'
import { CreateBookRequest } from '@/api/AttendanceBookSchema'
import { getSubjectItems, getSubjects } from '@/api/CourseApiClient'
import { bookKeys } from '@/queryKeys'
import { handleError } from '@/utils/handleError'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export const useSubjects = () => {
  return useQuery({
    queryKey: bookKeys.subjects().queryKey,
    queryFn: async () =>
      await getSubjects().then((res) => {
        if (res.status === 200) return res.data
      }),
  })
}

export const useSubjectItems = ({ subjectId }: { subjectId: number }) => {
  return useQuery({
    ...bookKeys.subjectCourses(subjectId),
    enabled: !!subjectId,
    queryKey: bookKeys.subjectCourses(subjectId).queryKey,
    queryFn: async () =>
      await getSubjectItems({ subjectId: String(subjectId) }).then((res) => {
        if (res.status === 200) {
          return res.data
        }
      }),
  })
}

export const useBookCreate = () => {
  const navigate = useNavigate()
  const QueryClient = useQueryClient()

  return useMutation({
    mutationFn: async (params: CreateBookRequest) => await createBook(params),
    onSuccess: () => {
      QueryClient.invalidateQueries({
        queryKey: bookKeys.list().queryKey,
      })
      toast.success('출석부를 생성하였습니다.')
      navigate('/book')
    },
    onError: handleError,
  })
}
