import React, { useState, useEffect } from "react";
import "../Scroll.css";
import "../resourceperson.css";
import { FaSearch, FaCheckCircle, FaTimes } from "react-icons/fa";
import CanvasJSReact from "@canvasjs/react-charts"; // Importing CanvasJS for pie chart
import SideBar from "./SideBar";
import CalendarComponent from "./CalenderComponent";
import { toast } from "react-toastify";
import cup from "../assets/cup.png";
import axios from "axios";
import Popup2 from "../PopupModels/Popup2";
import { jwtDecode } from "jwt-decode";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Dashboard = () => {
  const [DepartmentPopup, SetDepartmentPopup] = useState(false);

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
        console.log("Decoded token: ", decoded);
        setName(decoded.name || "Guest");
        setRole(decoded.role || "User");
      } catch (error) {
        console.error("Error decoding token", error);
      }
    }
  }, []);

  const closeResourcePopup = () => {
    SetDepartmentPopup(false);
    setIsResourcePopupOpen(false);
  };
  const handleDownloadClick = () => {
    setShowIcons(!showIcons);
  };
  const handleYearChange = (event, year) => {
    if (year === "All") {
      if (event.target.checked) {
        setSelectedYears([1, 2, 3, 4]);
      } else {
        setSelectedYears([]);
      }
    } else {
      setSelectedYears((prevSelected) => {
        if (prevSelected.includes(year)) {
          return prevSelected.filter((y) => y !== year);
        } else {
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
  const [isResourcePopupOpen, setIsResourcePopupOpen] = useState(false);
  const getShortName = (fullName) => {
    const department = departmentOptions.find(
      (dept) => dept.fullName === fullName
    );
    return department ? department.shortName : fullName;
  };
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
    if (!time) return "";
    let [hours, minutes] = time.split(":");
    hours = parseInt(hours, 10);
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert hour "0" to "12" for 12-hour format
    return `${hours}:${minutes} ${ampm}`;
  };

  const handleViewResourcePersons = () => {
    setIsResourcePopupOpen(true);
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
        toast.warning("No events today.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const openEventModal = (event) => {
    setSelectedEvent(event);
    console.log("resourse person of the event 👏👏👏👏", event);
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
  const [products, setProducts] = useState([
    { name: "Artificial Intelligence and Data Science" },
    { name: "Artificial Intelligence and Machine Learning" },
    { name: "Computer Science Engineering" },
    { name: "Computer Science and Business Systems" },
    { name: "Computer and Communication Engineering" },
    { name: "Cybersecurity" },
    { name: "Electrical and Electronics Engineering" },
    { name: "Electronics and Communication Engineering" },
    { name: "Information Technology" },
    { name: "Mechanical Engineering" },
  ]);
  const departmentNameMapping = {
    "Artificial Intelligence and Data Science": "AI & DS",
    "Artificial Intelligence and Machine Learning": "AI & ML",
    "Computer Science Engineering": "CSE",
    "Computer Science and Business Systems": "CSBS",
    "Computer and Communication Engineering": "CCE",
    Cybersecurity: "Cyber",
    "Electrical and Electronics Engineering": "EEE",
    "Electronics and Communication Engineering": "ECE",
    "Information Technology": "IT",
    "Mechanical Engineering": "MECH",
  };
  const [dataPoints, setDataPoints] = useState([]);
  useEffect(() => {
    const getCount = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/event/gettotalcounts`
        );
        const totalCountsDept = response.data.TotalCountsDept[0].totalCounts;

        const updatedDataPoints = products.map((product) => {
          const departmentName = product.name;
          const shortName =
            departmentNameMapping[departmentName] || departmentName;
          const count = totalCountsDept[departmentName] || 0;

          return {
            label: shortName,
            y: count,
          };
        });

        setDataPoints(updatedDataPoints);
      } catch (error) {
        console.error("Error fetching department counts:", error);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    getCount();
  }, [products]);
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
        dataPoints: dataPoints,
      },
    ],
  };
  const popupopen = () => {
    SetPopupPdf(!popupPDF);
  };
  const filteredSearchData = filteredData.filter((event) => {
    const department = Array.isArray(event.departments)
      ? event.departments.join(", ")
      : event.departments || "";

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
      className={`${
        popupPDF ? "bg-[#000000]" : ""
      } xl:overflow-y-hidden h-fit `}
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
          {/* <div className="absolute ml-[310%] mb-32 pl-">
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
            <div className="mx-auto p-0">
              <div className="max-h-[300px] border-black rounded-xl xl:w-[130%] overflow-y-auto bg-white animated-scrollbar overflow-x-hidden scroll-smooth">
                {filteredSearchData.length > 0 ? (
                  filteredSearchData.map((event, index) => (
                    <div
                      key={index}
                      className="relative border-black bg-gradient-to-bl from-[#7d3cf4b5] to-[#7312f1d3] text-white rounded-2xl flex justify-between items-center p-6 mb-6 shadow-2xl transition-transform transform hover:scale-105 cursor-pointer"
                      onClick={() => openEventModal(event)}
                    >
                      {/* Event Content */}
                      <div className="flex justify-between items-center w-full">
                        <div>
                          <h2 className="text-2xl font-bold">
                            {event.eventname}
                          </h2>
                          <p className="text-lg font-light">
                            {event.departments
                              .map((dept) => getShortName(dept))
                              .join(", ")}
                          </p>
                        </div>
                      </div>

                      {/* Status Icon Container in Top-Left */}
                      {/* <div className="absolute top-4 left-4 flex items-center space-x-2">
          {event.status === "decline" && (
            <FaTimes className="text-red-600 w-7 h-7" />
          )}
          {event.status === "completed" && (
            <FaCheckCircle className="text-green-600 w-7 h-7" />
          )}
        </div> */}

                      {/* Event Image (cup icon) */}
                      <img src={cup} alt="Event Icon" className="w-20 h-20" />
                    </div>
                  ))
                ) : (
                  <p>No events for today.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center ml-60 mb-4 w-full">
          <CalendarComponent
           />
        </div>
      </div>
      <div className="flex justify-center items-center mt-28 relative -left-[18%] bottom-32">
        <div className="w-full xl:w-[26%] h-auto bg-transparent">
          <CanvasJSChart options={pieChartOptions} />
        </div>
      </div>
      {selectedEvent && (
        <Popup2
          selectedEvent={selectedEvent}
          closeEventModal={closeEventModal}
          convertTo12HourFormat={convertTo12HourFormat}
          handleViewResourcePersons={handleViewResourcePersons}
          DepartmentPopup={DepartmentPopup}
          SetDepartmentPopup={SetDepartmentPopup}
          closeResourcePopup={closeResourcePopup}
        />
      )}
      {isResourcePopupOpen && (
        <div
          className="resource-popup-overlay"
          style={{
            zIndex: 9999,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="resource-popup-content"
            style={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              padding: "20px",
              width: "420px",
              height: "500px",
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
              position: "relative",
            }}
          >
            <h2
              className="resource-popup-title"
              style={{
                marginBottom: "15px",
                color: "#333",
                fontSize: "1.5rem",
              }}
            >
              Resource Persons
            </h2>
            <button
              className="custom-close-modal"
              onClick={closeResourcePopup}
              style={{
                position: "absolute",
                top: "10px",
                right: "15px",
                background: "none",
                border: "none",
                fontSize: "1.5rem",
                cursor: "pointer",
                color: "#999",
              }}
            >
              &times;
            </button>
            <div
              className="resource-person-list"
              style={{
                maxHeight: "400px",
                overflowY: "scroll",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {selectedEvent.resourceperson.length > 0 ? (
                selectedEvent.resourceperson.map((person, index) => {
                  const [key, value] = Object.entries(person)[0];
                  return (
                    <div
                      key={index}
                      className="resource-person-row"
                      style={{
                        padding: "10px 0",
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      <strong style={{ color: "#555" }}>{key}</strong>:{" "}
                      <span style={{ color: "#777" }}>{value}</span>
                    </div>
                  );
                })
              ) : (
                <p style={{ color: "#999", textAlign: "center" }}>
                  No resource persons available.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
