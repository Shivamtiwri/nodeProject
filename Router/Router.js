const express = require("express");
const { register } = require("../Controller/register");
const { OtpSend, OtpVerifay } = require("../Controller/otp");

const router = new express.Router();

router.post("/register", register);
router.post("/send-otp", OtpSend);
router.post("/otp_verifay", OtpVerifay);
module.exports = router;
