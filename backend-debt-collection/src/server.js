const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./database');

const tutorsRoutes = require('./routes/tutors-routes.js');
const childRoutes = require('./routes/child-routes.js');
const feesRoutes = require('./routes/fee-routes.js');
const feesHistoricalRoutes = require('./routes/feeHistorical-routes.js');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());

const port = 5000;

// Routes
app.use('/', tutorsRoutes);
app.use('/', childRoutes);
app.use('/', feesRoutes);
app.use('/', feesHistoricalRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});