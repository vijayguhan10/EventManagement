import React, { useEffect, useRef } from "react";
import ResourcePersonTable from "../PopupModels/ResourcePersonTable";
import MediaRequirementsTable from "../PopupModels/MediaRequirmentsTable";
import EventsTable from "../PopupModels/EventsTable";
import OrganizerTable from "../PopupModels/OrganizerData";

const MainPopup = ({ eventData, isOpen, onClose }) => {
  console.log("event data : ", eventData);
  const popupRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  const handleOutsideClick = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  // Destructure event data with default values
  const {
    alumnis = [],
    departments = [],
    departmentspecification = [],
    eventDescription = "",
    eventenddate = "",
    eventendtime = "",
    eventname = "Untitled Event",
    eventstartdate = "",
    eventstarttime = "",
    international = false,
    iqac = false,
    logos = [],
    organizer = [],
    photography = [],
    resourceperson = [],
    selectedOptions = [],
    students = [],
    teachers = [],
    typeofevent = "General",
    venue = "Not Specified",
    videography = [],
    year = "",
  } = eventData || {};

  if (!isOpen) return null;

  // Consolidate data for tables
  const eventdata = [
    eventname,
    typeofevent,
    venue,
    alumnis,
    year,
    students,
    teachers,
    departments.join(", "),
    departmentspecification.join(", "),
    eventDescription,
    eventstartdate,
    eventstarttime,
    eventenddate,
    eventendtime,
    international ? "Yes" : "No",
    iqac ? "Yes" : "No",
  ];
  console.log("consoling the  main evendata : ", eventdata);
  const mediamax = [photography, videography, selectedOptions, logos];
  // console.log("consoling the media requirements : ", mediamax);
  return (
    <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div
        ref={popupRef}
        className="w-[70%] h-[50%] max-h-[90vh] overflow-y-auto bg-white shadow-md rounded-lg p-6 space-y-6 relative"
        style={{ fontFamily: "Afacad" }}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={onClose}
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
          <OrganizerTable organizersData={organizer} />

          <h2 className="text-xl font-semibold text-gray-700">Event Details</h2>
          <EventsTable eventdata={eventdata} />
          <h2 className="text-xl font-semibold text-gray-700">
            Resource Persons
          </h2>
          <ResourcePersonTable resourcePersons={resourceperson} />
          <MediaRequirementsTable mediamax={mediamax} />
        </div>
      </div>
    </div>
  );
};

export default MainPopup;
