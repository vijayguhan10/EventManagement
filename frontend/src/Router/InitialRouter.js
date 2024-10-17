import React from "react";
import Dashboard from "../components/Dashboard";
import { Routes, Route } from "react-router-dom";
import Forms from "../components/Form";
import Login from "../components/Login";
import CRUD from "../components/CRUD";
import Placement from "../components/Placements";
import Nontechnical from "../components/NonTechnical";
import Technical from "../components/Technical";
import History from "../components/History";
import Departments from "../components/Departments";
const InitialRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/Dashboard" element={<Dashboard />}></Route>
      <Route path="/Placement" element={<Placement />}></Route>
      <Route path="/Technical" element={<Technical />}></Route>
      <Route path="/NonTechnical" element={<Nontechnical />}></Route>
      <Route path="/History" element={<History />}></Route>
      <Route path="/Form" element={<Forms />}></Route>
      <Route path="/Editdata" element={<CRUD />}></Route>
      <Route path="/Departments" element={<Departments />}></Route>
    </Routes>
  );
};

export default InitialRouter;
