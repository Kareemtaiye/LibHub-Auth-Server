const dotenv = require("dotenv");
dotenv.config();
const app = require("./app");
const mongoose = require("mongoose");

const DB = process.env.DB_CONNECTION_STRING.replace(
  "<db_password>",
  process.env.DB_PASSWORD
);

mongoose.connect(DB).then((con) => {
  console.log("DB connection successful");
});

// console.log(process.env);
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
