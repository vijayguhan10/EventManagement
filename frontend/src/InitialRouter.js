import React from "react";
import Dashboard from "./components/Dashboard";
import { Routes, Route } from "react-router-dom";
import EventDatas from "./components/EventDatas";
import Forms from "./components/Form";
import Login from "./components/Login";
import CRUD from "./components/CRUD";
const InitialRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/Dashboard" element={<Dashboard />}></Route>

      <Route path="/EventData" element={<EventDatas />}></Route>
      <Route path="/Form" element={<Forms />}></Route>
      <Route path="/Editdata" element={<CRUD />}></Route>
    </Routes>
  );
};

export default InitialRouter;