import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CloudCog } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const CommunicationForm = () => {
  const Navigate = useNavigate();
  const location = useLocation();
  const Communicationform = useSelector(
    (state) => state.event.event?.communicationdata
  );
  console.log(
    "Communicationform in the CommunicationForm : ",
    Communicationform
  );
  useEffect(() => {
    // console.log("Communicationform in the CommunicationForm : ", Communicationform);
  }, [Communicationform]);
  const navigation = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [formData, setFormData] = useState({
    photography: false,
    videography: false,
  });

  useEffect(() => {
    if (Communicationform) {
      console.log("Communicationform received:", Communicationform);
      setFormData({
        photography: Communicationform.photography || false,
        videography: Communicationform.videography || false,
      });

      const mappedSelectedOptions = {
        "Event Poster": Communicationform.eventPoster || [],
        Videos: Communicationform.videos || [],
        "On Stage Requirements": Communicationform.onStageRequirements || [],
        "Flex Banners": Communicationform.flexBanners || [],
        "Reception TV Streaming Requirements":
          Communicationform.receptionTVStreamingRequirements || [],
        Communication: Communicationform.communication || [],
      };

      console.log("Mapped selectedOptions:", mappedSelectedOptions);
      setSelectedOptions(mappedSelectedOptions);
    }
  }, [Communicationform]);

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
      const categoryOptions = prev?.[category] || [];
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
    setIsLoading(true);

    const combinedData = {
      selectedOptions,
      photography: formData.photography,
      videography: formData.videography,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/media`,
        combinedData
      );
      console.log("Server Response:", response.data);
      if (response.status === 200 || response.status === 201) {
        const objectId = response.data.requirement._id;
        console.log("Objectid of the communication form : ", objectId);
        if (objectId) {
          let Communication =
            JSON.parse(localStorage.getItem("communicationForm")) || {};
          Communication.objectId = objectId;
          localStorage.setItem(
            "communicationForm",
            JSON.stringify(Communication)
          );
          console.log("Updated guestroom form in localStorage:", Communication);
        }
        toast.success("Communication form saved successfully");
        setTimeout(() => {
          Navigate("/forms/transport");
        }, 1000);
      } else {
        console.error("No data found in the response");
        toast.error("Failed to create the event. Invalid response.");
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("There was an error submitting the form. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <ToastContainer />
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 shadow-lg z-50">
          <div className="h-16 w-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="min-h-screen flex items-center justify-center p-1">
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
          <div className="flex justify-end space-x-2">
            <button
              type="submit"
              className="rounded-md bg-green-600 px-6 h-10 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Yes, Save Data
            </button>

            <button
              type="button"
              onClick={() => navigate("/forms/end")}
              className="rounded-md bg-red-600 px-6 h-10 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              No, Go to EndForm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommunicationForm;
