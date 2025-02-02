import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
      const iqacData = JSON.parse(localStorage.getItem("iqacno")) || {};
      const basicEvent = JSON.parse(localStorage.getItem("basicEvent")) || {};
      const transportForm =
        JSON.parse(localStorage.getItem("transportForm")) || [];
      const amenityForm = JSON.parse(localStorage.getItem("amenityForm")) || {};
      const guestRoomForm =
        JSON.parse(localStorage.getItem("guestRoomForm")) || {};
      const communicationForm =
        JSON.parse(localStorage.getItem("communicationForm")) || {};
      console.log(
        "Iqac : ",
        iqacData,
        "\nbasicEvent : ",
        basicEvent,
        "\ntransportform : ",
        transportForm,
        "\namenityfrom : ",
        amenityForm,
        "\nguestRoomForm",
        guestRoomForm,
        "\ncommunicationForm",
        communicationForm
      );
      const events = {
        iqacno: iqacData.iqacNumber || "",
        eventdata: basicEvent._id || "",
        transportform: Array.isArray(transportForm) ? transportForm : [],
        amenityform: amenityForm.objectId || "",
        guestform: guestRoomForm.objectId || "",
        communicationform: communicationForm.objectId || "",
      };

      console.log("Events Data Sent to Backend:", events);
      if (
        !(
          events.eventdata ||
          events.transportform.length ||
          events.amenityform ||
          events.guestform ||
          events.communicationform
        )
      ) {
        setError(
          "Some form IDs are missing. Please make sure at least one form is filled out."
        );
        setLoading(false);
        return;
      }

      // Send data to backend
      const endpoint = `${import.meta.env.VITE_API_URL}/endform/create`;
      const response = await axios.post(endpoint, events);

      console.log("Response from backend:", response);

      if (response.status === 201) {
        setSuccess(true);
        toast.success("Final event submitted successfully!");

        setTimeout(() => {
          localStorage.clear();
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

      <div className="mb-6 p-4 border border-yellow-500 bg-yellow-100 text-2xl">
        <h2 className="text-yellow-700 font-semibold text-lg">Warning</h2>
        <p className="text-red-600 font-bold bg-slate-950 mt-2">
          By clicking this form, the form will be ended and you will be
          redirected to the Home page. Ensure that all the following forms have
          been completed:
        </p>
        <ul className="list-disc list-inside text-yellow-700 mt-2">
          <li>Transport Form</li>
          <li>Amenity Form</li>
          <li>Guest Room Form</li>
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
