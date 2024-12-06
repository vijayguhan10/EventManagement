import React, { useState } from "react";

export function EventDetails({ setDetails }) {
  const [eventData, setEventData] = useState({
    eventName: "",
    eventType: "",
    travellerDetails: "",
  });

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
    "Others",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...eventData, [name]: value };
    setEventData(updatedData);
    setDetails(eventData );
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Name of the Event/Purpose
        </label>
        <input
          type="text"
          name="eventName"
          value={eventData.eventName}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Type of the Event
        </label>
        <select
          name="eventType"
          value={eventData.eventType}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select event type</option>
          {eventTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Details of the Traveller
        </label>
        <textarea
          name="travellerDetails"
          value={eventData.travellerDetails}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={3}
        />
      </div>
    </div>
  );
}
