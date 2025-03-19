const db = require("../database");

const express = require('express');
const router = express.Router();

router.get("/feeMax", async (req, res) => {
  const connection = await db.getConnection();
  connection.query("SELECT DATE_FORMAT(datefee, '%d-%m-%Y') AS formatted_date, amount FROM historicalfee WHERE datefee = (SELECT MAX(DATE(datefee)) FROM historicalfee);", (err, result) => {
    if (err) {
      console.error("Error fetching child:", err);
      return res.status(500).json({ error: err.message });
    } 
    return res.status(200).json(result);
  });
});

router.get("/feesHistorical", async (req, res) => {
  const connection = await db.getConnection();
  connection.query("SELECT DATE_FORMAT(datefee, '%d-%m-%Y') AS formatted_date, amount FROM historicalfee ORDER BY datefee DESC;", (err, result) => {
    if (err) {
      console.error("Error fetching child:", err);
      return res.status(500).json({ error: err.message });
    } 
    return res.status(200).json(result);
  });
});

module.exports = router;
