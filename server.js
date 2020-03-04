const express = require('express'); 
const app = express();
const path = require('path');
const fetch = require("node-fetch");
const port = process.env.PORT || 3000;
require('dotenv').config();

// API Endpoint: https://data.cityofnewyork.us/resource/yjxr-fw8i.json

app.use(express.static("dist"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./dist/index.html"));
});

// DO I NEED THESE UNDERNEATH
const JS_SCRIPTS = path.join(__dirname, '/src/scripts')
app.use(express.static(JS_SCRIPTS))

app.get("/NYODQ/:zip", (request, response) => {
  const url = `https://data.cityofnewyork.us/resource/yjxr-fw8i.json?$query=SELECT * WHERE zip = ${request.params.zip} LIMIT 10`
  fetch(url, { headers: {
    "X-App-Token": process.env.APP_TOKEN
  }})
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
