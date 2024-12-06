import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Forms from "../components/Form";
import Login from "../components/Login";
import Placement from "../components/Event";
import History from "../components/History";
import Departments from "../components/Departments";
import Canceled from "../components/Canceled";
import AdminDashBoard from "../components/AdminDashBoard";
import Chart from "../components/Chart";
import Mediamax from "../components/MediaMax";
import { jwtDecode } from "jwt-decode";
import SignupAdmin from "../components/SignupAdmin";
import { TransportForm } from "./../TransportForm/TransportForm";
import FoodForm from './../FoodForm/FoodForm';
import GuestRoom from "./../guestroom/index"
const InitialRouter = () => {
  const [token, setToken] = useState(localStorage.getItem("authToken"));

  const isTokenValid = (token) => {
    if (!token) return { isValid: false, role: null };
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      const isValid = decoded.exp > currentTime;
      var role = decoded.role;
      // role = "mediamax";
      return { isValid, role };
    } catch (error) {
      return { isValid: false, role: null };
    }
  };

  const { isValid: isAuthenticated, role } = isTokenValid(token);

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            role === "mediamax" ? (
              <Navigate to="/mediamax" />
            ) : (
              <Navigate to="/Dashboard" />
            )
          ) : (
            <Login setToken={setToken} />
          )
        }
      />

      {isAuthenticated && role === "admin" && (
        <>
          <Route path="/Dashboard" element={<AdminDashBoard />} />
          <Route path="/mediamax" element={<AdminDashBoard />} />
          <Route path="/Placement" element={<Placement />} />
          <Route path="/History" element={<History />} />
          <Route path="/Form" element={<Forms />} />
          <Route path="/Departments" element={<Departments />} />
          <Route path="/CanceledEvents" element={<Canceled />} />

          <Route path="/charts" element={<Chart />} />
        </>
      )}

      {isAuthenticated && role === "mediamax" && (
        <>
          <Route path="/mediamax" element={<Mediamax />} />
          <Route path="/History" element={<History />} />
          <Route path="*" element={<Navigate to="/mediamax" />} />
        </>
      )}
      {isAuthenticated && role === "ps" && (
        <>
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/mediamax" element={<Mediamax />} />
          <Route path="/History" element={<History />} />
          <Route path="*" element={<Navigate to="/mediamax" />} />
        </>
      )}

      {isAuthenticated && role !== "admin" && role !== "mediamax" && (
        <>
          <Route path="/Addlogins" element={<SignupAdmin />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Placement" element={<Placement />} />
          <Route path="/History" element={<History />} />
          <Route path="/Form" element={<Forms />} />
          <Route path="/Departments" element={<Departments />} />
          <Route path="/CanceledEvents" element={<Canceled />} />
          <Route path="/charts" element={<Chart />} />
          <Route path="/transportation-form" element={<TransportForm />} />
          <Route path="/amenities-form" element={<FoodForm />} />
          <Route path="/guest-room-form" element={<GuestRoom />} />
        </>
      )}

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default InitialRouter;
