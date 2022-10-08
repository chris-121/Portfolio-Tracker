const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/connection')

const PortfolioValue = sequelize.define('PortfolioValue', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  user_id: {
    type: Sequelize.INTEGER
  },
  CurrentValue: {
    type: Sequelize.INTEGER
  },
  TimeSeries: {
    type: Sequelize.STRING
  }
}, {
  timestamps: true
});

module.exports = PortfolioValue
