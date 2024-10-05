const router = require("express").Router();
const messages = require("../other/Whatsapp");
router.post("/whatsapp", messages.getMessage);
module.exports = router;
