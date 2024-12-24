const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email field is compulsory"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },

  password: {
    type: String,
    required: [true, "Password field is required"],
    minlength: 8,
  },

  passwordConfirm: {
    type: String,
    required: [true, "Passwod confirm field is required"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
