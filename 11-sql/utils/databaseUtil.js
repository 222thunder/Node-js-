const mysql = require("mysql2");
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "thunder222",
  database: "airbnb",
});

module.exports = pool.promise();
