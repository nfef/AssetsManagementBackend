const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AssetType = sequelize.define('AssetType', {
  
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = AssetType;