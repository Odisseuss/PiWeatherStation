const bodyParser = require("body-parser");
const express = require("express");
const AddToDb = require("./AddDataToDb");
const { PythonShell } = require("python-shell");
const EnvVarChecks = require("./EnvVarChecks");
require("dotenv").config();
const pg = require("pg");
const { Client } = require("pg");
pg.types.setTypeParser(1114, (str) => str);
let app = express();
var live_data;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
EnvVarChecks();

const db_connection_params = {
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
};

const options = {
  scriptPath: "./Backend/Python/",
  pythonOptions: ["-u"],
  args: [
    process.env.PG_HOST,
    process.env.PG_DATABASE,
    process.env.PG_USER,
    process.env.PG_PASSWORD,
    process.env.PG_PORT,
  ],
};

// let pythonShell = new PythonShell("TestPyScript.py", options);

// // Read data every 5 seconds for the live updatess
// let counter = 0;
// pythonShell.on("message", function (msg) {
//   let regex = /(\d+-\d+-\d+\D\d+:\d+:\d+)\D*(\d+)\D*(\d+)\D*(\d+)\D*(\d+)/;
//   let regex_results = msg.match(regex);
//   regex_results = regex_results.slice(1);
//   // Add data to db every 15 minutes
//   // if (counter == 180) {
//   AddToDb(...regex_results);
//   // counter = 0;
//   // }
//   live_data = {
//     temperature: regex_results[1],
//     pressure: regex_results[2],
//     humidity: regex_results[3],
//     air_quality: regex_results[4],
//     prediction: "Unknown yet",
//   };
//   console.log(
//     `Timestamp: ${regex_results[0]}, Temperature: ${regex_results[1]}, Pressure: ${regex_results[2]}, Humidity: ${regex_results[3]}, Air Quality: ${regex_results[4]}`
//   );
//   // counter++;
// });

// Some other routes
app.get("/", (req, res) => {
  const client = new Client({ ...db_connection_params });
  client.connect();
  const select_all_join_on_time = `SELECT i_temperature_value, i_humidity_value, i_pressure_value, i_aq_value 
    FROM temperature, humidity, pressure, air_quality 
    WHERE temperature.ts_collection_time = humidity.ts_collection_time 
    AND humidity.ts_collection_time = pressure.ts_collection_time 
    AND pressure.ts_collection_time = air_quality.ts_collection_time`;
  client.query(select_all_join_on_time, (err, db_res) => {
    res.status(200).send(db_res.rows);
    client.end();
  });
});

// Fa weekly si pt restu de 2-3 zile ramase din luna si dupa la monthly average ia 5 saptamani. La febraurie fa un check.

// Live data route
app.get("/live_data", (req, res) => {
  res.status(200).send(live_data);
});

// Last x values to use for plotting in graph view
app.get("/chart_data", (req, res) => {
  const client = new Client({ ...db_connection_params });
  client.connect();
  const select_all_join_on_time = `SELECT i_temperature_value, i_humidity_value, i_pressure_value, i_aq_value 
    FROM temperature, humidity, pressure, air_quality 
    WHERE temperature.ts_collection_time = humidity.ts_collection_time 
    AND humidity.ts_collection_time = pressure.ts_collection_time 
    AND pressure.ts_collection_time = air_quality.ts_collection_time 
    ORDER BY temperature.ts_collection_time DESC 
    LIMIT 100`;
  client.query(select_all_join_on_time, (err, db_res) => {
    res.status(200).send(db_res.rows.reverse());
    client.end();
  });
});

app.listen(process.env.APP_PORT, () =>
  console.log(`App started at http://localhost:${process.env.APP_PORT}/`)
);
