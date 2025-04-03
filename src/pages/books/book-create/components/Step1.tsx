import TimePicker from '@/components/TimePicker'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { CreateBookSchema } from '../_schema'
import { DaysType } from '@/api/type'
import tw from 'tailwind-styled-components'
import FieldHeader from '@/components/FieldTitle'
import { spaceBlockKeyDown } from '@/utils'

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

  const transfer = (time: Time) => {
    const hourInt = Number(time.hour) + time.period === '오후' ? 12 : 0
    const minuteInt = Number(time.minute)

    return (
      hourInt.toString().padStart(2, '0') +
      minuteInt.toString().padStart(2, '0')
    )
  }
  const handleStartTimeChange = (time: Time) => {
    setStartTime(time)
    setValue('availableFrom', transfer(time))
    setIsStartPickerOpen(false)
  }

  const handleEndTimeChange = (time: Time) => {
    setEndTime(time)
    setValue('availableTo', transfer(time))
    setIsEndPickerOpen(false)
  }

  const handleOpenStartTimePicker = () => {
    setIsStartPickerOpen(true)
  }

  const handleOpenEndTimePicker = () => {
    setIsEndPickerOpen(true)
  }

  const [startTime, setStartTime] = useState<Time | null>(null)

  const [endTime, setEndTime] = useState<Time | null>(null)

  const [isStartPickerOpen, setIsStartPickerOpen] = useState<boolean>(false)
  const [isEndPickerOpen, setIsEndPickerOpen] = useState<boolean>(false)

  const PICKER_RENDER = [
    {
      text: startTime
        ? `${startTime?.period} ${startTime?.hour}시 ${startTime?.minute}분`
        : '시작 시간',
      timeText: '부터',
      onChange: handleStartTimeChange,
      handleOpen: handleOpenStartTimePicker,
      dataCy: 'startTime',
    },

    {
      text: endTime
        ? `${endTime?.period} ${endTime?.hour}시 ${endTime?.minute}분`
        : '종료 시간',
      timeText: '까지',
      onchange: handleEndTimeChange,
      handleOpen: handleOpenEndTimePicker,
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
        <FieldHeader title="출석부" essential />

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
            className="max-w-[342px] bg-white w-full h-12 border border-[#E7E7E7] rounded-xl p-4 outline-none text-m-medium text-text-secondary"
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
          )}
        </div>
      </TextWrapper>

      {/* 수업 요일 */}
      <TextWrapper>
        <FieldHeader title="수업 요일" essential />
        <div className="flex flex-col gap-[1px] w-full text-left">
          <div className="grid grid-cols-7 gap-0">
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
            <p className="text-red-500 text-xs mt-1">
              {errors.availableDays.message}
            </p>
          )}
        </div>
      </TextWrapper>
      <input
        type="hidden"
        {...register('availableDays', { required: '필수' })}
      />

      {/* 수업 시간 */}
      <TextWrapper>
        <FieldHeader title="수업 시간" essential />
        <div className="flex flex-col gap-[1px] w-full text-left">
          <div className="flex items-center gap-4">
            {PICKER_RENDER.map((time, index) => {
              return (
                <div
                  className="flex gap-2 items-center max-w-[163px] w-full"
                  onClick={() => time.handleOpen()}
                  key={index}
                  data-cy={time.dataCy}
                  aria-label={time.dataCy}
                >
                  <button
                    type="button"
                    className="outline-none border border-[#E7E7E7] rounded-xl max-w-[130px] w-full h-12  flex items-center pl-4"
                  >
                    <p className="font-bold text-sm text-[#B0B0B0]">
                      {time.text}
                    </p>
                  </button>
                  <p className="text-sm font-bold text-text-primary">
                    {time.timeText}
                  </p>
                </div>
              )
            })}
          </div>
          {(errors.availableFrom || errors.availableTo) && (
            <p className="text-red-500 text-xs mt-1">
              {'시작 날짜 및 종료 날짜를 입력해주세요.'}
            </p>
          )}
        </div>
      </TextWrapper>

      {/* 커버 이미지 */}
      <TextWrapper>
        <FieldHeader title="커버 이미지" />
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
        <FieldHeader title="설명" />
        <input
          {...register('description')}
          type="text"
          className="max-w-[342px] bg-white w-full h-12 border border-[#E7E7E7] rounded-xl p-4 outline-none text-m-medium text-text-secondary"
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

const Step1Form = tw.div`flex flex-col justify-center gap-6 max-w-[342px] w-full`

const TextWrapper = tw.div`
  flex flex-col gap-2
`
