const router = require("express").Router();
const Whatsapp = require("../Controller/Whatsapp");
router.post("/whatsapp-webhook", Whatsapp.handleWhatsAppMessage);
module.exports = router;
