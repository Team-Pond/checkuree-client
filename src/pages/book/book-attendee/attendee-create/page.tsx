import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import Step1 from './_components/Step1'
import Step2 from './_components/Step2'
import { getTodayYYYYMMDD } from '@/utils'
import { FormProvider, useForm } from 'react-hook-form'
import {
  AttendeeRequestSchema,
  AttendeeSchema,
  CreateAttendeeSchema,
} from './_schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { createAttendee } from '@/api/AttendeeApiClient'
import toast from 'react-hot-toast'
import SEO from '@/components/SEO'

import tw from 'tailwind-styled-components'
import { z } from 'zod'
import FormHeader from '../../_components/FormHeader'

export default function Page() {
  const navigate = useNavigate()
  const { bookId } = useParams<{ bookId: string }>()
  const [step, setStep] = useState<'Step1' | 'Step2'>('Step1')

  const queryString = useLocation().search

  const methods = useForm<CreateAttendeeSchema>({
    resolver: zodResolver(AttendeeSchema),
    mode: 'onSubmit',
  })

  const { trigger, setValue, handleSubmit } = methods

  const onChangeGrade = (gradeId: number) => {
    setValue('progressRequest.progresses', [
      { gradeId, startAt: getTodayYYYYMMDD() },
    ])
  }

  const formattedHhmm = (hhmm: string): string => {
    const [hour, minute] = hhmm.split(':')
    return `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`
  }

  const nextStep = async () => {
    if (await trigger('attendeeRequest')) {
      setStep('Step2')
    }
  }
  const submit = async (data: CreateAttendeeSchema) => {
    const isValid = await trigger('attendeeRequest')
    if (isValid) {
      const { associates, ...attendeeRequestWithoutAssociates } =
        data.attendeeRequest

      const { schedules } = data.schedulesRequest

      // any로 단언하여 타입 오류를 회피합니다.
      const attendeeRequestPayload = {
        ...attendeeRequestWithoutAssociates,
        birthDate: attendeeRequestWithoutAssociates.birthDate.replaceAll(
          '.',
          '-',
        ),
        enrollmentDate:
          attendeeRequestWithoutAssociates.enrollmentDate.replaceAll('.', '-'),
        actualName: data.attendeeRequest.name,
      } as z.infer<typeof AttendeeRequestSchema>

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
          schedulesRequest: {
            schedules: schedules.map((schedule) => ({
              day: schedule.day,
              hhmm: formattedHhmm(schedule.hhmm),
            })),
          },
          attendeeRequest: attendeeRequestPayload,
        },
      })
        .then(() => {
          toast.success(`${data.attendeeRequest.name} 학생이 등록되었습니다.`)
          navigate(`/book/${bookId}/attendee${queryString}`)
        })
        .catch((err) => {
          toast.error(err.response.data.description)
        })
    }
  }

  return (
    <FormProvider {...methods}>
      <SEO
        title="체쿠리 | 학생 등록"
        content="체쿠리 음악학원 출석부 서비스의 학생 등록 페이지입니다."
      />
      <FormHeader isStep2={step === 'Step2'} text="학생 등록" />
      <Form
        onSubmit={handleSubmit(submit)}
        className="mt-10 px-[17px] pb-[30px]"
      >
        <FormInner>
          {step === 'Step1' ? (
            <>
              <Step1 />
              <Button
                type="button"
                className="bg-bg-tertiary text-[#F1F8F3]"
                onClick={nextStep}
                data-cy="stepSubmit"
                aria-label="stepSubmit"
              >
                <p className="font-semibold text-lg">다음으로</p>
              </Button>
            </>
          ) : (
            <>
              <Step2
                onChangeGrade={onChangeGrade}
                attendanceBookId={Number(bookId)}
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
                  issubmit
                  data-cy="submit-attendee-create"
                  aria-label="submit-attendee-create"
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

const Form = tw.form`flex flex-col gap-10 w-full`
const FormInner = tw.div`flex flex-col w-full mx-auto justify-center items-center gap-6`
const Button = tw.button`${({ issubmit }: { issubmit?: boolean }) =>
  issubmit
    ? 'bg-bg-tertiary text-[#F1F8F3]'
    : 'bg-bg-secondary text-text-secondary'} text-lg font-semibold w-full h-[54px] flex justify-center items-center rounded-2xl `
