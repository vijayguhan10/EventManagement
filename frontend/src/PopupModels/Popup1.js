import React from "react";

const Popup1 = ({
  eventsForSelectedDate,
  selectedDate,
  closeEventList,
  openEventModal,
}) => {
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
                      event.category
                        ? event.category.toLowerCase()
                        : "default-category"
                    }`}
                  >
                    {event.typeofevent}
                  </span>
                  <span
                    className={`event-category ${
                      event.category
                        ? event.category.toLowerCase()
                        : "default-category"
                    }`}
                  >
                    {event.status}
                  </span>
                  <span
                    className={`event-icon ${
                      event.category
                        ? event.category.toLowerCase()
                        : "default-category"
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
