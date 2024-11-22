import React, { useState } from "react";
import UpdateForm from "../components/UpdateForm";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
const DeptPopup = ({
  selectedEvent,
  closeEventModal,
  convertTo12HourFormat,
  handleViewResourcePersons,
  DepartmentPopup,
  SetDepartmentPopup,
  closeResourcePopup,
  onDeleteEvent,
}) => {
  const [isViewMore, setisViewMore] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/event/getalldata`
      );
      const filteredData = response.data.eventdata.filter(
        (elem) => elem.status === "pending"
      );
      console.log("rrrrrrrrrrrrrrrrrrrrrrr : ", filteredData);
      setData(filteredData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  const handleCloseModal = () => {
    setisViewMore(false);
    setevent(null);
  };
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [event, setevent] = useState(null);
  const [deleteEventName, setDeleteEventName] = useState("");
  if (!selectedEvent) return null;
  const handleCloseResourcePopup = () => {
    SetDepartmentPopup(false);
  };
  const handleDelete = async () => {
    if (deleteEventName === selectedEvent.eventname) {
      try {
        await axios.post(
          `${process.env.REACT_APP_BASE_URL}/event/delete_event`,
          { eventid: selectedEvent._id }
        );
        toast.success("Event deleted successfully!");
        setShowDeleteModal(false);
        setDeleteEventName("");
        fetchData(); // Fetch the data again after deletion to update the list
        handleCloseModal();
      } catch (error) {
        toast.error("Failed to delete the event.");
      }
    } else {
      alert("Event name does not match. Please try again.");
    }
  };
  const handleDeleteConfirmation = (event) => {
    console.log("❤️‍🔥❤️‍🔥❤️‍🔥", event);
    setevent(event);
    setShowDeleteModal(true);
  };
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
  const getShortName = (fullName) => {
    const department = departmentOptions.find(
      (dept) => dept.fullName === fullName
    );
    return department ? department.shortName : fullName;
  };
  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal-content">
        <button className="custom-close-modal" onClick={closeEventModal}>
          &times;
        </button>

        <div className="custom-modal-header">
          <h2 className="custom-modal-title">{selectedEvent.eventname}</h2>
        </div>

        <div className="custom-modal-body">
          {selectedEvent.departments &&
            selectedEvent.departments.length > 0 && (
              <div className="custom-modal-row">
                <strong>Department:</strong>
                <span className="custom-modal-value">
                  {selectedEvent.departments
                    .map((dept) => getShortName(dept))
                    .join(", ")}
                </span>
              </div>
            )}

          <div className="custom-modal-row">
            <strong>Specification:</strong>
            <span
              onClick={() => SetDepartmentPopup(!DepartmentPopup)}
              className="custom-modal-value cursor-pointer"
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
            {showDeleteModal && selectedEvent && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg relative w-80 mx-4">
                  <h2 className="text-xl font-bold mb-4">Delete Event</h2>
                  <p>
                    Are you sure you want to delete the event{" "}
                    <strong>{selectedEvent.eventname}</strong>? Type the event
                    name to confirm:
                  </p>
                  <input
                    type="text"
                    value={deleteEventName}
                    onChange={(e) => setDeleteEventName(e.target.value)}
                    className="border rounded p-2 w-full mt-2"
                  />
                  <div className="flex justify-end mt-4">
                    <button
                      className="bg-red-500 text-white rounded px-4 py-2 mr-2"
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-gray-500 text-white rounded px-4 py-2"
                      onClick={() => setShowDeleteModal(false)}
                    >
                      Cancel
                    </button>
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

        <div className="flex justify-center space-x-4 mt-4">
          <button
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none"
            onClick={() => setShowUpdateForm(true)} // Toggle showUpdateForm on click
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none"
            onClick={handleDeleteConfirmation}
          >
            Delete
          </button>
        </div>
      </div>

      {/* UpdateForm Popup */}
      {showUpdateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg xl:w-[85%] h-full max-h-[80vh] overflow-y-auto p-6">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
              onClick={() => setShowUpdateForm(false)} // Close UpdateForm popup
            >
              <FaTimes />{" "}
            </button>
            <UpdateForm selectedEvent={selectedEvent} />{" "}
            {/* Render the UpdateForm component */}
          </div>
        </div>
      )}
    </div>
  );
};

export default DeptPopup;
