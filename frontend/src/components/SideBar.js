import React, { useState, useEffect } from "react";
import {
  FaAddressBook,
  FaHistory,
  FaHome,
  FaHotTub,
  FaMobile,
  FaSignOutAlt,
  FaSmoking,
  FaTimes,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const SideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  return (
    <div className="flex max-h-full">
      <button
        onClick={toggleSidebar}
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen bg-[#7848F4] transition-all duration-700 transform lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3  bg-[#7848F4]">
          <button
            onClick={toggleSidebar}
            className="text-white absolute top-4 right-4 focus:outline-none lg:hidden"
          >
            <FaTimes className="w-6 h-6" />
          </button>

          <ul className="space-y-2 font-medium mt-10">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <img
                  className="bg-white rounded-lg"
                  src="https://digri.ai/wp-content/uploads/2023/12/Logo-2-768x258.png"
                  alt="newimgclg"
                />
              </a>
            </li>
            <li>
              <Link
                to="/Dashboard"
                className="flex items-center gap-7 p-2 text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FaHome />
                <span className="flex-1 ms-3 whitespace-nowrap font-Afacad text-2xl">
                  Dashboard
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/EventData"
                className="flex items-center gap-7 p-2 text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FaHistory />
                <span className="flex-1 ms-3 whitespace-nowrap font-Afacad text-2xl">
                  History
                </span>
              </Link>
            </li>
            <li>
              <Link
                to=""
                className="flex items-center gap-7 p-2 text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FaHotTub />
                <span className="flex-1 ms-3 whitespace-nowrap font-Afacad text-2xl">
                  Upcoming
                </span>
              </Link>
            </li>
            <li>
              <Link
                to=""
                className="flex items-center p-2 gap-7 text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FaMobile />
                <span className="flex-1 ms-3 whitespace-nowrap font-Afacad text-2xl">
                  Technology
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="flex items-center gap-7 p-2 text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FaAddressBook />
                <span className="flex-1 ms-3 whitespace-nowrap font-Afacad text-2xl">
                  Placements
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="flex items-center gap-7 p-2 text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FaSmoking />
                <span className="flex-1 ms-3 whitespace-nowrap font-Afacad text-2xl">
                  Non-Technical
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/Editdata"
                className="flex items-center gap-7 p-2 text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FaSignOutAlt />
                <span className="flex-1 ms-3 whitespace-nowrap font-Afacad text-2xl">
                  Edit Data
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      {/* Overlay when sidebar is open on small screens */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default SideBar;