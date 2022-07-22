const mysql = require("mysql2");

//connection pool allows connections to be cached and reused rather than reopened for each query
//this reduces latency and is best when multiple requests will be made to database concurrently
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
});

//pool.promise() allows database interactions to use promises too rather than just callbacks
module.exports = pool.promise();