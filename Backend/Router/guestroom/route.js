const express = require("express");
const router = express.Router();
const jwt = require("../../Middleware/Authentication");
const bookingController = require("../../Controller/guestroom/main");

router.post("/bookings", jwt, bookingController.createBooking);
router.get("/bookings", jwt, bookingController.getAllBookings);
router.get("/bookings/:id", jwt, bookingController.getBookingById);
router.put("/bookings/:id", jwt, bookingController.updateBooking);
router.delete("/bookings/:id", bookingController.deleteBooking);

module.exports = router;
