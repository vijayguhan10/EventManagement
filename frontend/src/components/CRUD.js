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

  const handleEdit = (event) => {
    handleOpenModal(event);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditEventData({ ...editEventData, [name]: value });
  };

  const handleSaveEdit = async () => {
    try {
      console.log("updating the event data : ", editEventData);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/event/modify_event`,
        {
          eventId: selectedEvent._id,
          ...editEventData,
        }
      );
      console.log("return response while updating : ", response);

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
              className="absolute top-4 right-4 text-gray-600 cursor-pointer"
              onClick={handleCloseModal}
            />
            <h1 className="text-3xl font-bold mb-4">
              <input
                type="text"
                value={editEventData.eventname}
                onChange={handleChange}
                name="eventname"
                className="border rounded p-2 w-full"
              />
            </h1>
            <div className="space-y-4">
              <label>
                Resource Person:
                <input
                  type="text"
                  value={editEventData.resourceperson}
                  onChange={handleChange}
                  name="resourceperson"
                  className="border rounded p-2 w-full"
                />
              </label>
              <label>
                Organizer:
                <input
                  type="text"
                  value={editEventData.organizer}
                  onChange={handleChange}
                  name="organizer"
                  className="border rounded p-2 w-full"
                />
              </label>
              <label>
                Venue:
                <input
                  type="text"
                  value={editEventData.venue}
                  onChange={handleChange}
                  name="venue"
                  className="border rounded p-2 w-full"
                />
              </label>
              <label>
                Event Start Date:
                <input
                  type="date"
                  value={editEventData.eventstartdate}
                  onChange={handleChange}
                  name="eventstartdate"
                  className="border rounded p-2 w-full"
                />
              </label>
              <label>
                Event End Date:
                <input
                  type="date"
                  value={editEventData.eventenddate}
                  onChange={handleChange}
                  name="eventenddate"
                  className="border rounded p-2 w-full"
                />
              </label>
              <label>
                Event Start Time:
                <input
                  type="time"
                  value={editEventData.eventstarttime}
                  onChange={handleChange}
                  name="eventstarttime"
                  className="border rounded p-2 w-full"
                />
              </label>
              <label>
                Event End Time:
                <input
                  type="time"
                  value={editEventData.eventendtime}
                  onChange={handleChange}
                  name="eventendtime"
                  className="border rounded p-2 w-full"
                />
              </label>
              <label>
                Type of Event:
                <input
                  type="text"
                  value={editEventData.typeofevent}
                  onChange={handleChange}
                  name="typeofevent"
                  className="border rounded p-2 w-full"
                />
              </label>
              <label>
                Status:
                <input
                  type="text"
                  value={editEventData.status}
                  onChange={handleChange}
                  name="status"
                  className="border rounded p-2 w-full"
                />
              </label>
              <button
                onClick={handleSaveEdit}
                className="bg-green-500 text-white p-2 rounded mt-4 hover:bg-green-600 transition duration-300"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-lg mx-4">
            <h2 className="text-lg mb-4">
              Confirm Deletion of {selectedEvent.eventname}?
            </h2>
            <p>Type the event name to confirm:</p>
            <input
              type="text"
              value={deleteEventName}
              onChange={(e) => setDeleteEventName(e.target.value)}
              className="border rounded p-2 w-full mb-4"
            />
            <div className="flex justify-between">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-300"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-300 p-2 rounded hover:bg-gray-400 transition duration-300"
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
