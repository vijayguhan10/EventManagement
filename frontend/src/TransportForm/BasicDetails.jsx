import React, { useState,useEffect } from "react";

export function BasicDetails({ setDetails }) {
  const [formState, setFormState] = useState({
    iqacNumber: "",
    requisitionDate: "",
    departmentName: "",
    requestorName: "",
    empId: "",
    designation: "",
    mobileNumber: "",
  });
  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("common_data"));

    if (local) {
      const eventData = local;

      setFormState((prevData) => ({
        ...prevData,
        iqacNumber: eventData.iqacNumber || "",
        eventName: eventData.eventName || "",
        eventType: eventData.eventType || "",
        requisitionDate: eventData.startDate || "",

        departmentName: eventData.departments
          ? eventData.departments.join(", ")
          : "",
        requestorName: eventData.organizers[0].name || "",
        empId: eventData.organizers[0].employeeId || "",
        designation: eventData.organizers[0].designation || "",
        mobileNumber: eventData.organizers[0].phone || "",
        purpose: eventData.description,
      }));
    }
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormState = { ...formState, [name]: value };
    setFormState(updatedFormState);
    setDetails(updatedFormState);
  };

  return (
    <div className=" xl:w-full">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            IQAC Number
          </label>
          <input
            type="text"
            name="iqacNumber"
            value={formState.iqacNumber}
            onChange={handleChange}
            className="border border-black p-2 rounded focus:outline-none focus:ring-2 focus:ring-black w-96"
            placeholder="1/2024-25/"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Employee ID
          </label>
          <input
            type="text"
            name="empId"
            value={formState.empId}
            onChange={handleChange}
            className="border border-black p-2 rounded focus:outline-none focus:ring-2 focus:ring-black w-96"
            placeholder="1/2024-25/"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Event Requestor name
          </label>
          <input
            type="text"
            name="requestorName"
            value={formState.requestorName}
            onChange={handleChange}
            className="border border-black p-2 rounded focus:outline-none focus:ring-2 focus:ring-black w-96"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Requisition Date
          </label>
          <input
            type="date"
            name="requisitionDate"
            value={formState.requisitionDate}
            onChange={handleChange}
            className="border border-black p-2 rounded focus:outline-none focus:ring-2 focus:ring-black w-96"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name of the Department/Centre
          </label>
          <input
            type="text"
            name="departmentName"
            value={formState.departmentName}
            onChange={handleChange}
            className="border border-black p-2 rounded focus:outline-none focus:ring-2 focus:ring-black w-96"
          />
        </div>
      </div>
    </div>
  );
}
