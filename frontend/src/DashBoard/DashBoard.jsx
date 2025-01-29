import { useState } from "react";
import calender from "../assets/calendar (5).png";
import onlytoday from "../assets/only-today.png";
import department from "../assets/department (1).png";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { FiMoreHorizontal } from "react-icons/fi";
import HeaderComponent from "../Components/HeaderComponent";
import DonutChart from "./DonutChart";
import MonthlyChart from "./MonthlyChart";

const departmentBookings = [
  { name: "CSE", value: 4 },
  { name: "ECE", value: 3 },
  { name: "MECH", value: 2 },
  { name: "CIVIL", value: 2 },
];

const eventTypes = [
  { name: "Workshops", value: 25 },
  { name: "Seminars", value: 15 },
  { name: "Conferences", value: 13 },
  { name: "Others", value: 10 },
];

const eventSatisfaction = [
  { name: "Very Satisfied", value: 5 },
  { name: "Satisfied", value: 4 },
  { name: "Neutral", value: 3 },
  { name: "Dissatisfied", value: 2 },
];

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

function Dashboard() {
  const [user] = useState({ name: "vijay guhan", role: "Supervisor" });

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    value,
    name,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {value}
      </text>
    );
  };

  const StatusBadge = ({ status }) => {
    const colors = {
      Completed: "bg-emerald-100 text-emerald-600",
      Accepted: "bg-emerald-100 text-emerald-600",
      Pending: "bg-blue-100 text-blue-600",
      Rejected: "bg-red-100 text-red-600",
    };

    return (
      <span
        className={`inline-flex items-center px-2 py-1 rounded text-xs ${colors[status]}`}
      >
        {status === "Accepted" && "✓"}
        {status === "Pending" && "⏳"}
        {status === "Rejected" && "✕"}
        {status}
      </span>
    );
  };

  return (
    <div className="  ">
      {/* Left Sidebar */}
      <div className="ml-20 p-6 rounded-l-3xl bg-[#cae9f73e] mb-20">
        <div className="flex justify-between items-center mb-1">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <span className="text-blue-500">Pending Collaborations</span>
        </div>
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-blue-400 rounded-lg p-6 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-4xl font-bold mb-1">15</h3>
              <p className="text-sm opacity-90">Total bookings in this month</p>
            </div>
            <div className=" ">
              <div className="absolute right-4 bottom-4 ">
                <img src={calender} className="w-20 h-20" />
              </div>
            </div>
          </div>
          <div className="bg-[#80b584cb] rounded-lg p-6 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-4xl font-bold mb-1">4</h3>
              <p className="text-sm opacity-90">no. of events today</p>
            </div>
            <div className="absolute right-4 bottom-4 ">
              <img src={onlytoday} color="white" className="w-20 h-20" />
            </div>
          </div>
          <div className="bg-[#b178b5e4] rounded-lg p-6 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-4xl font-bold mb-1">CSE</h3>
              <p className="text-sm opacity-90">
                most event booking department
              </p>
            </div>
            <div className="">
              <div className="absolute right-4 bottom-4 ">
                <img src={department} className="w-20 h-20" />
              </div>
            </div>
          </div>
          <div className="bg-[#e25c23af] rounded-lg p-6 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-4xl font-bold mb-1">3.5</h3>
              <p className="text-sm opacity-90">user satisfaction rating</p>
            </div>
            <div className="absolute right-4 bottom-4 ">
              <img src={onlytoday} className="w-20 h-20" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Happenings Section */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Happenings</h2>
              <button className="text-blue-500 text-sm">Show All</button>
            </div>
            <div className="border rounded-lg">
              <div className="flex p-4 border-b text-sm text-gray-500">
                <div className="flex-1">Date</div>
                <div className="flex-1">Title</div>
              </div>
              <div className="p-8 text-center text-gray-500">No results.</div>
            </div>
          </div>

          {/* Skills Concentration */}

          <MonthlyChart />
        </div>
        {/* Donut Charts Row */}
        <DonutChart />
        {/* Recent Bookings */}
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
}

export default Dashboard;
