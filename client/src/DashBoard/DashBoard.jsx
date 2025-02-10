import { useState, useEffect } from "react";
import calender from "../assets/calendar (5).png";
import onlytoday from "../assets/only-today.png";
import department from "../assets/department (1).png";
import axios from "axios";
import { FiMoreHorizontal } from "react-icons/fi";
import DonutChart from "./DonutChart";
import MonthlyChart from "./MonthlyChart";
import { toast } from "react-toastify"; // Ensure you have this installed

const recentBookings = [
  {
    id: 1,
    dept: "CSE",
    date: "01 Jul 2024",
    title: "check other group decisions",
    status: "Accepted",
    priority: "Medium",
  },
  {
    id: 2,
    dept: "PLAC",
    date: "25 to 26 Jun 2024",
    title: "Thadaladi New",
    status: "Pending",
    priority: "Medium",
  },
  {
    id: 3,
    dept: "CSE",
    date: "27 Jun 2024",
    title: "Uniops inauguration",
    status: "Accepted",
    priority: "Medium",
  },
  {
    id: 4,
    dept: "CSE",
    date: "02 Jul 2024",
    title: "new bookings",
    status: "Rejected",
    priority: "Medium",
  },
];

const COLORS = {
  blue: ["#60A5FA", "#3B82F6", "#2563EB", "#1D4ED8"],
  green: ["#4ADE80", "#22C55E", "#16A34A", "#15803D"],
  red: ["#FF8A8A", "#EF4444", "#DC2626", "#B91C1C"],
};

