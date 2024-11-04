import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "../Calender.css";
import forwardarrow from "../assets/Forward Arrow.png";
import "../resourceperson.css"

import { FaFilePdf, FaSearch, FaFileExcel } from "react-icons/fa";
import prevarrow from "../assets/Forward Arrow (1).png";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "../Scroll.css";
const CalendarComponent = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isEventListOpen, setIsEventListOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [isFullYear, setIsFullYear] = useState(false);
  const [selectedYears, setSelectedYears] = useState([]);
  const [showIcons, setShowIcons] = useState(false);
  const [departments, setDepartments] = useState([]);
  
  const [isResourcePopupOpen, setIsResourcePopupOpen] = useState(false);
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

  const closeResourcePopup = () => {
    setIsResourcePopupOpen(false);
  }
  const handleViewResourcePersons = () => {
    setIsResourcePopupOpen(true);
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

  const onClickDay = (value) => {
    setSelectedDate(value);
    console.log("Selected date🎉", value); // Log the clicked date
    setIsEventListOpen(true);
  };

  const closeEventList = () => {
    setIsEventListOpen(false); // Close the event list
  };

  const closeEventModal = () => {
    setSelectedEvent(null);
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
    setSelectedEvent(event); // Set the selected event
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

  const eventsForSelectedDate = events.filter((event) => {
    const eventDate = new Date(event.date);
    const eventStartDate = formatDate(event.eventstartdate);

    return (
      eventDate.toLocaleDateString() === selectedDate.toLocaleDateString() ||
      eventStartDate.toLocaleDateString() === selectedDate.toLocaleDateString()
    );
  });
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
  const monthYearString = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
  const convertTo12HourFormat = (time) => {
    if (!time) return '';
    let [hours, minutes] = time.split(':');
    hours = parseInt(hours, 10);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert hour "0" to "12" for 12-hour format
    return `${hours}:${minutes} ${ampm}`;
  };
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
        toast.error("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <ToastContainer />
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

        {isFutureOrToday(selectedDate) ? (
          <Link
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
        )}
      </div>

      {/* Event List Modal */}
      {isEventListOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={closeEventList}>
              &times;
            </button>
            <h2 className="modal-date-title">
              Events for{" "}
              {selectedDate.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </h2>
            <ul className="event-list">
              {eventsForSelectedDate.length > 0 ? (
                eventsForSelectedDate.map((event, index) => (
                  <li
                    key={index}
                    className="event-item"
                    onClick={() => openEventModal(event)}
                  >
                    <div className="event-row">
                      <span className="event-name">{event.eventname}</span>
                      <span
                        className={`event-category ${
                          event.category
                            ? event.category.toLowerCase()
                            : "default-category"
                        }`}
                      >
                        {event.typeofevent || "Unknown Category"}
                      </span>
                      <span
                        className={`event-category ${
                          event.category
                            ? event.category.toLowerCase()
                            : "default-category"
                        }`}
                      >
                        {event.departments || "Unknown Category"}
                      </span>
                      <span
                        className={`event-icon ${
                          event.category
                            ? event.category.toLowerCase()
                            : "default-category"
                        }`}
                      >
                        {event.category === "Tech" ? "📘" : "📕"}
                      </span>
                    </div>
                    <hr className="event-divider" />
                  </li>
                ))
              ) : (
                <p>No events for this date.</p>
              )}
            </ul>
          </div>
        </div>
      )}

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
                  <button onClick={handleViewResourcePersons}>View</button>
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
      
      <div className="container absolute bottom-[-80%] left-[55%] w-[43%] mx-auto p-4 border-black rounded-xl shadow-lg z-50">
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
{isResourcePopupOpen && (
  <div className="resource-popup-overlay" style={{ zIndex: 9999, backgroundColor: 'rgba(0, 0, 0, 0.6)', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <div className="resource-popup-content" style={{ backgroundColor: '#fff', borderRadius: '10px', padding: '20px', width: '420px', height: '500px', boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)', position: 'relative' }}>
      <h2 className="resource-popup-title" style={{ marginBottom: '15px', color: '#333', fontSize: '1.5rem' }}>Resource Persons</h2>
      <button className="custom-close-modal" onClick={closeResourcePopup} style={{ position: 'absolute', top: '10px', right: '15px', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#999' }}>
        &times;
      </button>
      <div className="resource-person-list" style={{ maxHeight: '400px', overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {selectedEvent.resourceperson.length > 0 ? (
          selectedEvent.resourceperson.map((person, index) => {
            const [key, value] = Object.entries(person)[0];
            return (
              <div key={index} className="resource-person-row" style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>
                <strong style={{ color: '#555' }}>{key}</strong>: <span style={{ color: '#777' }}>{value}</span>
              </div>
            );
          })
        ) : (
          <p style={{ color: '#999', textAlign: 'center' }}>No resource persons available.</p>
        )}
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default CalendarComponent;
