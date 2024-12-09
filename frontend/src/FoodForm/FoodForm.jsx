import React, { useState } from "react";
import Header from "./Header";
import BasicInfo from "./BasicInfo";
import EventDetails from "./EventDetails";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FoodTable from "./FoodTable";
import Signatures from "./Signatures";
function FoodForm() {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        ` ${process.env.REACT_APP_BASE_URL}/foodform/events`,

        formData
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Event created successfully!", {
          // position: toast.POSITION.TOP_RIGHT,
        });

        console.log("Form Data Submitted:", formData);
      }
    } catch (error) {
      console.error("Error submitting form:", error);

      toast.error("Failed to create the event. Please try again.", {
        // position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="max-w-7xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg px-8 py-6"
        >
          <Header />
          <BasicInfo formData={formData} setFormData={setFormData} />
          <EventDetails formData={formData} setFormData={setFormData} />
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
    </div>
  );
}
export default FoodForm;
