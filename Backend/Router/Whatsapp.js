const router = require("express").Router();
const messages = require("../Controller/Whatsapp");
router.post("/whatsapp", messages.getMessage);
module.exports = router;
