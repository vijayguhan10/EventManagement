import React, { useState } from "react";

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
  });

  const [errors, setErrors] = useState({});

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "radio") {
      setFormData((prev) => ({ ...prev, eventType: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
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

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log(formData);

    // Reset form data
    setFormData({
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
    });

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
              className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
                !formData.startDate ? "hidden" : ""
              }`}
            />
            {errors.endDate && (
              <span className="text-red-500">{errors.endDate}</span>
            )}
          </div>

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

          <div className="mb-4">
            <label className="block font-Afacad text-gray-700 text-sm font-bold mb-2">
              Event Type
            </label>
            <div className="flex items-center gap-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="Technical Event"
                  onChange={handleChange}
                  checked={formData.eventType === "Technical Event"}
                  className="form-radio h-4 w-4 text-[#7848F4]"
                />
                <span className="ml-2 font-Afacad">Technical Event</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="Non Technical Event"
                  onChange={handleChange}
                  checked={formData.eventType === "Non Technical Event"}
                  className="form-radio h-4 w-4 text-[#7848F4]"
                />
                <span className="ml-2 font-Afacad">Non Technical Event</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="Placement Event"
                  onChange={handleChange}
                  checked={formData.eventType === "Placement Event"}
                  className="form-radio h-4 w-4 text-[#7848F4]"
                />
                <span className="ml-2 font-Afacad">Placement Event</span>
              </label>
            </div>
            {errors.eventType && (
              <span className="text-red-500">{errors.eventType}</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block font-Afacad text-gray-700 text-sm font-bold mb-2">
              Event Description
            </label>
            <textarea
              name="eventDescription"
              value={formData.eventDescription}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              rows="4"
            />
            {errors.eventDescription && (
              <span className="text-red-500">{errors.eventDescription}</span>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#7848F4] text-white font-bold py-2 px-4 rounded hover:bg-[#6f3bce]"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
}

export default Forms;
