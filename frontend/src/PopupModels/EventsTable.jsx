import React from "react";

const EventsTable = ({ eventdata }) => {
  return (
    <div className="p-6 flex justify-center">
      <div className="w-full max-w-6xl shadow-md rounded-lg p-8">
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Event Details
          </h2>
          <table className="min-w-full border border-gray-200">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-3 px-4">Name of the Event</th>
                <th className="py-3 px-4">Start Date</th>
                <th className="py-3 px-4">End Date</th>
                <th className="py-3 px-4">Departments</th>
                <th className="py-3 px-4">Specifications</th>
                <th className="py-3 px-4">Target Audience</th>
                <th className="py-3 px-4">Description</th>
              </tr>
            </thead>
            <tbody>
              {eventdata && eventdata.length > 0 ? (
                eventdata.map((event, index) => (
                  <tr
                    key={index}
                    className={`border-b ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className="py-3 px-4">{event.eventname || "N/A"}</td>
                    <td className="py-3 px-4">
                      {event.eventstartdate || "N/A"}
                    </td>
                    <td className="py-3 px-4">{event.eventenddate || "N/A"}</td>
                    <td className="py-3 px-4">
                      {event.departments && event.departments.length > 0
                        ? event.departments.join(", ")
                        : "N/A"}
                    </td>
                    <td className="py-3 px-4">
                      {event.departmentspecification &&
                      event.departmentspecification.length > 0
                        ? event.departmentspecification.join(", ")
                        : "N/A"}
                    </td>
                    <td className="py-3 px-4">
                      {event.international && event.international.length > 0
                        ? event.international.join(", ")
                        : "N/A"}
                    </td>
                    <td className="py-3 px-4">
                      {event.eventDescription || "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-4 text-gray-500 font-semibold"
                  >
                    No event data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default EventsTable;
