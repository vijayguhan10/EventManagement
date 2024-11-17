import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const [newDepartment, setNewDepartment] = useState("");
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [disableIndividual, setDisableIndividual] = useState(false);
  const [disableAll, setDisableAll] = useState(false);

  const [showEventTypeModal, setShowEventTypeModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [errors, setErrors] = useState({});
  const today = new Date().toISOString().split("T")[0];
  const [showDepartments, setShowDepartments] = useState(false);
  const [formData, setFormData] = useState({
    eventTitle: "",
    iqac: "",
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
    students: false, 
    teachers: false,
    alumnis: false, 
  });
  
  const handleRefreshResourcePersons = () => {
    setResourcePersonDetails([]);
  };

  const [numResourcePersons, setNumResourcePersons] = useState(0);
  const [resourcePersonModalOpen, setResourcePersonModalOpen] = useState(false);
  const [resourcePersonDetails, setResourcePersonDetails] = useState([]);
  const handleNumResourcePersonsChange = (e) => {
    setNumResourcePersons(e.target.value);
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

  const handleResourcePersonDetailChange = (index, field, value) => {
    const updatedDetails = [...resourcePersonDetails];
    updatedDetails[index][field] = value;
    setResourcePersonDetails(updatedDetails);
  };

  const [validationErrors, setValidationErrors] = useState([]);
  const handleShowDepartments = () => {
    setErrors({});
    setShowDepartments(true);
  };

  const handleAddDepartment = () => {
    if (newDepartment) {
      setFormData((prev) => ({
        ...prev,
        departments: [...prev.departments, newDepartment],
      }));
      setNewDepartment("");
      setIsOtherSelected(false); // Reset after adding
    } else {
      // setErrors({ ...errors, departments: "Please enter a department name." });
    }
  };
  const closeModal = () => {
    setShowDepartments(false);
    setErrors({});
    setNewDepartment("");
    setIsOtherSelected(false);
  };

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

    setFormData((prev) => ({
      ...prev,
      resourcePersons: formattedResourcePersons,
    }));
    setResourcePersonModalOpen(false);
  };

  // const handleRemovePerson = (index) => {
  //   const updatedPersons = formData.resourcePersons.filter(
  //     (_, i) => i !== index
  //   );
  //   setFormData.resourcePersons(updatedPersons);
  // };
  // const handleEditPerson = (index, field, value) => {
  //   const updatedPersons = [...formData.resourcePersons];
  //   updatedPersons[index][field] = value;
  //   setFormData.resourcePersons(updatedPersons);
  // };
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
  // Handle checkbox changes
  const handleChange = (e) => {
    const { name, value, type,checked  } = e.target;

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
      } else if (value === "Others") {
        setIsOtherSelected(e.target.checked);
        setDisableIndividual(e.target.checked);
        if (!e.target.checked) {
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
    }
    else if (["students", "teachers", "alumnis"].includes(name)) {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleDepartmentsChange = (event) => {
    const { value, checked } = event.target;

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
  const handleSubmit = async (e) => {
    // console.log("form data ", formData);
    e.preventDefault();
    const newErrors = {};
    if (!formData.iqac) newErrors.iqac = "IQAC Number is Required";
    if (!formData.eventTitle) newErrors.eventTitle = "Event title is required";
    if (!formData.eventVenue) newErrors.eventVenue = "Event venue is required";
    if (!formData.year) newErrors.year = "Event year is required";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.endDate) newErrors.endDate = "End date is required";
    if (!formData.startTime) newErrors.startTime = "Start time is required";
    if (!formData.endTime) newErrors.endTime = "End time is required";
    if (!formData.resourcePersons)
      newErrors.resourcePerson = "Resource person is required";

    if (!formData.eventType)
      newErrors.eventType = "Please select an event type";
    // if (!formData.eventDescription)
    // newErrors.eventDescription = "Event description is required";

    if (Object.keys(newErrors).length > 0) {
      console.log(Object.keys(newErrors).length);
      console.log("dfffffff");
      setErrors(newErrors);
      return;
    }

    try {
      console.log("posting the form data : ", formData);
      const response = await axios.post(
        ` ${process.env.REACT_APP_BASE_URL}/event/create_event`,
        {
          iqac: formData.iqac,
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
          eventDescription: formData.eventDescription,
          departmentspecification: formData.departmentspecification,
          students: formData.students,
          teachers: formData.teachers,
          alumnis: formData.alumnis, 
        }
      );
console.log("response",response)
      if (response.status === 201) {
        console.log("sucessfull response : ", response);
        console.log("year🤣🤣🤣🤣🤣", response.data.year);
        setTimeout(() => {
          toast.success("Event added successfully!");
          // navigate("/Dashboard");
        }, 1000);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error adding event. Please try again.");
    } finally {
      setIsSubmitting(false);
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
    { value: "Others", label: "Others" },
  ];

  return (
    <div className="p-10">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold text-[#7848F4] mb-8 underline">
          Create Event
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-10 rounded-lg shadow-lg w-full max-w-3xl"
        >
          <div className="mb-4">
            <label className="block font-Afacad text-gray-700 text-xl font-bold mb-2">
              IQAC Number
            </label>
            <input
              type="text"
              name="iqac"
              value={formData.iqac}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.iqac && (
              <span className="text-red-500">{errors.iqac}</span>
            )}
          </div>
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
                        onClick={handleAddDepartment}
                        className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
                      >
                        Add Department
                      </button>
                    </div>
                  )}
                  <div className="mt-4 flex justify-end">
                    <button
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

<div className="mb-4">
  <label className="block font-Afacad text-gray-700 text-xl font-bold mb-2">
    Categories
  </label>
  <div className="flex items-center space-x-4">
    <label className="inline-flex items-center">
      <input
        type="checkbox"
        name="students"
        checked={formData.students || false}
        onChange={handleChange}
        className="w-4 h-4 text-blue-600 border-gray-300 rounded"
      />
      <span className="ml-2 text-gray-700">Students</span>
    </label>
    <label className="inline-flex items-center">
      <input
        type="checkbox"
        name="teachers"
        checked={formData.teachers || false}
        onChange={handleChange}
        className="w-4 h-4 text-blue-600 border-gray-300 rounded"
      />
      <span className="ml-2 text-gray-700">Teachers</span>
    </label>
    <label className="inline-flex items-center">
      <input
        type="checkbox"
        name="alumnis"
        checked={formData.alumnis || false}
        onChange={handleChange}
        className="w-4 h-4 text-blue-600 border-gray-300 rounded"
      />
      <span className="ml-2 text-gray-700">Alumnis</span>
    </label>
  </div>
  {errors.categories && (
    <span className="text-red-500">{errors.categories}</span>
  )}
</div>

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
            />
            {errors.eventTitle && (
              <span className="text-red-500">{errors.eventTitle}</span>
            )}
          </div>

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
            />
            {errors.eventVenue && (
              <span className="text-red-500">{errors.eventVenue}</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block font-Afacad text-gray-700 text-xl font-bold mb-2">
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
            <label className="block font-Afacad text-gray-700 text-xl font-bold mb-2">
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

          {/* Resource Person */}
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

                {resourcePersonDetails.map((person, index) => (
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
                      placeholder="Affilation"
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
                    {validationErrors.includes(index) &&
                      !person.specialization && (
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

          {/* Specialization */}
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
