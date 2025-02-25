const express = require("express");
const {
  Signup,
  Login,
  uploadUsersFromExcel,
  uploadMiddleware,
  getallstaffs,
} = require("../Controller/Signups");

const router = express.Router();
router.post("/signup", Signup);
router.get("/getallstaffs", getallstaffs);
router.post("/login", Login);
router.post("/upload-excel", uploadMiddleware, uploadUsersFromExcel);

module.exports = router;
