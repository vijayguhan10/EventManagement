const router = require("express").Router();
const jsonwebtoken = require("../Middleware/Authentication");
const Event = require("../Controller/EventControl");
const pdf = require("../other/PDF");
router.post("/create_event", jsonwebtoken, Event.CreateEvent);
router.post("/delete_event", jsonwebtoken, Event.deleteEvent);
router.post("/modify_event", jsonwebtoken, Event.updateevent);
router.get("/geteventdata/:id", jsonwebtoken, Event.Get_Detailed_Info);
router.post("/getalldata", jsonwebtoken, Event.getallevents);
router.get("/generatedpdf-doc", jsonwebtoken, pdf.generatePdf);
router.post("/getdepartmentdata", jsonwebtoken, Event.departmentevent);
module.exports = router;
