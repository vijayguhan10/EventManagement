const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = require("./Router/Signups");
const Event = require("./Router/eventHandeler");
const updateevents = require("./Node-Corn");
const { initializeWhatsApp } = require("./Controller/Whatsapp");
dotenv.config();

const app = express();
app.use(express.json());

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

app.use("/sece", router);
app.use("/event", Event);

updateevents;
// initializeWhatsApp();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
