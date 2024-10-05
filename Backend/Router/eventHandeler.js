const router = require("express").Router();
const Event = require("../Controller/EventControl");
router.post("/create_event", Event.CreateEvent);
router.post("/delete_event", Event.deleteEvent);
router.post("/modify_event", Event.updateevent);
router.get("/geteventdata/:id", Event.Get_Detailed_Info);
module.exports = router;
