import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import Dashboard from "../components/Dashboard";
import Forms from "../components/Form";
import Login from "../components/Login";
import Placement from "../components/Placements";
import History from "../components/History";
import Departments from "../components/Departments";
import Canceled from "../components/Canceled";
import AdminDashBoard from "../components/AdminDashBoard";

const InitialRouter = () => {
  const [token, setToken] = useState(localStorage.getItem("authToken"));

  const isTokenValid = (token) => {
    if (!token) return { isValid: false, role: null };
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      const isValid = decoded.exp > currentTime;
      const role = decoded.role;
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
            <Navigate to="/Dashboard" />
          ) : (
            <Login setToken={setToken} />
          )
        }
      />
      <Route
        path="/Dashboard"
        element={
          isAuthenticated ? (
            role === "admin" ? (
              <AdminDashBoard />
            ) : (
              <Dashboard />
            )
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/Placement"
        element={isAuthenticated ? <Placement /> : <Navigate to="/" />}
      />
     
      <Route
        path="/History"
        element={isAuthenticated ? <History /> : <Navigate to="/" />}
      />
      <Route
        path="/Form"
        element={isAuthenticated ? <Forms /> : <Navigate to="/" />}
      />
     
      <Route
        path="/Departments"
        element={isAuthenticated ? <Departments /> : <Navigate to="/" />}
      />
      <Route
        path="/CanceledEvents"
        element={isAuthenticated ? <Canceled /> : <Navigate to="/" />}
      />
    </Routes>
  );
};

export default InitialRouter;
