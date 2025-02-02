import React from "react";

const OrganizerTable = ({ organizersData }) => {
  return (
    <div className="p-6 flex justify-center">
      <div className="w-full max-w-6xl shadow-md rounded-lg p-8">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 font-semibold text-gray-600">
                Name
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">
                Emp ID
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">
                Designation
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">
                Mobile Number
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">
                Requisition Date
              </th>
            </tr>
          </thead>
          <tbody>
            {organizersData.length > 0 ? (
              organizersData.map((organizer, index) => (
                <tr
                  key={index}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="py-3 px-4 text-gray-800">
                    {organizer.name || "N/A"}
                  </td>
                  <td className="py-3 px-4 text-gray-800">
                    {organizer.employeeid || "N/A"}
                  </td>
                  <td className="py-3 px-4 text-gray-800">
                    {organizer.designation || "N/A"}
                  </td>
                  <td className="py-3 px-4 text-gray-800">
                    {organizer.phone || "N/A"}
                  </td>
                  <td className="py-3 px-4 text-gray-800">
                    {"Requisition Date Not Provided"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-4 text-gray-500 font-semibold"
                >
                  No organizers available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrganizerTable;
