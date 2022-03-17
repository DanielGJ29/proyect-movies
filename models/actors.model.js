const { DataTypes } = require('sequelize');

//Util
const { sequelize } = require('../util/database.js');

const Actor = sequelize.define('actor', {
  id: {}
});
