const User = require("../models/User");
const jwt = require("jsonwebtoken");
const handleAsyncError = require("../utilities/handleAsyncError");
const AppError = require("../middlewares/AppError");

const { JWT_EXPIRES_IN, JWT_SECRET } = process.env;

function generateToken(payload) {
  return jwt.sign({ id: payload }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

function sendResponse(res, stat, msg, data, token = undefined) {
  return res.status(201).json({
    status: stat,
    message: msg,
    token,
    data,
  });
}

exports.signup = handleAsyncError(async function (req, res) {
  const { email, password, passwordConfirm } = req.body;

  const user = await User.create({ email, password, passwordConfirm });

  const token = generateToken(user._id);

  sendResponse(res, 201, "User created", user, token);
});

exports.login = handleAsyncError(async function (req, res, next) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await user.compareUserPasswords)) {
    return next(new AppError("Invalid email or password", 400));
  }

  const token = generateToken(user._id);

  sendResponse(res, 200, "Login successful", user, token);

  // if (!user) {
  //   res.status(404).json({
  //     status: "fail",
  //     message: "User doesn't exist on the server",
  //   });
  // }

  // const passwordIsSame;

  // res.status(200).json({
  //   status: "un-implemented",
  //   message: "Route not defined yet",
  // });
});

exports.logout = async function (req, res) {
  res.status(200).json({
    status: "un-implemented",
    message: "Route not defined yet",
  });
};
