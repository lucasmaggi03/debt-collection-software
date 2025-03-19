const db = require("../database");

const express = require('express');
const router = express.Router();

router.get("/payment", async (req, res) => {
  const connection = await db.getConnection();
  connection.query("SELECT idfee, DATE_FORMAT(datefee, '%Y-%m-%d') AS datefee, DATE_FORMAT(datepay, '%Y-%m-%d') AS datepay, amount, state, created_at, idparent FROM fee;", (err, result) => {
    if (err) {
      console.error("Error fetching child:", err);
      return res.status(500).json({ error: err.message });
    } 
    return res.status(200).json(result);
  });
});

router.post("/payments", async (req, res) => {
  const { name, lastname, birth, status, idparentc } = req.body;
  const connection = await db.getConnection();
  connection.query("INSERT INTO fee (name, lastname, birth, status, idparentc) VALUES (?, ?, ?, ?, ? )", [name, lastname, birth, status, idparentc], (err, result) => {
    if (err) {
      console.error("Error inserting parent:", err);
      return res.status(500).json({ error: err.message });
    } 
    return res.status(200).json({ message: "Child added successfully" });
  });
});

module.exports = router;
