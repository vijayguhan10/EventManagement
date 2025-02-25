import React, { useState, useEffect } from "react";
import Header from "./Header";
import BasicInfo from "./BasicInfo";
import EventDetails from "./EventDetails";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FoodTable from "./FoodTable";
import { useNavigate } from "react-router-dom";
import Signatures from "./Signatures";
import { useSelector } from "react-redux";
function FoodForm() {
  const navigate = useNavigate();
  const FoodForm = useSelector((state) => state.event.event?.foodform);
  useEffect(() => {}, [FoodForm]);
  console.log("Food Form data is comming for the Edit : ", FoodForm);
  const [formData, setFormData] = useState({
    iqacNumber: "",
    requisitionDate: "",
    department: "",
    requestorName: "",
    empId: "",
    designationDepartment: "",
    mobileNumber: "",
    eventName: "",
    eventType: "",
    otherEventType: "",
    dates: {},
    foodDetails: {},
    amenitiesIncharge: "",
    signOfOS: "",
    facultySignature: "",
    recommendedBy: "",
    deanClearance: "",
  });
  useEffect(() => {
    if (FoodForm && FoodForm.dates) {
      console.log("FoodForm with dates object: ", FoodForm);

      const datesArray = Object.values(FoodForm.dates);

      const transformedDates = datesArray.reduce((acc, dateObj, index) => {
        const dateKey = `date${index + 1}`;
        acc[dateKey] = {
          start: dateObj.date.start,
          end: dateObj.date.end,
          foodDetails: dateObj.foodDetails,
        };
        return acc;
      }, {});

      setFormData((prev) => ({
        ...prev,
        ...FoodForm,
        dates: transformedDates,
        foodDetails: FoodForm.foodDetails || {},
      }));
    }
  }, [FoodForm]);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("common_data"));

    if (local) {
      const eventData = local;
      console.log("local storage data : ", eventData);
      setFormData((prevData) => ({
        ...prevData,
        iqacNumber: eventData.iqacNumber || "",
        eventName: eventData.eventName || "",
        eventType: eventData.eventType || "",
        requisitionDate: eventData.startDate || "",
        department: eventData.departments
          ? eventData.departments.join(", ")
          : "",
        requestorName: eventData.organizers.name || "",
        empId: eventData.organizers.employeeId || "",
        designationDepartment: eventData.organizers.designation || "",
        mobileNumber: eventData.organizers.phone || "",
      }));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Consoling the food form:", formData);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/foodform/events`,
        formData
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Event created successfully!");
        console.log("Form Data Submitted:", response.data);

        const objectId = response.data.data._id;
        console.log("Objectid of the food form : ", objectId);
        if (objectId) {
          let amenityForm =
            JSON.parse(localStorage.getItem("amenityForm")) || {};
          amenityForm.objectId = objectId;
          localStorage.setItem("amenityForm", JSON.stringify(amenityForm));
          console.log("Updated amenityForm in localStorage:", amenityForm);
          setTimeout(() => {
            navigate("/forms/guest-room");
          }, 1000);
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to create the event. Please try again.");
    }
  };

  return (
    <div className="xl:w-full bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className=" mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg px-8 py-6"
        >
          <Header />
          <div className="">
            <BasicInfo formData={formData} setFormData={setFormData} />
            <EventDetails formData={formData} setFormData={setFormData} />
          </div>
          <FoodTable formData={formData} setFormData={setFormData} />
          <Signatures formData={formData} setFormData={setFormData} />
          <div className="flex justify-end space-x-2">
            <button
              type="submit"
              className="rounded-md bg-green-600 px-6 h-10 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Yes, Save Data
            </button>

            <button
              type="button"
              onClick={() => navigate("/forms/end")}
              className="rounded-md bg-red-600 px-6 h-10 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              No, Go to EndForm
            </button>
          </div>
        </form>
      </div>
      {/* <EndForm /> */}
    </div>
  );
}

export default FoodForm;
