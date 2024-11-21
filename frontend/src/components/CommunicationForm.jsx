import React, { useState } from "react";

const CommunicationForm = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const categories = [
    {
      category: "Event Poster",
      options: [
        "Pre event Poster",
        "Chief Guest poster",
        "Event promotional poster",
        "Post event poster",
        "ID cards",
        "Plug cards",
      ],
    },
    {
      category: "Videos",
      options: [
        "Coming soon video",
        "Event Launch Video",
        "Promotional video",
        "Chief guest video",
        "Stage streaming video",
        "Event glimpses video",
        "Post event video",
      ],
    },
    {
      category: "On Stage Requirements",
      options: ["LED Backdrop", "Stage streaming video"],
    },
    {
      category: "Flex Banners",
      options: [
        "Front entrance banner",
        "Welcome banner",
        "Stage backdrop",
        "Event standee",
      ],
    },
    {
      category: "Reception TV Streaming Requirements",
      options: [
        "Event poster",
        "Chief guest welcome poster to TV",
        "Launch poster",
        "Thanksgiving",
      ],
    },
    {
      category: "Communication",
      options: [
        "Website (Pre / Day of the Event)",
        "Social Media (Pre / Day of the Event)",
      ],
    },
  ];

  const handleCheckboxChange = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected Options:", selectedOptions);
    // You can now save this data or send it to a backend
  };

  return (
    <div className="min-h-screenflex items-center justify-center p-1">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full"
      >
        <h1 className="text-2xl font-bold mb-6 text-start">
          Event Requirement Form
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, idx) => (
            <div key={idx} className="bg-gray-50 p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                {category.category}
              </h2>
              <div className="grid grid-cols-4 gap-4">
                {category.options.map((option, index) => (
                  <label
                    key={index}
                    className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow hover:bg-gray-100 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      value={option}
                      onChange={() => handleCheckboxChange(option)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                    />
                    <span className="text-gray-800">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default CommunicationForm;
