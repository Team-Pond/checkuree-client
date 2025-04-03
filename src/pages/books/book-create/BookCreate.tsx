import { useEffect, useState } from 'react'
import Step1 from './components/Step1'
import Step2 from './components/Step2'
import { twMerge } from 'tailwind-merge'
import { getSubjects } from '@/api/CourseApiClient'

import { FormProvider, useForm } from 'react-hook-form'
import { useBookCreate } from './queries'
import { zodResolver } from '@hookform/resolvers/zod'
import { bookSchema, CreateBookSchema } from './_schema'
import SEO from '@/components/SEO'
import { CourseData } from '@/api/type'
import FormHeader from './components/FormHeader'
import tw from 'tailwind-styled-components'

export default function BookCreate() {
  const [isStep2, setIsStep2] = useState<boolean>(false)

  const handleStep2Change = (state: boolean) => setIsStep2(state)
  const handleCurriculum = (state: boolean) => setIsCurriculum(state)

  const [courseCreateParam, setCourseCreateParams] = useState<CourseData[]>([])
  const [isCurriculum, setIsCurriculum] = useState<boolean>(false)

  const handleCourseChange = (params: CourseData) => {
    setCourseCreateParams([...courseCreateParam, params])
  }

  const methods = useForm<CreateBookSchema>({
    shouldUnregister: false,
    mode: 'onSubmit',
    defaultValues: {
      availableTo: '',
      availableFrom: '',
      availableDays: [],
      title: '',
    },
    // resolver는 폼 제출 시 실행되는 함수를 정의, Promise로 유효성 검사 결과를 반환
    resolver: zodResolver(bookSchema),
  })
  const { getValues, trigger, handleSubmit } = methods

  const { mutate: bookMutation } = useBookCreate()

  const handleNextStep = async () => {
    const isValid = await trigger()
    if (isValid) {
      handleStep2Change(true)
    }
  }

  useEffect(() => {
    const fetchSubjects = async () => {
      await getSubjects()
    }
    fetchSubjects()
  }, [])

  return (
    <FormProvider {...methods}>
      <SEO
        title="체쿠리 | 출석부 등록"
        content="체쿠리 음악학원 출석부 서비스의 출석부 등록 페이지입니다."
      />
      <Form
        onSubmit={handleSubmit(() => {
          courseCreateParam.length > 0 &&
            bookMutation({
              title: getValues('title').trim(),
              imageUrl: JSON.stringify(getValues('imageUrl')),
              availableDays: getValues('availableDays'),
              availableFrom: getValues('availableFrom'),
              availableTo: getValues('availableTo'),
              courses: courseCreateParam,
            })
        })}
      >
        <FormHeader isStep2={isStep2} />
        <FormInner>
          <div className="flex flex-col justify-center gap-6 max-w-[342px] w-full">
            {isStep2 ? (
              <Step2
                handleCourseChange={handleCourseChange}
                courseCreateParam={courseCreateParam}
                handleCurriculum={handleCurriculum}
                isCurriculum={isCurriculum}
              />
            ) : (
              <Step1 />
            )}

            {!isStep2 && (
              <button
                type="button" // submit 대신 버튼 타입을 일반 button으로 변경
                data-cy="stepSubmit"
                aria-label="stepSubmit"
                className={twMerge(
                  'max-w-[341px] w-full h-[54px] flex justify-center items-center rounded-xl bg-bg-tertiary text-[#f1f8f3]',
                )}
                onClick={handleNextStep}
              >
                <p className="font-semibold text-lg">다음으로</p>
              </button>
            )}

            {!isCurriculum && isStep2 && (
              <div className="flex gap-4 w-full">
                <Button
                  onClick={() => handleStep2Change(false)}
                  data-cy="previous-book-create"
                  aria-label="previous-book-create"
                >
                  이전으로
                </Button>
                <Button
                  isSubmit
                  data-cy="submit-book-create"
                  aria-label="submit-book-create"
                >
                  생성하기
                </Button>
              </div>
            )}
          </div>
        </FormInner>
      </Form>
    </FormProvider>
  )
}

const Button = tw.button`${({ isSubmit }: { isSubmit?: boolean }) => (isSubmit ? 'bg-bg-tertiary text-[#F1F8F3]' : 'bg-bg-secondary text-text-secondary')} text-lg font-semibold w-full h-[54px] flex justify-center items-center rounded-2xl `

const Form = tw.form`flex flex-col gap-10 w-full pb-[30px]`
const FormInner = tw.div`w-full flex flex-col gap-10 items-center`
