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
            <th>Professional Societies</th>
            <th>Resource Persons</th>
            <th>Logo</th>
            <th>Description</th>
            <th>IQAC Number</th>
            <th>Status</th>
            <th>Departments</th>
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
                  {eventData.organizers &&
                    eventData.organizers.map((organizer, index) => (
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
            <td>
              {eventData.categories && eventData.categories.length > 0
                ? eventData.categories.join(", ")
                : "N/A"}
            </td>

            {/* Professional Societies */}
            <td>
              {eventData.professional && eventData.professional.length > 0
                ? eventData.professional.join(", ")
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
                  {eventData.resourcePersons &&
                    eventData.resourcePersons.map((person, index) => (
                      <tr key={index}>
                        <td>{person.name || "N/A"}</td>
                        <td>{person.affiliation || "N/A"}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </td>

            {/* Logos */}
            <td>
              {eventData.logos && eventData.logos.length > 0
                ? eventData.logos.join(", ")
                : "N/A"}
            </td>

            {/* Description */}
            <td>{eventData.description || "N/A"}</td>

            {/* IQAC Number */}
            <td>{eventData.iqacNumber || "N/A"}</td>

            {/* Status */}
            <td>{eventData.status || "N/A"}</td>

            {/* Departments */}
            <td>
              {eventData.departments && eventData.departments.length > 0
                ? eventData.departments.join(", ")
                : "N/A"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EventBasic2;
