import React from "react";
import "./TaskChart.css";
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
import faker from "faker";

const options = {
  plugins: {
    title: {
      display: true,
      text: "Tasks Chart 2023",
    },
  },
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
      grid: {
        display: false,
      },
    },
    y: {
      stacked: true,
      grid: {
        display: false,
      },
    },
  },
};

const labels = [
  {
    month: 1,
    title: "January",
  },
  {
    month: 2,
    title: "February",
  },
  {
    month: 3,
    title: "March",
  },
  {
    month: 4,
    title: "April",
  },
  {
    month: 5,
    title: "May",
  },
  {
    month: 6,
    title: "June",
  },
  {
    month: 7,
    title: "July",
  },
  {
    month: 8,
    title: "August",
  },
  {
    month: 9,
    title: "September",
  },
  {
    month: 10,
    title: "October",
  },
  {
    month: 11,
    title: "November",
  },
  {
    month: 12,
    title: "December",
  },
];

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TaskChart = ({ taskListCountThisYear }) => {
  const data = {
    labels: labels.map((label) => label.title),
    datasets: [
      {
        label: "In Progress",
        data: labels.map((label) => {
          const findItem = taskListCountThisYear?.find(
            (item) => item.month === label.month && item.status === 0
          );
          if (findItem) {
            return findItem.count;
          } else {
            return 0;
          }
        }),
        backgroundColor: "rgb(255, 99, 0)",
        stack: "Stack 0",
      },
      {
        label: "Completed",
        data: labels.map((label) => {
          const findItem = taskListCountThisYear?.find(
            (item) => item.month === label.month && item.status === 1
          );
          if (findItem) {
            return findItem.count;
          } else {
            return 0;
          }
        }),
        backgroundColor: "rgb(75, 200, 192)",
        stack: "Stack 0",
      },
      {
        label: "To Do",
        data: labels.map((label) => {
          const findItem = taskListCountThisYear?.find(
            (item) => item.month === label.month && item.status === -1
          );
          if (findItem) {
            return findItem.count;
          } else {
            return 0;
          }
        }),
        backgroundColor: "rgb(255, 199, 100)",
        stack: "Stack 0",
      },
    ],
  };

  return (
    <div className="task-chart-wrapper">
      <Bar className="task-chart-bar" options={options} data={data} />
    </div>
  );
};

export default TaskChart;
