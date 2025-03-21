const db = require("../database");

const express = require('express');
const router = express.Router();

router.get("/feeMax", async (req, res) => {
  const connection = await db.getConnection();
  connection.query("SELECT idfee, DATE_FORMAT(datefee, '%d-%m-%Y') AS formatted_date, fee_on_time  FROM fee_schedule  WHERE datefee = ( SELECT datefee  FROM fee_schedule  ORDER BY datefee DESC LIMIT 1);", (err, result) => {
    if (err) {
      console.error("Error fetching child:", err);
      return res.status(500).json({ error: err.message });
    } 
    return res.status(200).json(result);
  });
});

router.get("/feesHist", async (req, res) => {
  const connection = await db.getConnection();
  connection.query("SELECT DATE_FORMAT(datefee, '%d-%m-%Y') AS formatted_date, fee_on_time FROM fee_schedule ORDER BY datefee DESC;", (err, result) => {
    if (err) {
      console.error("Error fetching child:", err);
      return res.status(500).json({ error: err.message });
    } 
    return res.status(200).json(result);
  });
});

router.get("/fees/:id", async (req, res) => {
  const idfee = req.params.id;
  const connection = await db.getConnection();
  connection.query("SELECT * FROM fee_schedule where idfee = ?;", [idfee], (err, result) => {
    if (err) {
      console.error("Error fetching child:", err);
      return res.status(500).json({ error: err.message });
    } 
    return res.status(200).json(result);
  });
});

router.get("/fees", async (req, res) => {
  const connection = await db.getConnection();
  connection.query("SELECT * FROM fee_schedule;", (err, result) => {
    if (err) {
      console.error("Error fetching child:", err);
      return res.status(500).json({ error: err.message });
    } 
    return res.status(200).json(result);
  });
});

router.post("/fees/:id", async (req, res) => {
  const {fee_on_time, fee_late, onesib, twosib} = req.body;
  const connection = await db.getConnection();
  connection.query("INSERT INTO fee_schedule (fee_on_time, fee_late, onesib, twosib) VALUES (?, ?, ?, ?)", [fee_on_time, fee_late, onesib, twosib], (err, result) => {
    if (err) {
      console.error("Error inserting fee:", err);
      return res.status(500).json({ error: err.message });
    } 
    return res.status(200).json({ message: "fee added successfully" });
  });
});

router.get("/fee-schedule", async (req, res) => {
  const connection = await db.getConnection();
  
  connection.query("SELECT * FROM fee_schedule ORDER BY datefee DESC LIMIT 1", (err, result) => {
      if (err) {
          console.error("Error fetching fee schedule:", err);
          return res.status(500).json({ error: err.message });
      }
      return res.status(200).json(result[0]);
  });
});

router.delete("/fees/:id", async (req, res) => {
  const { id } = req.params;
  const connection = await db.getConnection();
  try {
    await connection.query("DELETE FROM fee_schedule WHERE idfee = ?", [id]);
    return res.status(200).json({ message: "Fee deleted successfully" });
  } catch (err) {
    console.error("Error deleting fee :", err);
    return res.status(500).json({ error: err.message });
  }
});
module.exports = router;
