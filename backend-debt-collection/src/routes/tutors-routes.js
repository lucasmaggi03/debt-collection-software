const db = require("../database");

const express = require('express');
const router = express.Router();

router.get("/tutors", async (req, res) => {
  const connection = await db.getConnection();
  connection.query("SELECT * FROM tutor", (err, result) => {
    if (err) {
      console.error("Error fetching tutors:", err);
      return res.status(500).json({ error: err.message });
    } 
    return res.status(200).json(result);
  });
});

router.post("/tutors/:id", async (req, res) => {
  const { name, lastname, address, celnumb, email, dni } = req.body;
  const connection = await db.getConnection();
  connection.query("INSERT INTO tutor (name, lastname, address, celnumb, email, dni) VALUES (?, ?, ?, ?, ? , ?)", [name, lastname, address, celnumb, email, dni], (err, result) => {
    if (err) {
      console.error("Error inserting tutor:", err);
      return res.status(500).json({ error: err.message });
    } 
    return res.status(200).json({ message: "tutor added successfully" });
  });
});

router.get("/tutors/:id", async (req, res) => {
  const tutorId = req.params.id; 
  const connection = await db.getConnection();
  connection.query("SELECT * FROM tutor WHERE idtutor = ?", [tutorId], (err, result) => {
    if (err) {
      console.error("Error fetching tutor by id:", err);
      return res.status(500).json({ error: err.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "tutor not found" });
    }
    return res.status(200).json(result[0]);
  });
});

router.delete("/tutors/:id", async (req, res) => {
  const { id } = req.params;
  const connection = await db.getConnection();
  try {
    await connection.query("DELETE FROM child WHERE idtutorc = ?", [id]);
    await connection.query("DELETE FROM fee WHERE idtutor = ?", [id]);
    await connection.query("DELETE FROM tutor WHERE idtutor = ?", [id]);
    return res.status(200).json({ message: "tutor and related children deleted successfully" });
  } catch (err) {
    console.error("Error deleting tutor and children:", err);
    return res.status(500).json({ error: err.message });
  }
});

/*router.get('/students/:idstudent', async (req, res) => {
  const { idstudent } = req.params;
  const connection = await db.getConnection();
  try {
    const student = await connection.query('SELECT * FROM student WHERE idstudent = ?', [idstudent]);
    if (student.length > 0) {
      res.json(student[0]);
    } else {
      res.status(404).json({ error: 'Estudiante no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el estudiante' });
  }
});*/

module.exports = router;
