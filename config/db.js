const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('payment_api', 'root', 'Maniagrawal16#', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
