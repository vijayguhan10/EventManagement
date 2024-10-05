import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Default styles
import "./Calender.css"; 

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className="custom-calendar">
      <Calendar onChange={onChange} value={date} className="custom-calendar" />
      <p>Selected date: {date.toDateString()}</p>
    </div>
  );
};

export default CalendarComponent;
