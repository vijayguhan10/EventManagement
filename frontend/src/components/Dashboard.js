import React, { useState,useEffect } from "react";
import data from "../data/db.json";
import { FaSearch } from "react-icons/fa";
import CanvasJSReact from "@canvasjs/react-charts"; // Importing CanvasJS for pie chart
import SideBar from "./SideBar";
import CalendarComponent from "./CalenderComponent";
import { toast, ToastContainer } from "react-toastify";
import axios from 'axios'
import cup from "../assets/cup.png";
import Departments from './Departments';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Dashboard = () => {
  const [data, setData] = useState([]);
  const currentEvents = data.currentEvents || [];
  const futureEvents = data.futureEvents || [];
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [Loading, setLoading] = useState(true);
  const token = localStorage.getItem("authToken");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const closeEventModal = () => {
    setSelectedEvent(null);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("😪")
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/event/getalldata`
        );
        console.log(response)
        const filteredData = response.data.eventdata.filter(
          (elem) => elem.status === "pending"
        );
        setData(filteredData);
        console.log("😒😒😒",filteredData)
        setEvents(filteredData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        toast.error("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const openEventModal = (event) => {
    setSelectedEvent(event);
  };

  const today = new Date(); // Get the current date
  const formattedToday = 
    `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getFullYear()).slice(-2)}`; // Format today's date as DD/MM/YY
  
  const filteredData = data.filter((event) => {
    return event.eventenddate === formattedToday; // Compare event end date with today's date
  });
  
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
        toolTipContent: "<b>{label}</b>: {y}%",
        showInLegend: "true",
        legendText: "{label}",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y}%",
        dataPoints: [
          { y: 10, label: "CSE" },
          { y: 3, label: "IT" },
          { y: 6, label: "AIDS" },
          { y: 5.9, label: "CCE" },
          { y: 4, label: "CSBS" },
          { y: 6, label: "CYBER" },
          { y: 7, label: "ECE" },
          { y: 2, label: "EEE" },
          { y: 8, label: "MECH" },
          { y: 7.09, label: "AIML" },
        ],
      },
    ],
  };

  return (
    <div className="xl:overflow-y-hidden h-fit ">
      <SideBar />
      <div className="flex flex-col xl:flex-row w-full pt-10 xl:pt-20 relative">
        <div className="absolute top-4 flex left-[20%] items-center">
          <div className="text-nowrap mb-5">
            <h1 className="text-3xl font-bold mb-3 text-white-800">
              Welcome, <span>Vijay Guhan</span>
            </h1>
          </div>
          <div className="relative ml-[85%] mb-11">
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

        <div className="xl:ml-72 h-80 mt-5 xl:w-[80%] w-full bg-transparent">
          <div className="mx-auto p-0">
            <div className="max-h-[300px] xl:w-[130%] overflow-y-auto bg-transparent scrollbar-hide">
            {filteredData.length > 0 ? (
  filteredData.map((event, index) => (
    <div
      key={index}
      className="relative bg-gradient-to-r from-[#bb85fd] to-[#7848F4] text-white rounded-2xl flex justify-between items-center p-6 mb-6 shadow-2xl transition-transform transform hover:scale-105 cursor-pointer"
      onClick={() => openEventModal(event)}
    >
      <div>
        <h2 className="text-2xl font-bold">{event.eventname}</h2>
        <p className="text-lg font-light">{event.departments}</p>
      </div>
      {/* <img
        src={cup}
        alt="Event Icon"
        className="w-20 h-20"
      />
      <img
        src="https://path-to-your-back-cup-image.png"
        alt="Cup Icon"
        className="absolute top-0 right-0 w-32 opacity-20 transform translate-x-1/3 -translate-y-1/3"
      /> */}
     
    </div>
  ))
) : (
  <p>No events for today.</p>
)}
            </div>
          </div>
        </div>

        {/* Leaderboard Section */}
        <div className="flex justify-center ml-60 mb-4 w-full">
          <CalendarComponent />
        </div>
      </div>

      {/* Pie Chart at the Bottom */}
      <div className="flex justify-center items-center mt-10 relative -left-[18%] bottom-32">
        <div className="w-full xl:w-[26%] h-auto bg-transparent">
          <CanvasJSChart options={pieChartOptions} />
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
            <strong>Department:</strong> {selectedEvent.departments}
            <br />
              <strong>Start Time:</strong> {selectedEvent.eventstarttime}
              <br />
              <strong>End Time:</strong> {selectedEvent.eventendtime}
              <br />
              <strong>End End date:</strong> {selectedEvent.eventstartdate}
              <br />
              <strong>start Date:</strong> {selectedEvent.eventenddate}
              <br />
            
              <strong>Venue:</strong> {selectedEvent.venue}
              <br />
             
            </p>
            {/* <p className="modal-date">
              <strong>{selectedDate.toLocaleDateString()}</strong>
            </p> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
