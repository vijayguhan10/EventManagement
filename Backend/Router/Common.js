const express = require("express");
const router = express.Router();
const {
  getCurrentDateEvents,
  getDashboardData,
  getEventStats,
} = require("../Controller/Common");
router.get("/current-date-events", getCurrentDateEvents);
router.get("/dashboard-data", getDashboardData);
router.get("/event-stats", getEventStats);
module.exports = router;
