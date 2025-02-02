import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../DashBoard/DashBoard";
import Form from "../Components/Form";
import CalenderUI from "../calender/CalenderUI";
import Signup from "../Components/Login";
import Profile from "../profile/Profile";
import PendingDashboard from "../PendingReq";
const InitialRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/forms" element={<Form />} />
      <Route path="/calender" element={<CalenderUI />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/pending" element={<PendingDashboard />} />
    </Routes>
  );
};
export default InitialRouter;
