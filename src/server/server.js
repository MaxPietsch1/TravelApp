// API endpoint
let projectData = [];
// const fakeData = { test: "testing" };

const express = require("express");
const app = express();
const axios = require("axios");
const dotenv = require("dotenv").config();
let apiKeey = "?key=" + process.env.API_KEY;
// console.log(apiKeey);

// including middlewear
const cors = require("cors");
app.use(cors());
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setting up server
const port = 8000;
const server = app.listen(port, () => {
  console.log(`Running on localhost: ${port}`);
});
app.use(express.static("dist"));
module.exports = app;

// sends data to JEST
app.get("/testingServer", function (req, res) {
  res.json({
    test: "test is succesful",
  });
});

// POST route which adds incoming data to API endpoint
app.post("/addData", (req, res) => {
  console.log("addData", req.body);
  newEntry = {
    lat: req.body.lat,
    long: req.body.long,
    country: req.body.country,
    userResponse: req.body.userResponse,
  };
  projectData = newEntry;
  res.send(projectData);
});

//  Endpoint for geonames
let apiEndpoint = [];
//  Endpoint for countdown data
let countDowndata = [];
// Endpoint fore forcast data
let forecastEndpoint = [];

// app.get("/all", (req, res) => {
//   res.send(apiEndpoint);
// });
app.post("/coordinates", (req, res) => {
  const coordinatesData = {
    country: req.body.country,
    latitude: req.body.lat,
    longitude: req.body.lng,
  };
  geonameEndpoint.push(coordinatesData);
  console.log("geonameEndpoint", geonameEndpoint);
});

app.post("/countdownData", (req, res) => {
  countDowndata.push(req.body);
  // console.log("countDowndata:", countDowndata);
});

app.post("/addCity", (req, res) => {
  const coordinatesData = {
    country: req.body.country,
    latitude: req.body.lat,
    longitude: req.body.lng,
  };
  // console.log(coordinatesData);
  res.send(coordinatesData);
});

let dateAndWeather = [];
app.post("/addWeatherbit", (req, res) => {
  const weatherInfo = req.body.forecast;

  for (let i = 0; i < weatherInfo.length; i++) {
    const d = new Date(weatherInfo[i].valid_date);
    const newDate = d.toString().slice(0, 4);
    const dayCelcius = {
      day: newDate,
      celcius: weatherInfo[i].temp,
    };
    dateAndWeather.push(dayCelcius);
  }

  // console.log("dateAndWeather", dateAndWeather.length);
  if (dateAndWeather.length > 16) {
    dateAndWeather.splice(0, 16);
  }
  res.send(dateAndWeather);
});
