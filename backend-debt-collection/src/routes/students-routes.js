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

router.post("/students", async (req, res) => {
  const { name, lastname, birth, phone, address, status, idtutor } = req.body;
  const connection = await db.getConnection();
  connection.query("INSERT INTO student (name, lastname, birth, phone, address, status, idtutor) VALUES (?, ?, ?, ?, ? , ?, ?)", [name, lastname, birth, phone, address, status, idtutor], (err, result) => {
    if (err) {
      console.error("Error inserting Student:", err);
      return res.status(500).json({ error: err.message });
    } 
    return res.status(200).json({ message: "Student added successfully" });
  });
});

router.get("/students/:id", async (req, res) => {
  const idstudent = req.params.id; 
  const connection = await db.getConnection();
  connection.query("SELECT * FROM student WHERE idstudent = ?", [idstudent], (err, result) => {
    if (err) {
      console.error("Error fetching student by id:", err);
      return res.status(500).json({ error: err.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "student not found" });
    }
    return res.status(200).json(result[0]);
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

router.get("/students/siblings/:idtutor", async (req, res) => {
  const { idtutor } = req.params;
  const connection = await db.getConnection();

  connection.query(
      "SELECT * FROM student WHERE idtutor = ?", 
      [idtutor], 
      (err, result) => {
          if (err) {
              console.error("Error fetching siblings:", err);
              return res.status(500).json({ error: err.message });
          }
          return res.status(200).json(result);
      }
  );
});


module.exports = router;
