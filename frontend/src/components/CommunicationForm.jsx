import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
const CommunicationForm = () => {
  const navigation = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [formData, setFormData] = useState({
    photography: false,
    videography: false,
  });
  const form1Data = useSelector((state) => state.events);

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

  const handleCheckboxChange = (category, option) => {
    setSelectedOptions((prev) => {
      const categoryOptions = prev[category] || [];
      const isSelected = categoryOptions.includes(option);

      return {
        ...prev,
        [category]: isSelected
          ? categoryOptions.filter((item) => item !== option)
          : [...categoryOptions, option],
      };
    });
  };

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true
    const { event } = form1Data;
    console.log("Destructured event:", event);

    const combinedData = {
      ...event,
      selectedOptions,
      photography: formData.photography,
      videography: formData.videography,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/event/create_event`,
        combinedData
      );
      console.log("Server Response:", response.data);
      toast.success("Data submitted successfully!");
      setIsLoading(false); // Stop loading
      navigation("/Dashboard");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("There was an error submitting the form. Please try again.");
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="relative">
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 shadow-lg z-50">
          <div className="h-16 w-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="min-h-screen flex items-center justify-center p-1">
        <ToastContainer />
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-8 w-full"
        >
          <h1 className="text-2xl font-bold mb-6 text-start">
            Communication and Media
          </h1>
          <div className=" flex flex-col gap-4 font-bold text-xl text-gray-700">
            <label className="inline-flex ml-4 items-center">
              <input
                type="checkbox"
                name="photography"
                checked={formData.photography}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded"
              />
              <span className="ml-2 text-gray-700">
                Request for Photography on the day of the event
              </span>
            </label>
            <label className="inline-flex ml-4 items-center">
              <input
                type="checkbox"
                name="videography"
                checked={formData.videography}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded"
              />
              <span className="ml-2 text-gray-700">
                Request for Videography on the day of the event
              </span>
            </label>
          </div>
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
                        onChange={() =>
                          handleCheckboxChange(category.category, option)
                        }
                        checked={
                          selectedOptions[category.category]?.includes(
                            option
                          ) || false
                        }
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
    </div>
  );
};

export default CommunicationForm;
