import Select from '@/components/Select'
import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { CreateAttendeeSchema } from '../_schema'
import { twMerge } from 'tailwind-merge'
import { RelationType } from '@/api/type'
import Radio from '@/components/Radio'
import CheckBox from '@/components/CheckBox'
import tw from 'tailwind-styled-components'
import FieldHeader from '../../../components/FieldTitle'
import { relationTypeToKor } from '@/utils/enumMapper'
import { spaceBlockKeyDown } from '@/utils'

export default function Step1() {
  const handleDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    parameter: 'attendeeRequest.birthDate' | 'attendeeRequest.enrollmentDate',
  ) => {
    let input = e.target.value.replace(/\D/g, '') // 숫자 이외 제거

    if (input.length > 8) {
      input = input.slice(0, 8)
    }

    if (input.length >= 5) {
      input = input.slice(0, 4) + '.' + input.slice(4)
    }

    if (input.length >= 8) {
      input = input.slice(0, 7) + '.' + input.slice(7)
    }

    if (input.length >= 4) {
      const year = parseInt(input.slice(0, 4))
      const convertedYear = Math.min(
        Math.max(year, 1900),
        new Date().getFullYear() + 1,
      ) // 내년에 입학할 수도 있으니 최대 + 1 까지는 가능하도록
      input = convertedYear + input.slice(4)
    }

    if (input.length >= 7) {
      const month = parseInt(input.slice(5, 7))
      const convertedMonth = Math.min(Math.max(month, 1), 12)
      input =
        input.slice(0, 5) +
        String(convertedMonth).padStart(2, '0') +
        input.slice(7)
    }

    if (input.length >= 10) {
      const day = parseInt(input.slice(8, 10))
      const convertedDay = Math.min(Math.max(day, 1), 31)
      input = input.slice(0, 8) + String(convertedDay).padStart(2, '0')
    }

    setValue(parameter, input.replaceAll('.', '-'))
  }

  const {
    setFocus,
    setValue,
    getValues,
    register,
    watch,
    formState: { errors },
  } = useFormContext<CreateAttendeeSchema>()

  // getValue를 사용하면 렌더링이 안되어 성별 선택을 실시간으로 볼 수 없기 때문에 watch 함수를 사용
  const gender = watch('attendeeRequest.gender')
  const associate = watch('attendeeRequest.associates')
  const today = new Date()
  const yyyy = today.getFullYear()
  const mm = String(today.getMonth() + 1).padStart(2, '0')
  const dd = String(today.getDate()).padStart(2, '0')
  const formattedDate = `${yyyy}.${mm}.${dd}`

  useEffect(() => {
    setFocus('attendeeRequest.name')
  }, [setFocus])

  return (
    <Step1Form>
      {/* 학생 이름 */}
      <FieldWrapper>
        <FieldHeader title="학생 이름" essential />
        <div className="flex flex-col gap-[1px] w-full text-left">
          <input
            data-cy="name-input"
            aria-label="name-input"
            type="text"
            placeholder="학생 이름"
            {...register('attendeeRequest.name')}
            className="max-w-[342px] bg-white w-full h-12 border border-[#E7E7E7] rounded-xl p-4 outline-none text-m-medium text-text-secondary"
            onKeyDown={spaceBlockKeyDown}
          />
          {errors?.attendeeRequest?.name && (
            <p className="text-red-500 text-xs mt-1">
              {errors.attendeeRequest.name.message}
            </p>
          )}
        </div>
      </FieldWrapper>
      {/* 학생 생년월일/성별 */}
      <FieldWrapper>
        <FieldHeader title="학생 생년월일/성별" essential />
        <div className="flex flex-col gap-[1px] w-full text-left">
          <div className="flex items-center gap-[9px]">
            <input
              type="text"
              data-cy="birth-input"
              aria-label="birth-input"
              {...register('attendeeRequest.birthDate')}
              onChange={(e) => handleDateChange(e, 'attendeeRequest.birthDate')}
              placeholder="YYYY.MM.DD"
              className="outline-none bg-white border border-[#E7E7E7] rounded-xl max-w-[163px] w-full h-12 flex items-center pl-4"
            />
            <div className="flex px-2 max-w-[170px] w-full h-12">
              <div className="flex gap-8">
                <Radio
                  label="남성"
                  onChange={() => setValue('attendeeRequest.gender', 'MALE')}
                  id="gender"
                  ariaLabel="male-radio"
                  checked={gender === 'MALE'}
                />
                <Radio
                  label="여성"
                  onChange={() => setValue('attendeeRequest.gender', 'FEMALE')}
                  id="gender"
                  ariaLabel="female-radio"
                  checked={gender === 'FEMALE'}
                />
              </div>
            </div>
          </div>
          <div>
            {errors.attendeeRequest?.birthDate && (
              <p className="text-red-500 text-xs mt-1">
                {errors.attendeeRequest.birthDate.message}
              </p>
            )}
            {errors.attendeeRequest?.gender && (
              <p className="text-red-500 text-xs mt-1">
                {errors.attendeeRequest.gender.message}
              </p>
            )}
          </div>

          <input type="hidden" {...register('attendeeRequest.gender')} />
        </div>
      </FieldWrapper>

      {/* 학생 입학일 */}
      <FieldWrapper>
        <FieldHeader title="학생 입학일" essential />

        <div className="flex flex-col gap-[1px] w-full text-left">
          <div className="flex items-center gap-[9px]">
            <input
              type="text"
              data-cy="enrolldate-input"
              aria-label="enrolldate-input"
              {...register('attendeeRequest.enrollmentDate')}
              placeholder="YYYY.MM.DD"
              onChange={(e) =>
                handleDateChange(e, 'attendeeRequest.enrollmentDate')
              }
              className="outline-none bg-white border border-[#E7E7E7] rounded-xl max-w-[163px] w-full h-12 flex items-center pl-4"
            />

            <CheckBox
              label="오늘 입학"
              id="admittedToday"
              ariaLabel="today-enroll"
              checked={
                watch('attendeeRequest.enrollmentDate') ===
                formattedDate.replaceAll('.', '-')
              }
              onChange={(e) => {
                if (e.target.checked) {
                  setValue(
                    'attendeeRequest.enrollmentDate',
                    formattedDate.replaceAll('.', '-'),
                  )
                } else {
                  setValue('attendeeRequest.enrollmentDate', '')
                }
              }}
            />
          </div>

          {errors.attendeeRequest?.enrollmentDate && (
            <p className="text-red-500 text-xs mt-1">
              {errors.attendeeRequest.enrollmentDate.message}
            </p>
          )}
        </div>
      </FieldWrapper>
      {/* 가족 연락처 */}
      <FieldWrapper>
        <FieldHeader title="가족 연락처" />
        <div className="flex flex-col gap-[1px] w-full text-left">
          <div className="flex gap-2">
            <Select
              value={
                associate && associate[0]?.relationType
                  ? relationTypeToKor(
                      associate?.[0]?.relationType as RelationType,
                    )
                  : '관계'
              }
              onChange={(value: string) => {
                const currentAssociates = getValues(
                  'attendeeRequest.associates',
                ) || [{ phoneNumber: '', relationType: 'NONE' }]
                setValue('attendeeRequest.associates', [
                  {
                    ...currentAssociates[0],
                    relationType: value as RelationType,
                    phoneNumber:
                      value === 'NONE' ? '' : currentAssociates[0].phoneNumber,
                  },
                ])
              }}
              options={[
                { name: '관계', value: 'NONE' },
                { name: '모', value: 'MOTHER' },
                { name: '부', value: 'FATHER' },
                { name: '형제', value: 'SIBLING' },
                { name: '기타', value: 'OTHER' },
              ]}
              placeholder="관계"
            />
            <input
              type="text"
              value={associate?.[0]?.phoneNumber}
              maxLength={11}
              disabled={
                !associate?.[0]?.relationType ||
                associate[0].relationType === 'NONE'
              }
              onChange={(e) => {
                if (associate?.[0]?.relationType === 'NONE') {
                  setValue('attendeeRequest.associates.0.phoneNumber', '')
                } else {
                  setValue(
                    'attendeeRequest.associates.0.phoneNumber',
                    e.target.value.replace(/[^0-9]/g, ''),
                  )
                }
              }}
              placeholder="01012345678"
              className={twMerge(
                'max-w-[342px] w-full h-12 border border-[#E7E7E7] rounded-xl p-4 outline-none text-m-medium text-text-secondary',
                associate &&
                  associate[0].relationType &&
                  associate[0].relationType !== 'NONE'
                  ? 'bg-white'
                  : 'bg-gray-100',
              )}
            />

            {errors.attendeeRequest?.phoneNumber && (
              <p className="text-red-500 text-xs mt-1">ㅅㄷㄴㅅ</p>
            )}
          </div>
          {errors.attendeeRequest?.associates &&
            errors.attendeeRequest?.associates[0] && (
              <p className="text-red-500 text-xs mt-1">
                {errors.attendeeRequest.associates[0]?.phoneNumber?.message}
              </p>
            )}
        </div>
      </FieldWrapper>
      {/* 학생 주소 */}
      <FieldWrapper>
        <FieldHeader title="학생 주소" />
        <div className="flex flex-col gap-[1px] w-full text-left">
          <input
            type="text"
            placeholder="학생 주소"
            {...register('attendeeRequest.address_1')}
            className="max-w-[342px] bg-white w-full h-12 border border-[#E7E7E7] rounded-xl p-4 outline-none text-m-medium text-text-secondary"
          />
        </div>
      </FieldWrapper>
      {/* 학교(선택) */}
      <FieldWrapper>
        <FieldHeader title="학교" />
        <input
          type="text"
          placeholder="개굴초등학교"
          {...register('attendeeRequest.school')}
          className="max-w-[342px] bg-white w-full h-12 border border-[#E7E7E7] rounded-xl p-4 outline-none text-m-medium text-text-secondary"
        />
      </FieldWrapper>
      {/* 비고(선택) */}
      <FieldWrapper>
        <FieldHeader title="비고" />
        <input
          type="text"
          placeholder=""
          {...register('attendeeRequest.description')}
          className="max-w-[342px] bg-white w-full h-12 border border-[#E7E7E7] rounded-xl p-4 outline-none text-m-medium text-text-secondary"
        />
      </FieldWrapper>
    </Step1Form>
  )
}

const Step1Form = tw.div`flex flex-col justify-center gap-6 max-w-[342px] w-full`
const FieldWrapper = tw.div`flex flex-col gap-2`
