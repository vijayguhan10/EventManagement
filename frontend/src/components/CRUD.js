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
import useDashboard from "./useDashboard";
import axios from "axios"; // Import axios
import { toast, ToastContainer } from "react-toastify"; // Import toast

function CRUD() {
  const { Loading, WholeData } = useDashboard();

  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState(data);
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
    description: "",
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteEventName, setDeleteEventName] = useState("");

  useEffect(() => {
    if (!Loading) {
      const filteredData = WholeData.filter(
        (elem) => elem.status === "pending"
      );
      setData(filteredData);
    }
  }, [Loading, WholeData]);

  if (Loading) {
    return <div>Loading...</div>;
  }

  const handleOpenModal = (event) => {
    setSelectedEvent(event);
    setIsOpen(true);
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
    console.log("Selected event to delete: ", selectedEvent._id);

    // Check if the event name matches
    if (deleteEventName === selectedEvent.eventname) {
      try {
        await axios.post(
          `https://eventmanagement-2-mye7.onrender.com/event/delete_event`,
          { eventid: selectedEvent._id } // Send it in an object
        );

        // Update events state to remove the deleted event
        const updatedEvents = events.filter((e) => e._id !== selectedEvent._id); // Change 'id' to '_id'
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
    setIsEditing(true);
    setEditEventData({
      eventname: event.eventname,
      resourceperson: event.resourceperson,
      organizer: event.organizer,
      venue: event.venue,
      eventstarttime: event.eventstarttime,
      eventendtime: event.eventendtime,
      eventstartdate: event.eventstartdate,
      eventenddate: event.eventenddate,
      typeofevent: event.typeofevent,
      description: event.description,
    });
    handleOpenModal(event);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditEventData({ ...editEventData, [name]: value });
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`/api/events/${selectedEvent.id}`, editEventData); // Dummy endpoint
      const updatedEvents = events.map((event) =>
        event.id === selectedEvent.id ? { ...event, ...editEventData } : event
      );
      setEvents(updatedEvents);
      toast.success("Event updated successfully!");
      handleCloseModal();
    } catch (error) {
      toast.error("Failed to update the event.");
    }
  };

  return (
    <div className="xl:ml-72 overflow-x-hidden">
      <SideBar />
      <div className="xl:flex flex-row justify-between items-center mb-3">
        <div className="absolute top-3 xl:relative xl:ml-[66%] xl:mt-5 flex justify-center xl:justify-end">
          <h1 className="text-xl ml-72 xl:mr-20 font-bold font-Afacad w-28 h-8 flex justify-center items-center xl:mb-3 shadow-md shadow-[#00000013] rounded-lg text-[#7848F4]">
            IQAC
          </h1>
        </div>
      </div>
      <div className="xl:flex xl:flex-row justify-between">
        <h1 className="xl:text-3xl ml-5 text-xl text-nowrap mt-3 mb-3 font-Afacad font-bold bg-gradient-to-r from-purple-500 to-violet-900 text-transparent bg-clip-text">
          Explore the Upcoming Events
        </h1>
        <div className="xl:relative xl:w-96 mt-1 mr-16 ml-5">
          <input
            type="text"
            placeholder="Enter the event name"
            className="xl:w-full xl:h-14 w-96 pl-5 h-14 xl:pl-10 xl:pr-16 border-[#7848F4] border rounded-md"
          />
          <div className="xl:absolute xl:left-2 xl:top-14 -mt-7 transform -translate-y-1/2 text-gray-400">
            <FaSearch className="xl:block hidden" />
          </div>
          <button className="xl:absolute font-Afacad right-2 top-1/2 ml-72 transform -translate-y-1/2 bg-[#7848F4] text-white px-4 py-1 rounded-sm">
            Search
          </button>
        </div>
      </div>
      <div className="xl:grid xl:grid-cols-3 xl:gap-6 flex flex-col gap-5 m-4 xl:mt-5">
        {data.map((event, index) => (
          <div
            key={index}
            className="w-96 h-full shadow-md shadow-[#0b0b0c67] rounded-lg relative"
          >
            <button className="bg-violet-600 mb-2 font-Afacad absolute ml-64 mt-1 text-white font-bold rounded-md w-28">
              {event.typeofevent}
            </button>
            <img
              className="w-96 h-40 rounded-lg"
              src={event.image_url}
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
                  className=" text-white p-2 rounded-md"
                  onClick={() => handleEdit(event)}
                >
                  <FaEdit color="#8b21e8" />
                </button>
                <button
                  className=" text-white p-2 rounded-md"
                  onClick={() => handleDeleteConfirmation(event)}
                >
                  <FaTrash color="#8b21e8" />
                </button>
              </div>
              <button
                className="bg-violet-800 mb-2 text-xl font-Afacad text-white font-bold rounded-md w-28"
                onClick={() => handleOpenModal(event)}
              >
                View More
              </button>
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
              {isEditing ? "Edit Event" : selectedEvent.eventname}
            </h1>
            {isEditing ? (
              <div>
                <input
                  type="text"
                  name="eventname"
                  value={editEventData.eventname}
                  onChange={handleChange}
                  className="border rounded p-2 w-full mb-2"
                  placeholder="Event Name"
                />
                {/* Add other fields similarly for editing */}
                <button
                  onClick={handleSaveEdit}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Save Changes
                </button>
              </div>
            ) : (
              <div>
                {/* Display the selected event details */}
                <h2>{selectedEvent.eventname}</h2>
                {/* Add other details similarly */}
              </div>
            )}
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-md mx-4 animate-open">
            <h2 className="text-lg mb-4">
              Are you sure you want to delete {selectedEvent.eventname}?
            </h2>
            <p>Please type the event name to confirm:</p>
            <input
              type="text"
              value={deleteEventName}
              onChange={(e) => setDeleteEventName(e.target.value)}
              className="border rounded p-2 w-full mb-4"
            />
            <div className="flex justify-between">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded"
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
