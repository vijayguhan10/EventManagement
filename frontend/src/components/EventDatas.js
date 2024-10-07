import React, { useState } from "react";
import data from "../data/db.json";
import {
  FaCalendar,
  FaSearchLocation,
  FaSearch,
  FaTimes,
} from "react-icons/fa";
import SideBar from "./SideBar";
import "../Modal.css";

function EventDatas() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleOpenModal = (event) => {
    setSelectedEvent(event);
    setIsOpen(true);
  };

  // Function to handle closing the popup
  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="xl:ml-72 overflow-x-hidden">
      <SideBar />
      {/* IQAC Heading Section */}
      <div className="xl:flex flex-row justify-between items-center mb-3">
        <div className="absolute top-3 xl:relative xl:ml-[66%] xl:mt-5 flex justify-center xl:justify-end">
          <h1 className="text-xl ml-72 xl:mr-20 font-bold font-Afacad w-28 h-8 flex justify-center items-center xl:mb-3 shadow-md shadow-[#00000013] rounded-lg text-[#7848F4]">
            IQAC
          </h1>
        </div>
      </div>
      {/* Search Input and Title */}
      <div className="xl:flex xl:flex-row justify-between">
        <h1 className="xl:text-3xl ml-5 text-xl text-nowrap mt-3 mb-3 font-Afacad font-bold bg-gradient-to-r from-purple-500 to-violet-900 text-transparent bg-clip-text">
          Explore the Upcoming Events
        </h1>
        <div className="xl:relative xl:w-96 mt-1 mr-16 ml-5">
          <input
            type="text"
            placeholder="Enter the event name"
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
      {/* Events Grid */}
      <div className="xl:grid xl:grid-cols-3 xl:gap-6 flex flex-col gap-5 m-4 xl:mt-5">
        {data.map((event, index) => (
          <div
            key={index}
            className="w-96 h-full shadow-md shadow-[#0b0b0c67] rounded-lg relative"
          >
            <button className="bg-violet-600 mb-2 font-Afacad absolute ml-64 mt-1 text-white font-bold rounded-md w-28">
              {event.typeofevent}
            </button>
            <img
              className="w-96 h-40 rounded-lg"
              src={event.image_url}
              alt={event.eventname}
            />
            <div className="ml-5 mt-3 flex flex-row gap-1">
              <FaCalendar size={20} className="mt-1" color="#46459d" />
              <h1 className="text-xl text-[#8b21e8] font-Afacad">
                {event.eventenddate}
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
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-3xl mx-4 animate-open">
      <FaTimes
        size={30}
        className="absolute top-4 right-4 text-gray-600 cursor-pointer"
        onClick={handleCloseModal}
      />
      <h1 className="text-3xl font-bold mb-4">{selectedEvent.eventname}</h1>
      <div className="space-y-4">
        <p><strong className="xl:text-xl font-bold">Type:</strong> {selectedEvent.typeofevent}</p>
        <p><strong className="xl:text-xl font-bold">Description:</strong> {selectedEvent.eventDescription}</p>
        <p><strong className="xl:text-xl font-bold">Organizer:</strong> {selectedEvent.organizer}</p>
        <p><strong className="xl:text-xl font-bold">Venue:</strong> {selectedEvent.venue}</p>
        <p><strong className="xl:text-xl font-bold">Start:</strong> {selectedEvent.startDate} at {selectedEvent.startTime}</p>
        <p><strong className="xl:text-xl font-bold">End:</strong> {selectedEvent.endDate} at {selectedEvent.endTime}</p>
        <p><strong className="xl:text-xl font-bold">Specialization:</strong> {selectedEvent.specialization}</p>
        <p><strong className="xl:text-xl font-bold">Resource Person:</strong> {selectedEvent.resourcePerson}</p>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

export default EventDatas;
