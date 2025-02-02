import React from "react";
import { useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  CheckCircleIcon,
  UsersIcon,
  TicketIcon,
  CalendarIcon,
  ChartBarIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
const Dashboard = () => {
  const stats = [
    {
      title: "Total Events",
      count: "1432",
      icon: CalendarIcon,
      color: "bg-purple-100",
      textColor: "text-purple-600",
    },
    {
      title: "Upcoming Events",
      count: "432",
      icon: ClockIcon,
      color: "bg-blue-100",
      textColor: "text-blue-600",
    },
    {
      title: "Ongoing Events",
      count: "89",
      icon: CheckCircleIcon,
      color: "bg-green-100",
      textColor: "text-green-600",
    },
    {
      title: "Participants",
      count: "23.5K",
      icon: UsersIcon,
      color: "bg-orange-100",
      textColor: "text-orange-600",
    },
  ];
  return (
    <div className="m bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Event Management Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Manage and track all your events in one place
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-200">
              <span className="text-gray-700">Q1 2024</span>
              <ChevronLeftIcon className="h-4 w-4 text-gray-600 cursor-pointer" />
              <ChevronRightIcon className="h-4 w-4 text-gray-600 cursor-pointer" />
            </div>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
              <PlusIcon className="h-5 w-5" />
              <span>Create New Event</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-2">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stat.count}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className={`h-6 w-6 ${stat.textColor}`} />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-green-500 flex items-center">
                  <ArrowUpIcon className="h-4 w-4 mr-1" />
                  +2.3%
                </span>
                <span className="text-gray-500 ml-2">vs previous quarter</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  function PlusIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    );
  }

  function ArrowUpIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
        />
      </svg>
    );
  }
};

export default Dashboard;
