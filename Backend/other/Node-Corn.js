// Node-Cron.js
const cron = require("node-cron");
const mongoose = require("mongoose");
const Event = require("../Schema/EventSchema");

const convertToDateTime = (dateString, timeString) => {
  const [day, month, year] = dateString.split("/").map(Number);
  const fullYear = year < 100 ? 2000 + year : year;

  const [hours, minutes, period] = timeString.split(/[: ]/);
  let hours24 = parseInt(hours, 10);
  if (period.toLowerCase() === "pm" && hours24 < 12) {
    hours24 += 12;
  } else if (period.toLowerCase() === "am" && hours24 === 12) {
    hours24 = 0;
  }

  return new Date(fullYear, month - 1, day, hours24, parseInt(minutes, 10));
};

const ScheduledCompletion = cron.schedule("* * * * * ", async () => {
  // Run every second
  try {
    const currentDate = new Date();
    const events = await Event.find({ status: { $eq: "pending" } });

    for (const event of events) {
      const eventEndDateTime = convertToDateTime(
        event.eventenddate,
        event.eventendtime
      );
      console.log("Checking event with end date and time:", eventEndDateTime);

      if (eventEndDateTime <= currentDate) {
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

ScheduledCompletion.start();
module.exports = ScheduledCompletion;
