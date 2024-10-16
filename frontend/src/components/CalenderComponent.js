import React, { useState } from "react";
import Calendar from "react-calendar";
import "../Calender.css";
import forwardarrow from "../assets/Forward Arrow.png";
import prevarrow from "../assets/Forward Arrow (1).png";
import { Link } from "react-router-dom";

const CalendarComponent = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isEventListOpen, setIsEventListOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

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

  const onClickDay = (value) => {
    setSelectedDate(value); 
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
    setSelectedDate(newDate);
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

  const eventsForSelectedDate = events.filter(
    (event) =>
      new Date(event.date).toLocaleDateString() ===
      selectedDate.toLocaleDateString()
  );

  const monthYearString = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <div>
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
          onClickDay={onClickDay} // Updated method here
          activeStartDate={currentDate}
        />
      </div>

      <div className="flex flex-row items-center justify-between w-[90%] xl:w-[92%] bg-white border-l-8 border-l-[#7848F4] rounded-md shadow-lg shadow-[#00000029] mt-10 transition-transform transform hover:scale-105">
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
      className="bg-gradient-to-r from-[#7848F4] to-[#9C5BFA] text-white text-center w-28 h-10 xl:w-36 xl:h-12 rounded-md font-Afacad text-lg xl:mr-20 flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105"
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
              Events for {selectedDate.toLocaleDateString("en-GB", {
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
                      <span className={`event-category ${event.category.toLowerCase()}`}>
                        {event.category}
                      </span>
                      <span className={`event-icon ${event.category.toLowerCase()}`}>
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
              src="https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?cs=srgb&dl=pexels-cottonbro-3171837.jpg&fm=jpg"
              alt="Event"
              className="custom-modal-image"
            />
            <h2 className="custom-modal-title">{selectedEvent.eventname}</h2>
            <p className="custom-modal-description">
              <strong>Start Time:</strong> {selectedEvent.starttime}
              <br />
              <strong>Description:</strong> {selectedEvent.description}
              <br />
              <strong>Location:</strong> {selectedEvent.location}
              <br />
              <strong>Contact:</strong> {selectedEvent.contact}
            </p>
            <p className="modal-date">
              <strong>{selectedDate.toLocaleDateString()}</strong>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarComponent;
