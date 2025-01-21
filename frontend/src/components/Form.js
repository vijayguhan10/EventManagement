import React from "react";
import Index from "../BasicEvent/OrginalForm";
import FoodForm from "../FoodForm/FoodForm";
import CommunicationForm from "../components/CommunicationForm";
import { TransportForm } from "../TransportForm/TransportForm";
import GuestRoom from "../guestroom/index";
import EndForm from "../EndForm";

const Form = () => {
  // Function to handle the smooth scroll
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
    <div>
      {/* Sticky Header with Smooth Scrolling Navigation */}
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

      {/* Forms Section */}
      <div
        id="indexForm"
        className="p-10 my-6 border border-gray-300 bg-gray-50"
      >
        <Index />
      </div>
      <div
        id="communicationForm"
        className="p-10 my-6 border border-gray-300 bg-gray-50"
      >
        <CommunicationForm />
      </div>
      <div
        id="transportForm"
        className="p-10 my-6 border border-gray-300 bg-gray-50"
      >
        <TransportForm />
      </div>
      <div
        id="foodForm"
        className="p-10 my-6 border border-gray-300 bg-gray-50"
      >
        <FoodForm />
      </div>
      <div
        id="guestRoom"
        className="p-10 my-6 border border-gray-300 bg-gray-50"
      >
        <GuestRoom />
      </div>
      <div id="endForm" className="p-10 my-6 border border-gray-300 bg-gray-50">
      <EndForm/>
      </div>
    </div>
  );
};

export default Form;
