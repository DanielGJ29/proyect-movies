const { DataTypes } = require("sequelize");
const { sequelize } = require("../util/database");

const ActorsinMovies = sequelize.define("actorsinMovie", {
  id: {
    primaryKey: true,
    autoIncrement: true.valueOf,
    type: DataTypes.INTEGER,
  },
});

module.exports = { ActorsinMovies };
