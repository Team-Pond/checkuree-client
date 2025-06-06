import { useState } from 'react'
import Step1 from './_components/Step1'
import Step2 from './_components/Step2'

import { FormProvider, useForm } from 'react-hook-form'
import { useBookCreate } from './queries'
import { zodResolver } from '@hookform/resolvers/zod'
import { bookSchema, CreateBookSchema } from './_schema'
import SEO from '@/components/SEO'

import tw from 'tailwind-styled-components'
import FormHeader from '../_components/FormHeader'
import Button from '@/components/Button'
import { twMerge } from 'tailwind-merge'

enum Step {
  Step1 = 'Step1',
  Step2 = 'Step2',
}

export default function Page() {
  // 스텝 상태
  const [step, setStep] = useState<Step>(Step.Step1)
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

  // 최종 제출 핸들러
  const submit = () => {
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
      <FormHeader isStep2={step === Step.Step2} text="출석부 등록" />
      <Form onSubmit={handleSubmit(submit)}>
        {step === Step.Step1 ? (
          <StepForm>
            <Step1 />
            <Button
              data-cy="stepSubmit"
              aria-label="stepSubmit"
              className={twMerge(
                'bg-bg-tertiary text-white',
                'text-lg font-semibold w-full h-[54px] flex justify-center items-center rounded-2xl',
              )}
              onClick={async () => {
                const ok = await trigger([
                  'availableDays',
                  'availableFrom',
                  'availableTo',
                  'title',
                ])
                if (ok) setStep(Step.Step2)
              }}
              label="다음으로"
            />
          </StepForm>
        ) : (
          <StepForm>
            <Step2
              isCurriculum={isCurriculum}
              handleCurriculum={(state) => setIsCurriculum(state)}
            />
            <div className="flex gap-4 w-full">
              <Button
                onClick={() => setStep(Step.Step1)}
                data-cy="previous-book-create"
                aria-label="previous-book-create"
                className={twMerge(
                  'bg-bg-secondary text-text-secondary',
                  'text-lg font-semibold w-full h-[54px] flex justify-center items-center rounded-2xl',
                )}
                label="이전으로"
              />
              <Button
                type="submit"
                data-cy="submit-book-create"
                aria-label="submit-book-create"
                className={twMerge(
                  'bg-bg-tertiary text-white',
                  'text-lg font-semibold w-full h-[54px] flex justify-center items-center rounded-2xl',
                )}
                label="생성하기"
              />
            </div>
          </StepForm>
        )}
      </Form>
    </FormProvider>
  )
}

const Form = tw.form`
  flex flex-col w-full gap-6 items-center justify-center mx-auto px-4 mt-10 pb-[30px]
`
const StepForm = tw.div`flex flex-col justify-center gap-6 w-full px-2`
