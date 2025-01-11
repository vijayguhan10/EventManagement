import React from "react";

const EventBasic2 = ({ eventData }) => {
  return (
    <div>
      <h1 className="main-heading">Event Basic 2</h1>
      <table>
        <thead>
          <tr>
            <th>Organizers</th>
            <th>Year</th>
            <th>Categories</th>
            <th>Professional Societies and Bodies Involved</th>
            <th>Resource Persons</th>
            <th>Logo</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {/* Organizers */}
            <td>
              <table className="nested-table">
                <thead>
                  <tr>
                    <th>Employee ID</th>
                    <th>Name</th>
                    <th>Designation</th>
                    <th>Phone No.</th>
                  </tr>
                </thead>
                <tbody>
                  {eventData.organizer &&
                    eventData.organizer.map((organizer, index) => (
                      <tr key={index}>
                        <td>{organizer.employeeid || "N/A"}</td>
                        <td>{organizer.name || "N/A"}</td>
                        <td>{organizer.designation || "N/A"}</td>
                        <td>{organizer.phone || "N/A"}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </td>

            {/* Year */}
            <td>{eventData.year || "N/A"}</td>

            {/* Categories */}
            <td>{eventData.categories || "N/A"}</td>

            {/* Professional Societies */}
            <td>
              {eventData.international && Array.isArray(eventData.international)
                ? eventData.international.map((society, index) => (
                    <span key={index}>
                      {society}
                      {index !== eventData.international.length - 1 && ", "}
                    </span>
                  ))
                : "N/A"}
            </td>

            {/* Resource Persons */}
            <td>
              <table className="nested-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Affiliation</th>
                  </tr>
                </thead>
                <tbody>
                  {eventData.resourceperson &&
                    eventData.resourceperson.map((person, index) => (
                      <tr key={index}>
                        <td>{Object.keys(person)[0]}</td>
                        <td>{Object.values(person)[0]}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </td>

            <td>
              {eventData.logos && Array.isArray(eventData.logos)
                ? eventData.logos.map((logo, index) => (
                    <span key={index}>
                      {logo}
                      {index !== eventData.logos.length - 1 && ", "}
                    </span>
                  ))
                : "N/A"}
            </td>

            {/* Description */}
            <td>{eventData.description || "N/A"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EventBasic2;
