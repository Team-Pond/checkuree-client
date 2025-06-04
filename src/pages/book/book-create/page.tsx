import { useEffect, useState } from 'react'
import Step1 from './_components/Step1'
import Step2 from './_components/Step2'
import { getSubjects } from '@/api/CourseApiClient'
import { FormProvider, useForm } from 'react-hook-form'
import { useBookCreate } from './queries'
import { zodResolver } from '@hookform/resolvers/zod'
import { bookSchema, CreateBookSchema } from './_schema'
import SEO from '@/components/SEO'

import tw from 'tailwind-styled-components'
import FormHeader from '../_components/FormHeader'

export default function Page() {
  // 스텝 상태
  const [step, setStep] = useState<'Step1' | 'Step2'>('Step1')
  // 커리큘럼 옵션 상태
  const [isCurriculum, setIsCurriculum] = useState(false)

  const methods = useForm<CreateBookSchema>({
    shouldUnregister: false,
    mode: 'onChange',
    defaultValues: {
      availableFrom: '',
      availableTo: '',
      availableDays: [],
      title: '',
      courses: [],
    },
    resolver: zodResolver(bookSchema),
  })
  const { getValues, trigger, handleSubmit } = methods
  const { mutate: bookMutation } = useBookCreate()

  // 과목 목록 미리 로드
  useEffect(() => {
    getSubjects().catch(() => {
      // 실패 시 로깅이나 예외 처리
    })
  }, [])

  // 최종 제출 핸들러
  const onSubmit = () => {
    const values = getValues()
    bookMutation({
      title: values.title.trim(),
      imageUrl: JSON.stringify(values.imageUrl),
      availableDays: values.availableDays,
      availableFrom: values.availableFrom,
      availableTo: values.availableTo,
      courses: values.courses,
    })
  }

  return (
    <FormProvider {...methods}>
      <SEO
        title="체쿠리 | 출석부 등록"
        content="체쿠리 음악학원 출석부 서비스의 출석부 등록 페이지입니다."
      />
      <FormHeader isStep2={step === 'Step2'} text="출석부 등록" />
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="px-[17px] mt-10 pb-[30px]"
      >
        {/* 헤더에서 스텝 표시 */}

        <FormInner>
          {step === 'Step1' ? (
            <>
              <Step1 />
              <Button
                type="button"
                data-cy="stepSubmit"
                aria-label="stepSubmit"
                className="bg-bg-tertiary text-white"
                onClick={async () => {
                  // 1단계 필수 필드 검증 후 2단계로
                  const ok = await trigger([
                    'availableDays',
                    'availableFrom',
                    'availableTo',
                    'title',
                  ])
                  if (ok) setStep('Step2')
                }}
              >
                다음으로
              </Button>
            </>
          ) : (
            <>
              <Step2
                isCurriculum={isCurriculum}
                handleCurriculum={(state) => setIsCurriculum(state)}
              />
              <div className="flex gap-4 w-full">
                <Button
                  type="button"
                  onClick={() => setStep('Step1')}
                  data-cy="previous-book-create"
                  aria-label="previous-book-create"
                >
                  이전으로
                </Button>
                <Button
                  type="submit"
                  data-cy="submit-book-create"
                  aria-label="submit-book-create"
                  className="bg-bg-tertiary text-white"
                >
                  생성하기
                </Button>
              </div>
            </>
          )}
        </FormInner>
      </Form>
    </FormProvider>
  )
}

const Button = tw.button`
  bg-bg-secondary text-text-secondary
  text-lg font-semibold
  w-full h-[54px]
  flex justify-center items-center
  rounded-2xl
`

const Form = tw.form`
  flex flex-col gap-10 w-full
`

const FormInner = tw.div`
  w-full flex flex-col gap-6
  items-center justify-center mx-auto px-[7px]
`
