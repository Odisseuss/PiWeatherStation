require("dotenv").config();
const { Client } = require("pg");
const db_connection_params = {
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
};

function AddToDb(timestamp, temperature, humidity, pressure, air_quality) {
  const client = new Client({ ...db_connection_params });
  client.connect();
  const query_values = [...arguments];
  const insert_query = `INSERT INTO temperature(ts_collection_time, i_temperature_value) VALUES($1, $2);
    INSERT INTO humidity(ts_collection_time, i_humidity_value) VALUES($1, $3);
    INSERT INTO pressure(ts_collection_time, i_pressure_value) VALUES($1, $4);
    INSERT INTO air_quality(ts_collection_time, i_aq_value) VALUES($1, $5);`;
  client.query(insert_query, query_values, (err, db_res) => {
    if (err) {
      console.log("AddToDb err: \n", err.stack);
    } else {
      console.log(db_res.rows);
    }
    client.end();
  });
}
module.exports = AddToDb;
