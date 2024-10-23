import React, { useState, useEffect } from "react";
import "../Scroll.css";
import { FaSearch } from "react-icons/fa";
import CanvasJSReact from "@canvasjs/react-charts";
import SideBar from "./SideBar";
import CalendarComponent from "./CalenderComponent";
import { toast } from "react-toastify";
import cup from "../assets/cup.png";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const AdminDashBoard = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // New state for search

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setName(decoded.name || "Guest");
        setRole(decoded.role || "User");
      } catch (error) {
        console.error("Error decoding token", error);
      }
    }
  }, []);

  const [data, setData] = useState([]);
  const [popupPDF, SetPopupPdf] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [Loading, setLoading] = useState(true);
  const token = localStorage.getItem("authToken");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const closeEventModal = () => {
    setSelectedEvent(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/event/getalldata`
        );
        const filteredData = response.data.eventdata.filter(
          (elem) => elem.status === "pending"
        );
        setData(filteredData);
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

  const today = new Date();
  const formattedToday = `${String(today.getDate()).padStart(2, "0")}/${String(
    today.getMonth() + 1
  ).padStart(2, "0")}/${String(today.getFullYear()).slice(-2)}`;
  const filteredData = data.filter((event) => {
    return event.eventstartdate === formattedToday;
  });

  const filteredSearchData = filteredData.filter((event) => {
    const department = Array.isArray(event.departments)
      ? event.departments.join(", ")
      : event.departments || ""; // Handle cases where departments might be null or undefined

    return (
      (event.eventname &&
        event.eventname.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (department &&
        department.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });
  const pieChartOptions = {
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: `Department Analytics (${formattedToday})`,
    },
    data: [
      {
        type: "pie",
        startAngle: 75,
        toolTipContent: "<b>{label}</b>: {y}%",
        showInLegend: "true",
        legendText: "{label}",
        indexLabelFontSize: 14,
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
    height: 360,
    width: 600,
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  if (Loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div
      className={`${popupPDF ? "bg-[#000000]" : ""} xl:overflow-y-hidden h-fit`}
    >
      <SideBar />
      <div className="flex flex-col xl:flex-row w-full pt-10 xl:pt-20 relative">
        <div className="absolute top-4 flex left-[18%] items-center">
          <div className="text-nowrap flex mb-5">
            <h1 className="text-3xl font-bold mb-28 text-white-800">
              Welcome, <span>{name}</span>
            </h1>
          </div>
          <div className="relative ml-[90%] mb-32">
            <input
              type="text"
              placeholder="Search events..."
              className="xl:w-96 xl:h-14 pl-12 pr-20 border-2 border-purple-600 rounded-lg shadow-lg transition-all duration-300 focus:border-purple-800 focus:ring-2 focus:ring-purple-300 focus:outline-none"
              value={searchQuery} 
              onChange={handleSearchChange} 
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-600">
              <FaSearch size={20} />
            </div>
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded-md">
              Search
            </button>
          </div>
        </div>

        <div className="xl:ml-72 h-full mt-5 relative xl:w-[80%] w-full bg-white">
          <div className="mx-auto p-0 h-full">
            <div
              className="h-full border-black rounded-xl xl:w-[130%] overflow-y-auto bg-white animated-scrollbar overflow-x-hidden scroll-smooth"
              style={{ height: "100vh" }} 
            >
              {filteredSearchData.length > 0 ? (
                filteredSearchData.map((event, index) => (
                  <div
                    key={index}
                    className="relative border-black bg-gradient-to-bl from-[#7d3cf4b5] to-[#7312f1d3] text-white rounded-2xl flex justify-between items-center p-6 mb-6 shadow-2xl transition-transform transform hover:scale-105 cursor-pointer"
                    onClick={() => openEventModal(event)}
                  >
                    <div>
                      <h2 className="text-2xl font-bold">{event.eventname}</h2>
                      <p className="text-lg font-light">{event.departments}</p>
                    </div>
                    <img src={cup} alt="Event Icon" className="w-20 h-20" />
                  </div>
                ))
              ) : (
                <p>No events found for today.</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center ml-60 mb-4 w-full">
          <CalendarComponent />
        </div>
      </div>
      <div className="w-64 ml-[55%]">
        <div className="h-auto ml-28 absolute -bottom-8 bg-transparent">
          <CanvasJSChart options={pieChartOptions} />
        </div>
      </div>
      {selectedEvent && (
        <div className="custom-modal-overlay">
          <div className="custom-modal-content">
            <button className="custom-close-modal" onClick={closeEventModal}>
              &times;
            </button>
            <img
              src={selectedEvent.imageurl}
              alt="Event"
              className="custom-modal-image"
            />
            <div className="custom-modal-header">
              <h2 className="custom-modal-title">{selectedEvent.eventname}</h2>
            </div>
            <div className="custom-modal-body">
              <div className="custom-modal-row">
                <strong>Department:</strong>
                <span className="custom-modal-value">
                  {selectedEvent.departments}
                </span>
              </div>
              <div className="custom-modal-row">
                <strong>Venue:</strong>
                <span className="custom-modal-value">
                  {selectedEvent.venue}
                </span>
              </div>
              <div className="custom-modal-row">
                <strong>Resource Person:</strong>
                <span className="custom-modal-value">
                  {selectedEvent.resourceperson}
                </span>
              </div>
              <div className="custom-modal-row">
                <strong>Year:</strong>
                <span className="custom-modal-value">{selectedEvent.year}</span>
              </div>
              <div className="custom-modal-row">
                <strong>Event Start Date:</strong>
                <span className="custom-modal-value">
                  {selectedEvent.eventstartdate}
                </span>
              </div>
              <div className="custom-modal-row">
                <strong>Event End Date:</strong>
                <span className="custom-modal-value">
                  {selectedEvent.eventenddate}
                </span>
              </div>
              <div className="custom-modal-row">
                <strong>Time:</strong>
                <span className="custom-modal-value">
                  {selectedEvent.eventstarttime} to {selectedEvent.eventendtime}
                </span>
              </div>
              <div className="custom-modal-row">
                <strong>Event Type:</strong>
                <span className="custom-modal-value">
                  {selectedEvent.typeofevent}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashBoard;
