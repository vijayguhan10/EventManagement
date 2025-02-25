import React, { useState, useEffect } from "react";

export function BasicDetails({ data, setDetails }) {
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
    setFormState(data);
  }, [data]);
  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("common_data"));

    if (local) {
      const eventData = local;
      console.log("local storage data in the transport form: ", eventData);

      const organizers = eventData.organizers || {};
      console.log("Organizers data: ", organizers);

      setFormState({
        iqacNumber: eventData.iqacNumber || "",
        requisitionDate: eventData.startDate || "",
        departmentName: eventData.departments
          ? eventData.departments.join(", ")
          : "",
       
      });

      setDetails({
        iqacNumber: eventData.iqacNumber || "",
        requisitionDate: eventData.startDate || "",
        departmentName: eventData.departments
          ? eventData.departments.join(", ")
          : "",
        requestorName: organizers.name || "",
        empId: organizers.employeeId || "",
        designation: organizers.designation || "",
        mobileNumber: organizers.phone || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setDetails({ ...formData, [name]: value });
  };

  return (
    <div className="xl:w-full">
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
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Event Requestor Name
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
