import React from 'react'
import TimeButtons from './TimeButtons'

import tw from 'tailwind-styled-components'
import { PeriodType } from '@/api/type'
import { statisticPeriodText } from '@/utils'
import { GetStatisticsResponse } from '@/api/RecordSchema'
import RateChart from './RateChart'
import { Dayjs } from 'dayjs'

interface IProps {
  statisticData: GetStatisticsResponse
  tabChange: (tab: PeriodType) => void
  tab: PeriodType
  currentDate: Dayjs
}
function AttendanceRateChart({
  statisticData,
  tabChange,
  tab,
  currentDate,
}: IProps) {
  return (
    <div className="flex flex-col gap-2">
      <ButtonsWrapper>
        <div className="flex flex-col text-left space-y-[-3px]">
          <p className="text-m-bold">{attendanceTextChange(tab)}</p>
          <p className="text-xs-semibold text-text-secondary">
            {tab !== 'WEEKLY' && statisticPeriodText(currentDate, tab)}
            {tab === 'WEEKLY' &&
              statisticData &&
              statisticData.status === 200 &&
              statisticData.data.from.replaceAll('-', '.') +
                '-' +
                statisticData.data.to.replaceAll('-', '.')}
          </p>
        </div>
        <TimeButtons
          timeStatus={tab}
          handleTimeStatus={(timeStatus) => tabChange(timeStatus)}
        />
      </ButtonsWrapper>
      <ChartWrapper>
        {statisticData && statisticData.status === 200 && (
          <RateChart statisticData={statisticData.data} />
        )}
      </ChartWrapper>
    </div>
  )
}

export default React.memo(AttendanceRateChart)

const ChartWrapper = tw.div`flex flex-col items-center gap-2 w-full h-[284px] bg-white rounded-2xl mx-auto py-4`
const ButtonsWrapper = tw.div`flex justify-between w-full items-center`

const TODAY_TEXT = '오늘의 출석률'
const WEEKLY_TEXT = '이번 주 출석률'
const MONTHLY_TEXT = '이번 달의 출석률'

const attendanceTextChange = (timeStatus: PeriodType) => {
  switch (timeStatus) {
    case 'DAILY':
      return TODAY_TEXT
    case 'WEEKLY':
      return WEEKLY_TEXT
    case 'MONTHLY':
      return MONTHLY_TEXT
  }
}
