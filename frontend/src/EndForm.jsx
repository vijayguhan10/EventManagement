import React, { useState } from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const EndForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
  
    try {
      const storedForms = JSON.parse(localStorage.getItem("forms")) || {};
  
      const events = {
        iqacno: storedForms.iqacno ? storedForms.iqacno[1] : "", 
        eventdata: storedForms.Eventform ? storedForms.Eventform[1] : "", 
        transportform: storedForms.transportform ? Object.values(storedForms.transportform) : [], 
        amenityform: storedForms.amenityform ? storedForms.amenityform[1] : "", 
        guestform: storedForms.guestroomform ? storedForms.guestroomform[1] : "", 
      };
      console.log("events : ", events);

      if (!(events.eventdata || events.transportform.length || events.amenityform || events.guestform)) {
        setError("Some form IDs are missing. Please make sure at least one form is filled out.");
        setLoading(false);
        return;
      }
      
  
      const endpoint = `${process.env.REACT_APP_BASE_URL}/endform`;
      const response = await axios.post(endpoint, { events });
       console.log("response from end form data : ",response)
  
      if (response.status === 201) {
        setSuccess(true);
        toast.success("Final event submitted successfully!");
       setTimeout(() => {
          localStorage.removeItem("forms");
         navigate("/Dashboard");
       }, 1000);
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
