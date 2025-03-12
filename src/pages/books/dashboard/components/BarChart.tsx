import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
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
const labels = ["월", "화", "수", "목", "금", "토", "일"];
export default function BarChart() {
  const data = {
    labels,
    datasets: [
      {
        data: [14, 17, 13, 14, 12, 8, 0],
        backgroundColor: [
          "#BDDDC3",
          "#59996B",
          "#BDDDC3",
          "#BDDDC3",
          "#BDDDC3",
          "#BDDDC3",
        ],
        // borderColor: [
        //   "#4ED3FF",
        //   "#FFD54F",
        //   "#81C784",
        //   "#F48FB1",
        //   "#B39DDB",
        //   "#4DD0E1",
        // ],

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
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "white",
        bodyColor: "#424242",
        titleColor: "#424242",
        displayColors: false,
        // borderColor: "#E0E0E0",
        // borderWidth: 1,
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
