import React, { useState } from "react";
import Calendar from "react-calendar";
import "../Calender.css";
import forwardarrow from "../assets/Forward Arrow.png";
import prevarrow from "../assets/Forward Arrow (1).png";
import { FaStar } from "react-icons/fa";
const CalendarComponent = ({ events }) => {
  console.log("events passed to calendercomponenet : ", events);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onChange = (newDate) => {
    console.log("Selected date while click: ", newDate);
    setSelectedDate(newDate);
  };

  const updateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
    setSelectedDate(newDate);
  };

  const nextMonth = () => updateMonth(1);
  const prevMonth = () => updateMonth(-1);

  const monthYearString = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const isFutureOrToday = (dateToCheck) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dateToCheck >= today;
  };

  return (
    <div>
      <div className="custom-calendar shadow-xl w-[90%] xl:overflow-hidden xl:mr-14 shadow-[#0000001f] xl:w-fit">
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
          onClickDay={(value) => {
            console.log("Clicked date: ", value);
            setSelectedDate(value);
          }}
          activeStartDate={currentDate}
        />
      </div>
      <div className="flex flex-row border-l-[#7848F4] border-l-8 xl:items-center xl:justify-between xl:w-[92%] w-[90%] rounded-md shadow shadow-[#0000003d] mt-10">
        <div className="xl:ml-10 ml-3">
          <p className="text-2xl font-Afacad">
            {selectedDate.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
          <p className="text-[#7848F4] text-xl font-Afacad">
            {selectedDate.toLocaleDateString("en-GB", { weekday: "long" })}
          </p>
        </div>
        <button
          className={`${
            isFutureOrToday(selectedDate)
              ? "bg-[#7848F4] text-white"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          } font-Afacad w-24 h-7 mt-5 ml-10 text-xl xl:mr-20 shadow-md rounded-sm xl:w-36 shadow-[#0000003d]`}
          disabled={!isFutureOrToday(selectedDate)}
        >
          Add Event
        </button>
      </div>

      {/* Events List */}
      {/* Events List */}
      <div className="xl:h-52 h-96 overflow-scroll overflow-x-hidden shadow-md mt-12 border-l-[#7848F4] border-l-8 w-[92%] rounded-lg scrollbar-hide">
        {events && events.length > 0 ? (
          events.map((event, index) => {
            console.log("Rendering event:", event); // Log each event object
            return (
              <div
                key={index}
                className="relative flex mb-2 flex-row items-center ml-1 w-[92%] rounded-md shadow shadow-[#0000003d] mt-3"
              >
                <img
                  src={
                    event.imageURL ||
                    "https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?cs=srgb&dl=pexels-cottonbro-3171837.jpg&fm=jpg"
                  } 
                  className="xl:w-36 xl:ml-20 xl:h-20 w-28 h-24 m-2 rounded-lg"
                  alt="new event"
                />
                <div className="ml-10">
                  <p className="xl:text-2xl font-bold text-sm font-Afacad">
                    {event.eventname}
                  </p>
                  <p className="text-[#4746497c] font-Afacad text-sm xl:text-xl font-bold">
                    {event.eventname}
                  </p>
                  <p className="text-[#4746497c] font-Afacad xl:text-xl text-sm">
                    {event.eventstartdate} - {event.eventstarttime}
                  </p>
                </div>
                <div className="absolute top-0 right-0 mt-2 mr-2">
                  <FaStar color="#7848F4" />
                </div>
              </div>
            );
          })
        ) : (
          <p>No events available.</p>
        )}
      </div>
    </div>
  );
};

export default CalendarComponent;
