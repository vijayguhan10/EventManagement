import { useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarIcon,
  ClockIcon,
  CheckCircleIcon,
  UsersIcon,
  TicketIcon,
  ChartBarIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

function PendingDashboard() {
  const [activeTab, setActiveTab] = useState("upcoming");

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

  const events = [
    {
      id: "#EVT44323",
      type: "Conference",
      name: "Global Tech Summit 2024",
      date: "15-17 March, 2024",
      location: "San Francisco, CA",
      organizer: "Tech Innovators Inc.",
      participants: "2.3K",
      schedule: "9:00 AM - 6:00 PM Daily",
      image: "https://source.unsplash.com/random/800x600/?conference",
      status: "Upcoming",
    },
    {
      id: "#EVT66423",
      type: "Workshop",
      name: "AI & Machine Learning Bootcamp",
      date: "25-27 Feb, 2024",
      location: "Virtual Event",
      organizer: "AI Academy",
      participants: "1.1K",
      schedule: "10:00 AM - 4:00 PM PST",
      image: "https://source.unsplash.com/random/800x600/?workshop",
      status: "Ongoing",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
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

        {/* Stats Grid */}
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

        {/* Tabs */}
        <div className="flex gap-6 mb-6 border-b border-gray-200">
          {["All", "Upcoming", "Ongoing", "Completed"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-3 font-medium ${
                activeTab === tab.toLowerCase()
                  ? "text-purple-600 border-b-2 border-purple-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab(tab.toLowerCase())}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Event Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-200 group"
            >
              <div className="relative">
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <span
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${
                    event.status === "Upcoming"
                      ? "bg-blue-100 text-blue-600"
                      : event.status === "Ongoing"
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {event.status}
                </span>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-purple-600">
                    {event.type}
                  </span>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <UsersIcon className="h-5 w-5" />
                    <span>{event.participants}</span>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {event.name}
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5 text-gray-500" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ClockIcon className="h-5 w-5 text-gray-500" />
                    <span>{event.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="h-5 w-5 text-gray-500" />
                    <span>{event.location}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://source.unsplash.com/random/100x100/?logo"
                      alt="Organizer"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="text-sm text-gray-600">Organized by</p>
                      <p className="font-medium">{event.organizer}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg">
                      Edit
                    </button>
                    <button className="px-4 py-2 text-sm bg-purple-600 hover:bg-purple-700 text-white rounded-lg">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Add missing icons
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

export default PendingDashboard;
