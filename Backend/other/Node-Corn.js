const cron = require("node-cron");
const Event = require("../Schema/EventSchema");

cron.schedule("* * * * * ", async () => {
  try {
    const now = new Date();
    const approvedEvents = await Event.find({ status: "Pending" });
    console.log("Node corn is running");
    for (const event of approvedEvents) {
      const endDateTime = new Date(`${event.endDate}T${event.endTime}`);
      if (endDateTime < now) {
        event.status = "event-completed";
        await event.save();
        console.log(`Event ${event._id} marked as completed.`);
      }
    }
  } catch (error) {
    console.error("Error in cron job:", error);
  }
});
