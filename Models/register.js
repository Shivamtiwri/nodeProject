const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  password:{
    type:Number,
    required:true
  },
  re_password:{
    type:Number,
    required:true
  }
});

const Register = mongoose.model("register", registerSchema);
module.exports = Register;
