import React, { useState, useEffect } from "react";
import { FaCalendar, FaSearch, FaTimesCircle } from "react-icons/fa";
import SideBar from "./SideBar";
import "../editmodal.css";
import axios from "axios";
import "../Calender.css";
import { toast, ToastContainer } from "react-toastify";
import Popup1 from "../PopupModels/Popup1";
import Popup2 from "../PopupModels/Popup2";
const today = new Date();

const products = [
  {
    name: "Computer and Communication Engineering",
    imageurl: "https://i.ibb.co/LNvgTTn/cce.jpg",
    date: today,
    count: 0,
  },
  {
    name: "Computer Science Engineering",
    imageurl: "https://i.ibb.co/pjx192W/cse.jpg",
    date: today,
  },
  {
    name: "Artificial Intelligence and Data Science",
    imageurl: "https://i.ibb.co/K6WmSZS/aids.jpg",
    date: today,
  },
  {
    name: "Electronics and Communication Engineering",
    imageurl: "https://i.ibb.co/48jZq57/ece.jpg",
    date: today,
  },
  {
    name: "Information Technology",
    imageurl: "https://i.ibb.co/6tYMCG2/it.jpg",
    date: today,
  },
  {
    name: "Mechanical Engineering",
    imageurl: "https://i.ibb.co/cC6vgS1/mech.png",
    date: today,
  },
  {
    name: "Artificial Intelligence and Machine Learning",
    imageurl: "https://i.ibb.co/bXswgkq/aiml.jpg",
    date: today,
  },
  {
    name: "Computer Science and Business Systems",
    imageurl: "https://i.ibb.co/BrP6Cc5/csbs.jpg",
    date: today,
  },
  {
    name: "Electrical and Electronics Engineering",
    imageurl: "https://i.ibb.co/s3MbZv2/eee.png",
    date: today,
  },
  {
    name: "Cybersecurity",
    imageurl: "https://i.ibb.co/s3MbZv2/eee.png",
    date: today,
  },
  {
    name: "otherspecification",
    imageurl: "https://digicult.it/wp-content/uploads/2022/03/earlylife.png",
    date: today,
  },
];
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

