const express = require("express");

const app = express();

app.use(express.json());
// const

const login = (req, res) => {
  const { email, password } = req.body;
  res.status(200).json({
    email,
    password,
  });
  console.log(email, password);
};

const signUp = (req, res) => {
  const { email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    res.status(400).json({
      status: "fail",
      message: "Passwords do not match!",
    });
  }

  res.status(200).json({
    email,
    password,
  });
  console.log(email, password);
};

app.route("/api/v1/user/login").post(login);
app.route("/api/v1/user/signup").post(login);

app.all("*", (req, res) => {
  const reqUrl = req.originalUrl;

  res.status(404).json({
    status: "fail",
    message: `Cannot find ${reqUrl} on the server`,
  });
});

module.exports = app;
