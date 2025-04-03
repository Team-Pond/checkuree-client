import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import Step1 from './components/Step1'
import { useState } from 'react'
import Step2 from './components/Step2'
import { getTodayYYYYMMDD } from '@/utils'
import { FormProvider, useForm } from 'react-hook-form'
import { AttendeeSchema, CreateAttendeeSchema } from './_schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { createAttendee } from '@/api/AttendeeApiClient'
import toast from 'react-hot-toast'
import SEO from '@/components/SEO'
import FormHeader from './components/FormHeader'
import tw from 'tailwind-styled-components'

export default function AttendeeCreate() {
  const navigate = useNavigate()
  const location = useLocation()
  const { bookId } = useParams()

  const [isStep2, setIsStep2] = useState<boolean>(false)

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

  const handleStep1Next = async () => {
    const isValid = await trigger('attendeeRequest')
    if (isValid) {
      setIsStep2(true)
    }
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
          navigate(`/book/${bookId}/attendee${location.search}`)
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
      <Form onSubmit={handleSubmit(handleStep2Next)}>
        <FormHeader isStep2={isStep2} />
        <FormInner>
          {isStep2 ? (
            <Step2
              onChangeGrade={onChangeGrade}
              attendanceBookId={Number(bookId)}
            />
          ) : (
            <Step1 />
          )}
          {isStep2 ? (
            <div className="flex gap-4 w-full">
              <button
                type="button"
                onClick={() => {
                  setIsStep2(false)
                }}
                className="w-full h-[54px] flex justify-center items-center rounded-2xl bg-bg-secondary text-text-secondary text-l-semibold"
              >
                이전으로
              </button>
              <button
                type="submit"
                className="w-full h-[54px] flex justify-center items-center rounded-2xl bg-bg-tertiary text-[#F1F8F3] text-l-semibold"
              >
                생성하기
              </button>
            </div>
          ) : (
            <button
              type="button"
              className={twMerge(
                'max-w-[341px] w-full h-[54px] flex justify-center items-center rounded-xl',
                'bg-bg-tertiary text-[#f1f8f3]',
              )}
              onClick={handleStep1Next}
            >
              <p className="font-semibold text-lg">다음으로</p>
            </button>
          )}
        </FormInner>
      </Form>
    </FormProvider>
  )
}

const Form = tw.form`flex flex-col gap-10 w-full pb-[30px]`
const FormInner = tw.form`flex flex-col w-full mx-auto justify-center items-center gap-6 max-w-[342px]`