function Departments() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedEventclose, setSelectedEventclose] = useState(null);
  const [events, setEvents] = useState([]);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date("2024-10-14"));
  const [isEventListOpen, setIsEventListOpen] = useState(false);
  
  const [DepartmentPopup, SetDepartmentPopup] = useState(false);

  const [selecteddepartment, setdepartment] = useState("");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const [formData, setFormData] = useState({
    eventname: "",
    resourceperson: "",
    organizer: "",
    venue: "",
    department: "",
    eventstarttime: "",
    eventendtime: "",
    eventstartdate: "",
    eventenddate: "",
    typeofevent: "",
  });
  const token = localStorage.getItem("authToken");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const handleViewResourcePersons = () => {
    setIsResourcePopupOpen(true);
  };
  const closeResourcePopup = () => {
    SetDepartmentPopup(false);
    setIsResourcePopupOpen(false);
  };

  const [isResourcePopupOpen, setIsResourcePopupOpen] = useState(false);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedEvent = {
        eventId: selectedEvent._id,
        eventname: formData.eventname,
        resourceperson: formData.resourceperson,
        organizer: formData.organizer,
        venue: formData.venue,
        departments: [
          departmentOptions.find(
            (dept) => dept.shortName === formData.department
          )?.fullName,
        ],
        eventstarttime: formData.eventstarttime,
        eventendtime: formData.eventendtime,
        eventstartdate: formData.eventstartdate,
        eventenddate: formData.eventenddate,
        typeofevent: formData.typeofevent,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/event/modify_event`,
        updatedEvent
      );
      handleCloseModal();
      if (response.status === 201 || response.status === 200) {
        toast.success("Event added successfully!");
      }
    } catch (error) {
      handleCloseModal();
      toast.error(error.message);
    }
  };


  const convertTo12HourFormat = (time) => {
    if (!time) return "";
    let [hours, minutes] = time.split(":");
    hours = parseInt(hours, 10);
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; 
    return `${hours}:${minutes} ${ampm}`;
  };
  useEffect(() => {
    const getCount = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/event/gettotalcounts`
        );
        const totalCountsDept = response.data.TotalCountsDept[0].totalCounts;
        const updatedProducts = products.map((product) => {
          const departmentName = product.name;
          const count = totalCountsDept[departmentName] || 0;
          return {
            ...product,
            count: count,
          };
        });
        setData(updatedProducts);
      } catch (error) {
      }
    };
    setLoading(true);
    getCount();
  }, []); 

  
  const closeEventModal = () => {
    setSelectedEventclose(null);
  };

  const handleOpenModal = async (event) => {
    setdepartment(event);
    console.log("consoling the fetching department: ", { department: event });
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/event/getdepartmentdata`,
        { department: event }
      );

      console.log("response data: ", response);
      setIsEventListOpen(true);

      if (
        response.data &&
        response.data.events &&
        response.data.events.length > 0
      ) {
        setEvents(response.data.events);
        console.log("response data: ", response.data);
      } else {
        console.log("No events fetched");
        setEvents([]);
      }
    } catch (error) {
      console.error("Error fetching department events:", error);
    }
  };

  const openEventModal = (event) => {
    setSelectedEventclose(event);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedEvent(null);
  };
  const closeEventList = () => {
    setIsEventListOpen(false);
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };



  if (!loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="xl:ml-72 overflow-x-hidden">
      <SideBar />
      <div className="xl:flex flex-row justify-between items-center mb-3">
        <div className="absolute top-3 xl:relative xl:ml-[66%] xl:mt-5 flex justify-center xl:justify-end">
          <h1 className="text-xl ml-72 xl:mr-20 font-bold font-Afacad w-28 h-8 flex justify-center items-center xl:mb-3 shadow-md shadow-[#00000013] rounded-lg text-[#7848F4]">
            IQAC
          </h1>
        </div>
      </div>
      <div className="xl:flex xl:flex-row justify-between">
        <h1 className="xl:text-3xl ml-5 text-xl text-nowrap mt-3 mb-3 font-Afacad font-bold bg-gradient-to-r from-purple-500 to-violet-900 text-transparent bg-clip-text">
          Departments
        </h1>
        <div className="xl:relative xl:w-96 mt-1 mr-16 ml-5">
          <input
            type="text"
            placeholder="Enter the event name"
            value={searchTerm}
            onChange={handleSearch}
            className="xl:w-full xl:h-14 w-96 pl-5 h-14 xl:pl-10 xl:pr-16 border-[#7848F4] border rounded-md"
          />
          <div className="xl:absolute xl:left-2 xl:top-14 -mt-7 transform -translate-y-1/2 text-gray-400">
            <FaSearch className="xl:block hidden" />
          </div>
          <button className="xl:absolute font-Afacad right-2 top-1/2 ml-72 transform -translate-y-1/2 bg-[#7848F4] text-white px-4 py-1 rounded-sm">
            Search
          </button>
        </div>
      </div>
      <div className="xl:grid xl:grid-cols-3 xl:gap-6 flex flex-col gap-5 m-4 xl:mt-5">
        {data.map((dept, index) => (
          <div
            key={index}
            className="w-96 h-full shadow-md shadow-[#0b0b0c67] rounded-lg relative pb-16" // Added padding bottom
          >
            <img
              className="w-96 h-40 rounded-lg"
              src={dept.imageurl}
              alt={dept.name}
            />

            <div className="ml-5 mt-3 flex flex-row gap-1">
              <FaCalendar size={20} className="mt-1" color="#46459d" />
              <h1 className="text-xl text-[#8b21e8] font-Afacad">
                {dept.name}
              </h1>
            </div>

            <div className="absolute bottom-5 left-5 right-5 flex justify-between items-center">
              <button
                className="bg-violet-800 text-xl font-Afacad text-white font-bold rounded-md w-28"
                onClick={() => handleOpenModal(dept.name)}
              >
                View More
              </button>

              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#8b21e8] text-white">
                <span className="text-sm">{dept.count}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isEventListOpen && (
        <Popup1
          eventsForSelectedDate={events.filter(
            (event) => event.status === "pending"
          )}
          selectedDate={selectedDate}
          closeEventList={closeEventList}
          openEventModal={openEventModal}
        />
      )}
      {selectedEventclose && (
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

      {isOpen && (
        <div
          style={{ zIndex: 1000 }}
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
        >
          <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-3xl h-4/5 overflow-y-auto">
            <span
              className="absolute top-4 right-4 cursor-pointer"
              onClick={handleCloseModal}
              aria-label="Close"
            >
              <FaTimesCircle className="text-red-500 hover:text-red-700 text-xl" />
            </span>
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Edit Event
            </h2>
            <form onSubmit={handleFormSubmit}>
              {[
                { label: "Event Name", name: "eventname", type: "text" },
                {
                  label: "Resource Person",
                  name: "resourceperson",
                  type: "text",
                },
                { label: "Organizer", name: "organizer", type: "text" },
                { label: "Venue", name: "venue", type: "text" },
              ].map(({ label, name, type }) => (
                <label className="block mb-4" key={name}>
                  <span className="text-gray-700">{label}:</span>
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-100"
                    placeholder={`Enter ${label.toLowerCase()}`}
                  />
                </label>
              ))}

              <label className="block mb-4">
                <span className="text-gray-700">Department:</span>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-100"
                >
                  {departmentOptions.map((dept) => (
                    <option key={dept.shortName} value={dept.shortName}>
                      {dept.fullName}
                    </option>
                  ))}
                </select>
              </label>

              <fieldset className="mb-4">
                <legend className="text-gray-700">Type of Event:</legend>
                {["Technical", "Nontechnical", "Placement"].map((type) => (
                  <label key={type} className="block mb-2">
                    <input
                      type="radio"
                      name="typeofevent"
                      value={type}
                      checked={formData.typeofevent === type}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    {type}
                  </label>
                ))}
              </fieldset>

              {[
                {
                  label: "Event Start Time",
                  name: "eventstarttime",
                  type: "time",
                },
                { label: "Event End Time", name: "eventendtime", type: "time" },
                {
                  label: "Event Start Date",
                  name: "eventstartdate",
                  type: "date",
                },
                { label: "Event End Date", name: "eventenddate", type: "date" },
              ].map(({ label, name, type }) => (
                <label className="block mb-4" key={name}>
                  <span className="text-gray-700">{label}:</span>
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </label>
              ))}

              <button
                type="submit"
                className="mt-4 w-full bg-blue-500 text-white font-semibold rounded-lg py-2 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
              >
                Update Event
              </button>
            </form>
          </div>
        </div>
      )}
     
      <ToastContainer />
    </div>
  );
}

export default Departments;
