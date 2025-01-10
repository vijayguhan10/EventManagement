import React, { useEffect, useState } from "react";
import EventBasic from "./EventBasic";
import axios from "axios";
import EventBasic2 from "./EventBasic2";
import CommunicationMedia from "./CommunicationMedia";
import AmenitiesForm from "./AmenitiesForm";
import Guestroom from "./GuestRoom";
import TransportRequisition from "./TransportRequisition";
import "./index.css";

const EndPopup = ({ iqac }) => {
  const [eventData, setEventData] = useState(null);

  const handelFetcheventData = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/endform/iqac`,
        { iqac }
      );
      console.log("Endform Response:", response.data.Allformdata);
      setEventData(response.data.Allformdata);
    } catch (error) {
      console.error("Error fetching event data:", error);
    }
  };

  useEffect(() => {
    handelFetcheventData();
  }, [iqac]);

  const event1Basics = eventData?.basicEvent || {};
  const event2Basics = eventData?.basicEvent || {};
  const transportData = eventData?.transport || [];
  const guestroomData = eventData?.guestroom || {};
  const amenitiesData = eventData?.foodform || {};
  console.log("Aminities : ", amenitiesData);
  console.log("Transport data : ", transportData);
  console.log("Guest room : ", guestroomData);
  console.log("Event Basics : ", event2Basics);

  return (
    <div className="overflow-auto w-full h-full">
      <EventBasic eventData={event1Basics} />
      <EventBasic2 eventData={event2Basics} />
      <CommunicationMedia />
      <TransportRequisition transportData={transportData} />
      <AmenitiesForm amenitiesData={amenitiesData} />
      <Guestroom guestroomData={guestroomData} />
    </div>
  );
};

export default EndPopup;
