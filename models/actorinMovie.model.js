const { DataTypes } = require('sequelize');
const { sequelize } = require('../util/database');

const ActorinMovie = sequelize.define('actorsinMovie', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false
  },

  actorId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  movieId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = { ActorinMovie };
