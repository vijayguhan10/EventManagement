const express = require("express");
const router = express.Router();
const transportController = require("../../Controller/transportform/main");
router.post("/", transportController.createTransportRequest);
router.get("/", transportController.getAllTransportRequests);
router.get("/:id", transportController.getTransportRequestById);
router.put("/:id", transportController.updateTransportRequest);
router.delete("/:id", transportController.deleteTransportRequest);

module.exports = router;
