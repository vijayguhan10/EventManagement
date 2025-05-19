const express = require("express");
const auth = require("../Middleware/Authentication");
const departmentAuthorize = require("../Middleware/DepartmentAuth");
const {
  createRequirement,
  getRequirements,
  getRequirementById,
  updateRequirement,
  deleteRequirement,
} = require("../Controller/MediaForm");

const router = express.Router();

router.post("/media", createRequirement);
router.get("/media", getRequirements);
router.get("/media/:id", getRequirementById);
router.put("/media/:id", updateRequirement);
router.delete("/media/:id", deleteRequirement);

// Only media and systemadmin roles can edit media events
router.put("/edit/:id", auth, departmentAuthorize(), async (req, res) => {
  try {
    await updateRequirement(req, res);
  } catch (err) {
    res.status(500).json({ message: "Failed to update media", error: err.message });
  }
});

module.exports = router;