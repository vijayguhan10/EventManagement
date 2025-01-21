const express = require("express");
const router = express.Router();
const {
  createRequirement,
  getRequirements,
  getRequirementById,
  updateRequirement,
  deleteRequirement,
} = require("../Controller/MediaForm");
router.post("/", createRequirement);
router.get("/", getRequirements);
router.get("/:id", getRequirementById);
router.put("/:id", updateRequirement);
router.delete("/:id", deleteRequirement);
module.exports = router;
