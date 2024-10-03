const router = require("express").Router();
const SignupsController = require("../Controller/Signups");
router.post("/Signup", SignupsController.Signup);
router.post("/Login", SignupsController.Login);
module.exports = router;
