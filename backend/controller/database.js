const Pool = require("pg").Pool;
const dotenv = require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.HEROKU_DB_Link,
  ssl: {
    rejectUnauthorized: false,
  },
});

const connect = async () =>
  await pool
    .connect()
    .then((m) => console.log("db connected"))
    .catch((e) => console.error(e));

module.exports = { pool, connect }