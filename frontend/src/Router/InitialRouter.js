import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Dashboard from "../components/Dashboard";
import Forms from "../components/Form";
import Login from "../components/Login";
import CRUD from "../components/CRUD";
import Placement from "../components/Placements";
import Nontechnical from "../components/NonTechnical";
import Technical from "../components/Technical";
import History from "../components/History";
import Departments from "../components/Departments";
import Canceled from "../components/Canceled";

const InitialRouter = () => {
  const [token, setToken] = useState(localStorage.getItem("authToken"));

  const isTokenValid = (token) => {
    if (!token) return false;
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp > currentTime;
    } catch (error) {
      return false;
    }
  };
  const isAuthenticated = isTokenValid(token);

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
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
      />
      <Route
        path="/Placement"
        element={isAuthenticated ? <Placement /> : <Navigate to="/" />}
      />
      <Route
        path="/Technical"
        element={isAuthenticated ? <Technical /> : <Navigate to="/" />}
      />
      <Route
        path="/NonTechnical"
        element={isAuthenticated ? <Nontechnical /> : <Navigate to="/" />}
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
        path="/Editdata"
        element={isAuthenticated ? <CRUD /> : <Navigate to="/" />}
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
