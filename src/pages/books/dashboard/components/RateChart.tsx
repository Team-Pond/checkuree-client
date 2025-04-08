// DonutChart.tsx
import { Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js'
import annotationPlugin from 'chartjs-plugin-annotation'
import dataLabels from 'chartjs-plugin-datalabels'
import tw from 'tailwind-styled-components'
import { StatisticType } from '@/api/type'
import { Fragment } from 'react/jsx-runtime'

// Chart.js 설정
ChartJS.register(ArcElement, Tooltip, Legend, annotationPlugin, dataLabels)

interface DonutChartProps {
  data: number[]
  labels: string[]
}

const backgroundColor = ['#59996B', '#F2BD2D', '#EA5353', '#E7E7E7']

function DonutChart({ data }: DonutChartProps) {
  const chartData = {
    dataLabels: {
      lables: {
        title: {
          color: 'red',
        },
      },
    },
    datasets: [
      {
        data: data,
        backgroundColor: backgroundColor,
        hoverBackgroundColor: backgroundColor,
      },
    ],
  }

  const options: ChartOptions<any> = {
    plugins: {
      datalabels: {
        labels: {
          title: {
            color: 'white',
            formatter: (value: number) => {
              return value > 0 ? value : ''
            },
            font: {
              weight: 800,
              size: 13,
              family: 'SUIT',
            },
          },
        },
      },
      annotation: {
        annotations: {
          dLabel: {
            type: 'doughnutLabel',
            content: () => {
              return [`${data.reduce((acc, d) => acc + d, 0)}명`]
            },
            font: [{ size: 20, weight: 700, family: 'SUIT' }],
            color: ['#5D5D5D', 'red', 'grey'],
          },
        },
      },
      tooltip: {
        enabled: true,
      },
      legend: {
        position: 'top',
      },
    },
    cutout: '50%',
  }

  return (
    <div style={{ width: 180 }}>
      <Doughnut data={chartData} options={options} />
    </div>
  )
}

type Statistic = {
  label: string
  rate: number
  bgColor: string
  textColor: string
}
interface IProps {
  statisticData: StatisticType
}

const UNIT_TEXT = '단위: 명'

export default function RateChart({ statisticData }: IProps) {
  const labels = ['Red', 'Blue', 'Yellow']

  const statistics: Statistic[] = [
    {
      label: '출석',
      rate: statisticData.attendRate,
      bgColor: 'bg-border-brand',
      textColor: 'text-text-brand',
    },
    {
      label: '보강',
      rate: statisticData.makeupRate,
      bgColor: 'bg-[#F2BD2D]',
      textColor: 'text-[#EC9E14]',
    },
    {
      label: '결석',
      rate: statisticData.absentRate,
      bgColor: 'bg-[#EA5353]',
      textColor: 'text-[#EA5353]',
    },
    {
      label: '미출석',
      rate: statisticData.unCheckedRate,
      bgColor: 'bg-[#E7E7E7]',
      textColor: 'text-[#B0B0B0]',
    },
  ]

  const StatisticItem = ({ label, rate, bgColor, textColor }: Statistic) => (
    <div className="flex gap-2 items-center">
      <div className="flex items-center gap-[6px]">
        <Squre bg={bgColor} />
        <p className="text-xs-medium">{label}</p>
      </div>
      <Ratio color={textColor}>{rate}%</Ratio>
    </div>
  )

  return (
    <Fragment>
      <div className="flex gap-3">
        <div>
          <p className="text-xs-medium text-text-interactive-secondary text-left">
            {UNIT_TEXT}
          </p>
          <DonutChart
            data={[
              statisticData.attendCount,
              statisticData.makeupCount,
              statisticData.absentCount,
              statisticData.unCheckedCount,
            ]}
            labels={labels}
          />
        </div>
        <StatisticItemWrapper>
          {statistics.map((stat) => (
            <StatisticItem
              key={stat.label}
              label={stat.label}
              rate={stat.rate}
              bgColor={stat.bgColor}
              textColor={stat.textColor}
            />
          ))}
        </StatisticItemWrapper>
      </div>
      <Summation>
        오늘은 약 {statisticData.attendRate}%의 학생들이 출석했어요.
      </Summation>
    </Fragment>
  )
}

const StatisticItemWrapper = tw.p`flex flex-col gap-2px`
const Summation = tw.p`text-s-semibold mt-4`

const Squre = tw.div`${({ bg }: { bg: string }) =>
  bg && bg} w-3 h-3 rounded-[4px]`

const Ratio = tw.div`${({ color }: { color: string }) =>
  color && color} text-[13px] font-semibold mt-[1px]`
