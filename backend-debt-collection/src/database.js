const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,  
  database: process.env.DB_NAME
})

getConnection = async () => await db;
module.exports = {
    getConnection
}