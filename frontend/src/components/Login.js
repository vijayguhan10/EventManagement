import React, { useState } from "react";
import secelogo from "../assets/secelogo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const BaseURL = process.env.REACT_APP_BASE_URL;
      console.log("Base url of the application  : ", BaseURL);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/sece/Login`,
        credentials
      );

      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("authToken", token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        toast.success("Login successful!", {
          onClose: () => {
            navigate("/Dashboard");
          },
        });
      } else {
        toast.error("Login failed! Please check your credentials.");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Unauthorized! Incorrect email or password.");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
      <ToastContainer />
      <div className="relative bg-white rounded-lg shadow-lg p-10 w-full max-w-md z-10 bg-opacity-90">
        <div className="flex flex-col items-center mb-6">
          <img
            src={secelogo}
            alt="Sri Eshwar College of Engineering"
            className="w-32 h-32 mb-3"
          />
          <h2 className="text-xl font-semibold text-gray-600">
            Event Management
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7848F4] transition duration-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7848F4] transition duration-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#7848F4] text-white font-semibold py-2 rounded-md hover:bg-[#5e38c4] transition duration-300 text-center block"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
