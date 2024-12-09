import React, { useState } from "react";
import { FormHeader } from "./FormHeader";
import { BasicDetails } from "./BasicDetails";
import { EventDetails } from "./EventDetails";
import { TravelDetails } from "./TravelDetails";
import { DriverDetails } from "./DriverDetails";
import { FormFooter } from "./FormFooter";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
export function TransportForm() {
  const [basicDetails, setBasicDetails] = useState({});
  const [eventDetails, setEventDetails] = useState({});
  const [travelDetails, setTravelDetails] = useState({});
  const [driverDetails, setDriverDetails] = useState({});

  const handleSubmit = async (e) => {
    const gatheredData = {
      basicDetails,
      eventDetails,
      travelDetails,
      driverDetails,
    };
    console.log("Gathered Data:", gatheredData);
    e.preventDefault();

    try {
      const response = await axios.post(
        ` ${process.env.REACT_APP_BASE_URL}/api/transportform/`,

        gatheredData
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Event created successfully!", {
          // position: toast.POSITION.TOP_RIGHT,
        });

        console.log("Form Data Submitted:", gatheredData);
      }
    } catch (error) {
      console.error("Error submitting form:", error);

      toast.error("Failed to create the event. Please try again.", {
        // position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
      >
        <FormHeader />
        <div className="p-6 space-y-6">
          <BasicDetails setDetails={setBasicDetails} />
          <EventDetails setDetails={setEventDetails} />
          <TravelDetails setDetails={setTravelDetails} />
          <DriverDetails setDetails={setDriverDetails} />
        </div>
        <FormFooter />
      </form>
    </div>
  );
}
