import React from "react";
import Index from "../BasicEvent/OrginalForm";
import FoodForm from "../FoodForm/FoodForm";
import CommunicationForm from "../CommunicationForm";
import { TransportForm } from "../TransportForm/TransportForm";
import GuestRoom from "../guestroom/index";
import EndForm from "../EndForm";
import { Home, MessageCircle, Bus, Utensils, Bed, Flag } from "lucide-react";

const Form = ({ event = [] }) => {
  console.log("Events in the Popup FORMS  Console : ", event);
  const event1Basics = event?.basicEvent || {};
  const transportData = event?.transport || [];
  const guestroomData = event?.guestroom || {};
  const amenitiesData = event?.foodform || {};
  const Communicationform = event?.communicationdata || {};

  // console.log("Aminities : ", amenitiesData);
  // console.log("Transport data : ", transportData);
  console.log("Guest room : ", guestroomData);
  // console.log("Event Basics : ", event2Basics);
  console.log("Communication Forms  : ", Communicationform);

  const scrollToSection = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    targetElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  return (
    <div className="">
    <header className="sticky top-0 bg-white  ml-20  text-gray-800 p-3 z-50">
      <div className=" ml-0.5 mx-auto flex items-center justify-evenly px-4">
        <h1 className="text-lg font-semibold tracking-wide  mr-[17%]">Event Form Navigator</h1>
        <nav className="ml-84">
          <ul className="flex space-x-6   text-sm">
            <li>
              <a
                href="#indexForm"
                className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition"
                onClick={(e) => scrollToSection(e, 'indexForm')}
              >
                <Home size={16} />
                <span>Basic Event</span>
              </a>
            </li>
            <li>
              <a
                href="#communicationForm"
                className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition"
                onClick={(e) => scrollToSection(e, 'communicationForm')}
              >
                <MessageCircle size={16} />
                <span>Communication</span>
              </a>
            </li>
            <li>
              <a
                href="#transportForm"
                className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition"
                onClick={(e) => scrollToSection(e, 'transportForm')}
              >
                <Bus size={16} />
                <span>Transport</span>
              </a>
            </li>
            <li>
              <a
                href="#foodForm"
                className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition"
                onClick={(e) => scrollToSection(e, 'foodForm')}
              >
                <Utensils size={16} />
                <span>Food</span>
              </a>
            </li>
            <li>
              <a
                href="#guestRoom"
                className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition"
                onClick={(e) => scrollToSection(e, 'guestRoom')}
              >
                <Bed size={16} />
                <span>Guest Room</span>
              </a>
            </li>
            <li>
              <a
                href="#endForm"
                className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition"
                onClick={(e) => scrollToSection(e, 'endForm')}
              >
                <Flag size={16} />
                <span>End Form</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>

      <div className="ml-20 text-sm">
        <div
          id="indexForm"
          className=" my-6 "
        >
          <Index event1Basics={event1Basics} />
        </div>
        <div
          id="communicationForm"
          className=" my-6 "
        >
          <CommunicationForm Communicationform={Communicationform} />
        </div>
        <div
          id="transportForm"
          className=" my-6 "
        >
          <TransportForm TransportForm={transportData} />
        </div>
        <div
          id="foodForm"
          className=" my-6 "
        >
          <FoodForm FoodForm={amenitiesData} />
        </div>
        <div
          id="guestRoom"
          className=" my-6 "
        >
          <GuestRoom guestroomData={guestroomData} />
        </div>
        <div
          id="endForm"
          className=" my-6 "
        >
          <EndForm />
        </div>
      </div>
    </div>
  );
};

export default Form;
