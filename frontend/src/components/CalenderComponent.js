import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "../Calender.css";
import forwardarrow from "../assets/Forward Arrow.png";
import "../resourceperson.css";
import Popup1 from "../PopupModels/Popup1";
import EndPopup from "../PopupModels/EndPopup";
import { FaSearch } from "react-icons/fa";
import prevarrow from "../assets/Forward Arrow (1).png";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "../Scroll.css";
import CanvasJSReact from "@canvasjs/react-charts";

import Popup2 from "../PopupModels/Popup2";
import { jwtDecode } from "jwt-decode";
const CalendarComponent = () => {
  const [Iqac, setIqac] = useState("");
  const [SearchQuery, setSearchQuery] = useState("");
  const [DepartmentPopup, SetDepartmentPopup] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isEventListOpen, setIsEventListOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isResourcePopupOpen, setIsResourcePopupOpen] = useState(false);
  useEffect(() => {
    if (isEventListOpen) {
      setIsEventListOpen(false);
    }
  }, [selectedEvent]);

  const today = new Date();
  const formattedToday = `${String(today.getDate()).padStart(2, "0")}/${String(
    today.getMonth() + 1
  ).padStart(2, "0")}/${String(today.getFullYear()).slice(-2)}`;
  const filteredData = data.filter((event) => {
    return event.eventstartdate === formattedToday;
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
    height: 300,
    width: 540,
  };

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded token: ", decoded);
        setName(decoded.name || "Guest");
        setRole(decoded.role || "User");
      } catch (error) {
        console.error("Error decoding token", error);
      }
    }
  }, []);

  const initializeForms = () => {
    const forms = {
      iqacno: "",
      Eventform: {},
      transportform: {},
      amenityform: {},
      guestroomform: {},
    };

    if (!localStorage.getItem("forms")) {
      localStorage.setItem("forms", JSON.stringify(forms));
      console.log("LocalStorage initialized with forms object.");
    }
  };
  const onClickDay = (value) => {
    setSelectedDate(value);
    console.log("Selected date🎉", value);
    setIsEventListOpen(true);
  };

  const closeEventList = () => {
    setIsEventListOpen(false); // Close the event list
  };

  const onChange = (newDate) => {
    setSelectedDate(newDate); // Update selected date
  };

  const updateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const nextMonth = () => updateMonth(1);
  const prevMonth = () => updateMonth(-1);

  const isFutureOrToday = (dateToCheck) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dateToCheck >= today;
  };

  const openEventModal = (event) => {
    setSelectedEvent(event);
    console.log("clicking on the selected event : ", event.iqac);
    setIqac(event.iqac);
  };

  const formatDate = (dateString) => {
    const parts = dateString.split("/");
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10) + 2000;
      return new Date(year, month, day);
    }
    return new Date(NaN);
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const eventsForSelectedDate = events.filter((event) => {
    // console.log("EVENTS in the first popup : ", event);
    const eventDate = new Date(event.date);
    const eventStartDate = formatDate(event.eventstartdate);
    const eventenddate = formatDate(event.eventenddate);
    const selectedDateObj = new Date(selectedDate);
    // console.log(selectedDateObj, "selected date obj");

    return (
      eventDate.toLocaleDateString() === selectedDate.toLocaleDateString() ||
      (selectedDateObj >= eventStartDate && selectedDateObj <= eventenddate)
    );
  });
  console.log("EVENTS in the first popup : ", eventsForSelectedDate);

  const monthYearString = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/event/getalldata`
        );
        console.log(response);
        const filteredData = response.data.eventdata;
        setData(filteredData);
        console.log("Filtered data:", filteredData);
        setEvents(filteredData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        toast.warning("No events today.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;

  return (
    <div>
      <ToastContainer />
      <div className="mb-8 -mt-16">
        <div
          className="relative w-full xl:w-96 mb-4 flex items-center space-x-4 ml-auto"
          style={{ left: "-70px" }}
        >
          <input
            type="text"
            placeholder="Search events..."
            className="w-full xl:h-14 pl-12 pr-20 border-2 border-purple-600 rounded-lg shadow-lg transition-all duration-300 focus:border-purple-800 focus:ring-2 focus:ring-purple-300 focus:outline-none"
            value={SearchQuery}
            onChange={handleSearchChange}
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-600">
            <FaSearch size={20} />
          </div>
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded-md">
            Search
          </button>
        </div>
        <div className="custom-calendar shadow-xl w-[50%] xl:overflow-y-hidden xl:mr-14 shadow-[#0000001f] xl:w-fit">
          <div className="calendar-navigation">
            <button onClick={prevMonth}>
              <img src={prevarrow} alt="previous month" />
            </button>
            <span className="month-year">{monthYearString}</span>
            <button onClick={nextMonth}>
              <img src={forwardarrow} alt="next month" />
            </button>
          </div>
          <Calendar
            onChange={onChange}
            value={selectedDate}
            className="react-calendar font-Afacad"
            minDetail="month"
            tileClassName={({ date }) => {
              return isFutureOrToday(date) ? "future-date" : "past-date";
            }}
            onClickDay={onClickDay}
            activeStartDate={currentDate}
          />
        </div>
        <div className="flex flex-row items-center justify-between w-[90%] xl:h-16 xl:w-[94%] bg-white border-l-8 border-l-[#7848F4] rounded-md shadow-lg shadow-[#00000029] mt-2 transition-transform transform hover:scale-105">
          <div className="ml-3 xl:ml-5 py-5">
            <p className="text-2xl font-bold text-gray-800 font-Afacad">
              {selectedDate.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
            <p className="text-[#7848F4] text-xl font-medium font-Afacad">
              {selectedDate.toLocaleDateString("en-GB", { weekday: "long" })}
            </p>
          </div>

          {role !== "ps" &&
            (isFutureOrToday(selectedDate) ? (
              <Link
                onClick={initializeForms}
                to="/Form"
                className="bg-gradient-to-r from-[#7848F4] to-[#9C5BFA] text-white text-center w-28 h-10 xl:w-36 xl:h-12 rounded-md font-Afacad text-lg xl:mr-1 flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105"
              >
                Add Event
              </Link>
            ) : (
              <button
                className="bg-gray-300 text-gray-600 cursor-not-allowed w-28 h-10 xl:w-36 xl:h-12 rounded-md font-Afacad text-lg xl:mr-20 flex items-center justify-center shadow-md"
                disabled
              >
                Add Event
              </button>
            ))}
        </div>
        <div className="w-[80%] mt-5 ml-24 h-[200px]">
          <CanvasJSChart options={pieChartOptions} />
        </div>
      </div>

      <div>
        {isEventListOpen && (
          <Popup1
            eventsForSelectedDate={eventsForSelectedDate}
            selectedDate={selectedDate}
            closeEventList={closeEventList}
            openEventModal={openEventModal}
          />
        )}
      </div>

      {selectedEvent && (
        <div className="absolute top-3 bottom-3 left-64 h-[100%] overflow-auto bg-white">
          <EndPopup iqac={Iqac} />
        </div>
      )}
    </div>
  );
};

export default CalendarComponent;
