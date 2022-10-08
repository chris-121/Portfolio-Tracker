const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/connection')

const FundTransaction = sequelize.define('FundTransaction', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  user_id: {
    allowNull: false,
    type: Sequelize.INTEGER
  },
  Amount: {
    type: Sequelize.INTEGER
  },
  Operation: {
    type: Sequelize.STRING
  },
}, {
  timestamps: true
});

module.exports = FundTransaction
