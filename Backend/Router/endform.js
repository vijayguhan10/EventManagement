const express = require("express");
const auth= require("../Middleware/Authentication");
const departmentAuthorize = require("../Middleware/DepartmentAuth");
const router = express.Router();
const endformController = require("../Controller/EndformController");
router.post("/create", endformController.createEndform);
router.get("/getallforms", endformController.getAllEndforms);
router.get("/allpending", endformController.getOverallPendingEndforms);
router.put("/:id", endformController.updateEndform);
router.delete("/:id", endformController.deleteEndform);
router.put("/edit/:id", auth, departmentAuthorize(), async (req, res) => {
  try {
    const updatedEvent = await endformController.updateEndform(req, res);
    // If your updateEvent controller handles the response, you may not need to send another response here.
    // Otherwise, you can send a custom response:
    // res.status(200).json({ message: "Event updated successfully", event: updatedEvent });
  } catch (err) {
    res.status(500).json({ message: "Failed to update event", error: err.message });
  }
});
module.exports = router;
