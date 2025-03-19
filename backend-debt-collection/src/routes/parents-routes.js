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

router.post("/parents/:id", async (req, res) => {
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

router.get("/parents/:id", async (req, res) => {
  const parentId = req.params.id; 
  const connection = await db.getConnection();
  connection.query("SELECT * FROM parent WHERE idparent = ?", [parentId], (err, result) => {
    if (err) {
      console.error("Error fetching parent by id:", err);
      return res.status(500).json({ error: err.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "Parent not found" });
    }
    return res.status(200).json(result[0]);
  });
});

router.delete("/parents/:id", async (req, res) => {
  const { id } = req.params;
  const connection = await db.getConnection();
  try {
    await connection.query("DELETE FROM child WHERE idparentc = ?", [id]);
    await connection.query("DELETE FROM fee WHERE idparent = ?", [id]);
    await connection.query("DELETE FROM parent WHERE idparent = ?", [id]);
    return res.status(200).json({ message: "Parent and related children deleted successfully" });
  } catch (err) {
    console.error("Error deleting parent and children:", err);
    return res.status(500).json({ error: err.message });
  }
});



module.exports = router;
