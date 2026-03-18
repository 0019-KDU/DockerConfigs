const express = require("express");
const axios = require("axios");
require("dotenv").config();
const bodyParser = require("body-parser"); // Import bodyParser middleware
const app = express();

const PORT = process.env.PORT || 5000;
const API_KEY = process.env.API_KEY;

// Use bodyParser middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define route
app.get("/weather", (req, res) => {
  // Read address from the request body
  const address = req.body.address;
  if (!address) {
    return res.status(400).send("Address is required");
  }

  const url = `http://api.openweathermap.org/data/2.5/weather?q=${address}&units=metric&appid=${API_KEY}`;

  // Make an HTTP GET request to the API using axios
  axios
    .get(url)
    .then((response) => {
      const data = response.data;
      const cityName = data.name;
      const temperature = data.main.temp;
      const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
      const message = `Address: ${address}<br>City Name: ${cityName}<br>Temperature: ${temperature}&deg;C<br>Sunset Time: ${sunsetTime}`;

      res.send(message);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred while fetching weather data");
    });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
