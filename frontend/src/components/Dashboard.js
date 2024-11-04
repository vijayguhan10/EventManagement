import React, { useState, useEffect } from "react";
import "../Scroll.css";

import { FaFilePdf, FaSearch, FaFileExcel } from "react-icons/fa";
import CanvasJSReact from "@canvasjs/react-charts"; // Importing CanvasJS for pie chart
import SideBar from "./SideBar";
import CalendarComponent from "./CalenderComponent";
import { toast } from "react-toastify";
import cup from "../assets/cup.png";
import axios from "axios";

import { jwtDecode } from "jwt-decode";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Dashboard = () => {
  const [showIcons, setShowIcons] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // New state for search

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [departments, setDepartments] = useState([]);
  const [isFullYear, setIsFullYear] = useState(false);
  const [selectedYears, setSelectedYears] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded token: ", decoded); // This will help you see if the token contains name and role
        setName(decoded.name || "Guest");
        setRole(decoded.role || "User");
      } catch (error) {
        console.error("Error decoding token", error);
      }
    }
  }, []);

  const handleDownloadClick = () => {
    setShowIcons(!showIcons);
  }
  const handleYearChange = (event, year) => {
    if (year === "All") {
      if (event.target.checked) {
        setSelectedYears([1, 2, 3, 4]);
      } else {
        // When "All" is deselected, clear the state
        setSelectedYears([]);
      }
    } else {
      setSelectedYears((prevSelected) => {
        if (prevSelected.includes(year)) {
          // If a specific year is deselected
          return prevSelected.filter((y) => y !== year);
        } else {
          // If a specific year is selected
          return [...prevSelected, year].filter((y) => y !== "All"); // Remove "All" if selecting individual years
        }
      });
    }
  };

  const departmentOptions = [
    { fullName: "Computer and Communication Engineering", shortName: "CCE" },
    { fullName: "Computer Science Engineering", shortName: "CSE" },
    {
      fullName: "Artificial Intelligence and Data Science",
      shortName: "AI & DS",
    },
    { fullName: "Electronics and Communication Engineering", shortName: "ECE" },
    { fullName: "Information Technology", shortName: "IT" },
    { fullName: "Mechanical Engineering", shortName: "MECH" },
    {
      fullName: "Artificial Intelligence and Machine Learning",
      shortName: "AI & ML",
    },
    { fullName: "Computer Science and Business Systems", shortName: "CSBS" },
    { fullName: "Electrical and Electronics Engineering", shortName: "EEE" },
    { fullName: "Cybersecurity", shortName: "Cyber" },
    { fullName: "All", shortName: "All" },
  ];
  const handleDepartmentChange = (event) => {
    const selectedDeptShortName = event.target.value;
    if (selectedDeptShortName === "All") {
      if (event.target.checked) {
        setDepartments(["All"]);
      } else {
        setDepartments([]);
      }
    } else {
      const selectedDeptFullName = departmentOptions.find(
        (dept) => dept.shortName === selectedDeptShortName
      ).fullName;

      setDepartments((prevDepartments) => {
        if (prevDepartments.includes("All")) {
          return [selectedDeptFullName];
        }

        return prevDepartments.includes(selectedDeptFullName)
          ? prevDepartments.filter((dept) => dept !== selectedDeptFullName)
          : [...prevDepartments, selectedDeptFullName];
      });
    }
  };
  const convertTo12HourFormat = (time) => {
    if (!time) return '';
    let [hours, minutes] = time.split(':');
    hours = parseInt(hours, 10);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert hour "0" to "12" for 12-hour format
    return `${hours}:${minutes} ${ampm}`;
  };
  
  const handleFullYearChange = () => {
    setIsFullYear(!isFullYear);
    if (!isFullYear) {
      setFromDate("");
      setToDate("");
    }
  };
  const handleGeneratePDF = async () => {
    if (departments.length === 0 || selectedYears.length === 0) {
      setErrorMessage(
        "Please select at least one department and one year to generate the PDF."
      );
      return;
    }

    if (!isFullYear && (!fromDate || !toDate)) {
      setErrorMessage("Please select a valid date range to generate the PDF.");
      return;
    }

    setErrorMessage("");

    console.log("Selected year for PDF generation:", selectedYears);

    const selectedData = {
      departments: departments,
      ...(isFullYear ? { fullYear: true } : { fromDate, toDate }),
      year: selectedYears.includes("All") ? "All" : selectedYears,
    };

    console.log("Selected data for PDF generation:", selectedData);

    try {
      const response = await axios({
        url: `${process.env.REACT_APP_BASE_URL}/event/generatedpdf-doc`,
        method: "GET",
        params: selectedData,
        responseType: "blob",
      });

      console.log("PDF generation response:", response);

      const blob = new Blob([response.data], { type: "application/pdf" });
      const link = document.createElement("a");

      link.href = window.URL.createObjectURL(blob);
      link.download = "events-report.pdf";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Error fetching PDF:", error);
    }
  };

  const [data, setData] = useState([]);

  const [popupPDF, SetPopupPdf] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
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
        console.log("😪");
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/event/getalldata`
        );
        console.log(response.data);
        const filteredData = response.data.eventdata;
        setData(filteredData);
        console.log("😒😒😒", filteredData);
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
    console.log("resourse person of the event 👏👏👏👏",event)
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0); 

  const filteredData = data.filter((event) => {
    const [dayStart, monthStart, yearStart] = event.eventstartdate.split("/");
    const [dayEnd, monthEnd, yearEnd] = event.eventenddate.split("/");

    const eventStartDate = new Date(`20${yearStart}-${monthStart}-${dayStart}`);
    const eventEndDate = new Date(`20${yearEnd}-${monthEnd}-${dayEnd}`);

    eventStartDate.setHours(0, 0, 0, 0);
    eventEndDate.setHours(0, 0, 0, 0);

    return eventStartDate <= today && eventEndDate >= today;
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
  const popupopen = () => {
    SetPopupPdf(!popupPDF);
  };
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
      className={`${popupPDF ? "bg-[#000000]" : ""} xl:overflow-y-hidden h-fit `}
    >
      <SideBar />
      <div className="flex flex-col xl:flex-row w-full pt-10 xl:pt-20 relative">
        <div className="absolute top-4 flex left-[18%] items-center">
          <div className="text-nowrap flex-col mb-28 ">
            <h1 className="text-3xl   font-bold">
              Welcome, <span>{name}</span>
            </h1>
            <h1 className="text-xl font-Afacad mt-3 font-bold">Todays Data</h1>
          </div>
          {/* <div className="relative ml-[58%] mb-32 pl-">
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
          </div> */}
        </div>
        <div className="xl:ml-72 h-80 mt-5 xl:w-[80%] w-full bg-white">
          <div className="mx-auto p-0">
            <div className="max-h-[300px] border-black rounded-xl xl:w-[130%] overflow-y-auto bg-white animated-scrollbar overflow-x-hidden scroll-smooth">
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
      <div className="flex justify-center items-center mt-28 relative -left-[18%] bottom-32">
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
        src={selectedEvent.imageurl}
        alt="Event"
        className="custom-modal-image"
      />
      <div className="custom-modal-header">
        <h2 className="custom-modal-title">{selectedEvent.eventname}</h2>
      </div>
      <div className="custom-modal-body">
      {selectedEvent.departments && selectedEvent.departments.length > 0 && (
  <div className="custom-modal-row">
    <strong>Department:</strong>
    <span className="custom-modal-value">
      {selectedEvent.departments}
    </span>
  </div>
)}

        <div className="custom-modal-row">
          <strong>Specification:</strong>
          <span className="custom-modal-value">
            {selectedEvent.departmentspecification}
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
            {selectedEvent.resourceperson && selectedEvent.resourceperson.length > 0 ? (
              selectedEvent.resourceperson.map((person, index) => (
                <div key={index}>{person}</div> // Adjust as needed (e.g., person.name if it's an object)
              ))
            ) : (
              <em>No resource persons available</em> // Optional fallback text
            )}
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
    {convertTo12HourFormat(selectedEvent.eventstarttime)} to {convertTo12HourFormat(selectedEvent.eventendtime)}
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

<div className="container absolute bottom-[-1%] left-[55%] w-[43%] mx-auto p-4 border-black rounded-xl shadow-lg">
  <h1 className="text-xl font-bold text-center text-black ">
    Department Report Generator
  </h1>
  {errorMessage && (
    <p className="text-red-600 text-center mt-1">{errorMessage}</p>
  )}
  
  {/* Date Range Selection and Full Year Option */}
  <div className="flex justify-between items-center space-x-4 mb-2">
    {/* From Date */}
    <div>
      <h2 className="text-xl font-semibold text-gray-700">From Date</h2>
      <input
        type="date"
        value={fromDate}
        onChange={(e) => setFromDate(e.target.value)}
        className="p-2 border rounded-lg focus:outline-none w-48 text-xl h-10 focus:ring-2 focus:ring-green-400"
        disabled={isFullYear}
      />
    </div>

    {/* To Date */}
    <div>
      <h2 className="text-xl font-semibold text-gray-700">To Date</h2>
      <input
        type="date"
        value={toDate}
        onChange={(e) => setToDate(e.target.value)}
        className="p-2 border rounded-lg focus:outline-none w-48 text-xl h-10 focus:ring-2 focus:ring-green-400"
        disabled={isFullYear}
      />
    </div>

    {/* Full Year Option */}
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={isFullYear}
        onChange={handleFullYearChange}
        className="form-checkbox h-4 w-4 text-green-600"
      />
      <label className="text-gray-700 text-xl font-semibold">Full Year</label>
    </div>
  </div>

  {/* Department Selection */}
  <div className="mb-2">
    <h2 className="text-lg font-semibold text-gray-700 mb-2">Departments</h2>
    <div className="flex flex-wrap gap-4">
      {departmentOptions.map((department) => (
        <div key={department.shortName} className="flex items-center font-bold space-x-2">
          <input
            type="checkbox"
            value={department.shortName}
            checked={departments.includes(department.fullName)}
            onChange={handleDepartmentChange}
            className="form-checkbox font-bold h-4 w-4 text-green-600"
            disabled={departments.includes("All") && department.shortName !== "All"}
          />
          <span className="text-gray-700 font-bold text-lg">
            {department.shortName}
          </span>
        </div>
      ))}
    </div>
  </div>

  {/* Year Selection */}
 {/* Year Selection */}
<div className="mb-4 flex">
  <h2 className="text-xl font-semibold text-gray-700 mb-2 pr-4">Year</h2>
  <div className="flex gap-2">
    {[1, 2, 3, 4, "All"].map((year) => (
      <div key={year} className="flex items-center space-x-3"> {/* Adjusted space-x */}
        <input
          type="checkbox"
          value={year}
          checked={year === "All" ? selectedYears.length === 4 : selectedYears.includes(year)}
          onChange={(e) => handleYearChange(e, year)}
          className="form-checkbox h-4 w-4 text-green-600"
          disabled={selectedYears.includes("All") && year !== "All"}
        />
        <label className="text-gray-700 text-lg">{year}</label>
      </div>
    ))}
  </div>
</div>


  {/* Download Section */}
  <div className="text-center mb-4 flex items-center space-x-4">
    {showIcons && (
      <>
        <FaFilePdf
          size={34}
          color="#7312f1d3"
          onClick={handleGeneratePDF}
          className="cursor-pointer hover:scale-105 transition-transform duration-300"
        />
        <FaFileExcel
          size={34}
          color="#7312f1d3"
          onClick={handleGeneratePDF}
          className="cursor-pointer hover:scale-105 transition-transform duration-300"
        />
      </>
    )}
    <button
      type="button"
      onClick={handleDownloadClick}
      className="focus:outline-none text-white bg-[#7312f1d3] hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-md text-sm px-3 py-1.5 mb-2 transition-all duration-300"
    >
      {showIcons ? 'Hide' : 'Download'}
    </button>
  </div>
</div>

    </div>
  );
};

export default Dashboard;
