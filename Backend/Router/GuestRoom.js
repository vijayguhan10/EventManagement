const express = require("express");
const auth = require("../Middleware/Authentication");
const bookingController = require("../Controller/guestroom/main");
const departmentAuthorize = require("../Middleware/DepartmentAuth");

const router = express.Router();

router.post("/bookings", bookingController.createBooking);
router.get("/bookings", bookingController.getAllBookings);
router.get("/bookings/:id", bookingController.getBookingById);
router.put("/bookings/:id", bookingController.updateBooking);
router.delete("/bookings/:id", bookingController.deleteBooking);

// Only systemadmin role can edit guest room bookings
router.put("/edit/:id", auth, departmentAuthorize(), async (req, res) => {
  try {
    await bookingController.updateBooking(req, res);
  } catch (err) {
    res.status(500).json({ message: "Failed to update booking", error: err.message });
  }
});

module.exports = router;
