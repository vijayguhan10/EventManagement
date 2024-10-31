// Chart.js
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import CanvasJSReact from "@canvasjs/react-charts";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// CanvasJS setup
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Chart = () => {
  // Data for the Bar Chart
  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "January",
      "February",
      "March",
      "April",
      "May",
    ],
    datasets: [
      {
        label: "Sales",
        data: [65, 59, 80, 81, 56, 65, 59, 80, 81, 56],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Sales Data",
      },
    },
  };

  // Data for the CanvasJS Chart
  const canvasOptions = {
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "Website Traffic Sources",
    },
    data: [
      {
        type: "pie",
        startAngle: 75,
        toolTipContent: "<b>{label}</b>: {y}%",
        showInLegend: "true",
        legendText: "{label}",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y}%",
        dataPoints: [
          { y: 18, label: "Direct" },
          { y: 49, label: "Organic Search" },
          { y: 9, label: "Paid Search" },
          { y: 5, label: "Referral" },
          { y: 19, label: "Social" },
        ],
      },
    ],
  };

  return (
    <div>
      <h2>Bar Chart</h2>
      <Bar data={data} options={options} width={3000} height={1000} />

      <div className="w-[40%] h-[30%] mt-36 ml-[25%]">
    
        <CanvasJSChart options={canvasOptions} />
      </div>
    </div>
  );
};

export default Chart;
