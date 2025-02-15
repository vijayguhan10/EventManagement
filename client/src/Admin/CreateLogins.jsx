import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateLogins() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Media",
  });
  const navigate = useNavigate();

  const roles = ["Media", "Dept", "Amenity", "System Admin", "Transport"];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/sece/signup`,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }
      );
    //   localStorage.setItem("event_token", response.data.token);
      toast.success("created the Login!");
    //   navigate("/dashboard");
    } catch (error) {
      console.error("Error", error);
      if (error.response) {
        toast.error(error.response.data.message || "Signup failed!");
      } else {
        toast.error("Network error. Please check your connection.");
      }
    }
  };

  return (
    <div className="flex ml-20 p-4">
      <ToastContainer />
      <div className="w-full max-w-md bg-white rounded-2xl  p-8">
        <h1 className="text-3xl mb-6 text-center">Create Account</h1>

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="w-full px-4 py-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="w-full px-4 py-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full px-4 py-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.password}
          onChange={handleChange}
        />

        <select
          name="role"
          className="w-full px-4 py-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.role}
          onChange={handleChange}
        >
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
        >
          Sign Up
        </button>

        <button
          onClick={() => navigate("/dashboard")}
          className="w-full bg-gray-600 text-white py-3 mt-4 rounded-lg font-semibold hover:bg-gray-700 transition duration-300"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}

export default CreateLogins;
