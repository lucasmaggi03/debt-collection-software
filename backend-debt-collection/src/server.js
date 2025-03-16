const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');

require('dotenv').config();

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());

const port = 5000;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,  
  database: process.env.DB_NAME
})

db.connect(function(err) {
  if (err){
    throw err;
  }else{
    console.log("Connected!");
  }
});

app.get("/parents", (req, res) => {
  db.query("SELECT * FROM parent", (err, result) => {
    if (err) {
      console.error("Error fetching parents:", err);
      return res.status(500).json({ error: err.message });
    } 
    return res.status(200).json(result);
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});