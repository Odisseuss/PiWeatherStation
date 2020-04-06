require("dotenv").config();
const { Client } = require("pg");
const db_connection_params = {
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
};

function AddDataToDb(id, temperature, humidity, pressure, gas) {
  const client = new Client({ ...db_connection_params });
  client.connect();
  const insert_query =
    "INSERT INTO datatable(id, temperature, humidity, pressure, gas) VALUES($1, $2, $3, $4, $5)";
  const query_values = [...arguments];
  client.query(insert_query, query_values, (err, db_res) => {
    if (err) {
      console.log("AddDataToDb err: \n", err.stack);
    } else {
      console.log(db_res.rows);
    }
    client.end();
  });
}
module.exports = AddDataToDb;
