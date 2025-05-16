const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');

const userRoutes = require('./routes/userRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/', userRoutes);
app.use('/', paymentRoutes);

sequelize.authenticate()
  .then(() => console.log('✅ Connected to MySQL'))
  .then(() => sequelize.sync())
  .then(() => {
    app.listen(3000, () => console.log('🚀 Server running on http://localhost:3000'));
  })
  .catch(err => console.error('❌ DB connection error:', err));
