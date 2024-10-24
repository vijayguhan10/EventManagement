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

function History() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [eventType, setEventType] = useState("All");
  const token = localStorage.getItem("authToken");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/event/getalldata`
        );
        const filteredData = response.data.eventdata.filter(
          (elem) =>
            ["Placement", "Technical", "Nontechnical"].includes(
              elem.typeofevent
            ) && elem.status === "decline"
        );
        console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvv : ", filteredData);
        setData(filteredData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const datafetch = (event) => {
    setEventType(event);
    const newFilteredData = data.filter((event) => {
      return eventType === "All" || event.typeofevent === event; // Update the condition as per your field
    });

    // Check if the first event exists after filtering
    if (newFilteredData.length > 0) {
      setSelectedEvent(newFilteredData[0]); // Set the first event as selected
    } else {
      setSelectedEvent(null); // Reset if no events match
    }
  };

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

  const filteredData = data.filter((event) => {
    const matchesSearchTerm = event.eventname
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesEventType =
      eventType === "All" || event.typeofevent === eventType; // Assuming your event data has a 'typeofevent' field
    return matchesSearchTerm && matchesEventType;
  });

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
          Explore the {eventType} Events
        </h1>

        {/* Filter UI */}
        <div className="mt-3 ml-5">
          <select
            value={eventType}
            onChange={(e) => datafetch(e.target.value)}
            className="p-2 border border-[#7848F4] rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-[#7848F4] transition"
          >
            <option value="All">All</option>
            <option value="Technical">Technical</option>
            <option value="Nontechnical">Non-Technical</option>
            <option value="Placement">Placement</option>
          </select>
        </div>

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
        {filteredData.map((event, index) => (
          <div
            key={index}
            className="w-96 h-full shadow-md shadow-[#0b0b0c67] rounded-lg relative"
          >
           
            <img
              className="w-96 h-40 rounded-lg"
              src={event.imageurl}
              alt={event.eventname}
            />
            <div className="ml-5 mt-3 flex flex-row gap-1">
              <FaCalendar size={20} className="mt-1" color="#46459d" />
              <h1 className="text-xl text-[#8b21e8] font-Afacad">
                {event.eventstartdate} - {event.eventenddate}
              </h1>
            </div>
            <div className="ml-5 flex flex-col gap-3 mt-3">
              <h1 className="font-bold text-3xl font-Afacad">
                {event.eventname}
              </h1>
              <h1 className="font-bold text-gray-500 text-xl font-Afacad">
                {event.organizer}
              </h1>
              <div className="flex flex-row">
                <FaSearchLocation
                  className="mt-1 mr-1 font-Afacad"
                  color="#06060b9b"
                />
                <h1 className="font-bold text-xl text-[#06060b9b]">
                  {event.venue}
                </h1>
              </div>
              <button
                className="bg-violet-800 mb-2 text-xl font-Afacad text-white font-bold rounded-md w-28"
                onClick={() => handleOpenModal(event)}
              >
                View More
              </button>
            </div>
          </div>
        ))}
      </div>

      {isOpen && selectedEvent && (
  <div className="custom-modal-overlay">
    <div className="custom-modal-content">
      <button className="custom-close-modal" onClick={handleCloseModal}>
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
          <span className="custom-modal-value">{selectedEvent.departments}</span>
        </div>
        <div className="custom-modal-row">
          <strong>Venue:</strong>
          <span className="custom-modal-value">{selectedEvent.venue}</span>
        </div>
        <div className="custom-modal-row">
          <strong>Resource Person:</strong>
          <span className="custom-modal-value">{selectedEvent.resourceperson}</span>
        </div>
        <div className="custom-modal-row">
          <strong>Year:</strong>
          <span className="custom-modal-value">{selectedEvent.year}</span>
        </div>
        <div className="custom-modal-row">
          <strong>Event Start Date:</strong>
          <span className="custom-modal-value">{selectedEvent.eventstartdate}</span>
        </div>
        <div className="custom-modal-row">
          <strong>Event End Date:</strong>
          <span className="custom-modal-value">{selectedEvent.eventenddate}</span>
        </div>
        <div className="custom-modal-row">
          <strong>Time:</strong>
          <span className="custom-modal-value">
            {selectedEvent.eventstarttime} to {selectedEvent.eventendtime}
          </span>
        </div>
        <div className="custom-modal-row">
          <strong>Event Type:</strong>
          <span className="custom-modal-value">{selectedEvent.typeofevent}</span>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

export default History;
