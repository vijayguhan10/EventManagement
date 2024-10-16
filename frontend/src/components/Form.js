import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function Forms() {
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
    departments: [], // Updated to store selected departments
  });

  const departmentOptions = [
    { fullName: "Computer and Communication Engineering", shortName: "CCE" },
    { fullName: "Computer Science Engineering", shortName: "CSE" },
    { fullName: "Artificial Intelligence and Data Science", shortName: "AI & DS" },
    { fullName: "Electronics and Communication Engineering", shortName: "ECE" },
    { fullName: "Information Technology", shortName: "IT" },
    { fullName: "Mechanical Engineering", shortName: "MECH" },
    { fullName: "Artificial Intelligence and Machine Learning", shortName: "AI & ML" },
    { fullName: "Computer Science and Business Systems", shortName: "CSBS" },
    { fullName: "Electrical and Electronics Engineering", shortName: "EEE" },
    { fullName: "Cybersecurity", shortName: "Cyber" },
  ];

  const [errors, setErrors] = useState({});

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "radio") {
      setFormData((prev) => ({ ...prev, eventType: value }));
    } else if (type === "checkbox" && name === "departments") {
      // Handle department checkboxes
      const selectedDepartments = [...formData.departments];
      if (e.target.checked) {
        selectedDepartments.push(value);
      } else {
        const index = selectedDepartments.indexOf(value);
        if (index !== -1) {
          selectedDepartments.splice(index, 1);
        }
      }
      setFormData((prev) => ({ ...prev, departments: selectedDepartments }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.eventTitle) newErrors.eventTitle = "Event title is required";
    if (!formData.eventVenue) newErrors.eventVenue = "Event venue is required";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.endDate) newErrors.endDate = "End date is required";
    if (!formData.startTime) newErrors.startTime = "Start time is required";
    if (!formData.endTime) newErrors.endTime = "End time is required";
    if (!formData.resourcePerson)
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
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/event/create_event`,
        {
          eventname: formData.eventTitle,
          resourceperson: formData.resourcePerson,
          organizer: formData.specialization,
          venue: formData.eventVenue,
          eventstarttime: formData.startTime,
          eventendtime: formData.endTime,
          eventstartdate: formData.startDate.replace(/-/g, "/"),
          eventenddate: formData.endDate.replace(/-/g, "/"),
          typeofevent: formData.eventType,
          departments: formData.departments, // Include selected departments
          status: "pending", // Add the status field
        }
      );

      if (response.status === 201) {
        toast.success("Event added successfully!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error adding event. Please try again.");
    }

    setErrors({});
  };

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
                      value={department.shortName} // Use the department's shortName as the value
                      checked={formData.departments.includes(department.shortName)}
                      onChange={handleChange}
                      className="form-checkbox"
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

          {/* Start Date */}
          <div className="mb-4">
            <label className="block font-Afacad text-gray-700 text-sm font-bold mb-2">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              min={today} // Restrict past dates
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.startDate && (
              <span className="text-red-500">{errors.startDate}</span>
            )}
          </div>

          {/* End Date */}
          <div className="mb-4">
            <label className="block font-Afacad text-gray-700 text-sm font-bold mb-2">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              min={formData.startDate || today} // Restrict past dates and set min to start date
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.endDate && (
              <span className="text-red-500">{errors.endDate}</span>
            )}
          </div>

          {/* Start and End Time */}
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
              Resource Person
            </label>
            <input
              type="text"
              name="resourcePerson"
              value={formData.resourcePerson}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.resourcePerson && (
              <span className="text-red-500">{errors.resourcePerson}</span>
            )}
          </div>

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

          {/* Event Type */}
          <div className="mb-4">
            <label className="block font-Afacad text-gray-700 text-sm font-bold mb-2">
              Event Type
            </label>
            <div className="flex space-x-4">
              <label>
                <input
                  type="radio"
                  name="eventType"
                  value="Workshop"
                  checked={formData.eventType === "Workshop"}
                  onChange={handleChange}
                  className="mr-1"
                />
                Workshop
              </label>
              <label>
                <input
                  type="radio"
                  name="eventType"
                  value="Webinar"
                  checked={formData.eventType === "Webinar"}
                  onChange={handleChange}
                  className="mr-1"
                />
                Webinar
              </label>
              <label>
                <input
                  type="radio"
                  name="eventType"
                  value="Seminar"
                  checked={formData.eventType === "Seminar"}
                  onChange={handleChange}
                  className="mr-1"
                />
                Seminar
              </label>
            </div>
            {errors.eventType && (
              <span className="text-red-500">{errors.eventType}</span>
            )}
          </div>

          {/* Event Description */}
          <div className="mb-4">
            <label className="block font-Afacad text-gray-700 text-sm font-bold mb-2">
              Event Description
            </label>
            <textarea
              name="eventDescription"
              value={formData.eventDescription}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.eventDescription && (
              <span className="text-red-500">{errors.eventDescription}</span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-[#7848F4] text-white font-bold py-2 px-4 rounded"
          >
            Create Event
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Forms;
