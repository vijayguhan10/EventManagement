import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../DashBoard/DashBoard";
import Form from "../Components/Form";
const InitialRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/forms" element={<Form />} />
    </Routes>
  );
};
export default InitialRouter;
