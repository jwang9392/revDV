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

app.get("/NYODQ/:zip", (request, response) => {
  const url = `https://data.cityofnewyork.us/resource/yjxr-fw8i.json?$query=SELECT * WHERE zip = ${request.params.zip} LIMIT 50000`
  fetch(url)
    .then(response => {
      return response.text();
    })
    .then(body => {
      let results = JSON.parse(body);
      console.log(results);
      response.send(results);
    });
});

app.listen(port, () => console.log(`Server running on ${port}`));
