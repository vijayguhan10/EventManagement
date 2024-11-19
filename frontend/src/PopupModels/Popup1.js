import React, { useEffect } from "react";

const Popup1 = ({
  eventsForSelectedDate,
  selectedDate,
  closeEventList,
  openEventModal,
}) => {
  // Function to close modal when Escape key is pressed
  const handleCloseOnEscape = (e) => {
    if (e.key === "Escape") {
      closeEventList();
    }
  };

  // Function to close modal when clicking outside the modal
  const handleCloseOnClickOutside = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      closeEventList();
    }
  };

  // Adding event listeners on component mount and cleaning up on unmount
  useEffect(() => {
    document.addEventListener("keydown", handleCloseOnEscape);
    document.addEventListener("click", handleCloseOnClickOutside);

    // Cleanup event listeners on component unmount
    return () => {
      document.removeEventListener("keydown", handleCloseOnEscape);
      document.removeEventListener("click", handleCloseOnClickOutside);
    };
  }, []); // Empty dependency array ensures this runs only once (on mount and unmount)

  return (
    <div className="modal-overlay">
      <div className="modal-content font-Afacad font-semibold">
        <button className="close-modal" onClick={closeEventList}>
          &times;
        </button>
        <h2 className="modal-date-title">
          Events for{" "}
          {selectedDate.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </h2>
        <ul className="event-list text-lg font-Afacad font-semibold">
          {eventsForSelectedDate.length > 0 ? (
            eventsForSelectedDate.map((event, index) => (
              <li
                key={index}
                className="event-item"
                onClick={() => openEventModal(event)}
              >
                <div className="event-row">
                  <span className="event-name">{event.eventname}</span>
                  <span
                    className={`event-category ${
                      event.category ? event.category.toLowerCase() : "default-category"
                    }`}
                  >
                    {event.typeofevent}
                  </span>
                  <span
                    className={`event-category ${
                      event.category ? event.category.toLowerCase() : "default-category"
                    }`}
                  >
                    {event.status}
                  </span>
                  <span
                    className={`event-icon ${
                      event.category ? event.category.toLowerCase() : "default-category"
                    }`}
                  >
                    {event.category === "Tech" ? "📘" : "📕"}
                  </span>
                </div>
                <hr className="event-divider" />
              </li>
            ))
          ) : (
            <p>No events for this date.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Popup1;
