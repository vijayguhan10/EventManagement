import React, { useState } from "react";
import axios from "axios";

const EndForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const allevents = JSON.parse(localStorage.getItem("allevents")) || [];
      const endpoint = "https://your-endpoint-url.com/api/events";
      const response = await axios.post(endpoint, { events: allevents });

      if (response.status === 200) {
        setSuccess(true);
      }
    } catch (err) {
      console.error("Error posting data:", err);
      setError("Failed to post data. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-4 bg-gray-50 min-h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-4">EndForm</h1>

      <div className="mb-6 p-4 border border-yellow-500 bg-yellow-100  text-2xl">
        <h2 className="text-yellow-700 font-semibold text-lg">Warning</h2>
        <p className="text-red-600 font-bold bg-slate-950 mt-2">
          By clicking this form, the form will be ended and you will be
          redirected to the Home page. Ensure that all the following forms have
          been completed:
        </p>
        <ul className="list-disc list-inside text-yellow-700 mt-2">
          <li>Transport Form</li>
          <li>Food Form</li>
          <li>Guestroom Form</li>
          <li>Communication Form</li>
        </ul>
      </div>

      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Data posted successfully!</p>}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`px-4 py-2 rounded-md w-40 text-xl text-white font-semibold ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        Submit Data
      </button>
    </div>
  );
};

export default EndForm;
