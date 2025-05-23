const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./database');

const tutorsRoutes = require('./routes/tutors-routes.js');
const studentRoutes = require('./routes/students-routes.js');
const feesRoutes = require('./routes/fee-routes.js');
const feesHistoricalRoutes = require('./routes/feeHistorical-routes.js');
const paymentRoutes = require('./routes/payment-routes.js');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());

const port = 5000;

// Routes
app.use('/', tutorsRoutes);
app.use('/', studentRoutes);
app.use('/', feesRoutes);
app.use('/', feesHistoricalRoutes);
app.use('/', paymentRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});