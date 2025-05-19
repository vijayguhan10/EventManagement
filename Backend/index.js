const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = require("./Router/Signups");
const Event = require("./Router/eventHandeler");
const updateevents = require("./other/Node-Corn");
const messages = require("./Router/Whatsapp");
const guestroom = require("./Router/GuestRoom");
const foodform = require("./Router/Amenity");
const transportform = require("./Router/Transport");
const endform = require("./Router/endform");
const Media = require("./Router/Media");
const Email = require("./Controller/email/Fetch");
const path = require("path");
const signupRouter = require("./Router/Signups");
const common = require("./Router/Common");
const cors = require("cors");
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true, limit: "30mb" }));
app.use("/api/auth", signupRouter);

const mongoURI = process.env.MONGODB_URI;
console.log("MongoDB URI:", mongoURI);
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/sece", router);
app.use("/api/event", Event);
app.use("/api/messages", messages);
app.use("/api/guestroom", guestroom);
app.use("/api/transportform", transportform);
app.use("/api/endform", endform);
app.use("/api/media", Media);
app.use("/api/foodform", foodform);
app.use("/api/common", common);
updateevents;
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
