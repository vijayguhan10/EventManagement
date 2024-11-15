import React, { useState, useEffect } from "react";
import {
  FaAddressBook,
  FaChartArea,
  FaDiscourse,
  FaHistory,
  FaHome,
  FaEdit,
  FaTimes,
} from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Use useLocation to get the current path
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp > currentTime) {
          setRole(decoded.role);
        }
      } catch (error) {
        setRole(null);
      }
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="flex max-h-full xl:overflow-hidden">
      <button
        onClick={toggleSidebar}
        type="button"
        className="inline-flex items-center p-2 mt-2  -ms-5 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
        <div className="h-full px-3 bg-[#7848F4]">
          <button
            onClick={toggleSidebar}
            className="text-white absolute top-4 right-4 focus:outline-none lg:hidden"
          >
            <FaTimes className="w-6 h-6" />
          </button>

          <ul className="space-y-2 font-medium mt-10">
            <li>
              <img
                className="bg-white ring-yellow-50 rounded-lg"
                src="https://digri.ai/wp-content/uploads/2023/12/Logo-2-768x258.png"
                alt="logo"
              />
            </li>

            {role === "mediamax" ? (
              <>
                <li>
                  <Link
                    to="/mediamax"
                    className={`flex items-center gap-7 p-2 text-white rounded-lg ${
                      location.pathname === "/mediamax" ? "bg-gray-300" : ""
                    }`}
                  >
                    <FaEdit />
                    <span className="flex-1  -ms-5 whitespace-nowrap font-Afacad text-2xl">
                      MediaMax
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/History"
                    className={`flex items-center gap-7 p-2 text-white rounded-lg ${
                      location.pathname === "/History" ? "bg-gray-300" : ""
                    }`}
                  >
                    <FaHistory />
                    <span className="flex-1  -ms-5 whitespace-nowrap font-Afacad text-2xl">
                      History
                    </span>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/Dashboard"
                    className={`flex items-center gap-7 p-2 text-white rounded-lg ${
                      location.pathname === "/Dashboard" ? "bg-gray-300" : ""
                    }`}
                  >
                    <FaHome />
                    <span className="flex-1  -ms-5 whitespace-nowrap font-Afacad text-2xl">
                      Dashboard
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Addlogins"
                    className={`flex items-center gap-7 p-2 text-white rounded-lg ${
                      location.pathname === "/Addlogins" ? "bg-gray-300" : ""
                    }`}
                  >
                    <FaHome />
                    <span className="flex-1  -ms-5 whitespace-nowrap font-Afacad text-2xl">
                      Add Login
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/History"
                    className={`flex items-center gap-7 p-2 text-white rounded-lg ${
                      location.pathname === "/History" ? "bg-gray-300" : ""
                    }`}
                  >
                    <FaHistory />
                    <span className="flex-1  -ms-5 whitespace-nowrap font-Afacad text-2xl">
                      History
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Placement"
                    className={`flex items-center gap-7 p-2 text-white rounded-lg ${
                      location.pathname === "/Placement" ? "bg-gray-300" : ""
                    }`}
                  >
                    <FaAddressBook />
                    <span className="flex-1  -ms-5 whitespace-nowrap font-Afacad text-2xl">
                      Events
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Departments"
                    className={`flex items-center p-2 gap-7 text-white rounded-lg ${
                      location.pathname === "/Departments" ? "bg-gray-300" : ""
                    }`}
                  >
                    <FaDiscourse />
                    <span className="flex-1  -ms-5 whitespace-nowrap font-Afacad text-2xl">
                      Departments
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/CanceledEvents"
                    className={`flex items-center gap-7 p-2 text-white rounded-lg ${
                      location.pathname === "/CanceledEvents"
                        ? "bg-gray-300"
                        : ""
                    }`}
                  >
                    <FaHome />
                    <span className="flex-1 -ms-5 whitespace-nowrap font-Afacad text-2xl">
                      Canceled Events
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/charts"
                    className={`flex items-center gap-7 p-2 text-white rounded-lg ${
                      location.pathname === "/charts" ? "bg-gray-300" : ""
                    }`}
                  >
                    <FaChartArea />
                    <span className="flex-1  -ms-5 whitespace-nowrap font-Afacad text-2xl">
                      Charts
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/mediamax"
                    className={`flex items-center gap-7 p-2 text-white rounded-lg ${
                      location.pathname === "/mediamax" ? "bg-gray-300" : ""
                    }`}
                  >
                    {/* <FaEdit />
                    <span className="flex-1  -ms-5 whitespace-nowrap font-Afacad text-2xl">
                      MediaMax
                    </span> */}
                  </Link>
                </li>
              </>
            )}

            <Link
              to="/"
              onClick={handleLogout}
              className="text-xl bg-white ml-80 xl:mr-20 font-bold font-Afacad w-28 h-8 flex justify-center items-center shadow-md shadow-[#00000013] rounded-lg text-[#9a41ff] transform mb-10 -translate-x-[280%] "
            >
              Logout
            </Link>
          </ul>
          <div className="mt-3  font-Afacad text-white text-sm font-light border-t pt-4 border-gray-300">
            <p className="text-lg font-semibold">Mentored By:</p>
            <p>Sarfaraz Ahmed</p>

            <p className="text-lg font-semibold mt-4">Developed By:</p>
            <p>Vijay Guhan KM</p>
            <p>Sabari M</p>

            <p className="mt-4">Department of Computer Science Engineering</p>
            <p>Batch 2023-2027</p>
          </div>
        </div>
      </aside>

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
