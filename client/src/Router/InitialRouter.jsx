import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../DashBoard/DashBoard";
import Form from "../Components/Form";
import CalenderUI from "../calender/CalenderUI";
import Signup from "../Components/Login";
import Profile from "../profile/Profile";
import PendingDashboard from "../PendingReq";
import Index from "../BasicEvent/OrginalForm";
import CommunicationForm from "../CommunicationForm";
import { TransportForm } from "../TransportForm/TransportForm";
import GuestRoom from "../guestroom/index";
import EndForm from "../EndForm";
import FoodForm from "../FoodForm/FoodForm";
const InitialRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/forms" element={<Form />} />
      <Route path="/calender" element={<CalenderUI />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/pending" element={<PendingDashboard />} />
      <Route path="/basic-event" element={<Index />} />
      <Route path="/communication-form" element={<CommunicationForm />} />
      <Route path="/transport-form" element={<TransportForm />} />
      <Route path="/food-form" element={<FoodForm />} />
      <Route path="/guest-room" element={<GuestRoom />} />
      <Route path="/end-form" element={<EndForm />} />
    </Routes>
  );
};
export default InitialRouter;
