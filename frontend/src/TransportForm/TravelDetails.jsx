import React, { useState } from "react";

export function TravelDetails({ setDetails }) {
  const [travelData, setTravelData] = useState({
    pickUpDateTime: "",
    pickUpLocation: "",
    dropDateTime: "",
    dropLocation: "",
    numberOfPassengers: "",
    vehicleType: "",
    specialRequirements: "",
  });

  const vehicles = [
    "Baleno",
    "Innova (New)",
    "Innova (Old)",
    "Eco Sport",
    "Ciaz",
    "Bus",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...travelData, [name]: value };
    setTravelData(updatedData);
    setDetails(travelData);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Pick Up Date & Time
          </label>
          <input
            type="datetime-local"
            name="pickUpDateTime"
            value={travelData.pickUpDateTime}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Pick Up Location
          </label>
          <input
            type="text"
            name="pickUpLocation"
            value={travelData.pickUpLocation}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Drop Date & Time
          </label>
          <input
            type="datetime-local"
            name="dropDateTime"
            value={travelData.dropDateTime}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Drop Location
          </label>
          <input
            type="text"
            name="dropLocation"
            value={travelData.dropLocation}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Number of Passengers
          </label>
          <input
            type="number"
            name="numberOfPassengers"
            value={travelData.numberOfPassengers}
            onChange={handleInputChange}
            min="1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Type of Vehicle
          </label>
          <select
            name="vehicleType"
            value={travelData.vehicleType}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select vehicle type</option>
            {vehicles.map((vehicle) => (
              <option key={vehicle} value={vehicle}>
                {vehicle}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Special Requirements
        </label>
        <input
          type="text"
          name="specialRequirements"
          value={travelData.specialRequirements}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}
