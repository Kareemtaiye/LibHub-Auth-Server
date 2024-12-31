const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

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
    select: false,
  },

  passwordConfirm: {
    type: String,
    required: [true, "Password confirm field is required"],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "Passwords doesn't match",
    },
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
});

userSchema.compareUserPasswords = async function (
  candidatePassword,
  dbPassword
) {
  return await bcrypt.compare(candidatePassword, dbPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
