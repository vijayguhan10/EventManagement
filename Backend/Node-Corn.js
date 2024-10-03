// Node-Corn.js
const cron = require("node-cron");
const mongoose = require("mongoose");
const Event = require("./Schema/EventSchema");

const convertToDate = (dateString) => {
  const [day, month, year] = dateString.split("/").map(Number);
  const fullYear = year < 100 ? 2000 + year : year;
  return new Date(fullYear, month - 1, day);
};

const SheduledCompletion = cron.schedule("0 * * * *", async () => {
  try {
    const currentDate = new Date();
    const events = await Event.find({ status: { $eq: "pending" } });

    for (const event of events) {
      const eventEndDate = convertToDate(event.eventenddate);
      console.log("Checking event with end date:", eventEndDate);

      if (eventEndDate <= currentDate) {
        await Event.updateOne(
          { _id: event._id },
          { $set: { status: "completed" } }
        );
        console.log(`Event ${event._id} marked as completed`);
      }
    }

    console.log("Completed events updated");
  } catch (error) {
    console.error("Error updating completed events:", error);
  }
});

SheduledCompletion.start();
module.exports = SheduledCompletion;