const Dashboard = () => {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [dashboardData, setDashboardData] = useState({
    pendingCollaborations: 0,
    totalBookingsThisMonth: 0,
    eventsToday: 0,
    mostEventBookingDepartment: "N/A",
  });
  const [loading, setLoading] = useState(true);
  // console.log(`value of ${value}`)
  const [error, setError] = useState(null);
  const [user] = useState({ name: "vijay guhan", role: "Supervisor" });

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);

      try {
        const eventsResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/common/current-date-events`
        );
        const dashboardResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/common/dashboard-data`
        );

        if (eventsResponse.status === 200 && dashboardResponse.status === 200) {
          setCurrentEvents(eventsResponse.data);
          setDashboardData(dashboardResponse.data);
          console.log("Events fetched successfully:", eventsResponse.data);
          toast.success("Events fetched successfully!");
        } else {
          setError("Failed to fetch data.");
          toast.error("Failed to fetch events and dashboard data.");
        }
      } catch (err) {
        console.error("Error fetching events or dashboard data:", err);
        setError("An error occurred while fetching data.");
        toast.error("Error fetching events and dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []); // Empty dependency array to run this only once on mount

  const StatusBadge = ({ status }) => {
    const colors = {
      Pending: "bg-blue-100 text-blue-600",
      Rejected: "bg-red-100 text-red-600",
      Approved: "bg-green-100 text-green-600",
      Corrections: "bg-yellow-100 text-yellow-600",
    };

    return (
      <span
        className={`inline-flex items-center px-2 py-1 rounded text-xs ${colors[status]}`}
      >
        {status}
      </span>
    );
  };

  // Render events in table
  const renderEventsTable = () => {
    return currentEvents.map((event) => (
      <tr key={event.iqacNumber} className="border-b last:border-b-0">
        <td className="px-6 py-4">{event.iqacNumber}</td>
        <td className="px-6 py-4">{event.departments.join(", ")}</td>
        <td className="px-6 py-4">
          {event.startDate} to {event.endDate}
        </td>
        <td className="px-6 py-4">{event.eventName}</td>
        <td className="px-6 py-4">
          <StatusBadge status={event.status} />
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center gap-2">
            <span>→</span>
            {event.categories.join(", ")}
          </div>
        </td>
        <td className="px-6 py-4">
          <button className="text-gray-400 hover:text-gray-600">
            <FiMoreHorizontal />
          </button>
        </td>
      </tr>
    ));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="">
      <div className="ml-20 p-6 rounded-l-3xl bg-[#cae9f73e] mb-20">
        <div className="flex justify-between items-center mb-1">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <span className="text-blue-500">Pending Collaborations</span>
        </div>
        <div className="grid grid-cols-4 gap-6 mb-8">
          {/* Total Bookings in This Month */}
          <div className="bg-blue-400 rounded-lg p-6 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-4xl font-bold mb-1">
                {dashboardData.totalBookingsThisMonth}
              </h3>
              <p className="text-sm opacity-90">Total bookings in this month</p>
            </div>
            <div className="absolute right-4 bottom-4">
              <img src={calender} className="w-20 h-20" alt="Calendar" />
            </div>
          </div>

          {/* Number of Events Today */}
          <div className="bg-[#80b584cb] rounded-lg p-6 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-4xl font-bold mb-1">
                {dashboardData.eventsToday}
              </h3>
              <p className="text-sm opacity-90">No. of events today</p>
            </div>
            <div className="absolute right-4 bottom-4">
              <img src={onlytoday} className="w-20 h-20" alt="Today" />
            </div>
          </div>

          {/* Most Event Booking Department */}
          <div className="bg-[#b178b5e4] rounded-lg p-6 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-4xl font-bold mb-1">
                {dashboardData.mostEventBookingDepartment}
              </h3>
              <p className="text-sm opacity-90">
                Most event booking department
              </p>
            </div>
            <div className="absolute right-4 bottom-4">
              <img src={department} className="w-20 h-20" alt="Department" />
            </div>
          </div>

          {/* User Satisfaction Rating */}
          <div className="bg-[#e25c23af] rounded-lg p-6 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-4xl font-bold mb-1">3.5</h3>
              <p className="text-sm opacity-90">User satisfaction rating</p>
            </div>
            <div className="absolute right-4 bottom-4">
              <img src={onlytoday} className="w-20 h-20" alt="Satisfaction" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xs font-semibold">Happenings</h2>
              <button className="text-blue-500 text-xs">Show All</button>
            </div>
            <div className="bg-white rounded-lg shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full table-auto text-xs">
                  <thead>
                    <tr className="text-left text-xs text-gray-500 border-b">
                      <th className="px-6 py-4">Venue</th>
                      <th className="px-6 py-4">Event Name</th>
                      <th className="px-6 py-4">End Date</th>
                      <th className="px-6 py-4">End Time</th>
                      <th className="px-6 py-4">Organizer</th>
                      <th className="px-6 py-4">Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentEvents.length > 0 ? (
                      currentEvents.map((event) => (
                        <tr
                          key={event.iqacNumber}
                          className="border-b last:border-b-0"
                        >
                          <td className="px-6 py-4">{event.eventVenue}</td>
                          <td className="px-6 py-4">{event.eventName}</td>
                          <td className="px-6 py-4">{event.endDate}</td>
                          <td className="px-6 py-4">{event.endTime}</td>
                          <td className="px-6 py-4">
                            {event.organizers.map((organizer, index) => (
                              <div key={index}>
                                <p>{organizer.name}</p>
                              </div>
                            ))}
                          </td>
                          <td className="px-6 py-4">
                            {event.organizers.map((organizer, index) => (
                              <div key={index}>{organizer.phone}</div>
                            ))}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="7"
                          className="px-6 py-4 text-center text-gray-500"
                        >
                          No results.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <MonthlyChart />
        </div>

        <DonutChart />

        <div className="bg-white rounded-lg shadow-sm">
          <div className="flex justify-between items-center p-6">
            <h2 className="text-lg font-semibold">Recent Bookings</h2>
            <button className="text-blue-500 text-sm">Show All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b">
                  <th className="px-6 py-4">No.</th>
                  <th className="px-6 py-4">Dept</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Priority</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="border-b last:border-b-0">
                    <td className="px-6 py-4">{booking.id}</td>
                    <td className="px-6 py-4">{booking.dept}</td>
                    <td className="px-6 py-4">{booking.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-emerald-100 text-emerald-600 text-xs px-2 py-0.5 rounded">
                          Completed
                        </span>
                        {booking.title}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={booking.status} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span>→</span>
                        {booking.priority}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-gray-400 hover:text-gray-600">
                        <FiMoreHorizontal />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
