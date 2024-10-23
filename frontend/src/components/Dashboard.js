import React, { useState, useEffect } from "react";
import "../Scroll.css";
import { FaSearch } from "react-icons/fa";
import CanvasJSReact from "@canvasjs/react-charts"; // Importing CanvasJS for pie chart
import SideBar from "./SideBar";
import CalendarComponent from "./CalenderComponent";
import { toast } from "react-toastify";
import cup from "../assets/cup.png";
import axios from "axios";
// import cup from "../assets/cup.png";
// import Departments from './Departments';
import { jwtDecode } from "jwt-decode";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Dashboard = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const[select,isselect]=useState();

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
  const handleYearChange = (event, year) => {
    if (year === "All") {
      if (event.target.checked) {
        setSelectedYears([1,2,3,4]);
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
  console.log(selectedDeptShortName,"bbvbvbvbvvbvbbvb")
    if (selectedDeptShortName === "All") {
      if (event.target.checked) {
        setDepartments(["All"]);
      } else {
        // If "All" is unchecked, clear the departments
        setDepartments([]);
      }
    } else {
      // For any other department
      const selectedDeptFullName = departmentOptions.find(
        (dept) => dept.shortName === selectedDeptShortName
      ).fullName;
  
      setDepartments((prevDepartments) => {
        // If "All" is selected, clear it and add the selected department
        if (prevDepartments.includes("All")) {
          return [selectedDeptFullName];
        }
  
        // Toggle the selected department (add/remove it)
        return prevDepartments.includes(selectedDeptFullName)
          ? prevDepartments.filter((dept) => dept !== selectedDeptFullName)
          : [...prevDepartments, selectedDeptFullName];
      });
    }
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
      setErrorMessage("Please select at least one department and one year to generate the PDF.");
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
      year: selectedYears.includes("All") ? "All" : selectedYears
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
  const currentEvents = data.currentEvents || [];
  const futureEvents = data.futureEvents || [];
  const [popupPDF, SetPopupPdf] = useState(false);
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
        console.log("😪");
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/event/getalldata`
        );
        console.log(response);
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
  };

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
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-600">
              <FaSearch size={20} />
            </div>
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded-md">
              Search
            </button>
          </div>
        </div>

        <div className="xl:ml-72 h-80 mt-5 xl:w-[80%] w-full bg-white">
          <div className="mx-auto p-0">
            <div className="max-h-[300px] border-black rounded-xl xl:w-[130%] overflow-y-auto bg-white animated-scrollbar overflow-x-hidden scroll-smooth">
              {filteredData.length > 0 ? (
                filteredData.map((event, index) => (
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

<div className="container absolute bottom-[-3%] left-[55%] w-[43%] mx-auto p-4 border-black rounded-xl shadow-lg">

  <h1 className="text-xl font-bold text-center text-black mb-4">
    Department Report Generator
  </h1>
  {errorMessage && (
    <p className="text-red-600 text-center mt-2">{errorMessage}</p>
  )}
  {/* Date Range Selection and Full Year Option */}
  <div className="flex justify-between items-center space-x-4 mb-4">
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
      <label className="text-gray-700 text-xl font-semibold">
        Full Year
      </label>
    </div>
  </div>

  {/* Department Selection */}
 {/* Department Selection */}
{/* Department Selection */}
<div className="mb-4">
  <h2 className="text-xl font-semibold text-gray-700 mb-2">
    Departments
  </h2>
  <div className="flex flex-wrap gap-4">
    {/* Map over departmentOptions */}
    {departmentOptions.map((department) => (
      <div
        key={department.shortName}
        className="flex items-center font-Afacad font-bold space-x-2"
      >
        <input
          type="checkbox"
          value={department.shortName}
          checked={departments.includes(department.fullName)}
          onChange={handleDepartmentChange}
          className="form-checkbox font-Afacad font-bold h-4 w-4 text-green-600"
          disabled={departments.includes("All") && department.shortName !== "All"} // Disable if "All" is selected
        />
        <span className="text-gray-700 font-Afacad font-bold text-lg">
          {department.shortName}
        </span>
      </div>
    ))}
  </div>
</div>



{/* Year Selection */}
<div className="mb-4">
  <h2 className="text-xl font-semibold text-gray-700 mb-2">Year</h2>
  <div className="flex gap-4">
    {[1, 2, 3, 4, "All"].map((year) => (
      <div key={year} className="flex items-center space-x-2">
        <input
          type="checkbox"
          value={year}
          checked={year === "All" ? selectedYears.length === 4 : selectedYears.includes(year)}
          onChange={(e) => handleYearChange(e, year)}
          className="form-checkbox h-4 w-4 text-green-600"
          disabled={selectedYears.includes("All") && year !== "All"} // Disable if "All" is selected
        />
        <label className="text-gray-700 text-lg">{year}</label>
      </div>
    ))}
  </div>
</div>


{/* Generate PDF Button */}
<div className="text-center">
  <button
    onClick={handleGeneratePDF}
    className="relative bg-gradient-to-r ml-80 from-[#7848F4] to-[#9C5BFA] text-white text-center w-28 h-10 xl:w-36 xl:h-12 rounded-md font-Afacad text-lg xl:mr-20 flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105"
    style={{ top: '-20px' }} 
  >
    Generate PDF
  </button>

  {/* Display Error Message */}

</div>


</div>

    </div>
  );
};

export default Dashboard;
