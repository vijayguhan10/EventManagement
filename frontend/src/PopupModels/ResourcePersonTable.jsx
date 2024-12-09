import React from "react";

const ResourcePersonTable = ({ resourcePersons }) => {
  console.log("consoling the resourseperson : ", resourcePersons);
  return (
    <div className="p-6 flex justify-center">
      <div className="w-full max-w-6xl bg-white shadow-md rounded-lg p-8 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Resource Person Details
        </h1>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="text-left py-3 px-4 font-semibold text-gray-600">
                  Name
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">
                  Designation
                </th>
              </tr>
            </thead>
            <tbody>
              {resourcePersons.length > 0 ? (
                resourcePersons.map((person, index) => {
                  const name = Object.keys(person)[0];
                  const designation = person[name];

                  return (
                    <tr
                      key={index}
                      className={`border-b ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <td className="py-3 px-4 text-gray-800">
                        {name || "N/A"}
                      </td>
                      <td className="py-3 px-4 text-gray-800">
                        {designation || "N/A"}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="2"
                    className="text-center py-4 text-gray-500 font-semibold"
                  >
                    No resource persons available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ResourcePersonTable;
