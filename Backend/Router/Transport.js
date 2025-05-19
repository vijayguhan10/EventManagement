const express = require("express");
const auth = require("../Middleware/Authentication");
const departmentAuthorize = require("../Middleware/DepartmentAuth");
const {
  createTransportRequest,
  getAllTransportRequests,
  getTransportRequestById,
  updateTransportRequest,
  deleteTransportRequest,
} = require("../Controller/transportform/main");

const router = express.Router();

router.post("/transports", createTransportRequest);
router.get("/transports", getAllTransportRequests);
router.get("/transports/:id", getTransportRequestById);
router.put("/transports/:id", updateTransportRequest);
router.delete("/transports/:id", deleteTransportRequest);

// Only transport and systemadmin roles can edit transport events
router.put("/edit/:id", auth, departmentAuthorize(), async (req, res) => {
  try {
    await updateTransportRequest(req, res);
  } catch (err) {
    res.status(500).json({ message: "Failed to update transport", error: err.message });
  }
});

module.exports = router;
