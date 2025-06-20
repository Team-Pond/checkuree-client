import TimePicker from '@/components/TimePicker'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { CreateBookSchema } from '../_schema'
import { DaysType } from '@/api/type'
import tw from 'tailwind-styled-components'

import { spaceBlockKeyDown } from '@/utils'
import toast from 'react-hot-toast'
import FieldTitle from '@/components/FieldTitle'
import Button from '@/components/Button'

const DAYS = ['월', '화', '수', '목', '금', '토', '일']

const DaysMatch: Record<string, DaysType> = {
  월: 'MONDAY',
  화: 'TUESDAY',
  수: 'WEDNESDAY',
  목: 'THURSDAY',
  금: 'FRIDAY',
  토: 'SATURDAY',
  일: 'SUNDAY',
}

type Time = {
  period: string
  hour: string
  minute: string
}

export default function Step1() {
  const {
    setFocus,
    setValue,
    register,
    watch,
    formState: { errors },
  } = useFormContext<CreateBookSchema>()
  const [imageSrc, setImageSrc] = useState<string | null>(null)

  const currentDays = watch('availableDays', [])

  const onDaysChange = (day: DaysType) => {
    if (currentDays.includes(DaysMatch[day])) {
      setValue(
        'availableDays',
        currentDays.filter((item: any) => item !== DaysMatch[day]),
      )
    } else {
      setValue('availableDays', [...currentDays, DaysMatch[day]])
    }
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (!selectedFile) return

    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target && e.target.result) {
        const result = e.target.result as string
        setImageSrc(result)
        setValue('imageUrl', result)
      }
    }

    if (selectedFile) {
      reader.readAsDataURL(selectedFile)
    }
  }

  const fileRef = useRef<HTMLInputElement | null>(null)
  const triggerFileInput = () => {
    fileRef.current?.click()
  }

  const availableFrom = watch('availableFrom')
  const availableTo = watch('availableTo')

  const handleStartTimeChange = (time: Time) => {
    setValue('availableFrom', transfer(time))
    setIsStartPickerOpen(false)
  }

  const handleEndTimeChange = (time: Time) => {
    setValue('availableTo', transfer(time))
    setIsEndPickerOpen(false)
  }

  const handleOpenTimePicker = (type: 'start' | 'end') => {
    if (type === 'start') {
      setIsStartPickerOpen(true)
    } else {
      setIsEndPickerOpen(true)
    }
  }

  const [isStartPickerOpen, setIsStartPickerOpen] = useState<boolean>(false)
  const [isEndPickerOpen, setIsEndPickerOpen] = useState<boolean>(false)

  const PICKER_RENDER = [
    {
      text: availableFrom ? formatTimeToKorean(availableFrom) : '시작 시간',
      timeText: '부터',
      onChange: handleStartTimeChange,
      handleOpen: () => handleOpenTimePicker('start'), // 함수로 감싸서 넘기기
      dataCy: 'startTime',
    },

    {
      text: availableTo ? formatTimeToKorean(availableTo) : '종료 시간',
      timeText: '까지',
      onChange: handleEndTimeChange, // 대문자 'C'
      handleOpen: () => handleOpenTimePicker('end'),
      dataCy: 'endTime',
    },
  ]
  useEffect(() => {
    setFocus('title')
  }, [setFocus])

  return (
    <Step1Form>
      {/* 출석부 이름 */}
      <TextWrapper>
        <FieldTitle title="출석부" essential />

        <div className="flex flex-col gap-[1px] w-full text-left">
          <input
            {...register('title', {
              required: '출석부는 최소 4글자 이상 입력해주세요.',
            })}
            onKeyDown={spaceBlockKeyDown}
            data-cy="title"
            aria-label="title"
            type="text"
            placeholder="출석부 이름"
            className="bg-white w-full h-12 border border-[#E7E7E7] rounded-xl p-4 outline-none text-m-medium text-text-secondary"
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1" data-cy="title-error">
              {errors.title.message}
            </p>
          )}
        </div>
      </TextWrapper>

      {/* 수업 요일 */}
      <TextWrapper>
        <FieldTitle title="수업 요일" essential />
        <div className="flex flex-col gap-[1px] w-full text-left">
          <div className="grid grid-cols-7 gap-1" data-cy="availableDays">
            {DAYS.map((day, index) => {
              const isActive = currentDays.includes(DaysMatch[DAYS[index]])
              return (
                <div
                  key={day}
                  data-cy={day}
                  aria-label={day}
                  className={twMerge(
                    'max-w-11 h-11 rounded-lg flex justify-center items-center  cursor-pointer',
                    isActive
                      ? 'bg-bg-primary text-text-interactive-primary'
                      : 'bg-bg-secondary text-text-secondary',
                  )}
                  onClick={() => onDaysChange(DAYS[index] as DaysType)}
                >
                  <span className="font-semibold text-base">{DAYS[index]}</span>
                </div>
              )
            })}
          </div>
          {errors.availableDays && (
            <p
              className="text-red-500 text-xs mt-1"
              data-cy="availableDays-error"
            >
              {errors.availableDays.message}
            </p>
          )}
        </div>
      </TextWrapper>
      <input
        type="hidden"
        readOnly
        {...register('availableDays', { required: '필수' })}
      />

      {/* 수업 시간 */}
      <TextWrapper>
        <FieldTitle title="수업 시간" essential />
        <div className="flex flex-col gap-[1px] w-full text-left">
          <div className="flex items-center gap-4">
            {PICKER_RENDER.map((time, index) => {
              return (
                <div
                  className="flex gap-2 items-center w-full"
                  onClick={time.handleOpen}
                  key={index}
                  data-cy={time.dataCy}
                  aria-label={time.dataCy}
                >
                  <Button
                    label={time.text}
                    labelClassName="font-bold text-sm text-[#B0B0B0]"
                    className="outline-none border border-[#E7E7E7] rounded-xl max-w-[130px] w-full h-12 flex items-center pl-4"
                  />
                  <p className="text-sm font-bold text-text-primary whitespace-nowrap">
                    {time.timeText}
                  </p>
                </div>
              )
            })}
          </div>
          {(errors.availableFrom || errors.availableTo) && (
            <p className="text-red-500 text-xs mt-1" data-cy="availTime-error">
              {'시작 날짜 및 종료 날짜를 입력해주세요.'}
            </p>
          )}
        </div>
      </TextWrapper>

      {/* 커버 이미지 */}
      <TextWrapper>
        <FieldTitle title="커버 이미지" />
        <div
          className="w-[81px] h-[81px] bg-bg-base border border-[#E7E7E7] rounded-xl flex justify-center items-center"
          onClick={triggerFileInput}
        >
          <input
            {...register('imageUrl')}
            type="file"
            className="hidden"
            ref={fileRef}
            onChange={handleFileChange}
          />
          <img
            src={imageSrc ? imageSrc : '/images/icons/book-create/ico-plus.svg'}
            alt="이미지 추가 아이콘"
            className={twMerge(
              imageSrc ? 'w-full h-full object-cover rounded-xl' : 'w-7 h-7',
            )}
          />
        </div>
        <p className="text-xs font-medium text-text-secondary text-left">
          * JPG, PNG 파일만 업로드 가능합니다.
        </p>
      </TextWrapper>

      {/* 설명*/}
      <TextWrapper>
        <FieldTitle title="설명" />
        <input
          {...register('description')}
          type="text"
          className="w-full bg-white h-12 border border-[#E7E7E7] rounded-xl p-4 outline-none text-m-medium text-text-secondary"
        />
      </TextWrapper>

      {/* TimePicker 모달 */}
      {isStartPickerOpen && (
        <TimePicker
          handleTimeChange={handleStartTimeChange}
          handleOpenTimePicker={setIsStartPickerOpen}
        />
      )}
      {isEndPickerOpen && (
        <TimePicker
          handleTimeChange={handleEndTimeChange}
          handleOpenTimePicker={setIsEndPickerOpen}
        />
      )}
    </Step1Form>
  )
}

const Step1Form = tw.div`flex flex-col justify-center gap-6 w-full`

const TextWrapper = tw.div`
  flex flex-col gap-2
`

const transfer = (time: Time) => {
  const hour = time.period === '오후' ? 12 : 0

  const hourInt = Number(time.hour) + hour
  const minuteInt = Number(time.minute)
  const hourString = hourInt < 10 ? `0${hourInt}` : hourInt
  const minuteString = minuteInt < 10 ? `0${minuteInt}` : String(minuteInt)
  return hourString + minuteString
}
const formatTimeToKorean = (time: string): string => {
  if (!/^\d{4}$/.test(time)) {
    return toast.error('잘못된 시간 설정입니다')
  }

  const hour = parseInt(time.slice(0, 2), 10)
  const minute = parseInt(time.slice(2, 4), 10)

  if (hour > 23 || minute > 59) {
    return '유효하지 않은 시간입니다'
  }

  const period = hour < 12 ? '오전' : '오후'
  const displayHour = hour % 12 === 0 ? 12 : hour % 12

  return `${period} ${displayHour}시 ${minute < 10 ? `0` + minute : minute}분`
}
