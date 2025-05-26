import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Step1 from './_components/Step1'
import Step2 from './_components/Step2'
import { getTodayYYYYMMDD } from '@/utils'
import { FormProvider, useForm } from 'react-hook-form'
import { AttendeeSchema, CreateAttendeeSchema } from './_schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { createAttendee } from '@/api/AttendeeApiClient'
import toast from 'react-hot-toast'
import SEO from '@/components/SEO'
import FormHeader from './_components/FormHeader'
import tw from 'tailwind-styled-components'
import { useFunnel } from '@use-funnel/react-router-dom'

type FunnelContext = {
  Step1: {}
  Step2: {}
}
export default function Page() {
  const funnel = useFunnel<FunnelContext>({
    id: 'attendee-create',
    initial: {
      step: 'Step1',
      context: {},
    },
  })

  const navigate = useNavigate()
  const location = useLocation()
  const { bookId } = useParams()

  const methods = useForm<CreateAttendeeSchema>({
    resolver: zodResolver(AttendeeSchema),
    mode: 'onSubmit',
  })

  const { trigger, setValue, handleSubmit } = methods

  const onChangeGrade = (gradeId: number) => {
    setValue('progressRequest.progresses', [
      { gradeId: gradeId, startAt: getTodayYYYYMMDD() },
    ])
  }

  const handleStep2Next = async (data: CreateAttendeeSchema) => {
    const isValid = await trigger('attendeeRequest')
    if (isValid) {
      const { associates, ...attendeeRequestWithoutAssociates } =
        data.attendeeRequest

      // any로 단언하여 타입 오류를 회피합니다.
      const attendeeRequestPayload = {
        ...attendeeRequestWithoutAssociates,
        actualName: data.attendeeRequest.name,
      } as any

      if (
        associates &&
        associates[0] &&
        associates[0].relationType !== 'NONE'
      ) {
        attendeeRequestPayload.associates = [
          {
            relationType: associates[0].relationType,
            phoneNumber: associates[0].phoneNumber,
          },
        ]
      }

      await createAttendee({
        attendanceBookId: Number(bookId),
        params: {
          ...data,
          attendeeRequest: attendeeRequestPayload,
        },
      })
        .then(() => {
          toast.success(`${data.attendeeRequest.name} 학생이 등록되었습니다.`)

          navigate({
            pathname: `/book/${bookId}`,
          })
        })
        .catch((err) => {
          toast.error(err.response.data.message)
        })
    }
  }

  return (
    <FormProvider {...methods}>
      <SEO
        title="체쿠리 | 학생 등록"
        content="체쿠리 음악학원 출석부 서비스의 학생 등록 페이지입니다."
      />
      <Form
      // onSubmit={handleSubmit(handleStep2Next)}
      >
        <FormHeader isStep2={funnel.step === 'Step2'} />
        <FormInner>
          <funnel.Render
            Step1={({ history }) => (
              <>
                <Step1 />
                <Button
                  issubmit
                  type="button"
                  onClick={async () =>
                    (await trigger('attendeeRequest')) &&
                    history.push('Step2', {})
                  }
                  data-cy="stepSubmit"
                  aria-label="stepSubmit"
                >
                  <p className="font-semibold text-lg">다음으로</p>
                </Button>
              </>
            )}
            Step2={({ history }) => (
              <>
                <Step2
                  onChangeGrade={onChangeGrade}
                  attendanceBookId={Number(bookId)}
                />
                <div className="flex gap-4 w-full">
                  <Button
                    type="button"
                    onClick={() => history.back()}
                    data-cy="previous-book-create"
                    aria-label="previous-book-create"
                  >
                    이전으로
                  </Button>
                  <Button
                    type="submit"
                    issubmit
                    data-cy="submit-attendee-create"
                    aria-label="submit-attendee-create"
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

const Form = tw.form`flex flex-col gap-10 w-full pb-[30px]`
const FormInner = tw.div`flex flex-col w-full mx-auto justify-center items-center gap-6 max-w-[342px]`
const Button = tw.button`${({ issubmit }: { issubmit?: boolean }) => (issubmit ? 'bg-bg-tertiary text-[#F1F8F3]' : 'bg-bg-secondary text-text-secondary')} text-lg font-semibold w-full h-[54px] flex justify-center items-center rounded-2xl `
