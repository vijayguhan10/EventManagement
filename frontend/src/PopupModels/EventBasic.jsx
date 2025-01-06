import React from "react";

const EventBasic = () => {
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
          <tr>
            <td>Placement</td>
            <td>Date</td>
            <td>Name</td>
            <td>9D4F3</td>
            <td>Dept</td>
            <td>9252837383</td>
            <td>Name of Event</td>
            <td>Type of Event</td>
          </tr>
          <tr>
            <td>Placement</td>
            <td>Date</td>
            <td>Name</td>
            <td>9D4F3</td>
            <td>Dept</td>
            <td>9252837383</td>
            <td>Name Of Event</td>
            <td>Type of Event</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EventBasic;
