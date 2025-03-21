const db = require("../database");
const express = require('express');
const router = express.Router();

router.post("/payments", async (req, res) => {
    const { payment_date, final_fee, idstudent } = req.body;
    const connection = await db.getConnection();
    connection.query(
        "INSERT INTO payment (payment_date, final_fee, idstudent) VALUES (?, ?, ?)",
        [payment_date, final_fee, idstudent],
        (err, result) => {
            if (err) {
                console.error("Error inserting payment:", err);
                return res.status(500).json({ error: err.message });
            }
            return res.status(200).json({ message: "Payment added successfully" });
        }
    );
});

router.get("/payments/:idstudent", async (req, res) => {
    const { idstudent } = req.params;
    const connection = await db.getConnection();
    connection.query(
        "SELECT * FROM payment WHERE idstudent = ?",
        [idstudent],
        (err, result) => {
            if (err) {
                console.error("Error fetching payments:", err);
                return res.status(500).json({ error: err.message });
            }
            return res.status(200).json(result);
        }
    );
});

router.get("/payments", async (req, res) => {
    const { idstudent } = req.params;
    const connection = await db.getConnection();
    connection.query(
        "SELECT * FROM payment",
        [idstudent],
        (err, result) => {
            if (err) {
                console.error("Error fetching payments:", err);
                return res.status(500).json({ error: err.message });
            }
            return res.status(200).json(result);
        }
    );
});


module.exports = router;