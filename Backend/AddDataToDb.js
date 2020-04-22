require("dotenv").config();
const { Client } = require("pg");

// Get connection details from env vars
const db_connection_params = {
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
};

function AddToDb(
  timestamp,
  temperature,
  humidity,
  pressure,
  air_quality_score
) {
  // Connect to  the db
  const client = new Client({ ...db_connection_params });
  client.connect();
  const query_values = [
    [timestamp, temperature],
    [timestamp, humidity],
    [timestamp, pressure],
    [timestamp, air_quality_score],
  ];
  const insert_queries = [
    `INSERT INTO temperature(ts_collection_time, i_temperature_value) VALUES($1, $2);`,
    `INSERT INTO humidity(ts_collection_time, i_humidity_value) VALUES($1, $2);`,
    `INSERT INTO pressure(ts_collection_time, i_pressure_value) VALUES($1, $2);`,
    `INSERT INTO air_quality(ts_collection_time, i_aq_value) VALUES($1, $2);`,
  ];
  // Insert data into each appropiate table
  insert_queries.forEach((query, index) => {
    client.query(query, query_values[index], (err, db_res) => {
      if (err) {
        console.error(err);
      } else {
        console.log(db_res.rows);
      }
    });
  });
}
module.exports = AddToDb;
