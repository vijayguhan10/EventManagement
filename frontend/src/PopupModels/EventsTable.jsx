const EventsTable = ({ eventdata }) => {
  if (!eventdata || eventdata.length === 0) {
    return (
      <div className="p-6 flex justify-center">
        <div className="w-full max-w-6xl shadow-md rounded-lg p-8">
          <p className="text-center text-gray-500 font-semibold">
            No event data available
          </p>
        </div>
      </div>
    );
  }

  // Destructure the array
  const [
    eventname,
    typeofevent,
    venue,
    departments,
    year,
    departmentspecification,
    resourceperson,
    mainDepartment,
    eventDescription,
    designstatus,
    eventstartdate,
    eventstarttime,
    eventenddate,
    eventendtime,
    international,
    iqac,
  ] = eventdata;

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
                <th className="py-3 px-4">Type of Event</th>
                <th className="py-3 px-4">Venue</th>
                <th className="py-3 px-4">Departments</th>
                <th className="py-3 px-4">Specifications</th>
                <th className="py-3 px-4">Start Date & Time</th>
                <th className="py-3 px-4">End Date & Time</th>
                <th className="py-3 px-4">International</th>
                <th className="py-3 px-4">IQAC</th>
                <th className="py-3 px-4">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b bg-white">
                <td className="py-3 px-4">{eventname || "N/A"}</td>
                <td className="py-3 px-4">{typeofevent || "N/A"}</td>
                <td className="py-3 px-4">{venue || "N/A"}</td>
                <td className="py-3 px-4">
                  {departments && departments.length > 0
                    ? departments.join(", ")
                    : mainDepartment || "N/A"}
                </td>
                <td className="py-3 px-4">
                  {departmentspecification && departmentspecification.length > 0
                    ? departmentspecification.join(", ")
                    : "N/A"}
                </td>
                <td className="py-3 px-4">
                  {`${eventstartdate || "N/A"} ${eventstarttime || ""}`}
                </td>
                <td className="py-3 px-4">
                  {`${eventenddate || "N/A"} ${eventendtime || ""}`}
                </td>
                <td className="py-3 px-4">{international || "No"}</td>
                <td className="py-3 px-4">{iqac || "N/A"}</td>
                <td className="py-3 px-4">{eventDescription || "N/A"}</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default EventsTable;
