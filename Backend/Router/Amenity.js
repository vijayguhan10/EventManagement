const express = require("express");
const auth = require("../Middleware/Authentication");
const departmentAuthorize = require("../Middleware/DepartmentAuth");
const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../Controller/foodform/main");

const router = express.Router();

router.post("/events", createEvent);
router.get("/events", getAllEvents);
router.get("/events/:id", getEventById);
router.put("/events/:id", updateEvent);
router.delete("/events/:id", deleteEvent);

// Only food and systemadmin roles can edit food events
router.put("/edit/:id", auth, departmentAuthorize(), async (req, res) => {
  try {
    await updateEvent(req, res);
  } catch (err) {
    res.status(500).json({ message: "Failed to update event", error: err.message });
  }
});

module.exports = router;
