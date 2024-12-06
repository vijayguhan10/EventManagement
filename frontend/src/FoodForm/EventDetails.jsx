import React from 'react';

const EventDetails = ({ formData, setFormData }) => {
  const eventTypes = [
    "Guest Lecture",
    "Workshop",
    "Seminar",
    "FDP",
    "Visiting faculty",
    "Conference",
    "Value Added Course",
    "Training",
    "Orientation",
    "Project Expo",
    "Placement",
    "Outreach",
    "Others"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="space-y-4 mb-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name of the Event</label>
        <input
          type="text"
          name="eventName"
          value={formData.eventName}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Type of the Event</label>
        <select
          name="eventType"
          value={formData.eventType}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select Event Type</option>
          {eventTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {formData.eventType === "Others" && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Specify Other Event Type</label>
          <input
            type="text"
            name="otherEventType"
            value={formData.otherEventType}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      )}
    </div>
  );
};

export default EventDetails;