const bodyParser = require("body-parser");
const express = require("express");
const AddDataToDb = require("./AddDataToDb");
require("dotenv").config();
const { Client } = require("pg");
const app = express();
const db_connection_params = {
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
};
const port = 1234;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add database connection

// Add function for running python data gathering script

// Add route for requesting all the data from the db

// Add route for selecting some part of the data from the db

// Some other routes
app.get("/", (req, res) => {
  const client = new Client({ ...db_connection_params });
  client.connect();
  client.query("SELECT * FROM datatable", (err, db_res) => {
    res.send(db_res.rows);
    client.end();
  });
});

app.post("/test", (req, res) => {
  AddToDb(
    req.body.id,
    req.body.temperature,
    req.body.humidity,
    req.body.pressure,
    req.body.gas
  );
  res.send("Request processed successfully");
});

app.listen(port, () => console.log(`App started at http://localhost:${port}/`));
