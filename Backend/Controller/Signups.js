const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Signups = require("../Schema/Authorization");
const mongoose = require("mongoose");
require("dotenv").config();
const secretKey = process.env.JWT_SECRET_TOKEN || "yourDefaultSecretKey";
console.log("secret key while creating token :", secretKey);
exports.Signup = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const findAlreadyUserExist = await Signups.findOne({ email });

    if (findAlreadyUserExist) {
      return res.status(401).json({
        message: "User ID already exists",
        userid: findAlreadyUserExist,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Signups({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    const token = jwt.sign(
      {
        userId: newUser._id,
        email: newUser.email,
        role: newUser.role,
        name: newUser.name,
      },
      secretKey,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token: token,
    });
  } catch (err) {
    res.status(500).json({ message: "Error in signing up", error: err });
  }
};

exports.Login = async (req, res) => {
  console.log("request  to the body : ", req.body);
  const { email, password } = req.body;

  try {
    const user = await Signups.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("password for login : ", isPasswordValid);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      secretKey,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token: token,
    });
  } catch (err) {
    res.status(500).json({ message: "Error in logging in", error: err });
  }
};

// exports.verifyToken = (req, res) => {
//   const token = req.headers["Authorization"];

//   if (!token) {
//     return res.status(403).json({ message: "No token provided" });
//   }

//   jwt.verify(token, secretKey, (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ message: "Unauthorized access" });
//     }

//     // req.userId = decoded.userId;
//   });
// };
