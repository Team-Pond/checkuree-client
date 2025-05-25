import { z } from 'zod'

export const COURSE_ERROR_MESSAGE = '커리큘럼은 최소 1개 이상이어야 합니다.'
export const bookSchema = z.object({
  title: z.string().min(3, '제목은 최소 3자 이상이어야 합니다.'),
  description: z.string().optional(),
  availableFrom: z.string().nonempty('시작 날짜를 입력하세요.'),
  availableTo: z.string().nonempty('종료 날짜를 입력하세요.'),
  availableDays: z
    .array(
      z.enum([
        'MONDAY',
        'TUESDAY',
        'WEDNESDAY',
        'THURSDAY',
        'FRIDAY',
        'SATURDAY',
        'SUNDAY',
      ]),
    )
    .min(1, '적어도 하나의 요일을 선택해야 합니다.'),
  imageUrl: z.string().optional(),
  courses: z
    .array(
      z.object({
        title: z.string().min(1, '커리큘럼명은 최소 1자 이상이어야 합니다.'),
        isPrimary: z.boolean(),
        grades: z.array(
          z.object({
            subjectItemId: z.number(),
            level: z.number(),
          }),
        ),
      }),
    )
    .min(1, COURSE_ERROR_MESSAGE),
})

export type CreateBookSchema = z.infer<typeof bookSchema>
