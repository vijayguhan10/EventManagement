import React, { useState, useEffect } from "react";
import {
  FaCalendar,
  FaSearchLocation,
  FaSearch,
  FaTimes,
} from "react-icons/fa";
import SideBar from "./SideBar";
import "../Modal.css";
import axios from "axios";

const products = [
  {
    name: "Computer and Communication Engineering",
    imageurl: "https://i.ibb.co/LNvgTTn/cce.jpg",
  },
  {
    name: "Computer Science Engineering",
    imageurl: "https://i.ibb.co/pjx192W/cse.jpg",
  },
  {
    name: "Artificial Intelligence and Data Science",
    imageurl: "https://i.ibb.co/K6WmSZS/aids.jpg",
  },
  {
    name: "Electronics and Communication Engineering",
    imageurl: "https://i.ibb.co/48jZq57/ece.jpg",
  },
  {
    name: "Information Technology",
    imageurl: "https://i.ibb.co/6tYMCG2/it.jpg",
  },
  {
    name: "Mechanical Engineering",
    imageurl: "https://i.ibb.co/cC6vgS1/mech.png",
  },
  {
    name: "Artificial Intelligence and Machine Learning",
    imageurl: "https://i.ibb.co/bXswgkq/aiml.jpg",
  },
  {
    name: "Computer Science and Business Systems",
    imageurl: "https://i.ibb.co/BrP6Cc5/csbs.jpg",
  },
  {
    name: "Electrical and Electronics Engineering",
    imageurl: "https://i.ibb.co/s3MbZv2/eee.png",
  },
  {
    name: "Cybersecurity",
    imageurl: "https://i.ibb.co/s3MbZv2/eee.png",
  },
];

const events = [
  {
    date: "2024-10-14",
    eventname: "IOT Workshop",
    category: "Tech",
    starttime: "12:00 PM",
    description: "A workshop on the latest trends in IoT.",
    location: "Event Hall A, Main Campus",
    contact: "iotworkshop@example.com",
  },
  {
    date: "2024-10-14",
    eventname: "Onam Celebration",
    category: "Non Tech",
    starttime: "02:00 PM",
    description: "Cultural events to celebrate Onam.",
    location: "Central Auditorium",
    contact: "onamcelebration@example.com",
  },
  {
    date: "2024-10-15",
    eventname: "DSA Bootcamp",
    category: "Tech",
    starttime: "10:00 AM",
    description: "Data Structures and Algorithms bootcamp.",
    location: "Room 204, Main Campus",
    contact: "dsabootcamp@example.com",
  },
];

function Departments() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // Mocking the data load with static events
  useEffect(() => {
    setData(events);
  }, []);

  const handleOpenModal = (event) => {
    setSelectedEvent(event);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedEvent(null);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data.filter((event) =>
    event.eventname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
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
        {products.map((dept, index) => (
          <div
            key={index}
            className="w-96 h-full shadow-md shadow-[#0b0b0c67] rounded-lg relative"
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
            <div className="ml-5 flex flex-col gap-3 mt-3">
              <button
                className="bg-violet-800 mb-2 text-xl font-Afacad text-white font-bold rounded-md w-28"
                onClick={() => handleOpenModal(dept)}
              >
                View More
              </button>
            </div>
          </div>
        ))}
      </div>

      {isOpen && selectedEvent && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={handleCloseModal}>
              &times;
            </button>
            <h2 className="modal-date-title">
              Events for {selectedEvent.name}
            </h2>
            <ul className="event-list">
              {filteredData.length > 0 ? (
                filteredData.map((event, index) => (
                  <li
                    key={index}
                    className="event-item"
                    onClick={() => handleOpenModal(event)}
                  >
                    <div className="event-row">
                      <span className="event-name">{event.eventname}</span>
                      <span
                        className={`event-category ${event.category.toLowerCase()}`}
                      >
                        {event.category}
                      </span>
                      <span
                        className={`event-icon ${event.category.toLowerCase()}`}
                      >
                        {event.category === "Tech" ? "📘" : "📕"}
                      </span>
                    </div>
                    <hr className="event-divider" />
                  </li>
                ))
              ) : (
                <p>No events found.</p>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Departments;
