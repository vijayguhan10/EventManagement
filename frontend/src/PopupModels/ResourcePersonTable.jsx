import React from "react";

const ResourcePersonTable = ({ resourcePersons }) => {
  // Convert the dynamic structure to a more consistent array for rendering
  const formattedResourcePersons = Object.keys(resourcePersons).map((key) => ({
    name: key,
    ...resourcePersons[key].a, // Extract the details under "a"
  }));

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
                <th className="text-left py-3 px-4 font-semibold text-gray-600">
                  Department
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">
                  Mobile Number
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">
                  Email ID
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">
                  Twitter Page
                </th>
              </tr>
            </thead>
            <tbody>
              {formattedResourcePersons.length > 0 ? (
                formattedResourcePersons.map((person, index) => (
                  <tr
                    key={index}
                    className={`border-b ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className="py-3 px-4 text-gray-800">
                      {person.name || "N/A"}
                    </td>
                    <td className="py-3 px-4 text-gray-800">
                      {person.designation || "N/A"}
                    </td>
                    <td className="py-3 px-4 text-gray-800">
                      {person.department || "N/A"}
                    </td>
                    <td className="py-3 px-4 text-gray-800">
                      {person.mobile || "N/A"}
                    </td>
                    <td className="py-3 px-4 text-gray-800">
                      {person.email || "N/A"}
                    </td>
                    <td className="py-3 px-4 text-gray-800">
                      {person.twitter ? (
                        <a
                          href={person.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {person.twitter}
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
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
