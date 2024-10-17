const cron = require("node-cron");
const mongoose = require("mongoose");
const Event = require("../Schema/EventSchema");
const convertToDateTime = (dateString, timeString) => {
  // Parse the date string (expected format: DD/MM/YYYY)
  const [day, month, year] = dateString.split("/").map(Number);
  const fullYear = year < 100 ? 2000 + year : year;

  // Parse the railway time string (expected format: HH:mm)
  const [hours, minutes] = timeString.split(":").map(Number);
  
  const period = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;

  console.log(`Converted Time: ${hours12}:${minutes} ${period}`);
  return new Date(fullYear, month - 1, day, hours, minutes);
};

const dateString = "17/10/2024"; 
const railwayTimeString = "15:30"; 

const convertedDateTime = convertToDateTime(dateString, railwayTimeString);
console.log("Converted DateTime:", convertedDateTime);

const ScheduledCompletion = cron.schedule("* * * * * ", async () => {
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
