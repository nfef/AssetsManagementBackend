const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Inventory = require('./Inventory');
const Asset = require('./Asset');

const InventoryItem = sequelize.define('InventoryItem', {
  scannedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

InventoryItem.belongsTo(Inventory, { foreignKey: 'inventoryId' });
InventoryItem.belongsTo(Asset, { foreignKey: 'assetId' });

module.exports = InventoryItem;