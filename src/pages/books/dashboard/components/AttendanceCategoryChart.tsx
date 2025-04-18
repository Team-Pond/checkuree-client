import tw from 'tailwind-styled-components'
import { CategoryChart } from './CategoryChart'
import { AttendeeStatisticsType } from '@/api/type'
import CategoryButtons from './CategoryButtons'
import { GetAttendeeStatisticsResponse } from '@/api/AttendeeSchema'

const CATEGORY_TEXT = '카테고리별 학생 수'

interface AttendanceCategoryChartProps {
  statisticData: GetAttendeeStatisticsResponse
  tabChange: (tab: AttendeeStatisticsType) => void
  tab: AttendeeStatisticsType
}

export default function AttendanceCategoryChart({
  statisticData,
  tabChange,
  tab,
}: AttendanceCategoryChartProps) {
  return (
    <Wrapper>
      <ButtonsWrapper>
        <p className="text-m-bold">{CATEGORY_TEXT}</p>
        <CategoryButtons
          timeStatus={tab}
          handleTimeStatus={(timeStatus) => tabChange(timeStatus)}
        />
      </ButtonsWrapper>
      <ChartWrapper>
        {statisticData && statisticData.status === 200 && (
          <CategoryChart statisticData={statisticData.data} tab={tab} />
        )}
      </ChartWrapper>
    </Wrapper>
  )
}

const Wrapper = tw.div`flex flex-col gap-2`
const ChartWrapper = tw.div`flex flex-col items-center gap-2 w-full px-2 h-[284px] bg-white rounded-2xl mx-auto py-3`
const ButtonsWrapper = tw.div`flex justify-between w-full items-center`
