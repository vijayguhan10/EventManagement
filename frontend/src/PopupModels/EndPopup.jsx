import React from "react";
import EventBasic from "./EventBasic";
import EventBasic2 from "./EventBasic2";
import CommunicationMedia from "./CommunicationMedia";
import AmenitiesForm from "./AmenitiesForm";
import TransportRequisition from "./TransportRequisition";
import "./index.css";
const EndPopup = () => {
  return (
    <div className="overflow-auto w-full h-full">
      <EventBasic />
      <EventBasic2 />
      <CommunicationMedia />
      <AmenitiesForm />
      <TransportRequisition />
    </div>
  );
};

export default EndPopup;
