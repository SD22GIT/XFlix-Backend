const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const httpStatus = require("http-status");
const routes = require("./src/routes/v1");
const { errorHandler } = require("./src/middlewares/error");
const helmet = require("helmet");
const ApiError = require("./src/utils/ApiError");

const app = express();

// set security HTTP headers - https://helmetjs.github.io/
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options("*", cors());

// Reroute all API request starting with "/v1" route
app.use("/v1", routes);

//send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

//handle error
app.use(errorHandler);

mongoose.connect("mongodb://127.0.0.1:27017/xflix").then(() => {
    console.log("Connected to MongoDB")});

app.listen("8082", () => {
    console.log(`App is running on port 8082`);
  });

module.exports = app;