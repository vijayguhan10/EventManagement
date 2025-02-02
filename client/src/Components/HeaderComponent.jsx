import React from "react";
import {
  FiMenu,
  FiBell,
  FiSettings,
  FiGrid,
  FiPlus,
  FiInfo,
  FiLayers,
  FiUsers,
} from "react-icons/fi";
import { CalendarDays } from "lucide-react";

import { useNavigate } from "react-router-dom";
const HeaderComponent = () => {
  function initializeLocalStorage() {
    if (!localStorage.getItem("basicEvent")) {
      localStorage.setItem("basicEvent", JSON.stringify({}));
    }
    if (!localStorage.getItem("communicationForm")) {
      localStorage.setItem("communicationForm", JSON.stringify({}));
    }
    if (!localStorage.getItem("transportForm")) {
      localStorage.setItem("transportForm", JSON.stringify([]));
    }
    if (!localStorage.getItem("iqacno")) {
      localStorage.setItem("iqacno", JSON.stringify({}));
    }

    if (!localStorage.getItem("amenityForm")) {
      localStorage.setItem("amenityForm", JSON.stringify({}));
    }

    if (!localStorage.getItem("guestRoomForm")) {
      localStorage.setItem("guestRoomForm", JSON.stringify({}));
    }

    console.log("Local storage initialized with default forms.");
  }
  const navigate = useNavigate();
  return (
    <div className="flex bg-[#ffffff]">
      <div className="fixed left-0 top-0 h-full w-20 bg-[#ffffff] ">
        <div className="p-4">
          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
            <FiGrid
              onClick={() => navigate("/dashboard")}
              className="text-white text-xl"
              title="Dashboard"
            />
          </div>
        </div>
        <div className="mt-8">
          <div
            className="w-full h-10 bg-blue-50= border-blue-500 flex items-center justify-center"
            title="Active Dashboard"
          >
            <FiGrid
              onClick={() => navigate("/dashboard")}
              className="text-blue-500 text-xl"
            />
          </div>
          <div className="w-full h-10 flex items-center justify-center mt-4">
            <FiPlus
              onClick={() => {
                initializeLocalStorage();
                navigate("/forms");
              }}
              className="text-gray-500 text-xl"
              title="Add New"
            />
          </div>
          <div className="w-full h-10 flex items-center justify-center mt-4">
            <CalendarDays
              onClick={() => navigate("/calender")}
              className="text-gray-500 text-xl"
              title="Information"
            />
          </div>
          <div className="w-full h-10 flex items-center justify-center mt-4">
            <FiLayers
              onClick={() => navigate("/pending")}
              className="text-gray-500 text-xl"
              title="Layers"
            />
          </div>
          <div className="           w-full h-10 flex items-center justify-center mt-4">
            <FiUsers
              onClick={() => navigate("/profile")}
              className="text-gray-500 text-xl"
              title="Users"
            />
          </div>
        </div>
        <div className="absolute bottom-4 left-0 w-full flex justify-center">
          <img
            src="https://www.mithreshvar.tech/_next/image?url=%2FlogoShort%2Flogo.png&w=64&q=75"
            alt="User Avatar"
            className="w-32 h-16 rounded-full"
            title="User Profile"
          />
        </div>
      </div>

      <div className="ml-20 rounded-l-3xl  w-full pl-6 pt-6">
        <div className="flex justify-between items-center mb-1">
          <div className="flex items-center">
            <FiMenu className="text-gray-400 mr-4 text-xl" title="Menu" />
            <div>
              <div className="flex items-center gap-2">
                <p className="text-gray-600 font-bold">
                  Good evening,
                  <span className="text-blue-500 font-bold">Vijay Guhan</span>
                </p>
                <span className="bg-green-100 font-bold text-green-600 text-xs px-2 py-1 rounded">
                  You're better than this!
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <FiBell className="text-gray-400 text-xl" title="Notifications" />
            <FiSettings className="text-gray-400 text-xl" title="Settings" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full" title="Avatar"></div>
              <span className="text-gray-600">Supervisor</span>
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                title="Expand"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
