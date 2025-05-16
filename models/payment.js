const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Payment = sequelize.define('Payment', {
  user_id: DataTypes.INTEGER,
  amount: DataTypes.FLOAT,
  currency: DataTypes.STRING,
  description: DataTypes.STRING,
  card_no: DataTypes.STRING,
  card_expiry: DataTypes.STRING,
  card_cvc: DataTypes.STRING
}, {
  tableName: 'payments',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

module.exports = Payment;
