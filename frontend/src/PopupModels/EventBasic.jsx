import React from "react";

const EventBasic = ({ eventData }) => {
  const eventsArray = Array.isArray(eventData) ? eventData : [eventData];
  console.log("events data inside the particular popup : ", eventsArray);

  return (
    <div>
      <img
        src="https://i.ibb.co/j3pBkkL/img-sece.jpg"
        style={{ display: "block", margin: "auto" }}
        alt="Image Description"
      />

      <h1 className="main-heading">Event Basic</h1>
      <table>
        <thead>
          <tr>
            <th>Department</th>
            <th>Event Venue</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Name of the Event</th>
            <th>Type of the Event</th>
          </tr>
        </thead>
        <tbody>
          {eventsArray.length > 0 ? (
            eventsArray.map((event, index) => (
              <tr key={index}>
                <td>
                  {event.departmentspecification
                    ? event.departmentspecification.join(", ")
                    : "N/A"}
                </td>
                <td>{event.venue || "N/A"}</td>
                <td>{event.eventstartdate || "N/A"}</td>
                <td>{event.eventenddate || "N/A"}</td>
                <td>{event.eventstarttime || "N/A"}</td>
                <td>{event.eventendtime || "N/A"}</td>
                <td>{event.eventname || "N/A"}</td>
                <td>{event.typeofevent || "N/A"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: "center" }}>
                No events available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EventBasic;
