const db = require("../database");

const express = require('express');
const router = express.Router();

router.get("/students", async (req, res) => {
  const connection = await db.getConnection();
  connection.query("SELECT * FROM student", (err, result) => {
    if (err) {
      console.error("Error fetching child:", err);
      return res.status(500).json({ error: err.message });
    } 
    return res.status(200).json(result);
  });
});

router.post("/child/:id", async (req, res) => {
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

router.post("/child", async (req, res) => {
  const { name, lastname, birth, status, idparentc } = req.body;
  const connection = await db.getConnection();
  connection.query("INSERT INTO child (name, lastname, birth, status, idparentc) VALUES (?, ?, ?, ?, ? )", [name, lastname, birth, status, idparentc], (err, result) => {
    if (err) {
      console.error("Error inserting parent:", err);
      return res.status(500).json({ error: err.message });
    } 
    return res.status(200).json({ message: "Child added successfully" });
  });
});

router.delete("/students/:id", async (req, res) => {
  const { id } = req.params;
  const connection = await db.getConnection();
  try {
    await connection.query("DELETE FROM student WHERE idstudent = ?", [id]);
    return res.status(200).json({ message: "stutend and related children deleted successfully" });
  } catch (err) {
    console.error("Error deleting stutend:", err);
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
