const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./database');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());

const port = 5000;

app.get("/parents", async (req, res) => {
  const connection = await db.getConnection();
  connection.query("SELECT * FROM parent", (err, result) => {
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