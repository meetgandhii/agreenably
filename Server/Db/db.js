const mongoose = require("mongoose");
require("dotenv").config();

function connectDb() {
  mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  const connection = mongoose.connection;
  connection.on("connected", () => {
    console.log("connection successfull");
  });
  connection.on("error", () => {
    console.log("connection failed");
  });
}

connectDb();
module.exports = mongoose;
