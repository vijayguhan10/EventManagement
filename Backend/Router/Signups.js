const express = require("express");
const router = express.Router();
const User = require("../Schema/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  uploadUsersFromExcel,
  uploadMiddleware,
  getallstaffs,
} = require("../Controller/Signups");

router.post("/signup", async (req, res) => {
  try {
    const {
      name,
      emailId,
      password,
      phoneNumber,
      dept,
    } = req.body;

    const existingUser = await User.findOne({ emailId });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      emailId,
      password: hashedPassword,
      phoneNumber,
      dept,
    });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user._id, dept: user.dept }, // include dept in token
      process.env.JWT_SECRET_TOKEN,
      { expiresIn: "1d" }
    );
    res.json({ token, dept: user.dept }); // also send dept in response
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.get("/getallstaffs", getallstaffs);
router.post("/upload-excel", uploadMiddleware, uploadUsersFromExcel);

module.exports = router;

