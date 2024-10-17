import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "../Calender.css";
import forwardarrow from "../assets/Forward Arrow.png";
import prevarrow from "../assets/Forward Arrow (1).png";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const CalendarComponent = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isEventListOpen, setIsEventListOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

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
    // Format "17/10/24" to a Date object
    const parts = dateString.split('/');
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // Month is zero-indexed
      const year = parseInt(parts[2], 10) + 2000; // Assuming 20xx for '24'
      return new Date(year, month, day);
    }
    // Fallback to returning an invalid date
    return new Date(NaN);
  };

  const eventsForSelectedDate = events.filter((event) => {
    const eventDate = new Date(event.date); // Assuming 'event.date' is in format "2024-10-14"
    const eventStartDate = formatDate(event.eventstartdate); // Format "17/10/24" to Date object

    return (
      eventDate.toLocaleDateString() === selectedDate.toLocaleDateString() ||
      eventStartDate.toLocaleDateString() === selectedDate.toLocaleDateString()
    );
  });

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
        const filteredData = response.data.eventdata.filter(
          (elem) => elem.status === "pending"
        );
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
      <ToastContainer /> {/* Toast container for notifications */}
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

      <div className="flex flex-row items-center justify-between w-[90%] xl:w-[94%] bg-white border-l-8 border-l-[#7848F4] rounded-md shadow-lg shadow-[#00000029] mt-2 transition-transform transform hover:scale-105">
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
            className={`event-category ${event.category ? event.category.toLowerCase() : 'default-category'}`}
          >
            {event.typeofevent || 'Unknown Category'}
          </span>
          <span
            className={`event-category ${event.category ? event.category.toLowerCase() : 'default-category'}`}
          >
            {event.departments || 'Unknown Category'}
          </span>
          <span
            className={`event-icon ${event.category ? event.category.toLowerCase() : 'default-category'}`}
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
              src="https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?cs=srgb&dl=pexels-cottonbro-3171837.jpg&fm=jpg"
              alt="Event"
              className="custom-modal-image"
            />
            <h2 className="custom-modal-title">{selectedEvent.eventname}</h2>
            <p className="custom-modal-description">
            <strong>Department:</strong> {selectedEvent.departments}
            <br />
        
              <strong>Start Time:</strong> {selectedEvent.eventstarttime}
              <br />
              <strong>End Time:</strong> {selectedEvent.eventendtime}
              <br />
              <strong>End End date:</strong> {selectedEvent.eventstartdate}
              <br />
              <strong>start Date:</strong> {selectedEvent.eventenddate}
              <br />
            
              <strong>Venue:</strong> {selectedEvent.venue}
              <br />
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarComponent;
