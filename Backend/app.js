require("body-parser");
const express = require("express");
require("dotenv").config();
const { Client } = require("pg");
const app = express();

const port = 1234;

// Add database connection

// Add function for running python data gathering script

// Add route for requesting all the data from the db

// Add route for selecting some part of the data from the db

// Some other routes
app.get("/", (req, res) => {
  const client = new Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
  });
  client.connect();
  client.query("SELECT * FROM datatable", (err, db_res) => {
    res.send(db_res);
    client.end();
  });
});

app.listen(port, () => console.log(`App started at http://localhost:${port}/`));
