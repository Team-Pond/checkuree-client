import { DaysType, GenderType } from '@/api/type'
import BottomDrawer from '@/components/BottomDrawer'
import Button from '@/components/Button'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

type BottomFilterProps = {
  onChangeFilter: (
    dayArrays: DaysType[],
    gender: GenderType,
    age: { min: number; max: number },
  ) => void
  openFilter: boolean
  onDrawerChange: () => void
  DaysMatch: Record<string, DaysType>
}

const DAYS = ['월', '화', '수', '목', '금', '토', '일']

const GENDER_BUTTONS: { gender: GenderType; name: string }[] = [
  {
    gender: 'MALE',
    name: '남성',
  },
  {
    gender: 'FEMALE',
    name: '여성',
  },
]

export default function BottomFilter(props: BottomFilterProps) {
  const { onChangeFilter, openFilter, onDrawerChange, DaysMatch } = props
  const [dayArrays, setDayArrays] = useState<DaysType[]>([])
  const [gender, setGender] = useState<GenderType>('')

  const [age, setAge] = useState<{
    min: number
    max: number
  }>({ min: 0, max: 100 })
  const onAgeChange = (min: number, max: number) => {
    setAge({ min, max })
  }

  const onDaysChange = (day: DaysType) => {
    if (dayArrays.includes(DaysMatch[day])) {
      setDayArrays(dayArrays.filter((item) => item !== DaysMatch[day]))
    } else {
      setDayArrays([...dayArrays, DaysMatch[day]])
    }
  }

  const onChangeGender = (selectGender: GenderType) => {
    setGender(gender === selectGender ? '' : selectGender)
  }

  const resetFilter = () => {
    setDayArrays([])
    setGender('')
    setAge({ min: 0, max: 100 })
  }
  return (
    <BottomDrawer
      isOpen={openFilter}
      onClose={onDrawerChange}
      children={
        <>
          {/* 성별 필터 */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3 text-left">
              <p className="text-m-bold text-text-primary">학생 성별</p>
              <div className="flex gap-2">
                {GENDER_BUTTONS.map((button) => {
                  return (
                    <Button
                      key={button.gender}
                      onClick={() => onChangeGender(button.gender)}
                      className={twMerge(
                        'rounded-lg border border-[#d1d1d1] w-[61px] h-[33px] text-s-medium text-border-secondary-hover',
                        gender === button.gender
                          ? 'border-border-brand text-text-brand'
                          : 'text-border-secondary-hover',
                      )}
                      label={button.name}
                    />
                  )
                })}
              </div>
            </div>

            {/* 학생 나이 */}
            <div className="flex flex-col gap-3 text-left">
              <p className="text-m-bold text-text-primary">학생 연령</p>
              <div className="flex gap-2">
                <Button
                  onClick={() => onAgeChange(0, 6)}
                  className={twMerge(
                    'rounded-lg border border-[#d1d1d1] w-[61px] h-[33px] text-s-medium',
                    age.min === 0 && age.max === 6
                      ? 'border-border-brand text-text-brand'
                      : 'text-border-secondary-hover',
                  )}
                  label="미취학"
                />
                <Button
                  onClick={() => onAgeChange(7, 12)}
                  className={twMerge(
                    'rounded-lg border border-[#d1d1d1] w-[61px] h-[33px] text-s-medium',
                    age.min === 7 && age.max === 12
                      ? 'border-border-brand text-text-brand'
                      : 'text-border-secondary-hover',
                  )}
                  label="초등"
                />
                <Button
                  onClick={() => onAgeChange(13, 15)}
                  className={twMerge(
                    'rounded-lg border border-[#d1d1d1] w-[61px] h-[33px] text-s-medium',
                    age.min === 13 && age.max === 15
                      ? 'border-border-brand text-text-brand'
                      : 'text-border-secondary-hover',
                  )}
                  label="중등"
                />
                <Button
                  onClick={() => onAgeChange(16, 18)}
                  className={twMerge(
                    'rounded-lg border border-[#d1d1d1] w-[61px] h-[33px] text-s-medium',
                    age.min === 16 && age.max === 18
                      ? 'border-border-brand text-text-brand'
                      : 'text-border-secondary-hover',
                  )}
                  label="고등"
                />
                <Button
                  onClick={() => onAgeChange(19, 100)}
                  className={twMerge(
                    'rounded-lg border border-[#d1d1d1] w-[61px] h-[33px] text-s-medium',
                    age.min === 19 && age.max === 100
                      ? 'border-border-brand text-text-brand'
                      : 'text-border-secondary-hover',
                  )}
                  label="성인"
                />
              </div>
            </div>

            {/* 수업 구분 */}
            <div className="flex flex-col gap-3 text-left">
              <p className="text-m-bold text-text-primary">수업 요일</p>
              <div className="flex gap-2">
                {DAYS.map((day, index) => {
                  return (
                    <Button
                      key={day}
                      className={twMerge(
                        'rounded-lg border border-[#d1d1d1] w-[41px] h-[33px] text-s-medium text-border-secondary-hover',
                        dayArrays.includes(DaysMatch[DAYS[index]])
                          ? 'border-border-brand text-text-brand'
                          : 'text-border-secondary-hover',
                      )}
                      onClick={() => onDaysChange(DAYS[index] as DaysType)}
                      label={DAYS[index]}
                    />
                  )
                })}
              </div>
            </div>
          </div>

          <div className="flex gap-4 w-full">
            <Button
              className="w-full h-[54px] bg-bg-interactive-secondary text-text-secondary  rounded-2xl text-l-semibold"
              onClick={resetFilter}
              label="초기화"
            />
            <Button
              className="w-full h-[54px] bg-bg-tertiary text-[#f1f8f3] rounded-2xl text-l-semibold"
              onClick={() => onChangeFilter(dayArrays, gender, age)}
              label="필터 적용"
            />
          </div>
        </>
      }
    />
  )
}
