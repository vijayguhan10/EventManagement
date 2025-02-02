const express = require("express");
const Event = require("../Schema/EventSchema");

const getCurrentDateEvents = async (req, res) => {
  const today = new Date().toISOString().split("T")[0];

  try {
    const events = await Event.find({
      status: "Pending",
      startDate: { $lte: today },
      endDate: { $gte: today },
    });
    return res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching current date events:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getDashboardData = async (req, res) => {
  const today = new Date().toISOString().split("T")[0];
  const startOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  )
    .toISOString()
    .split("T")[0];

  try {
    const pendingCollaborations = await Event.countDocuments({
      status: "Pending",
    });
    const totalBookingsThisMonth = await Event.countDocuments({
      startDate: { $gte: startOfMonth },
    });
    const eventsToday = await Event.countDocuments({
      startDate: { $lte: today },
      endDate: { $gte: today },
    });
    const mostEventBookingDepartment = await Event.aggregate([
      { $unwind: "$departments" },
      { $group: { _id: "$departments", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]);

    const dashboardData = {
      pendingCollaborations,
      totalBookingsThisMonth,
      eventsToday,
      mostEventBookingDepartment:
        mostEventBookingDepartment.length > 0
          ? mostEventBookingDepartment[0]._id
          : "N/A",
    };

    return res.status(200).json(dashboardData);
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getEventStats = async (req, res) => {
  const today = new Date();
  const startOfQuarter = new Date(
    today.getFullYear(),
    Math.floor(today.getMonth() / 3) * 3,
    1
  );
  const endOfQuarter = new Date(startOfQuarter);
  endOfQuarter.setMonth(startOfQuarter.getMonth() + 3);

  try {
    const totalEvents = await Event.countDocuments();
    const upcomingEvents = await Event.countDocuments({
      startDate: { $gte: today.toISOString().split("T")[0] },
    });
    const ongoingEvents = await Event.countDocuments({
      startDate: { $lte: today.toISOString().split("T")[0] },
      endDate: { $gte: today.toISOString().split("T")[0] },
    });

    const stats = {
      totalEvents,
      upcomingEvents,
      ongoingEvents,
    };

    return res.status(200).json(stats);
  } catch (error) {
    console.error("Error fetching event stats:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
    getCurrentDateEvents,
    getDashboardData,
    getEventStats,

}
