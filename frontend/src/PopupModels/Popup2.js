import React from "react";

const Popup2 = ({
  selectedEvent,
  closeEventModal,
  convertTo12HourFormat,
  handleViewResourcePersons,
  DepartmentPopup,
  SetDepartmentPopup,
  closeResourcePopup,
}) => {
  if (!selectedEvent) return null; 

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal-content">
        <button className="custom-close-modal" onClick={closeEventModal}>
          &times;
        </button>
        <img
          src={selectedEvent.imageurl}
          alt="Event"
          className="custom-modal-image"
        />
        <div className="custom-modal-header">
          <h2 className="custom-modal-title">{selectedEvent.eventname}</h2>
        </div>
        <div className="custom-modal-body">
          {selectedEvent.departments &&
            selectedEvent.departments.length > 0 && (
              <div className="custom-modal-row">
                <strong>Department:</strong>
                <span className="custom-modal-value">
                  {selectedEvent.departments.join(", ")}
                </span>
              </div>
            )}

          <div className="custom-modal-row">
            <strong>Specification:</strong>
            <span
              onClick={() => SetDepartmentPopup(!DepartmentPopup)}
              className="custom-modal-value"
            >
              view
            </span>
            {DepartmentPopup && (
              <div
                className="resource-popup-overlay"
                style={{
                  zIndex: 9999,
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  className="resource-popup-content"
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                    padding: "20px",
                    width: "420px",
                    height: "500px",
                    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
                    position: "relative",
                  }}
                >
                  <h2
                    className="resource-popup-title"
                    style={{
                      marginBottom: "15px",
                      color: "#333",
                      fontSize: "1.5rem",
                    }}
                  >
                    Departments In Detail
                  </h2>
                  <button
                    className="custom-close-modal"
                    onClick={closeResourcePopup}
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "15px",
                      background: "none",
                      border: "none",
                      fontSize: "1.5rem",
                      cursor: "pointer",
                      color: "#999",
                    }}
                  >
                    &times;
                  </button>
                  <div
                    className="resource-person-list"
                    style={{
                      maxHeight: "400px",
                      overflowY: "scroll",
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                    }}
                  >
                    {selectedEvent.departmentspecification.length > 0 ? (
                      selectedEvent.departmentspecification.map(
                        (dept, index) => (
                          <div
                            key={index}
                            className="resource-person-row"
                            style={{
                              padding: "10px 0",
                              borderBottom: "1px solid #eee",
                            }}
                          >
                            <h1>{dept}</h1>
                          </div>
                        )
                      )
                    ) : (
                      <p style={{ color: "#999", textAlign: "center" }}>
                        No Specified Department available.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="custom-modal-row">
            <strong>Venue:</strong>
            <span className="custom-modal-value">{selectedEvent.venue}</span>
          </div>
          <div className="custom-modal-row">
            <strong>Resource Person:</strong>
            <span className="custom-modal-value">
              <button onClick={handleViewResourcePersons}>View</button>
            </span>
          </div>
          <div className="custom-modal-row">
            <strong>Year:</strong>
            <span className="custom-modal-value">{selectedEvent.year}</span>
          </div>
          <div className="custom-modal-row">
            <strong>Event Start Date:</strong>
            <span className="custom-modal-value">
              {selectedEvent.eventstartdate}
            </span>
          </div>
          <div className="custom-modal-row">
            <strong>Event End Date:</strong>
            <span className="custom-modal-value">
              {selectedEvent.eventenddate}
            </span>
          </div>
          <div className="custom-modal-row">
            <strong>Time:</strong>
            <span className="custom-modal-value">
              {convertTo12HourFormat(selectedEvent.eventstarttime)} to{" "}
              {convertTo12HourFormat(selectedEvent.eventendtime)}
            </span>
          </div>
          <div className="custom-modal-row">
            <strong>Event Type:</strong>
            <span className="custom-modal-value">
              {selectedEvent.typeofevent}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup2;
