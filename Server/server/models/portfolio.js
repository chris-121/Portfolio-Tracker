const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/connection')

const Portfolio = sequelize.define('Portfolio', {
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
  Category: {
    type: Sequelize.STRING
  },
  Current_Price: {
    type: Sequelize.FLOAT
  },
}, {
  timestamps: false
});

module.exports = Portfolio;
