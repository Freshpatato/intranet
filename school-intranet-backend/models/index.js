// school-intranet-backend/models/index.js
const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user.js')(sequelize, Sequelize.DataTypes);
// Ajoute d'autres modèles ici si nécessaire

module.exports = db;
