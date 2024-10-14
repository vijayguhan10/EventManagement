import React from "react";
import { useState } from "react";
import secelogo from "../assets/secelogo.png";
import backgroundVideo from "../assets/WhatsApp Video 2024-10-07 at 15.20.59_42f13499.mp4"; // Add your video path
import { Link, useNavigate } from "react-router-dom";
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
      const response = await axios.post(
        "http://127.0.0.1:8000/sece/Login",
        credentials
      );

      if (response.status === 200) {
        const { token } = response.data; // Assuming the token is in the response data
        localStorage.setItem("authToken", token); // Save token in localStorage

        // Set the token in Axios default headers for future requests
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // Successful login
        toast.success("Login successful!", {
          onClose: () => {
            navigate("/Dashboard"); // Redirect to Dashboard after the toast closes
          },
        });
      } else {
        toast.error("Login failed! Please check your credentials.");
      }
    } catch (error) {
      // Handle errors (like 401)
      if (error.response && error.response.status === 401) {
        toast.error("Unauthorized! Incorrect email or password.");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
      {/* Toast Container */}
      <ToastContainer />

      {/* Login Container */}
      <div className="relative bg-white rounded-lg shadow-lg p-10 w-full max-w-md z-10 bg-opacity-90">
        {/* Logo Section */}
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

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Email */}
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
