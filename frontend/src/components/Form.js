import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Forms() {
  const eventTypes = [
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
  ];
  const handleEventTypeSelection = (type) => {
    setFormData((prev) => ({ ...prev, eventType: type }));
    setShowEventTypeModal(false);
  };

  const token = localStorage.getItem("authToken");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const [disableIndividual, setDisableIndividual] = useState(false);
  const [disableAll, setDisableAll] = useState(false);
  const [showEventTypeModal, setShowEventTypeModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [errors, setErrors] = useState({});
  const today = new Date().toISOString().split("T")[0];
  const [showDepartments, setShowDepartments] = useState(false);
  const [formData, setFormData] = useState({
    eventTitle: "",
    eventVenue: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    resourcePersons: [],
    eventType: "",
    eventDescription: "6",
    departments: [],
    year: "",
  });
  const [numResourcePersons, setNumResourcePersons] = useState(0);
  const [resourcePersonModalOpen, setResourcePersonModalOpen] = useState(false);
  const [resourcePersonDetails, setResourcePersonDetails] = useState([]);
  const handleNumResourcePersonsChange = (e) => {
    setNumResourcePersons(e.target.value);
  };

  const handleAddResourcePersons = () => {
    const newResourcePersons = Array.from(
      { length: numResourcePersons },
      () => ({
        name: "",
        specialization: "",
      })
    );
    setResourcePersonDetails(newResourcePersons);
    setResourcePersonModalOpen(true);
  };

  const handleResourcePersonDetailChange = (index, field, value) => {
    const updatedDetails = [...resourcePersonDetails];
    updatedDetails[index][field] = value;
    setResourcePersonDetails(updatedDetails);
  };

  const handleSaveResourcePersons = () => {
    const formattedResourcePersons = resourcePersonDetails.reduce(
      (acc, person) => {
        if (person.name && person.specialization) {
          acc[person.name] = person.specialization;
        }
        return acc;
      },
      {}
    );
    setFormData((prev) => ({
      ...prev,
      resourcePersons: formattedResourcePersons,
    }));
    setResourcePersonModalOpen(false);
  };
  const handleRemovePerson = (index) => {
    const updatedPersons = formData.resourcePersons.filter(
      (_, i) => i !== index
    );
    setFormData.resourcePersons(updatedPersons);
  };
  const handleEditPerson = (index, field, value) => {
    const updatedPersons = [...formData.resourcePersons];
    updatedPersons[index][field] = value;
    setFormData.resourcePersons(updatedPersons);
  };
  const individualDepartments = [
    "CFI",
    "CFRD",
    "Academics",
    "Alumni",
    "IQAC",
    "EDC",
    "Placement",
    "Mediamax",
    "HR",
    "Training",
    "Maintenance",
    "COE",
    "Library",
    "Hostel",
    "Medical",
    "Higher Education Cell",
    "PET",
    "NCC",
    "NSS",
    "YRC",
    "UBA",
  ];

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

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "radio") {
      setFormData((prev) => ({ ...prev, eventType: value }));
    } else if (type === "checkbox" && name === "departments") {
      const selectedDepartments = [...formData.departments];
      if (value === "All") {
        if (e.target.checked) {
          setFormData((prev) => ({ ...prev, departments: ["All"] }));
          setDisableIndividual(true);
        } else {
          setFormData((prev) => ({ ...prev, departments: [] }));
          setDisableIndividual(false);
        }
      } else {
        if (e.target.checked) {
          selectedDepartments.push(value);
        } else {
          const index = selectedDepartments.indexOf(value);
          if (index !== -1) selectedDepartments.splice(index, 1);
        }
        setFormData((prev) => ({ ...prev, departments: selectedDepartments }));
        setDisableAll(selectedDepartments.length > 0);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    console.log("form data ", formData);
    e.preventDefault();
    const newErrors = {};
    if (!formData.eventTitle) newErrors.eventTitle = "Event title is required";
    if (!formData.eventVenue) newErrors.eventVenue = "Event venue is required";
    if (!formData.year) newErrors.year = "Event year is required";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.endDate) newErrors.endDate = "End date is required";
    if (!formData.startTime) newErrors.startTime = "Start time is required";
    if (!formData.endTime) newErrors.endTime = "End time is required";
    if (!formData.resourcePersons)
      newErrors.resourcePerson = "Resource person is required";
    if (!formData.specialization)
      newErrors.specialization = "Specialization is required";
    if (!formData.eventType)
      newErrors.eventType = "Please select an event type";
    if (!formData.eventDescription)
      newErrors.eventDescription = "Event description is required";
    if (formData.departments.length === 0)
      newErrors.departments = "Please select at least one department";

    if (Object.keys(newErrors).length > 0) {
      console.log(Object.keys(newErrors).length);
      console.log("dfffffff");
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/event/create_event`,
        {
          eventname: formData.eventTitle,
          resourcePersons: formData.resourcePersons,
          venue: formData.eventVenue,
          eventstarttime: formData.startTime,
          eventendtime: formData.endTime,
          eventstartdate: formData.startDate.replace(/-/g, "/"),
          eventenddate: formData.endDate.replace(/-/g, "/"),
          typeofevent: formData.eventType,
          departments: formData.departments,
          status: "pending",
          year: formData.year,
        }
      );

      if (response.status === 201) {
        console.log("sucessfull response : ", response);
        console.log("year🤣🤣🤣🤣🤣", response.data.year);
        toast.success("Event added successfully!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error adding event. Please try again.");
    }
    setErrors({});
  };
  const yearOptions = [
    { value: "1", label: "1st Year" },
    { value: "2", label: "2nd Year" },
    { value: "3", label: "3rd Year" },
    { value: "4", label: "4th Year" },
    { value: "All", label: "All" },
    { value: "1 and 2", label: "1st Year and 2nd Year" },
    { value: "1 and 3", label: "1st Year and 3rd Year" },
    { value: "1 and 4", label: "1st Year and 4th Year" },
    { value: "2 and 3", label: "2nd Year and 3rd Year" },
    { value: "2 and 4", label: "2nd Year and 4th Year" },
    { value: "3 and 4", label: "3rd Year and 4th Year" },
    { value: "1, 2, and 3", label: "1st Year, 2nd Year, and 3rd Year" },
    { value: "1, 2, and 4", label: "1st Year, 2nd Year, and 4th Year" },
    { value: "1, 3, and 4", label: "1st Year, 3rd Year, and 4th Year" },
    { value: "2, 3, and 4", label: "2nd Year, 3rd Year, and 4th Year" },
  ];

  return (
    <div className="p-10">
      <ToastContainer />
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold text-[#7848F4] mb-8 underline">
          Create Event
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-10 rounded-lg shadow-lg w-full max-w-3xl"
        >
          <div className="mb-4">
            <label className="block font-Afacad text-gray-700 text-sm font-bold mb-2">
              Select the Department Specification
            </label>
            <div className="flex flex-wrap">
              {individualDepartments.map((department) => (
                <div key={department} className="mr-4">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="departments"
                      value={department}
                      checked={formData.departments.includes(department)}
                      onChange={handleChange}
                      className="form-checkbox"
                    />
                    <span className="ml-2">{department}</span>
                  </label>
                </div>
              ))}
            </div>
            {errors.departments && (
              <span className="text-red-500">{errors.departments}</span>
            )}
            <button onClick={() => setShowDepartments(!showDepartments)}>
              Show Departments
            </button>
            {showDepartments && (
              <div className="mb-4">
                <label className="block font-Afacad text-gray-700 text-sm font-bold mb-2">
                  Departments
                </label>
                <div className="flex flex-wrap">
                  {departmentOptions.map((department) => (
                    <div key={department.shortName} className="mr-4">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name="departments"
                          value={department.fullName}
                          checked={formData.departments.includes(
                            department.fullName
                          )}
                          onChange={handleChange}
                          className="form-checkbox"
                          disabled={
                            department.fullName === "All"
                              ? disableAll
                              : disableIndividual
                          }
                        />
                        <span className="ml-2">{department.shortName}</span>
                      </label>
                    </div>
                  ))}
                </div>
                {errors.departments && (
                  <span className="text-red-500">{errors.departments}</span>
                )}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block font-Afacad text-gray-700 text-sm font-bold mb-2">
              Year
            </label>
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Year</option>
              {yearOptions.map((year) => (
                <option key={year.value} value={year.value}>
                  {year.label}
                </option>
              ))}
            </select>
            {errors.year && <span className="text-red-500">{errors.year}</span>}
          </div>

          {/* Event Title */}
          <div className="mb-4">
            <label className="block font-Afacad text-gray-700 text-sm font-bold mb-2">
              Event Title
            </label>
            <input
              type="text"
              name="eventTitle"
              value={formData.eventTitle}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.eventTitle && (
              <span className="text-red-500">{errors.eventTitle}</span>
            )}
          </div>

          {/* Event Venue */}
          <div className="mb-4">
            <label className="block font-Afacad text-gray-700 text-sm font-bold mb-2">
              Event Venue
            </label>
            <input
              type="text"
              name="eventVenue"
              value={formData.eventVenue}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.eventVenue && (
              <span className="text-red-500">{errors.eventVenue}</span>
            )}
          </div>

          {/* Date Selection */}
          <div className="mb-4">
            <label className="block font-Afacad text-gray-700 text-sm font-bold mb-2">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              min={today}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.startDate && (
              <span className="text-red-500">{errors.startDate}</span>
            )}
          </div>
          <div className="mb-4">
            <label className="block font-Afacad text-gray-700 text-sm font-bold mb-2">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              min={formData.startDate || today}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.endDate && (
              <span className="text-red-500">{errors.endDate}</span>
            )}
          </div>

          {/* Time Selection */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block font-Afacad text-gray-700 text-sm font-bold mb-2">
                Start Time
              </label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {errors.startTime && (
                <span className="text-red-500">{errors.startTime}</span>
              )}
            </div>
            <div>
              <label className="block font-Afacad text-gray-700 text-sm font-bold mb-2">
                End Time
              </label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {errors.endTime && (
                <span className="text-red-500">{errors.endTime}</span>
              )}
            </div>
          </div>

          {/* Resource Person */}
          <div className="mb-4">
            <label className="block font-Afacad text-gray-700 text-sm font-bold mb-2">
              Number of Resource Persons
            </label>
            <input
              type="number"
              value={numResourcePersons}
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
          </div>

          {/* Modal for Resource Persons */}
          {resourcePersonModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4">
                  Enter Resource Persons
                </h2>
                {resourcePersonDetails.map((person, index) => (
                  <div key={index} className="mb-4">
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

          {/* Specialization */}
          <div className="mb-4">
            <label className="block font-Afacad text-gray-700 text-sm font-bold mb-2">
              Specialization
            </label>
            <input
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.specialization && (
              <span className="text-red-500">{errors.specialization}</span>
            )}
          </div>

          {/* Event Type Selection */}
          <div className="mb-4">
            <label className="block font-Afacad text-gray-700 text-sm font-bold mb-2">
              Event Type
            </label>
            <button
              type="button"
              onClick={() => setShowEventTypeModal(true)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-left"
            >
              {formData.eventType || "Select Event Type"}
            </button>
            {errors.eventType && (
              <span className="text-red-500">{errors.eventType}</span>
            )}
          </div>

          {/* Event Type Modal */}
          {showEventTypeModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Select Event Type</h2>
                  <button
                    onClick={() => setShowEventTypeModal(false)}
                    className="text-gray-500"
                  >
                    &times;
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Search Event Type"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md mb-4"
                />
                <div className="max-h-64 overflow-y-auto">
                  {eventTypes
                    .filter((type) =>
                      type.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((type) => (
                      <div
                        key={type}
                        onClick={() => handleEventTypeSelection(type)}
                        className="p-2 cursor-pointer hover:bg-gray-200 rounded"
                      >
                        {type}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              className="bg-[#7848F4] text-white font-bold py-2 px-6 rounded-full hover:bg-[#5929c4] focus:outline-none"
            >
              Submit
            </button>
          </div>
        </form>
      </div>{" "}
      <ToastContainer />
    </div>
  );
}
export default Forms;
