const db = require("../database");

const express = require('express');
const router = express.Router();

router.get("/parents", async (req, res) => {
  const connection = await db.getConnection();
  connection.query("SELECT * FROM parent", (err, result) => {
    if (err) {
      console.error("Error fetching parents:", err);
      return res.status(500).json({ error: err.message });
    } 
    return res.status(200).json(result);
  });
});

router.post("/parents", async (req, res) => {
  const { name, lastname, address, celnumb, email, dni } = req.body;
  const connection = await db.getConnection();
  connection.query("INSERT INTO parent (name, lastname, address, celnumb, email, dni) VALUES (?, ?, ?, ?, ? , ?)", [name, lastname, address, celnumb, email, dni], (err, result) => {
    if (err) {
      console.error("Error inserting parent:", err);
      return res.status(500).json({ error: err.message });
    } 
    return res.status(200).json({ message: "Parent added successfully" });
  });
});

module.exports = router;
