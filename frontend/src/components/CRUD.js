import React, { useState, useEffect } from "react";
import {
  FaCalendar,
  FaSearchLocation,
  FaSearch,
  FaTimes,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import SideBar from "./SideBar";
import "../Modal.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function CRUD() {
  const token = localStorage.getItem("authToken");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editEventData, setEditEventData] = useState({
    eventname: "",
    resourceperson: "",
    organizer: "",
    venue: "",
    eventstarttime: "",
    eventendtime: "",
    eventstartdate: "",
    eventenddate: "",
    typeofevent: "",
    status: "",
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteEventName, setDeleteEventName] = useState("");
  const [Loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    eventTitle: "",
    eventVenue: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    resourcePerson: "",
    specialization: "",
    eventType: "",
    eventDescription: "",
    departments: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/event/getalldata`
        );
        const filteredData = response.data.eventdata.filter(
          (elem) => elem.status === "pending"
        );
        setData(filteredData);
        setEvents(filteredData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        toast.error("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (Loading) {
    return <div>Loading...</div>;
  }
  const handleOpenModal = (event) => {
    setSelectedEvent(event);
    setIsOpen(true);
    setIsEditing(true);

    // Populate form data including departments
    setFormData({
      eventTitle: event.eventname,
      eventVenue: event.venue,
      startDate: event.eventstartdate,
      endDate: event.eventenddate,
      startTime: event.eventstarttime,
      endTime: event.eventendtime,
      resourcePerson: event.resourceperson,
      specialization: event.specialization,
      eventType: event.typeofevent,
      eventDescription: event.description || "",
      departments: event.departments || [], // Set departments from backend data
    });
    setEditEventData({ ...event });
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedEvent(null);
    setIsEditing(false);
  };

  const handleDeleteConfirmation = (event) => {
    setSelectedEvent(event);
    setShowDeleteModal(true);
  };
  const formatDateToInput = (dateStr) => {
    const [day, month, year] = dateStr.split("/");
    return `20${year}-${month}-${day}`;
  };

  const formatDateFromInput = (dateStr) => {
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year.slice(-2)}`; // Get last two digits of year
  };

  const handleDelete = async () => {
    if (deleteEventName === selectedEvent.eventname) {
      try {
        await axios.post(
          `${process.env.REACT_APP_BASE_URL}/event/delete_event`,
          { eventid: selectedEvent._id }
        );

        const updatedEvents = events.filter((e) => e._id !== selectedEvent._id);
        setEvents(updatedEvents);
        toast.success("Event deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete the event.");
      }
      setShowDeleteModal(false);
      setDeleteEventName("");
      handleCloseModal();
    } else {
      alert("Event name does not match. Please try again.");
    }
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
  ];

  const handleEdit = (event) => {
    console.log(event, "🎉🎉🎉🎉🎉");
    handleOpenModal(event);
  };
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
      // Update the departments array
      if (checked) {
        // Add department if checked
        setFormData((prev) => ({
          ...prev,
          departments: [...prev.departments, value],
        }));
      } else {
        // Remove department if unchecked
        setFormData((prev) => ({
          ...prev,
          departments: prev.departments.filter((dept) => dept !== value),
        }));
      }
    } else {
      // For other input types
      setEditEventData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSaveEdit = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/event/modify_event`,
        {
          eventId: selectedEvent._id,
          ...editEventData,
        }
      );
      console.log(response);

      if (response.status === 200) {
        const updatedEvents = events.map((event) =>
          event._id === selectedEvent._id
            ? { ...event, ...editEventData }
            : event
        );
        setEvents(updatedEvents);
        toast.success("Event updated successfully!");
      } else {
        toast.error("Failed to update the event.");
      }

      handleCloseModal();
    } catch (error) {
      if (error.response && error.response.status) {
        if (error.response.status === 400) {
          toast.error("Bad request. Please check your input.");
        } else if (error.response.status === 404) {
          toast.error("Event not found.");
        } else if (error.response.status === 500) {
          toast.error("Server error. Please try again later.");
        } else {
          toast.error("Failed to update the event.");
        }
      } else {
        toast.error("Failed to update the event.");
      }
    }
  };

  const filteredEvents = events.filter((event) =>
    event.eventname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="xl:ml-72 overflow-x-hidden">
      <SideBar />
      <div className="m-4 xl:mt-5">
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded mb-4 w-full"
        />
      </div>
      <div className="xl:grid xl:grid-cols-3 xl:gap-6 flex flex-col gap-5 m-4 xl:mt-5">
        {filteredEvents.map((event, index) => (
          <div
            key={index}
            className="w-96 h-full shadow-md shadow-[#0b0b0c67] rounded-lg relative transition-transform transform hover:scale-105 duration-300"
          >
            <button className="bg-violet-600 mb-2 font-Afacad absolute ml-64 mt-1 text-white font-bold rounded-md w-28">
              {event.typeofevent}
            </button>
            <img
              className="w-96 h-40 rounded-lg object-cover"
              src="https://www.teami.org/wp-content/uploads/2020/03/80453288_2843723012318282_1636474684004368384_o.jpg"
              alt={event.eventname}
            />
            <div className="ml-5 mt-3 flex flex-row gap-1">
              <FaCalendar size={20} className="mt-1" color="#46459d" />
              <h1 className="text-xl text-[#8b21e8] font-Afacad">
                {event.eventenddate}
              </h1>
            </div>
            <div className="ml-5 flex flex-col gap-3 mt-3">
              <h1 className="font-bold text-3xl font-Afacad">
                {event.eventname}
              </h1>
              <h1 className="font-bold text-gray-500 text-xl font-Afacad">
                {event.organizer}
              </h1>
              <div className="flex flex-row">
                <FaSearchLocation
                  className="mt-1 mr-1 font-Afacad"
                  color="#06060b9b"
                />
                <h1 className="font-bold text-xl text-[#06060b9b]">
                  {event.venue}
                </h1>
              </div>
              <div className="flex gap-2 mt-3">
                <button
                  className="text-white p-2 rounded-md bg-blue-500 hover:bg-blue-600 transition duration-300"
                  onClick={() => handleEdit(event)}
                >
                  <FaEdit color="#fff" />
                </button>
                <button
                  className="text-white p-2 rounded-md bg-red-500 hover:bg-red-600 transition duration-300"
                  onClick={() => handleDeleteConfirmation(event)}
                >
                  <FaTrash color="#fff" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-3xl mx-4 animate-open">
            <FaTimes
              size={30}
              className="absolute top-4 right-4 text-gray-600 cursor-pointer hover:text-gray-800 transition-colors"
              onClick={handleCloseModal}
            />
            <h1 className="text-3xl font-bold mb-4 border-b pb-2">
              <input
                type="text"
                value={editEventData.eventname}
                onChange={handleChange}
                name="eventname"
                className="border-b border-gray-300 w-full focus:outline-none focus:border-blue-500"
                placeholder="Event Name"
              />
            </h1>
            <div className="scrollable-form mb-4 overflow-y-auto max-h-60">
              {" "}
              {/* Scrollable container */}
              <label className="block font-Afacad text-gray-700 text-sm font-bold mb-2">
                Departments
              </label>
              <div className="flex flex-wrap mb-4">
                {departmentOptions.map((department) => (
                  <div key={department.shortName} className="mr-4 mb-2">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name="departments"
                        value={department.fullName}
                        checked={formData.departments.includes(
                          department.fullName
                        )}
                        onChange={handleChange}
                        className="form-checkbox h-5 w-5 text-blue-600"
                      />
                      <span className="ml-2 text-gray-800">
                        {department.shortName}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
              <div className="p-6 bg-white rounded-lg shadow-lg max-h-[80vh] overflow-y-auto custom-scrollbar">
                <div className="space-y-6">
                  {[
                    {
                      label: "Resource Person",
                      name: "resourceperson",
                      type: "text",
                    },
                    { label: "Event Title", name: "eventname", type: "text" },
                    { label: "Venue", name: "venue", type: "text" },
                    {
                      label: "Start Date",
                      name: "eventstartdate",
                      type: "date",
                    },
                    { label: "End Date", name: "eventenddate", type: "date" },
                    {
                      label: "Start Time",
                      name: "eventstarttime",
                      type: "time",
                    },
                    { label: "End Time", name: "eventendtime", type: "time" },
                    { label: "Status", name: "status", type: "text" },
                  ].map(({ label, name, type }) => (
                    <label key={name} className="block">
                      <span className="text-gray-800 font-semibold">
                        {label}:
                      </span>
                      <input
                        type={type}
                        value={
                          type === "date"
                            ? formatDateToInput(editEventData[name])
                            : editEventData[name]
                        }
                        onChange={(e) => handleChange(e, name)}
                        name={name}
                        className="border border-gray-300 rounded-lg p-3 w-full mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </label>
                  ))}

                  {/* Event Type Radio Buttons */}
                  <div>
                    <span className="text-gray-800 font-semibold">
                      Event Type:
                    </span>
                    <div className="mt-3 flex space-x-4">
                      {["Technical", "Non-Technical", "Placement"].map(
                        (eventType) => (
                          <label
                            key={eventType}
                            className="inline-flex items-center"
                          >
                            <input
                              type="radio"
                              name="typeofevent"
                              value={eventType}
                              checked={editEventData.typeofevent === eventType}
                              onChange={handleChange}
                              className="form-radio text-blue-600"
                            />
                            <span className="ml-2 text-gray-700">
                              {eventType}
                            </span>
                          </label>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="bg-green-500 text-white rounded px-4 py-2 mr-2 hover:bg-green-600 transition-colors"
                onClick={handleSaveEdit}
              >
                Save
              </button>
              <button
                className="bg-gray-500 text-white rounded px-4 py-2 hover:bg-gray-600 transition-colors"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-80 mx-4">
            <h2 className="text-xl font-bold mb-4">Delete Event</h2>
            <p>
              Are you sure you want to delete the event{" "}
              <strong>{selectedEvent.eventname}</strong>? Type the event name to
              confirm:
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
      <ToastContainer />
    </div>
  );
}

export default CRUD;
