import React, { useState,useEffect } from "react";
import { jwtDecode } from "jwt-decode";
const departmentOptions = [
  { fullName: "Computer and Communication Engineering", shortName: "CCE" },
  { fullName: "Computer Science Engineering", shortName: "CSE" },
  {
    fullName: "Artificial Intelligence and Data Science",
    shortName: "AI & DS",
  },
  { fullName: "Electronics and Communication Engineering", shortName: "ECE" },
  { fullName: "Information Technology", shortName: "IT" },
  { fullName: "Mechanical Engineering", shortName: "MECH" },
  {
    fullName: "Artificial Intelligence and Machine Learning",
    shortName: "AI & ML",
  },
  { fullName: "Computer Science and Business Systems", shortName: "CSBS" },
  { fullName: "Electrical and Electronics Engineering", shortName: "EEE" },
  { fullName: "Cybersecurity", shortName: "Cyber" },
  { fullName: "All", shortName: "All" },
];
const Popup2 = ({
  selectedEvent,
  closeEventModal,
  convertTo12HourFormat,
  handleViewResourcePersons,
  DepartmentPopup,
  SetDepartmentPopup,
  closeResourcePopup,
}) => {
  const [token] = useState(localStorage.getItem("authToken"));
  const handleCloseOnEscape = (e) => {
    if (e.key === "Escape") {
      closeEventModal();
    }
  };

  const handleCloseOnClickOutside = (e) => {
    if (e.target.classList.contains("custom-modal-overlay")) {
      closeEventModal();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleCloseOnEscape);
    document.addEventListener("click", handleCloseOnClickOutside);

    return () => {
      document.removeEventListener("keydown", handleCloseOnEscape);
      document.removeEventListener("click", handleCloseOnClickOutside);
    };
  }, [])
  const isTokenValid = (token) => {
    if (!token) return { isValid: false, role: null };
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      const isValid = decoded.exp > currentTime;
      const role = decoded.role;
      return { isValid, role };
    } catch (error) {
      return { isValid: false, role: null };
    }
  };

  if (!selectedEvent) return null;

  const { isValid: isAuthenticated, role } = isTokenValid(token);

  const handleCloseResourcePopup = () => {
    SetDepartmentPopup(false);
  };
  const getShortName = (fullName) => {
    const department = departmentOptions.find((dept) => dept.fullName === fullName);
    return department ? department.shortName : fullName;
  };

  
  return (
<div className="custom-modal-overlay" style={{ 
  display: "flex", 
  justifyContent: "center", 
  alignItems: "center", 
  position: "fixed", 
  top: 0, 
  left: 0, 
  width: "100%", 
  height: "100%", 
  backgroundColor: "rgba(0, 0, 0, 0.5)", 
  zIndex: 9998,
  borderRadius: "10px", 
}}>

  <div 
    className="custom-modal-content" 
    style={{
      maxHeight: "90vh",
      overflowY: "auto",
      borderRadius: "12px", // Slightly rounded border for a smoother look
      padding: "20px",
      backgroundColor: "#fff",
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
      scrollbarWidth: "thin", // For Firefox
      scrollbarColor: "#ccc #f1f1f1", // Thumb and track colors
      width: "40%", // Adjust the width to 80% of the screen width (can be reduced more if necessary)
      maxWidth: "900px", // Limit the max width to avoid excessive expansion on larger screens
      margin: "0 auto", // Center the modal horizontally
    }}>

    <button 
      className="custom-close-modal" 
      onClick={closeEventModal}
      style={{
        position: "absolute", 
        top: "10px", 
        right: "15px", 
        background: "none", 
        border: "none", 
        fontSize: "1.5rem", 
        cursor: "pointer", 
        color: "#999", 
        borderRadius: "50%", 
        padding: "5px",
      }}>
      &times;
    </button>

    {isAuthenticated && role !== "mediamax" && (
      <img
        src={selectedEvent.imageurl}
        alt="Event"
        className="custom-modal-image"
        style={{
          width: "100%", 
          borderRadius: "10px", 
          marginBottom: "15px",
        }}
      />
    )}

    <div className="custom-modal-header">
      <h2 className="custom-modal-title" style={{ marginBottom: "10px", color: "#333", fontSize: "1.8rem", fontWeight: "bold" }}>
        {selectedEvent.eventname}
      </h2>
    </div>

    <div className="custom-modal-body">
      {selectedEvent.departments && selectedEvent.departments.length > 0 && (
        <div className="custom-modal-row" style={{ marginBottom: "15px" }}>
          <strong>Department:</strong>
          <span className="custom-modal-value">
            {selectedEvent.departments.map((dept) => getShortName(dept)).join(", ")}
          </span>
        </div>
      )}

      <div className="custom-modal-row" style={{ marginBottom: "15px" }}>
        <strong>Specification:</strong>
        <span
          onClick={() => SetDepartmentPopup(!DepartmentPopup)}
          className="custom-modal-value"
          style={{ color: "#007bff", cursor: "pointer" }}
        >
          View
        </span>

        {DepartmentPopup && (
          <div
            className="resource-popup-overlay"
            onClick={handleCloseResourcePopup}
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
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: "#fff",
                borderRadius: "15px", // rounded corners for the popup
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
                  fontWeight: "bold",
                }}
              >
                Departments In Detail
              </h2>

              <button
                className="custom-close-modal"
                onClick={handleCloseResourcePopup}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "15px",
                  background: "none",
                  border: "none",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  color: "#999",
                  borderRadius: "50%",
                  padding: "5px",
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
                  selectedEvent.departmentspecification.map((dept, index) => (
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
                  ))
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

      {/* Other rows for Venue, Time, Event Type, etc. */}
      <div className="custom-modal-row" style={{ marginBottom: "15px" }}>
        <strong>Venue:</strong>
        <span className="custom-modal-value">{selectedEvent.venue}</span>
      </div>

      {(selectedEvent.students || selectedEvent.teachers || selectedEvent.alumnis) && (
  <div className="custom-modal-row" style={{ marginBottom: "15px" }}>
    <strong>Event for:</strong>
    <span className="custom-modal-value">
      <span>
        {" ("}
        {selectedEvent.students && "Students"}
        {selectedEvent.students && (selectedEvent.teachers || selectedEvent.alumnis) && ", "}
        {selectedEvent.teachers && "Teachers"}
        {selectedEvent.teachers && selectedEvent.alumnis && ", "}
        {selectedEvent.alumnis && "Alumnis"}
        {")"}
      </span>
    </span>
  </div>
)}

      <div className="custom-modal-row" style={{ marginBottom: "15px" }}>
        <strong>Resource Person:</strong>
        <span className="custom-modal-value">
          <button onClick={handleViewResourcePersons} style={{ color: "#007bff", cursor: "pointer" }}>View</button>
        </span>
      </div>

      {/* More content */}
      <div className="custom-modal-row" style={{ marginBottom: "15px" }}>
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

          {isAuthenticated && role === "mediamax" && (
            <div className="custom-modal-row">
              <strong>Event Description:</strong>
              <span className="custom-modal-value">
                {selectedEvent.eventDescription}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Popup2;
