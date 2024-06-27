const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Schedule = sequelize.define('Schedule', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  class: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  day: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Schedule;
