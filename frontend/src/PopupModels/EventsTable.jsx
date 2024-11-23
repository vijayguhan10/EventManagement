import React from "react";

const OrganizerDetail = () => {
  return (
    <div className="p-6   flex justify-center">
      <div className="w-full max-w-6xl  shadow-md rounded-lg p-8">
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Event Posters
          </h2>
          <table className="min-w-full  border border-gray-200">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-3 px-4">Name of the Event</th>
                <th className="py-3 px-4">Date of the Event</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Type of Event</th>
                <th className="py-3 px-4">Target Audience</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-bml-3">
                <td className="py-3 px-4">Sample Data</td>
                <td className="py-3 px-4">Sample Data</td>
                <td className="py-3 px-4">Sample Data</td>
                <td className="py-3 px-4">Sample Data</td>
                <td className="py-3 px-4">Sample Data</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default OrganizerDetail;
