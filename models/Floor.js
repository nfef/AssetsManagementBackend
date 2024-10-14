const { DataTypes } = require('sequelize');
const Company = require('./Company');
const sequelize = require('../config/database');

const Floor = sequelize.define('Floor', {
  
  position: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Floor.belongsTo(Company, { foreignKey: 'companyId' });

module.exports = Floor;