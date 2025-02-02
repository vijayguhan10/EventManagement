import React, { useEffect, useState } from "react";
import EventBasic from "./EventBasic";
import axios from "axios";
import EventBasic2 from "./EventBasic2";
import CommunicationMedia from "./CommunicationMedia";
import AmenitiesForm from "./AmenitiesForm";
import Guestroom from "./GuestRoom";
import TransportRequisition from "./TransportRequisition";
import "./index.css";
import { PanelBottomClose } from "lucide-react";
const EndPopup = ({ event, onClose }) => {
  console.log("Events in the Popup Console : ", event);
  const [eventData, setEventData] = useState(null);

  // const handelFetcheventData = async () => {
  //   try {
  //     const response = await axios.post(
  //       `${import.meta.env.VITE_API_URL}/endform/iqac`,
  //       { iqac }
  //     );
  //     console.log("Endform Response:", response.data.Allformdata);
  //     setEventData(response.data.Allformdata);
  //   } catch (error) {
  //     console.error("Error fetching event data:", error);
  //   }
  // };

  // useEffect(() => {
  //   handelFetcheventData();
  // }, [iqac]);

  const event1Basics = event?.basicEvent || {};
  const event2Basics = event?.basicEvent || {};
  const transportData = event?.transport || [];
  const guestroomData = event?.guestroom || {};
  const amenitiesData = event?.foodform || {};
  const Communicationform = event?.communicationdata || {};

  console.log("Aminities : ", amenitiesData);
  console.log("Transport data : ", transportData);
  console.log("Guest room : ", guestroomData);
  console.log("Event Basics : ", event2Basics);

  return (
    <div className="overflow-auto  border-t-4 border-black border-l-4  bg-white w-full h-full">
      <h1
        onClick={() => onClose()}
        className="text-4xl text-red-600 flex justify-end"
      >
        <PanelBottomClose />
      </h1>
      <div className="pl-5">
        <EventBasic eventData={event1Basics} />
        <EventBasic2 eventData={event2Basics} />
        <CommunicationMedia Communicationform={Communicationform} />
        <TransportRequisition transportData={transportData} />
        <AmenitiesForm amenitiesData={amenitiesData} />
        <Guestroom guestroomData={guestroomData} />s
      </div>
    </div>
  );
};

export default EndPopup;
