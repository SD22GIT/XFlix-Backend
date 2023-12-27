const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");

mongoose.connect("mongodb://127.0.0.1:27017/xflix").then(() => {
    console.log("Connected to MongoDB")});

app.listen("8082", () => {
    console.log(`App is running on port 8082`);
  });
