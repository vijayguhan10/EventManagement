import React from "react";

const MediaRequirementsTable = ({ mediamax, photography, videography }) => {
  const validMediaCategories = mediamax
    ?.filter((entry) => typeof entry === "object" && entry !== null)
    ?.reduce((acc, obj) => ({ ...acc, ...obj }), {});
  const rowCount = validMediaCategories
    ? Math.max(
        ...Object.values(validMediaCategories).map(
          (category) => category?.length || 0
        ),
        photography ? 1 : 0,
        videography ? 1 : 0
      )
    : 0;

  return (
    <div className="p-6 flex justify-center">
      <div className="w-full max-w-6xl bg-white shadow-md rounded-lg p-8">
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Media Requirements
          </h2>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 border-b">
                {validMediaCategories ? (
                  Object.keys(validMediaCategories).map((category, index) => (
                    <th key={index} className="py-3 px-4">
                      {category}
                    </th>
                  ))
                ) : (
                  <th className="py-3 px-4">No Categories Available</th>
                )}
              </tr>
            </thead>
            <tbody>
              {rowCount > 0 ? (
                Array.from({ length: rowCount }).map((_, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={`border-b ${
                      rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    {Object.keys(validMediaCategories).map(
                      (category, colIndex) => (
                        <td key={colIndex} className="py-3 px-4">
                          {validMediaCategories[category][rowIndex] || "N/A"}
                        </td>
                      )
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={Object.keys(validMediaCategories).length || 6}
                    className="text-center py-4 text-gray-500 font-semibold"
                  >
                    No media requirements available
                  </td>
                </tr>
              )}
              {/* Add rows for photography and videography if true */}
              {photography && (
                <tr className="border-b bg-gray-50">
                  <td
                    colSpan={Object.keys(validMediaCategories).length || 6}
                    className="py-3 px-4 text-center"
                  >
                    Photography session: Photography to be taken
                  </td>
                </tr>
              )}
              {videography && (
                <tr className="border-b bg-white">
                  <td
                    colSpan={Object.keys(validMediaCategories).length || 6}
                    className="py-3 px-4 text-center"
                  >
                    Videography session: Videography to be taken
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

export default MediaRequirementsTable;
