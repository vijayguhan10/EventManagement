import React from 'react';

const EventTypeSelection = ({ selectedType, onTypeChange }) => {
  const eventTypes = [
    'Guest Lecture',
    'Workshop',
    'Seminar',
    'FDP',
    'Conference',
    'Training',
    'Project Expo',
    'Other'
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Type of Event</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {eventTypes.map((type) => (
          <label key={type} className="flex items-center space-x-2">
            <input
              type="radio"
              name="eventType"
              value={type}
              checked={selectedType === type}
              onChange={(e) => onTypeChange(e.target.value)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-sm text-gray-700">{type}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default EventTypeSelection;