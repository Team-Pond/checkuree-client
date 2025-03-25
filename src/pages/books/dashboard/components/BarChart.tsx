import { AttendeeStatisticsType } from "@/api/type";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Align,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart({
  labels,
  statisticData,
}: {
  labels: string[];
  statisticData: number[];
}) {
  let maxIndex = statisticData.indexOf(Math.max(...statisticData));

  let backgroundColor = new Array(statisticData.length).fill("#BDDDC3");

  backgroundColor[maxIndex] = "#59996B";

  const data = {
    labels,
    datasets: [
      {
        data: statisticData,
        backgroundColor: backgroundColor,

        datalabels: {
          align: "end" as Align,
          anchor: "end" as Align,
        },

        barThickness: 32, // 막대 너비 설정 (px)
        borderRadius: {
          topLeft: 4,
          topRight: 4,
          bottomLeft: 0,
          bottomRight: 0,
        },
      },
    ],
  };
  const options = {
    layout: {
      padding: {
        top: 20,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "white",
        bodyColor: "#424242",
        titleColor: "#424242",
        displayColors: false,
        padding: 10,
      },
    },
    // aspectRatio: 10,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false, // Remove grid lines
        },
        ticks: {},
      },
      y: {
        border: {
          dash: [2, 4],
        },
        beginAtZero: true,
        ticks: {
          count: 6,
        },
      },
    },
  };
  return (
    <div style={{ width: "100%", height: 284 }}>
      <Bar data={data} options={options} />
    </div>
  );
}
