const express = require('express'); 
const app = express();
const path = require('path');
const fetch = require("node-fetch");
const port = process.env.PORT || 8000;
require('dotenv').config();

// API Endpoint: https://data.cityofnewyork.us/resource/yjxr-fw8i.json

app.use(express.static("dist"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./dist/index.html"));
});

app.get("/test", (request, response) => {
  // make api call using fetch
  fetch(
    `https://data.cityofnewyork.us/resource/yjxr-fw8i.json?$query=SELECT borough, fullval WHERE zip = 10004 LIMIT 50000`
  )
    .then(response => {
      return response.text();
    })
    .then(body => {
      let results = JSON.parse(body);
      console.log(results); // logs to server
      response.send(results); // sends to frontend
    });
});

app.listen(port, () => console.log(`Server running on ${port}`));
