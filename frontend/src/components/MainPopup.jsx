import React, { useState, useEffect, useRef } from "react";
import ResourcePersonTable from "../PopupModels/ResourcePersonTable";
import MediaRequirementsTable from "../PopupModels/MediaRequirmentsTable";
import EventsTable from "../PopupModels/EventsTable";
import OrganizerTable from "../PopupModels/OrganizerData";

const MainPopup = () => {
  const [isOpen, setIsOpen] = useState(true); // State to control popup visibility
  const popupRef = useRef(null); // Ref for the popup container

  const handleClose = () => {
    setIsOpen(false); // Close the popup
  };

  // Close the popup when pressing the ESC key
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      handleClose();
    }
  };

  // Close the popup when clicking outside of it
  const handleOutsideClick = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      handleClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      // Add event listeners and disable background scroll
      document.body.classList.add("overflow-hidden");
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      // Remove event listeners and re-enable background scroll
      document.body.classList.remove("overflow-hidden");
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    // Cleanup listeners on unmount
    return () => {
      document.body.classList.remove("overflow-hidden");
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  const resourcePersonsData = [
    {
      name: "Dr. John Doe",
      designation: "Professor",
      department: "Computer Science",
      mobile: "9876543210",
      email: "john.doe@example.com",
      twitter: "https://twitter.com/johndoe",
    },
    {
      name: "Dr. Jane Smith",
      designation: "Senior Lecturer",
      department: "Information Technology",
      mobile: "8765432109",
      email: "jane.smith@example.com",
      twitter: "https://twitter.com/janesmith",
    },
  ];
  const organizersData = [
    {
      name: "John Doe",
      empId: "EMP12345",
      designation: "Assistant Professor, CSE",
      mobile: "9876543210",
      requisitionDate: "2024-11-22",
    },
    {
      name: "Jane Smith",
      empId: "EMP67890",
      designation: "Senior Lecturer, IT",
      mobile: "8765432109",
      requisitionDate: "2024-11-23",
    },
  ];

  if (!isOpen) return null; // Don't render the popup if it's closed

  return (
    <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div
        ref={popupRef}
        className="w-[70%] h-[50%] max-h-[90vh] overflow-y-auto bg-white shadow-md rounded-lg p-6 space-y-6 relative"
        style={{ fontFamily: "Afacad" }}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={handleClose}
        >
          <i className="fa fa-times text-xl"></i>
        </button>

        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Data for the Event
        </h1>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">
            Organizer Details
          </h2>
          <OrganizerTable organizersData={organizersData} />
          <h2 className="text-xl font-semibold text-gray-700">Event Details</h2>
          <EventsTable />
          <ResourcePersonTable resourcePersons={resourcePersonsData} />
          <MediaRequirementsTable />
        </div>
      </div>
    </div>
  );
};

export default MainPopup;
