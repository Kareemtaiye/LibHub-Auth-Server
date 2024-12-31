const express = require("express");
const app = express();
const AppError = require("./middlewares/AppError");

const userRoutes = require("./routes/userRoutes");

app.use(express.json());

app.use("/api/v1/users", userRoutes);

app.use((err, req, res, next) => {
  console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
