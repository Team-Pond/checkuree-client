// DonutChart.tsx
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import dataLabels from "chartjs-plugin-datalabels";

// Chart.js 설정
ChartJS.register(ArcElement, Tooltip, Legend, annotationPlugin, dataLabels);

interface DonutChartProps {
  data: number[];
  labels: string[];
}

export default function DonutChart({ data }: DonutChartProps) {
  const chartData = {
    dataLabels: {
      lables: {
        title: {
          color: "red",
        },
      },
    },
    datasets: [
      {
        data:
          data.filter((count) => count !== 0).length === 0
            ? [0]
            : data.filter((count) => count !== 0),
        backgroundColor: ["#59996B", "#F2BD2D", "#EA5353"], // 색상을 원하는 대로 설정
        hoverBackgroundColor: ["#59996B", "#F2BD2D", "#EA5353"],
      },
    ],
  };

  // TODO: 옵션 작업하기
  const options: ChartOptions<any> = {
    plugins: {
      datalabels: {
        labels: {
          title: {
            color: "white",
            font: {
              weight: 800,
              size: 13,
              family: "SUIT",
            },
          },
        },
      },
      annotation: {
        annotations: {
          dLabel: {
            type: "doughnutLabel",
            content: () => {
              return [`${data.reduce((acc, d) => acc + d, 0)}명`];
            },
            font: [{ size: 20, weight: 700, family: "SUIT" }],
            color: ["#5D5D5D", "red", "grey"],
          },
        },
      },
      tooltip: {
        enabled: true,
      },
      legend: {
        position: "top",
      },
    },
    cutout: "50%",
  };

  return (
    <div style={{ width: 180, height: 180 }}>
      <Doughnut data={chartData} options={options} />
    </div>
  );
}
