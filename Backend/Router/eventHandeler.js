const express = require("express");
const { createEvent ,getAllEvents,getEventById,updateEvent} = require("../Controller/EventController");
const router = express.Router();
router.post("/create", createEvent);

router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.put("/:id", updateEvent);
module.exports = router;
