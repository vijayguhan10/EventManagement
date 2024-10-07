import React from "react";
import { useState } from "react";
import secelogo from "../assets/secelogo.png";
import backgroundVideo from "../assets/WhatsApp Video 2024-10-07 at 15.20.59_42f13499.mp4"; // Add your video path
import { Link } from "react-router-dom";

function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(credentials);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
      {/* Login Container */}
      <div className="relative bg-white rounded-lg shadow-lg p-10 w-full max-w-md z-10 bg-opacity-90">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover opacity-70 rounded-lg"
          style={{
            zIndex: -1, // Ensure video stays behind the login container
            top: 0,
            left: 0,
            objectFit: "cover", // Ensures video covers the entire background
            borderRadius: "inherit", // Keeps video within the rounded corners
          }}
        >
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

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
          {/* User Name */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              User Name
            </label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7848F4] transition duration-300"
              required
            />
          </div>

          {/* Password */}
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

          {/* Login Button */}
          <Link
            to="/Dashboard"
            className="w-full bg-[#7848F4] text-white font-semibold py-2 rounded-md hover:bg-[#5e38c4] transition duration-300 text-center block"
          >
            Log in
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
