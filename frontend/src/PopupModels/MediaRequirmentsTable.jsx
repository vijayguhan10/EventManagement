import React from "react";

const MediaRequirementsTable = () => {
  return (
    <div className="p-6  flex justify-center">
      <div className="w-full max-w-6xl bg-white shadow-md rounded-lg p-8">
        {/* Event Posters Section */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Event Posters
          </h2>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-3 px-4">Event Poster</th>
                <th className="py-3 px-4">Videos</th>
                <th className="py-3 px-4">On Stage Requirements</th>
                <th className="py-3 px-4">Flex Banners</th>
                <th className="py-3 px-4">Reciption TV Streaming</th>
                <th className="py-3 px-4">Communication</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4">Sample Data</td>
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

export default MediaRequirementsTable;
