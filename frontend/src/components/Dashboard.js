import React, { useState } from "react";
import data from "../data/db.json";
import { FaSearch, FaStar } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import welcome from "../assets/Welcome-bro 1 (1).png";
import CalendarComponent from "./CalenderComponent";
import SideBar from "./SideBar";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const currentEvents = data.currentEvents || [];
  const futureEvents = data.futureEvents || [];
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const closeEventModal = () => {
    setSelectedEvent(null);
  };
  const openEventModal = (event) => {
    setSelectedEvent(event);
  };

  const chartData = {
    labels: ["CSE", "IT", "AIDS", "AIML", "CCE", "ECE", "EEE", "MECH", "CSBS"],
    datasets: [
      {
        label: "This Year",
        data: [15, 10, 20, 18, 12, 25, 17, 14, 21], // Example data for this year
        backgroundColor: "rgba(139, 92, 246, 0.7)", // Purple color with some transparency
        borderColor: "rgba(139, 92, 246, 1)", // Solid border color
        borderWidth: 1,
      },
      {
        label: "Overall",
        data: [20, 18, 22, 20, 15, 24, 21, 18, 23], // Example data for overall
        backgroundColor: "rgba(139, 92, 246, 0.3)", // Lighter purple color with more transparency
        borderColor: "rgba(139, 92, 246, 0.5)", // Lighter border color
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
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(200, 200, 200, 0.2)", 
        },
        ticks: {
          stepSize: 5, 
        },
      },
    },
  };

  return (
    <div className="xl:overflow-y-hidden xl:overflow-hidden h-fit">
      <SideBar />
      <div className="flex flex-col xl:flex-row w-full pt-10 xl:pt-20 relative">
        <div className="absolute top-4 right-4 flex items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search events..."
              className="xl:w-96 xl:h-14 pl-12 pr-20 border-2 border-purple-600 rounded-lg shadow-lg transition-all duration-300 focus:border-purple-800 focus:ring-2 focus:ring-purple-300 focus:outline-none"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-600">
              <FaSearch size={20} />
            </div>
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded-md">
              Search
            </button>
          </div>
        </div>

        <div className="xl:ml-72 xl:w-[40%] w-full">
          <div className="max-w-xl mx-auto p-0 -mt-"> 
  <h1 className="text-3xl font-bold mb-3 text-white-800">Welcome,</h1>
  <p className="text-xl font-medium mb-5 text-gray-600">Today's Events</p>
  <div className="max-h-[300px] overflow-y-auto scrollbar-hide"> 
    {data.length > 0 ? (
      data.map((event, index) => (
        <div
          key={index}
          className="relative bg-gradient-to-r from-purple-500 to-pink-400 text-white rounded-2xl flex justify-between items-center p-6 mb-6 shadow-2xl transition-transform transform hover:scale-105 cursor-pointer"
          onClick={() => openEventModal(event)}
        >
          <div>
            <h2 className="text-2xl font-bold">{event.eventname}</h2>
            <p className="text-lg font-light">Dept of CSE</p>
          </div>
          <img
            src="https://path-to-your-cup-image-1.png"
            alt="Event Icon"
            className="w-20 h-20"
          />
          <img
            src="https://path-to-your-back-cup-image.png"
            alt="Cup Icon"
            className="absolute top-0 right-0 w-32 opacity-20 transform translate-x-1/3 -translate-y-1/3"
          />
        </div>
      ))
    ) : (
      <p>No events for this date.</p>
    )}
  </div>
</div>




        </div>

    {/* Leaderboard Section */}
<div className="xl:w-[60%] w-full xl:pl-10 mt-10 xl:mt-0 flex flex-col min-h-screen items-center"> 

  <div className="flex justify-center mb-4 w-full"> 
    <CalendarComponent />
  </div>


  <div className="flex justify-center mt-6 w-full">
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">LeaderBoard</h1>
    </div>
  </div>

  <div className="flex justify-center items-center w-full"> 
    <div className="w-[90%] md:w-[80%] lg:w-[70%] xl:w-[100%]"> 
      <Bar data={chartData} options={chartOptions} />
    </div>
  </div>
</div>






      </div>

      {/* Event Modal */}
      {selectedEvent && (
        <div className="custom-modal-overlay">
          <div className="custom-modal-content">
            <button className="custom-close-modal" onClick={closeEventModal}>
              &times;
            </button>
            <img
              src="https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?cs=srgb&dl=pexels-cottonbro-3171837.jpg&fm=jpg"
              alt="Event"
              className="custom-modal-image"
            />
            <h2 className="custom-modal-title">{selectedEvent.eventname}</h2>
            <p className="custom-modal-description">
              <strong>Start Time:</strong> {selectedEvent.eventstarttime}
              <br />
              <strong>Description:</strong> {selectedEvent.description}
              <br />
              <strong>Location:</strong> {selectedEvent.venue}
              <br />
              <strong>Contact:</strong> {selectedEvent.contact}
            </p>
            <p className="modal-date">
              <strong>{selectedDate.toLocaleDateString()}</strong>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
