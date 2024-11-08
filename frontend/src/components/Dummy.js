import React, { useState, useEffect } from "react";
import {
  FaCalendar,
  FaSearchLocation,
  FaSearch,

  FaTimesCircle,
} from "react-icons/fa";
import SideBar from "./SideBar";
import "../Modal.css";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "../editmodal.css";
import "../Calender.css";
import Popup2 from "../PopupModels/Popup2";

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
function Placement() {
  const [numResourcePersons, setNumResourcePersons] = useState(0);
  const [DepartmentPopup, SetDepartmentPopup] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [iseditOpen, setIseditOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectededitEvent, setSelectededitEvent] = useState(null);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [eventType, setEventType] = useState("All");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteEventName, setDeleteEventName] = useState("");
  const [events, setEvents] = useState([]);
  const [itemToDelete, setItemToDelete] = useState(null);
  const closeEventModal = () => {
    setSelectedEvent(null);
  };
  const token = localStorage.getItem("authToken");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const handleshow = () => {
    setResourcePersonModalOpen(true);
  };
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
  const handleeditCloseModal = () => {
    setIseditOpen(false);
    setSelectededitEvent(null);
  };
  const handleOpeneditModal = (event) => {
    console.log("ccvcccccccccc😤😤😤", event);

    // Check if event is defined
    if (!event) {
      console.error("Event is null or undefined");
      return;
    }

    function formatDate(date) {
      const parts = date.split("/");
      if (parts.length !== 3) {
        console.error("Invalid date format:", date);
        return "";
      }

      const year = parts[2].length === 2 ? "20" + parts[2] : parts[2]; // Ensure four-digit year
      const formattedDate = `${year}-${parts[1]}-${parts[0]}`;

      const dateObj = new Date(formattedDate);
      if (isNaN(dateObj)) {
        console.error("Invalid date provided:", formattedDate);
        return "";
      }

      return formattedDate;
    }

    setSelectedEvent(event);
    console.log("event.resourceperson", event.resourceperson);
    setresoucep(event.resourceperson.length);
    setrealresourceperson(event.resourceperson.length);
    setFormData({
      eventname: event.eventname,
      resourceperson: Array.isArray(event.resourceperson)
        ? event.resourceperson.map((person) => {
            const name = Object.keys(person)[0];
            const specialization = person[name];
            return { name, specialization };
          })
        : [],
      organizer: event.organizer,
      venue: event.venue,
      departments: event.departments || [],
      departmentspecification: event.departmentspecification || [],
      eventstarttime: event.eventstarttime,
      eventendtime: event.eventendtime,
      eventstartdate: formatDate(event.eventstartdate),
      eventenddate: formatDate(event.eventenddate),
      typeofevent: event.typeofevent,
      imageurl: event.imageurl,
      status: event.status,
      year: event.year,
    });

    setIseditOpen(true);
    console.log("resource person detail;s", formData);
  };

  const [isResourcePopupOpen, setIsResourcePopupOpen] = useState(false);
  const closeResourcePopup = () => {
    setIsResourcePopupOpen(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
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
  const handleViewResourcePersons = () => {
    setIsResourcePopupOpen(true);
  };
  const handleDeleteConfirmation = (event) => {
    console.log("❤️‍🔥❤️‍🔥❤️‍🔥", event);
    setSelectedEvent(event);
    setShowDeleteModal(true);
    setItemToDelete(null); // Reset
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleRefreshResourcePersons = () => {
    setResourcePersonDetails([]);
  };
  const handleDeleteResourcePerson = (index) => {
    setResourcePersonDetails((prevDetails) =>
      prevDetails.filter((_, i) => i !== index)
    );
  };

  const handleResourcePersonDetailChange = (index, field, value) => {
    setFormData((prevFormData) => {
      const updatedResourcePerson = [...prevFormData.resourceperson];
      updatedResourcePerson[index] = {
        ...updatedResourcePerson[index],
        [field]: value,
      };
      return { ...prevFormData, resourceperson: updatedResourcePerson };
    });
  };
  

  const [validationErrors, setValidationErrors] = useState([]);
  const handleSaveResourcePersons = () => {
    const errors = resourcePersonDetails.reduce((acc, person, index) => {
      if (!person.name || !person.specialization) {
        acc.push(index);
      }
      return acc;
    }, []);

    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors([]);

    const formattedResourcePersons = resourcePersonDetails.reduce(
      (acc, person) => {
        acc[person.name] = person.specialization;
        return acc;
      },
      {}
    );
    console.log("🐦‍🔥🐦‍🔥🐦‍🔥🐦‍🔥🐦‍🔥🐦‍🔥🐦‍🔥", formData);
    setFormData((prev) => ({
      ...prev,
      resourcePersons: formattedResourcePersons,
    }));
    console.log("🐦‍🔥🐦‍🔥🐦‍🔥🐦‍🔥🐦‍🔥🐦‍🔥🐦‍🔥", formData);
    setResourcePersonModalOpen(false);
  };
  const convertTo12HourFormat = (time) => {
    if (!time) return "";
    let [hours, minutes] = time.split(":");
    hours = parseInt(hours, 10);
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert hour "0" to "12" for 12-hour format
    return `${hours}:${minutes} ${ampm}`;
  };
  const [resourcep, setresoucep] = useState(0);
  const [realresourceperson, setrealresourceperson] = useState(0);
  const [formData, setFormData] = useState({
    eventname: "",
    resourceperson: [],
    organizer: "",
    venue: "",
    department: "",
    eventstarttime: "",
    eventendtime: "",
    eventstartdate: "",
    eventenddate: "",
    typeofevent: "",
    departmentspecification: [],
  });
  const handleNumResourcePersonsChange = (e) => {
    const newCount = parseInt(e.target.value, 10); // Ensure a valid number is used

    if (newCount > realresourceperson) {
      setresoucep(newCount);
    } else if (newCount < realresourceperson) {
      setresoucep(realresourceperson);
    }

    const currentCount = formData.resourceperson.length;

    if (newCount > currentCount) {
      // Add the necessary number of empty entries
      const additionalPersons = Array(newCount - currentCount).fill({
        name: "",
        specialization: "",
      });
      const updatedResourcePersons = [
        ...formData.resourceperson,
        ...additionalPersons,
      ];

      setFormData({
        ...formData,
        resourceperson: updatedResourcePersons,
      });
      console.log("🐦‍🔥🐦‍🔥🐦‍🔥🐦‍🔥🐦‍🔥🐦‍🔥🐦‍🔥", formData);
    } else if (newCount < currentCount) {
      const trimmedResourcePersons = formData.resourceperson.slice(0, newCount);

      setFormData({
        ...formData,
        resourceperson: trimmedResourcePersons,
      });
      console.log("🐦‍🔥🐦‍🔥🐦‍🔥🐦‍🔥🐦‍🔥🐦‍🔥🐦‍🔥", formData);
    }
  };

  const [resourcePersonModalOpen, setResourcePersonModalOpen] = useState(false);
  const [resourcePersonDetails, setResourcePersonDetails] = useState([]);
  const handleAddResourcePersons = () => {
    const additionalPersonsCount =
      numResourcePersons - resourcePersonDetails.length;

    if (additionalPersonsCount > 0) {
      const newResourcePersons = Array.from(
        { length: additionalPersonsCount },
        () => ({
          name: "",
          specialization: "",
        })
      );
      setResourcePersonDetails((prevDetails) => [
        ...prevDetails,
        ...newResourcePersons,
      ]);
    }

    setResourcePersonModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("before submitting", formData);
      const updatedEvent = {
        eventId: selectedEvent._id,
        eventname: formData.eventname,
        resourceperson: formData.resourceperson,
        organizer: formData.organizer,
        venue: formData.venue,
        departments: [
          departmentOptions.find(
            (dept) => dept.shortName === formData.department
          )?.fullName,
        ],
        eventstarttime: formData.eventstarttime,
        eventendtime: formData.eventendtime,
        eventstartdate: formData.eventstartdate,
        eventenddate: formData.eventenddate,
        typeofevent: formData.typeofevent,
      };
      console.log("consoleing the updated events", updatedEvent);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/event/modify_event`,
        updatedEvent
      );
      handleCloseeditModal();
      if (response.status === 201 || response.status === 200) {
        console.log("sucessfull response : ", response);
        toast.success("Event edited successfully!");
      }
      // setLoading(true);
    } catch (error) {
      handleCloseeditModal();

      toast.error(error.message);
      console.error("Error updating event:", error);
    }
  };
  const datafetch = (event) => {
    setEventType(event);
    const newFilteredData = data.filter((event) => {
      return eventType === "All" || event.typeofevent === event; // Update the condition as per your field
    });
    if (newFilteredData.length > 0) {
      setSelectedEvent(newFilteredData[0]); // Set the first event as selected
    } else {
      setSelectedEvent(null); // Reset if no events match
    }
  };

  const handleOpenModal = (event) => {
    setSelectedEvent(event);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedEvent(null);
  };
  const handleCloseeditModal = () => {
    setIseditOpen(false);
    setSelectededitEvent(null);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data.filter((event) => {
    const matchesSearchTerm = event.eventname
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesEventType =
      eventType === "All" || event.typeofevent === eventType; // Assuming your event data has a 'typeofevent' field
    return matchesSearchTerm && matchesEventType;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }
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
          Explore the {eventType} Events
        </h1>

        {/* Filter UI */}
        <div className="mt-3 ml-5">
          <select
            value={eventType}
            onChange={(e) => datafetch(e.target.value)}
            className="p-2 border border-[#7848F4] rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-[#7848F4] transition"
          >
            <option value="All">All</option>
            <option value="Technical">Technical</option>
            <option value="Nontechnical">Non-Technical</option>
            <option value="Placement">Placement</option>
          </select>
        </div>

        <div className="xl:relative xl:w-96 mt-1 mr-16 ml-5">
          <input
            type="text"
            placeholder="Enter the event name"
            value={searchTerm}
            onChange={handleSearch}
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
        {filteredData.map((event, index) => (
          <div
            key={index}
            className="w-96 h-full shadow-md shadow-[#0b0b0c67] rounded-lg relative"
          >
            <button
              className={`mb-2 font-Afacad absolute ml-64 mt-1 text-white font-bold rounded-md w-28 ${
                new Date(event.eventenddate) < new Date()
                  ? "bg-[#2cef5d]"
                  : "bg-[#f92d2d]"
              }`}
            >
              {new Date(event.eventenddate) < new Date()
                ? "Completed"
                : "Not Completed"}
            </button>
            <img
              className="w-96 h-40 rounded-lg"
              src={event.imageurl}
              alt={event.eventname}
            />
            <div className="ml-5 mt-3 flex flex-row gap-1">
              <FaCalendar size={20} className="mt-1" color="#46459d" />
              <h1 className="text-xl text-[#8b21e8] font-Afacad">
                {event.eventstartdate} - {event.eventenddate}
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
              <div className="flex flex-row gap-2 mt-2">
                <button
                  className="bg-violet-800 mb-2 text-xl font-Afacad text-white font-bold rounded-md w-28"
                  onClick={() => handleOpenModal(event)}
                >
                  View More
                </button>
                <button
                  className="bg-blue-600 mb-2 text-xl font-Afacad text-white font-bold rounded-md w-28"
                  onClick={() => handleOpeneditModal(event)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-600 mb-2 text-xl font-Afacad text-white font-bold rounded-md w-28"
                  onClick={() => handleDeleteConfirmation(event)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
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

      {isOpen && selectedEvent && (
        <Popup2
          selectedEvent={selectedEvent}
          closeEventModal={closeEventModal}
          convertTo12HourFormat={convertTo12HourFormat}
          handleViewResourcePersons={handleViewResourcePersons}
          DepartmentPopup={DepartmentPopup}
          SetDepartmentPopup={SetDepartmentPopup}
          closeResourcePopup={closeResourcePopup}
        />
      )}
      {iseditOpen && (
        <div
          style={{ zIndex: 1000 }}
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
        >
          <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-3xl h-4/5 overflow-y-auto">
            <span
              className="absolute top-4 right-4 cursor-pointer"
              onClick={handleeditCloseModal}
              aria-label="Close"
            >
              <FaTimesCircle className="text-red-500 hover:text-red-700 text-xl" />
            </span>
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Edit Event
            </h2>
            <form onSubmit={handleFormSubmit}>
              {[
                { label: "Event Name", name: "eventname", type: "text" },
                { label: "Venue", name: "venue", type: "text" },
              ].map(({ label, name, type }) => (
                <label className="block mb-4" key={name}>
                  <span className="text-gray-700">{label}:</span>
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-100"
                    placeholder={`Enter ${label.toLowerCase()}`}
                  />
                </label>
              ))}

              {/* New "Number of Resource Persons" input field for editing */}
              <div className="mb-4">
                <label className="block font-Afacad text-gray-700 text-xl font-bold mb-2">
                  Number of Resource Persons
                </label>
                <input
                  type="number"
                  value={resourcep}
                  onChange={handleNumResourcePersonsChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  min="0"
                />
                <button
                  type="button"
                  onClick={handleAddResourcePersons}
                  className="mt-2 bg-[#7848F4] text-white font-bold py-2 px-4 rounded hover:bg-[#5929c4]"
                >
                  Add Resource Persons
                </button>
                <button
                  type="button"
                  onClick={handleshow}
                  className="mt-2 bg-[#7848F4] text-white font-bold py-2 px-4 rounded hover:bg-[#5929c4]"
                >
                  Show
                </button>
              </div>

              <label className="block mb-4">
                <span className="text-gray-700">Department:</span>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300 bg-gray-100"
                >
                  {departmentOptions.map((dept) => (
                    <option key={dept.shortName} value={dept.shortName}>
                      {dept.fullName}
                    </option>
                  ))}
                </select>
              </label>

              {/* Radio Buttons for Type of Event */}
              <fieldset className="mb-4">
                <legend className="text-gray-700">Type of Event:</legend>
                {[
                  "Workshop",
                  "Seminar",
                  "Guest Lecture",
                  "Webinar",
                  "Conference",
                  "Project Contest",
                  "Hackathon",
                  "Symposium",
                  "Competition",
                  "Leadership Talk",
                  "Placement Drive",
                  "Celebration",
                  "Prize Distribution",
                  "Student Training",
                  "Project Expo",
                  "Outreach",
                  "Extension Activity",
                  "Value Added Course",
                  "Orientation Faculty",
                  "Orientation Student",
                  "Faculty Development Program",
                  "Sports Event",
                  "Lab/Center of Excellence Inauguration",
                  "MoU Signing",
                  "Annual Day",
                  "Graduation Day",
                  "Sports Day",
                  "Alumni Event",
                  "Culturals",
                  "Tech Fest",
                  "NSS",
                  "NCC Event",
                  "Interaction with Outside Experts",
                ].map((type) => (
                  <label key={type} className="block mb-2">
                    <input
                      type="radio"
                      name="typeofevent"
                      value={type}
                      checked={formData.typeofevent === type}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    {type}
                  </label>
                ))}
              </fieldset>

              {[
                {
                  label: "Event Start Time",
                  name: "eventstarttime",
                  type: "time",
                },
                { label: "Event End Time", name: "eventendtime", type: "time" },
                {
                  label: "Event Start Date",
                  name: "eventstartdate",
                  type: "date",
                },
                { label: "Event End Date", name: "eventenddate", type: "date" },
              ].map(({ label, name, type }) => (
                <label className="block mb-4" key={name}>
                  <span className="text-gray-700">{label}:</span>
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </label>
              ))}

              <button
                type="submit"
                className="mt-4 w-full bg-blue-500 text-white font-semibold rounded-lg py-2 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
              >
                Update Event
              </button>
            </form>
          </div>
        </div>
      )}

      {isResourcePopupOpen && (
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
              Resource Persons
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
              {selectedEvent.resourceperson.length > 0 ? (
                selectedEvent.resourceperson.map((person, index) => {
                  const [key, value] = Object.entries(person)[0];
                  return (
                    <div
                      key={index}
                      className="resource-person-row"
                      style={{
                        padding: "10px 0",
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      <strong style={{ color: "#555" }}>{key}</strong>:{" "}
                      <span style={{ color: "#777" }}>{value}</span>
                    </div>
                  );
                })
              ) : (
                <p style={{ color: "#999", textAlign: "center" }}>
                  No resource persons available.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      {resourcePersonModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-[1000] bg-black bg-opacity-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
            {/* Close and Refresh Buttons */}
            <button
              type="button"
              onClick={() => setResourcePersonModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-3xl font-bold px-2"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-4 flex items-center">
              Enter Resource Persons
              <button
                type="button"
                onClick={handleRefreshResourcePersons}
                className="ml-3 bg-gray-200 p-1 rounded text-gray-600 hover:text-gray-800"
                title="Refresh"
              >
                &#8635;
              </button>
            </h2>

            {formData.resourceperson.map((person, index) => (
              <div key={index} className="mb-4 relative">
                {console.log("form data hwile opening",formData)}
                {console.log("😎😎😎😎😎😪😪", formData.resourceperson)}  
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-semibold">{index + 1}.</span>
                  <button
                    type="button"
                    onClick={() => handleDeleteResourcePerson(index)}
                    className="text-red-500 hover:text-red-700 text-xl font-bold"
                  >
                    &times;
                  </button>
                </div>

                  <input
                  type="text"
                  placeholder="Resource Person Name"
                  value={person.name}
                  onChange={(e) =>
                    handleResourcePersonDetailChange(
                      index,
                      "name",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
                />
                {validationErrors.includes(index) && !person.name && (
                  <p className="text-red-500 text-xl mt-1">
                    Please enter a name.
                  </p>
                )}

                <input
                  type="text"
                  placeholder="Specialization"
                  value={person.specialization}
                  onChange={(e) =>
                    handleResourcePersonDetailChange(
                      index,
                      "specialization",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {validationErrors.includes(index) && !person.specialization && (
                  <p className="text-red-500 text-xl mt-1">
                    Please enter a specialization.
                  </p>
                )}
              </div>
            ))}

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSaveResourcePersons}
                className="bg-[#7848F4] text-white font-bold py-2 px-4 rounded hover:bg-[#5929c4]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default Placement;