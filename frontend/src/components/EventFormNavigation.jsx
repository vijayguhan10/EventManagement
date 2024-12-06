import React from "react";
import { useNavigate } from "react-router-dom";

const EventFormNavigation = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col  min-h-screen">
      <h1 className="text-3xl font-bold text-indigo-800 mb-6">
        Navigate to Forms
      </h1>
      <div className="space-y-4 space-x-4">
        <button
          onClick={() => navigate("/amenities-form")}
          className="w-64 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:bg-gradient-to-l"
        >
          Amenities Form
        </button>
        <button
          onClick={() => navigate("/transportation-form")}
          className="w-64 py-3 text-lg font-semibold text-white bg-gradient-to-r from-green-500 to-teal-600 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:bg-gradient-to-l"
        >
          Transportation Form
        </button>
        <button
          onClick={() => navigate("/guest-room-form")}
          className="w-64 py-3 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:bg-gradient-to-l"
        >
          Guest Room Form
        </button>
      </div>
    </div>
  );
};

export default EventFormNavigation;
