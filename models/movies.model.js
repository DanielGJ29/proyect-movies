const { DataTypes } = require("sequelize");

//Utils
const { sequelize } = require("../util/database");

const Movie = sequelize.define("movie", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },

  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },

  description: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },

  duration: {
    type: DataTypes.INTEGER(15),
    allowNull: false,
  },

  rating: {
    type: DataTypes.INTEGER(10),
    allowNull: false,
  },

  img: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },

  genre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },

  status: {
    type: DataTypes.STRING(10),
    defaultValue: "active",
    allowNull: false,
  },
});

module.exports = { Movie };
