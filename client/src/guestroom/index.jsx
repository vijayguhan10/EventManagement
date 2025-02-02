import React, { useState, useEffect } from "react";
import {
  Building2,
  Users,
  CalendarDays,
  Phone,
  BookOpen,
  MapPin,
} from "lucide-react";
import axios from "axios";
import RoomSelection from "./RoomSelection";
import FormInput from "./FormInput";
import EventTypeSelection from "./EventTypeSelection";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EndForm from "../EndForm";
const BookingForm = ({ guestroomData = [] }) => {
  const [formData, setFormData] = useState({
    department: "",
    requestorName: "",
    empId: "",
    mobile: "",
    designation: "",
    purpose: "",
    date: "",
    guestCount: "",
    eventType: "",
    selectedRooms: [],
  });
  useEffect(() => {
    if (guestroomData) {
      setFormData(guestroomData);
    }
  }, [guestroomData]);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("common_data"));

    if (local) {
      const eventData = local;

      setFormData((prevData) => ({
        ...prevData,
        iqacNumber: eventData.iqacNumber || "",
        eventName: eventData.eventName || "",
        eventType: eventData.eventType?.trim()
          ? eventData.eventType
          : "common event",
        date: eventData.startDate || "",

        department: eventData.departments
          ? eventData.departments.join(", ")
          : "",
        requestorName: eventData.organizers[0].name || "",
        empId: eventData.organizers[0].employeeId || "",
        designation: eventData.organizers[0].designation || "",
        mobile: eventData.organizers[0].phone || "",
        purpose: eventData.description,
      }));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleRoomChange = (roomId) => {
    setFormData((prev) => ({
      ...prev,
      selectedRooms: prev.selectedRooms.includes(roomId)
        ? prev.selectedRooms.filter((id) => id !== roomId)
        : [...prev.selectedRooms, roomId],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      "Data of the guest room form which is going to be submitted :",
      formData
    );

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/guestroom/bookings`,
        formData
      );

      console.log("API Response:", response);

      if (response && response.data._id) {
        const objectId = response.data._id;
        console.log("Objectid of the guest room form : ", objectId);
        if (objectId) {
          let GuestRoom =
            JSON.parse(localStorage.getItem("guestRoomForm")) || {};
          GuestRoom.objectId = objectId;
          localStorage.setItem("guestRoomForm", JSON.stringify(GuestRoom));
          console.log("Updated guestroom form in localStorage:", GuestRoom);
        }
        toast.success("Event created successfully!");
        console.log("Form Data Submitted:", formData);
      } else {
        console.error("No data found in the response");
        toast.error("Failed to create the event. Invalid response.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to create the event. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b  from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="max-w-full mx-auto ">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-indigo-600 py-6 px-8">
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Building2 className="h-8 w-8" />
              Guest House Booking Form
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className=" xl: grid xl:grid-cols-3 gap-6">
              <FormInput
                icon={<BookOpen />}
                label="Department/Centre"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                placeholder="Enter department name"
              />

              <FormInput
                icon={<Users />}
                label="Requestor Name"
                name="requestorName"
                value={formData.requestorName}
                onChange={handleInputChange}
                placeholder="Enter your name"
              />

              <FormInput
                label="Employee ID"
                name="empId"
                value={formData.empId}
                onChange={handleInputChange}
                placeholder="Enter employee ID"
              />

              <FormInput
                icon={<Phone />}
                label="Mobile Number"
                name="mobile"
                type="tel"
                value={formData.mobile}
                onChange={handleInputChange}
                placeholder="Enter mobile number"
              />

              <FormInput
                icon={<MapPin />}
                label="Designation & Department"
                name="designation"
                value={formData.designation}
                onChange={handleInputChange}
                placeholder="Enter designation"
                className="md:col-span-2"
              />

              <div className="">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Purpose
                </label>
                <textarea
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleInputChange}
                  className="border border-black p-2 rounded focus:outline-none focus:ring-2 focus:ring-black w-96"
                  rows={3}
                  placeholder="Enter purpose of booking"
                />
              </div>

              <FormInput
                icon={<CalendarDays />}
                label="Date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
              />

              <FormInput
                icon={<Users />}
                label="Number of Guests"
                name="guestCount"
                type="number"
                min="1"
                value={formData.guestCount}
                onChange={handleInputChange}
                placeholder="Enter number of guests"
              />
            </div>

            {/* <EventTypeSelection
              selectedType={formData.eventType}
              onTypeChange={(type) =>
                setFormData((prev) => ({ ...prev, eventType: type }))
              }
            /> */}

            <RoomSelection
              selectedRooms={formData.selectedRooms || []}
              onRoomChange={handleRoomChange}
            />

            <div className="pt-6">
              <button
                type="submit"
                className="w-48 bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-semibold"
              >
                Submit Booking Request
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* <EndForm /> */}
    </div>
  );
};

export default BookingForm;
