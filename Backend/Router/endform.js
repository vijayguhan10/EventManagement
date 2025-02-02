const express = require("express");
const router = express.Router();
const endformController = require("../Controller/EndformController");
router.post("/create", endformController.createEndform);
router.get("/getallforms", endformController.getAllEndforms);
router.get("/allpending", endformController.getOverallPendingEndforms);
router.put("/:id", endformController.updateEndform);
router.delete("/:id", endformController.deleteEndform);

module.exports = router;
