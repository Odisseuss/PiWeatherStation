require("body-parser");
const express = require("express");
const pg = require("pg");
const app = express();
const port = 1234;

// Add database connection

// Add function for running python data gathering script

// Add route for requesting all the data from the db

// Add route for selecting some part of the data from the db

// Some other routes
app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(port, () => console.log(`App started at http://localhost:${port}/`));
