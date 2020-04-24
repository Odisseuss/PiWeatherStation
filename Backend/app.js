const bodyParser = require("body-parser");
const express = require("express");
const AddToDb = require("./AddDataToDb");
const { PythonShell } = require("python-shell");
const EnvVarChecks = require("./EnvVarChecks");
const path = require("path");
require("dotenv").config();
const pg = require("pg");
const { Client } = require("pg");
pg.types.setTypeParser(1114, (str) => str);
pg.types.setTypeParser(1082, (str) => str);
let app = express();
var live_data;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/app", express.static(path.join(__dirname, "../Frontend/dist/")));
// app.use("/public", express.static(path.join(__dirname, "../Frontend/public/")));
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

/////////////////////////////////////////
// Values from sensor come every second
// Because they may be inaccurate if the sensor takes big breaks between readings
// However we take the readings and add them to the db every 15 minutes

// let pythonShell = new PythonShell("TestPyScript.py", options);

// // Read data every 5 seconds for the live updatess
// let counter = 0;
// pythonShell.on("message", function (msg) {
//   // Add data to db every 15 minutes
//   if (counter == 60 * 15) {
//     let regex = /(\d+-\d+-\d+\D\d+:\d+:\d+)\D*(\d+)\D*(\d+)\D*(\d+)\D*(\d+)/;
//     let regex_results = msg.match(regex);
//     regex_results = regex_results.slice(1);
//     live_data = {
//       temperature: regex_results[1],
//       pressure: regex_results[2],
//       humidity: regex_results[3],
//       air_quality: regex_results[4],
//       prediction: "Unknown yet",
//     };
//     AddToDb(...regex_results);
//     counter = 0;
//   }
//   console.log(
//     `Timestamp: ${regex_results[0]}, Temperature: ${regex_results[1]}, Pressure: ${regex_results[2]}, Humidity: ${regex_results[3]}, Air Quality: ${regex_results[4]}`
//   );
//   counter++;
// });

// Pentru weather api:
// Pune un entry in .env cu api key. Il passezi la scriptu de python care aduna datele, care il paseaza la zambretti.
// Daca nu e setat, react da render la un component care iti spune sa te duci pe situ al sa iti faci cont.
// COmponentu are un input field unde poti sa iti setezi key-ul si il scrie in .env. Dupa pagina da reload

// Daca requestu la api da fail, dam eroare pe server.

// Some other routes
app.get("/", (req, res) => {
  const client = new Client({ ...db_connection_params });
  client.connect();
  const select_all_join_on_time = `SELECT i_temperature_value, i_humidity_value, i_pressure_value, i_aq_value 
    FROM temperature, humidity, pressure, air_quality 
    WHERE temperature.ts_collection_time = humidity.ts_collection_time 
    AND humidity.ts_collection_time = pressure.ts_collection_time 
    AND pressure.ts_collection_time = air_quality.ts_collection_time;`;
  client.query(select_all_join_on_time, (err, db_res) => {
    if (err) {
      res
        .status(500)
        .send(
          "Something went wrong when trying to access the database. Please try again"
        );
    }
    res.status(200).send(db_res.rows);
    client.end();
  });
});

// app.get(["/app", "/app/*"], function (req, res, next) {
//   res.sendFile(path.join(__dirname, "../Frontend/dist/", "index.html"));
// });

// Live data route
app.get("/live_data", (req, res) => {
  res.status(200).send(live_data);
});

// Values for the specific average type
app.get("/chart_data", (req, res) => {
  let data_type = req.body.typeOfTime.toLowerCase();
  let query_args = [];
  switch (data_type) {
    case "daily":
      query_args.push("date_computed_for");
      break;
    case "weekly":
      query_args.push("date_beginned_on");
      break;
    case "monthly":
      query_args.push("date_month_computed");
      break;
  }
  query_args.push(`${data_type}_averages`);
  let select_all = `SELECT ${query_args[0]}, i_temperature_avg, i_humidity_avg, i_pressure_avg, i_aq_avg FROM ${query_args[1]} ORDER BY ${query_args[0]};`;

  const client = new Client({ ...db_connection_params });
  client.connect();
  client.query(select_all, (err, db_res) => {
    if (err) {
      res
        .status(500)
        .send(
          "Something went wrong when trying to access the database. Please try again"
        );
    }
    res.status(200).send(db_res.rows);
    client.end();
  });
});

app.listen(process.env.APP_PORT, () =>
  console.log(`App started at raspberrypi.local:${process.env.APP_PORT}/`)
);
