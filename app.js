const express = require("express");
const path = require("path");
const axios = require("axios");

const app = express();
app.use(express.static(path.join(__dirname, "static")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//view engine config
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

//GET request
app.get("/", (req, res) => {
  res.status(200).render("index.pug");
});

//POST request
app.post("/weather_city", (req, res) => {
  console.log(req.body.city);
  let city = req.body.city;
  var data = "";

  let config = {
    method: "get",
    url: `http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&appid=YOUR_API_ID&units=metric`,
    // headers: {},
    // data: data,
  };

  //POST request for API
  axios(config)
    .then(function (response) {
      res.send(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log("Error");
      res.send("Error");
    });
});

const port = 80;
app.listen(port, () => {
  console.log(`The application started successfully on port ${port}`);
});
