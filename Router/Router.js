const express = require("express");
const { register, getRegister, deleteRegister, updateRegister } = require("../Controller/register");
const { OtpSend, OtpVerifay } = require("../Controller/otp");

const router = new express.Router();

router.post("/register", register);
router.post("/get_user",getRegister)
router.post("/send-otp", OtpSend);
router.post("/otp_verifay", OtpVerifay);
router.post("/delete_user/", deleteRegister);
router.post("/update_register/", updateRegister);
module.exports = router;
