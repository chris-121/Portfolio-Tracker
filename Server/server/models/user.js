const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/connection')

const User = sequelize.define('User', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  Target_Amount: {
    type: Sequelize.INTEGER
  },
  Monthly_SIP: {
    type: Sequelize.INTEGER
  },
  Years: {
    type: Sequelize.INTEGER
  }
}, {
  timestamps: false
});

module.exports = User
