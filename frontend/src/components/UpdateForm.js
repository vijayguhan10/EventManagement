import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

function UpdateForm({ selectedEvent }) {
  const [formData, setFormData] = useState({
    eventTitle: "",
    eventVenue: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    resourcePersons: [],
    eventType: "",
    eventDescription: "",
    departments: [],
    departmentspecification: [],
    year: "",
  });
// const[setselecteddepartment,department]=useState([]);

  const [numResourcePersons, setNumResourcePersons] = useState(0);
  const [resourcePersonModalOpen, setResourcePersonModalOpen] = useState(false);
  const [resourcePersonDetails, setResourcePersonDetails] = useState([]);
  const [validationErrors, setValidationErrors] = useState([]);

  const [newDepartment, setNewDepartment] = useState("");
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [disableIndividual, setDisableIndividual] = useState(false);
  const [disableAll, setDisableAll] = useState(false);

  const [showDepartments, setShowDepartments] = useState(false);
  const [showEventTypeModal, setShowEventTypeModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [errors, setErrors] = useState({});

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

  useEffect(() => {
    if (selectedEvent) {
      setFormData({
        eventTitle: selectedEvent.eventname || "",
        eventVenue: selectedEvent.venue || "",
        startDate: formatDate(selectedEvent.eventstartdate) || "",
        endDate: formatDate(selectedEvent.eventenddate) || "",
        startTime: selectedEvent.eventstarttime || "",
        endTime: selectedEvent.eventendtime || "",
        resourcePersons: selectedEvent.resourceperson || [],
        eventType: selectedEvent.typeofevent || "",
        eventDescription: selectedEvent.eventDescription || "",
        departments: selectedEvent.departments || [],
        departmentspecification: selectedEvent.departmentspecification || [],
        year: selectedEvent.year || "",
      });

      // Initialize number of resource persons
      setNumResourcePersons(selectedEvent.resourceperson.length || 0);
      setResourcePersonDetails(selectedEvent.resourceperson || []);
      console.log(
        "consoling the selected events for the Resourse Person : ",
        resourcePersonDetails
      );
    }
  }, [selectedEvent]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "radio") {
      setFormData((prev) => ({ ...prev, eventType: value }));
    } else if (type === "checkbox" && name === "departments") {
      const selectedDepartments = [...formData.departments];

      if (value === "All") {
        if (checked) {
          setFormData((prev) => ({ ...prev, departments: ["All"] }));
          setDisableIndividual(true);
        } else {
          setFormData((prev) => ({ ...prev, departments: [] }));
          setDisableIndividual(false);
        }
      } else if (value === "Others") {
        setIsOtherSelected(checked);
        setDisableIndividual(checked);
        if (!checked) {
          setDisableIndividual(false);
        }
      } else {
        if (checked) {
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

  // Handle Department Specification Changes
  const handleDepartmentsChange = (e) => {
    const { value, checked } = e.target;

    setFormData((prevFormData) => {
      if (checked) {
        return {
          ...prevFormData,
          departmentspecification: [
            ...prevFormData.departmentspecification,
            value,
          ],
        };
      } else {
        return {
          ...prevFormData,
          departmentspecification: prevFormData.departmentspecification.filter(
            (dept) => dept !== value
          ),
        };
      }
    });
  };

  const handleShowDepartments = () => {
    setErrors({});
    setShowDepartments(true);
  };

  const closeModal = () => {
    setShowDepartments(false);
    setErrors({});
    setNewDepartment("");
    setIsOtherSelected(false);
  };

  const handleAddDepartment = () => {
    if (newDepartment) {
      setFormData((prev) => ({
        ...prev,
        departments: [...prev.departments, newDepartment],
      }));
      setNewDepartment("");
      setIsOtherSelected(false);
    } else {
      setErrors({ ...errors, departments: "Please enter a department name." });
    }
  };
  const handleNumResourcePersonsChange = (e) => {
    setNumResourcePersons(e.target.value);
  };
  const handleRefreshResourcePersons = () => {
    setResourcePersonDetails([]);
  };
  const handleDeleteResourcePerson = (index) => {
    setResourcePersonDetails((prevDetails) =>
      prevDetails.filter((_, i) => i !== index)
    );
  };
  const handleAddResourcePersons = () => {
    const additionalPersonsCount =
      numResourcePersons - resourcePersonDetails.length;

    if (additionalPersonsCount > 0) {
      setResourcePersonDetails((prevDetails) => [...prevDetails, { "": "" }]);
    }

    setResourcePersonModalOpen(true);
  };
  const handleResourcePersonDetailChange = (
    index,
    nameKey,
    specializationValue
  ) => {
    setResourcePersonDetails((prevDetails) => {
      const updatedDetails = [...prevDetails];
      updatedDetails[index] = { [nameKey]: specializationValue };
      return updatedDetails;
    });
  };

  const handleSaveResourcePersons = () => {
    const errors = resourcePersonDetails.reduce((acc, person, index) => {
      if (!Object.keys(person)[0] || !Object.values(person)[0]) {
        acc.push(index);
      }
      return acc;
    }, []);

    if (errors.length > 0) {
      console.log("Error in saving: Missing fields : ",errors);
      setValidationErrors(errors);
      return;
    }

    setValidationErrors([]);

    const formattedResourcePersons = resourcePersonDetails.map((person) => {
      const nameKey = Object.keys(person)[0];
      const specializationValue = person[nameKey];
      return { [nameKey]: specializationValue };
    });

    setFormData((prev) => ({
      ...prev,
      resourcePersons: formattedResourcePersons, 
    }));

    console.log("Resource person saving data:", formData);
    setResourcePersonModalOpen(false);
  };

  const handleEventTypeSelection = (type) => {
    setFormData((prev) => ({ ...prev, eventType: type }));
    setShowEventTypeModal(false);
  };

  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.eventTitle) newErrors.eventTitle = "Event title is required";
    if (!formData.eventVenue) newErrors.eventVenue = "Event venue is required";
    if (!formData.year) newErrors.year = "Event year is required";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.endDate) newErrors.endDate = "End date is required";
    if (!formData.startTime) newErrors.startTime = "Start time is required";
    if (!formData.endTime) newErrors.endTime = "End time is required";
    if (formData.resourcePersons.length === 0)
      newErrors.resourcePersons = "At least one resource person is required";
    if (!formData.eventType)
      newErrors.eventType = "Please select an event type";
    if (!formData.eventDescription)
      newErrors.eventDescription = "Event description is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    let processedResourcePersons;
    if (formData.resourcePersons.length === 1) {
      // Single resource person: [{ sabari: 'dsa' }]
      processedResourcePersons = [formData.resourcePersons[0]];
    } else {
      // Multiple resource persons: { sabari: 'dsa', 'vijay guhan': 'cpp' }
      processedResourcePersons = formData.resourcePersons.reduce((acc, item) => {
        return { ...acc, ...item };
      }, {});
    }
    try {
      const updatedEvent = {
        eventId: selectedEvent._id,
        eventname: formData.eventTitle,
        resourcePersons:processedResourcePersons,
        organizer: formData.organizer, // If applicable
        venue: formData.eventVenue,
        departments: formData.departments,
        eventstarttime: formData.startTime,
        eventendtime: formData.endTime,
        eventstartdate: formData.startDate.replace(/-/g, "/"),
        eventenddate: formData.endDate.replace(/-/g, "/"),
        typeofevent: formData.eventType,
        description: formData.eventDescription,
        year: formData.year,
        departmentspecification: formData.departmentspecification,
      };
      console.log("passing data to the backend : ", formData);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/event/modify_event`,
        updatedEvent
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Event updated successfully!");
      }
    } catch (error) {
      toast.error("Error updating event: " + error.message);
      console.error("Error updating event:", error);
    }
  };

  return (
    <div className="p-10 w-full overflow-auto">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold text-[#7848F4] mb-8 underline">
          Update Event
        </h1>
        <form
          onSubmit={handleFormSubmit}
          className="bg-white p-10 rounded-lg shadow-lg w-full max-w-3xl"
        >
          <div className="mb-4">
            <label className="block font-Afacad text-gray-800 text-lg font-bold mb-3">
              Select the Department Specification
            </label>
            <div className="flex flex-wrap mb-4">
              {individualDepartments.map((department) => (
                <div key={department} className="mr-4 mb-2">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="departmentspecification"
                      value={department}
                      checked={formData.departmentspecification.includes(
                        department
                      )}
                      onChange={handleDepartmentsChange}
                      className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
                    />
                    <span className="ml-2 text-gray-700">{department}</span>
                  </label>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleShowDepartments}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Show Departments
            </button>

            {showDepartments && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                  <h2 className="text-lg font-bold mb-4 text-gray-800">
                    Select Departments
                  </h2>
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
                            className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
                            disabled={
                              department.fullName === "All"
                                ? disableAll
                                : disableIndividual
                            }
                          />
                          <span className="ml-2 text-gray-700">
                            {department.shortName}
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                  <label className="inline-flex items-center mb-4">
                    <input
                      type="checkbox"
                      name="departments"
                      value="Others"
                      checked={isOtherSelected}
                      onChange={(e) => {
                        setIsOtherSelected(e.target.checked);
                        handleChange(e);
                      }}
                      className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
                    />
                    <span className="ml-2 text-gray-700">Others</span>
                  </label>
                  {isOtherSelected && (
                    <div className="mt-4">
                      <label className="block text-gray-700 font-semibold mb-1">
                        Specify Other Department
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Other Department"
                        value={newDepartment}
                        onChange={(e) => setNewDepartment(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={handleAddDepartment}
                        className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
                      >
                        Add Department
                      </button>
                    </div>
                  )}
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Year Selection */}
          <div className="mb-4">
            <label className="block font-Afacad text-gray-700 text-xl font-bold mb-2">
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
            <label className="block font-Afacad text-gray-700 text-xl font-bold mb-2">
              Event Title
            </label>
            <input
              type="text"
              name="eventTitle"
              value={formData.eventTitle}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Event Title"
            />
            {errors.eventTitle && (
              <span className="text-red-500">{errors.eventTitle}</span>
            )}
          </div>

          {/* Event Venue */}
          <div className="mb-4">
            <label className="block font-Afacad text-gray-700 text-xl font-bold mb-2">
              Event Venue
            </label>
            <input
              type="text"
              name="eventVenue"
              value={formData.eventVenue}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Event Venue"
            />
            {errors.eventVenue && (
              <span className="text-red-500">{errors.eventVenue}</span>
            )}
          </div>

          {/* Start Date */}
          <div className="mb-4">
            <label className="block font-Afacad text-gray-700 text-xl font-bold mb-2">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              min={formatDate(new Date().toLocaleDateString("en-US"))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.startDate && (
              <span className="text-red-500">{errors.startDate}</span>
            )}
          </div>

          {/* End Date */}
          <div className="mb-4">
            <label className="block font-Afacad text-gray-700 text-xl font-bold mb-2">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              min={
                formData.startDate ||
                formatDate(new Date().toLocaleDateString("en-US"))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.endDate && (
              <span className="text-red-500">{errors.endDate}</span>
            )}
          </div>

          {/* Time Selection */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block font-Afacad text-gray-700 text-xl font-bold mb-2">
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
              <label className="block font-Afacad text-gray-700 text-xl font-bold mb-2">
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

          <div className="mb-4">
            <label className="block font-Afacad text-gray-700 text-xl font-bold mb-2">
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

                {resourcePersonDetails.map((person, index) => {
                  const nameKey = Object.keys(person)[0] || ""; // default to an empty string if key is missing
                  const specializationValue = person[nameKey] || ""; // default to an empty string if value is missing

                  return (
                    <div key={index} className="mb-4 relative">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg font-semibold">
                          {index + 1}.
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDeleteResourcePerson(index)}
                          className="text-red-500 hover:text-red-700 text-xl font-bold"
                        >
                          &times;
                        </button>
                      </div>

                      {/* Name input */}
                      <input
                        type="text"
                        placeholder="Resource Person Name"
                        value={nameKey}
                        onChange={(e) =>
                          handleResourcePersonDetailChange(
                            index,
                            e.target.value,
                            specializationValue
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
                      />
                      {validationErrors.includes(index) && !nameKey && (
                        <p className="text-red-500 text-xl mt-1">
                          Please enter a name.
                        </p>
                      )}

                      {/* Specialization input */}
                      <input
                        type="text"
                        placeholder="Specialization"
                        value={specializationValue}
                        onChange={(e) =>
                          handleResourcePersonDetailChange(
                            index,
                            nameKey,
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                      {validationErrors.includes(index) &&
                        !specializationValue && (
                          <p className="text-red-500 text-xl mt-1">
                            Please enter a specialization.
                          </p>
                        )}
                    </div>
                  );
                })}

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

          {/* Event Description */}
          <div className="mb-4">
            <label className="block font-Afacad text-gray-700 text-xl font-bold mb-2">
              Description
            </label>
            <input
              type="text"
              name="eventDescription"
              value={formData.eventDescription}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Event Description"
            />
            {errors.eventDescription && (
              <span className="text-red-500">{errors.eventDescription}</span>
            )}
          </div>

          {/* Event Type Selection */}
          <div className="mb-4">
            <label className="block font-Afacad text-gray-700 text-xl font-bold mb-2">
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

          {/* Submit Button */}
          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              className="bg-[#7848F4] text-white font-bold py-2 px-6 rounded-full hover:bg-[#5929c4] focus:outline-none"
            >
              Update Event
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default UpdateForm;
