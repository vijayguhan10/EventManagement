import React from "react";
import Index from "../BasicEvent/OrginalForm";
import FoodForm from "../FoodForm/FoodForm";
import CommunicationForm from "../CommunicationForm";
import { TransportForm } from "../TransportForm/TransportForm";
import GuestRoom from "../guestroom/index";
import EndForm from "../EndForm";

const Form = ({ event = [] }) => {
  console.log("Events in the Popup FORMS  Console : ", event);
  const event1Basics = event[0]?.basicEvent || {};
  const transportData = event[0]?.transport || [];
  const guestroomData = event[0]?.guestroom || {};
  const amenitiesData = event[0]?.foodform || {};
  const Communicationform = event[0]?.communicationdata || {};

  // console.log("Aminities : ", amenitiesData);
  // console.log("Transport data : ", transportData);
  // console.log("Guest room : ", guestroomData);
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
      <header className="sticky top-0 bg-gray-800 text-white p-4 shadow-md z-50">
        <h1 className="text-xl font-semibold text-center mb-4">
          Form Navigation
        </h1>
        <nav>
          <ul className="flex justify-center space-x-8">
            <li>
              <a
                href="#indexForm"
                className="hover:text-orange-500"
                onClick={(e) => scrollToSection(e, "indexForm")}
              >
                Basic Event
              </a>
            </li>
            <li>
              <a
                href="#communicationForm"
                className="hover:text-orange-500"
                onClick={(e) => scrollToSection(e, "communicationForm")}
              >
                Communication Form
              </a>
            </li>
            <li>
              <a
                href="#transportForm"
                className="hover:text-orange-500"
                onClick={(e) => scrollToSection(e, "transportForm")}
              >
                Transport Form
              </a>
            </li>
            <li>
              <a
                href="#foodForm"
                className="hover:text-orange-500"
                onClick={(e) => scrollToSection(e, "foodForm")}
              >
                Food Form
              </a>
            </li>
            <li>
              <a
                href="#guestRoom"
                className="hover:text-orange-500"
                onClick={(e) => scrollToSection(e, "guestRoom")}
              >
                Guest Room
              </a>
            </li>
            <li>
              <a
                href="#endForm"
                className="hover:text-orange-500"
                onClick={(e) => scrollToSection(e, "endForm")}
              >
                End Form
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <div className="ml-20">
        <div
          id="indexForm"
          className="p-10 my-6 border border-gray-300 bg-gray-50"
        >
          <Index event1Basics={event1Basics} />
        </div>
        <div
          id="communicationForm"
          className="p-10 my-6 border border-gray-300 bg-gray-50"
        >
          <CommunicationForm Communicationform={Communicationform} />
        </div>
        <div
          id="transportForm"
          className="p-10 my-6 border border-gray-300 bg-gray-50"
        >
          <TransportForm TransportForm={transportData} />
        </div>
        <div
          id="foodForm"
          className="p-10 my-6 border border-gray-300 bg-gray-50"
        >
          <FoodForm FoodForm={amenitiesData} />
        </div>
        <div
          id="guestRoom"
          className="p-10 my-6 border border-gray-300 bg-gray-50"
        >
          <GuestRoom guestroomData={guestroomData} />
        </div>
        <div
          id="endForm"
          className="p-10 my-6 border border-gray-300 bg-gray-50"
        >
          <EndForm />
        </div>
      </div>
    </div>
  );
};

export default Form;
