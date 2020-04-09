const bodyParser = require("body-parser");
const express = require("express");
const AddDataToDb = require("./AddDataToDb");
const EnvVarChecks = require("./EnvVarChecks");
require("dotenv").config();
const pg = require("pg");
const { Client } = require("pg");
pg.types.setTypeParser(1114, (str) => str);
const app = express();
const db_connection_params = {
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
EnvVarChecks();

// Some other routes
app.get("/", (req, res) => {
  const client = new Client({ ...db_connection_params });
  client.connect();
  const select_all_join_on_time =
    "SELECT temperature.ts_collection_time, i_temperature_value, i_humidity_value, i_pressure_value, i_aq_value FROM temperature, humidity, pressure, air_quality WHERE temperature.ts_collection_time = humidity.ts_collection_time AND humidity.ts_collection_time = pressure.ts_collection_time AND pressure.ts_collection_time = air_quality.ts_collection_time";
  client.query(select_all_join_on_time, (err, db_res) => {
    console.log(db_res.rows[0].ts_collection_time);
    res.send(db_res.rows);
    client.end();
  });
});

app.listen(process.env.SERVER_PORT, () =>
  console.log(`App started at http://localhost:${process.env.SERVER_PORT}/`)
);
