const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/connection')

const Transaction = sequelize.define('Transaction', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  user_id: {
    type: Sequelize.INTEGER
  },
  ScriptName: {
    type: Sequelize.STRING
  },
  Qty: {
    type: Sequelize.INTEGER
  },
  avgPrice: {
    type: Sequelize.INTEGER
  },
  Category: {
    type: Sequelize.STRING
  },
}, {
  timestamps: true
});

module.exports = Transaction
