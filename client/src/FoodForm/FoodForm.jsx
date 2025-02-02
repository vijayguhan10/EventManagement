import React, { useState, useEffect } from "react";
import Header from "./Header";
import BasicInfo from "./BasicInfo";
import EventDetails from "./EventDetails";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FoodTable from "./FoodTable";
import EndForm from "../EndForm";
import Signatures from "./Signatures";
function FoodForm({ FoodForm }) {
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
    if (FoodForm) {
      console.log("Updating formData with FoodForm:", FoodForm);

      setFormData((prev) => ({
        ...prev,
        ...FoodForm,
        dates: FoodForm.dates ? { ...FoodForm.dates } : {},
        foodDetails: FoodForm.foodDetails ? { ...FoodForm.foodDetails } : {},
      }));
    }
  }, [FoodForm]);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("common_data"));

    if (local) {
      const eventData = local;

      setFormData((prevData) => ({
        ...prevData,
        iqacNumber: eventData.iqacNumber || "",
        eventName: eventData.eventName || "",
        eventType: eventData.eventType || "",
        requisitionDate: eventData.startDate || "",

        department: eventData.departments
          ? eventData.departments.join(", ")
          : "",
        requestorName: eventData.organizers[0].name || "",
        empId: eventData.organizers[0].employeeId || "",
        designationDepartment: eventData.organizers[0].designation || "",
        mobileNumber: eventData.organizers[0].phone || "",
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
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit Form
            </button>
          </div>
        </form>
      </div>
      {/* <EndForm /> */}
    </div>
  );
}

export default FoodForm;
