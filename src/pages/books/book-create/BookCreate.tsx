import { useEffect, useState } from 'react'
import Step1 from './components/Step1'
import Step2 from './components/Step2'
import { getSubjects } from '@/api/CourseApiClient'
import { FormProvider, useForm } from 'react-hook-form'
import { useBookCreate } from './queries'
import { zodResolver } from '@hookform/resolvers/zod'
import { bookSchema, CreateBookSchema } from './_schema'
import SEO from '@/components/SEO'
import FormHeader from './components/FormHeader'
import tw from 'tailwind-styled-components'
import { useFunnel } from '@use-funnel/react-router-dom'
import { Context } from './useFunnel/context'

// 각 단계의 컨텍스트 타입 정의 (앞서 정의한 타입 활용 가능)
type FunnelContext = {
  Step1: Context
  Step2: Context & {
    courses?: CreateBookSchema['courses']
  }
}

export default function BookCreate() {
  const funnel = useFunnel<FunnelContext>({
    id: 'book-create',
    initial: {
      step: 'Step1',
      context: {
        availableFrom: '',
        availableTo: '',
        availableDays: [],
        title: '',
      },
    },
  })

  const handleCurriculum = (state: boolean) => setIsCurriculum(state)

  const [isCurriculum, setIsCurriculum] = useState<boolean>(false)

  const methods = useForm<CreateBookSchema>({
    shouldUnregister: false,
    mode: 'onChange',
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
    const isValid = await trigger([
      'availableDays',
      'availableFrom',
      'availableTo',
      'title',
    ])
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
          bookMutation({
            title: getValues('title').trim(),
            imageUrl: JSON.stringify(getValues('imageUrl')),
            availableDays: getValues('availableDays'),
            availableFrom: getValues('availableFrom'),
            availableTo: getValues('availableTo'),
            courses: getValues('courses'),
          })
        })}
      >
        <FormHeader isStep2={funnel.step === 'Step2'} />

        <FormInner>
          <funnel.Render
            Step1={({ history }) => (
              <>
                <Step1 />
                <Button
                  type="button" // submit 대신 버튼 타입을 일반 button으로 변경
                  data-cy="stepSubmit"
                  aria-label="stepSubmit"
                  issubmit
                  onClick={async () =>
                    (await trigger([
                      'availableDays',
                      'availableFrom',
                      'availableTo',
                      'title',
                    ])) && history.push('Step2', getValues())
                  }
                >
                  다음으로
                </Button>
              </>
            )}
            Step2={({ history }) => (
              <>
                <Step2
                  handleCurriculum={handleCurriculum}
                  isCurriculum={isCurriculum}
                />
                <div className="flex gap-4 w-full">
                  <Button
                    onClick={() => history.back()}
                    data-cy="previous-book-create"
                    aria-label="previous-book-create"
                  >
                    이전으로
                  </Button>
                  <Button
                    issubmit
                    data-cy="submit-book-create"
                    aria-label="submit-book-create"
                  >
                    생성하기
                  </Button>
                </div>
              </>
            )}
          />
        </FormInner>
      </Form>
    </FormProvider>
  )
}

const Button = tw.button`${({ issubmit }: { issubmit?: boolean }) => (issubmit ? 'bg-bg-tertiary text-[#F1F8F3]' : 'bg-bg-secondary text-text-secondary')} text-lg font-semibold w-full h-[54px] flex justify-center items-center rounded-2xl `

const Form = tw.form`flex flex-col gap-10 w-full pb-[30px] `
const FormInner = tw.div`w-full flex flex-col gap-6 items-center max-w-[342px] justify-center mx-auto`
