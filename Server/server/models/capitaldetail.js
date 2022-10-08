const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/connection')

const CapitalDetail = sequelize.define('CapitalDetail', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  user_id: {
    type: Sequelize.INTEGER
  },
  Capital: {
    type: Sequelize.INTEGER
  },
  Starting_Capital: {
    type: Sequelize.INTEGER
  },
  Year:{
    type:Sequelize.INTEGER
  },
  Targeted_CAGR:{
    type:Sequelize.INTEGER
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
}, {
  timestamps: true
});

module.exports = CapitalDetail;
