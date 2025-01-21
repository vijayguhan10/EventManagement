const express = require("express");
const { createEvent } = require("../Controller/EventController");
const router = express.Router();
router.post("/create", createEvent);
module.exports = router;
