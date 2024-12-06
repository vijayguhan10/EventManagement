import React, { useState } from "react";
import { FormHeader } from "./FormHeader";
import { BasicDetails } from "./BasicDetails";
import { EventDetails } from "./EventDetails";
import { TravelDetails } from "./TravelDetails";
import { DriverDetails } from "./DriverDetails";
import { FormFooter } from "./FormFooter";

export function TransportForm() {
  const [basicDetails, setBasicDetails] = useState({});
  const [eventDetails, setEventDetails] = useState({});
  const [travelDetails, setTravelDetails] = useState({});
  const [driverDetails, setDriverDetails] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const gatheredData = {
      basicDetails,
      eventDetails,
      travelDetails,
      driverDetails,
    };
    console.log("Gathered Data:", gatheredData);

  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
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
