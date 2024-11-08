import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
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
import '../Chart.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Chart = () => {
  const [loading, setLoading] = useState(true);
  const [departmentCounts, setDepartmentCounts] = useState([]);
  const token = localStorage.getItem("authToken");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const departmentNameMapping = {
    "Artificial Intelligence and Data Science": "AI & DS",
    "Artificial Intelligence and Machine Learning": "AI & ML",
    "Computer Science Engineering": "CSE",
    "Computer Science and Business Systems": "CSBS",
    "Computer and Communication Engineering": "CCE",
    "Cybersecurity": "Cyber",
    "Electrical and Electronics Engineering": "EEE",
    "Electronics and Communication Engineering": "ECE",
    "Information Technology": "IT",
    "Mechanical Engineering": "MECH",
  };

  useEffect(() => {
    const getDepartmentCounts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/event/gettotalcounts`
        );
        const totalCountsDept = response.data.TotalCountsDept[0].totalCounts;
  
        const updatedDataPoints = Object.keys(totalCountsDept).map((deptName) => {
          const shortName = departmentNameMapping[deptName] || deptName;
          const count = totalCountsDept[deptName] || 0;
  
          return {
            label: shortName,
            y: count,
          };
        });
  
        const filteredDataPoints = updatedDataPoints.slice(0, -1);
  
        setDepartmentCounts(filteredDataPoints);
      } catch (error) {
        console.error("Error fetching department counts:", error);
      } finally {
        setLoading(false);
      }
    };
  
    setLoading(true);
    getDepartmentCounts();
  }, []);
  

  const labels = departmentCounts.map((dept) => dept.label); 
  const data = departmentCounts.map((dept) => dept.y); 

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Total Events by Department",
        data: data, 
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Total Events by Department",
      },
    },
  };

  const pieChartOptions = {
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "Department Analytics",
    },
    data: [
      {
        type: "pie",
        startAngle: 75,
        toolTipContent: "<b>{label}</b>: {y} events",
        showInLegend: true,
        legendText: "{label}",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y} events",
        dataPoints: departmentCounts,
      },
    ],
  };

  return (
    <div className="chart-container">
      <button onClick={() => window.history.back()} className="back-button">
        Back
      </button>

      <h1 className="page-title">Department Analytics</h1>

      <div className="chart-wrapper">
        <h2 className="chart-title">Total Events by Department (Bar Chart)</h2>
        <Bar data={chartData} options={chartOptions} />

        <div className="pie-chart-container">
          <CanvasJSChart options={pieChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Chart;
