const { DataTypes } = require('sequelize');

//Util
const { sequelize } = require('../util/database.js');

const Actor = sequelize.define('actor', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false
  },

  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  country: {
    type: DataTypes.STRING(100),
    allowNull: false
  },

  rating: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  profilePic: {
    type: DataTypes.STRING(255),
    allowNull: true
  },

  status: {
    type: DataTypes.STRING(10),
    defaultValue: 'active',
    allowNull: false
  }
});

module.exports = { Actor };
