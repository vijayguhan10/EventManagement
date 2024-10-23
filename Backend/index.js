const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = require("./Router/Signups");
const Event = require("./Router/eventHandeler");
const updateevents = require("./other/Node-Corn");
const messages = require("./Router/Whatsapp");
const cors = require("cors");
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
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

app.use("/api/sece", router);
app.use("/api/event", Event);
app.use("/api/messages", messages);

updateevents;
const PORT = 8000;
app.listen(PORT, () => {    
  console.log(`Server running on port ${PORT}`);
});
