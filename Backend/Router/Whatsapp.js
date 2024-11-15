const router = require("express").Router();
const messages = require("../other/Whatsapp");
router.get("/whatsapp", messages.sendAutoSchedulingEmail);
module.exports = router;
