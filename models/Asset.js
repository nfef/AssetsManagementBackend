const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Company = require('./Company');
const AssetType = require('./AssetType');
const Floor = require('./Floor');

const Asset = sequelize.define('Asset', {
  erpCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  barcode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  purchaseDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  exityDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
    hooks: {
      beforeCreate: async(asset) => {
        const lastAsset = await Asset.findOne({order: [['id', 'DESC']]});
        const lastId = lastAsset ? lastAsset.id : 0;
        const newId = lastId + 1;

        const companyCode = (await Company.findByPk(asset.companyId)).code;
        const floorPosition = (await Floor.findByPk(asset.floorId)).position;
        const assetTypeCode = (await AssetType.findByPk(asset.assetTypeId)).code;

        asset.barcode = `${companyCode}${floorPosition}${assetTypeCode}${String(newId).padStart(3, '0')}`;
      }
    }
});

Asset.belongsTo(Company, { foreignKey: 'companyId' });
Asset.belongsTo(AssetType, { foreignKey: 'assetTypeId' });
Asset.belongsTo(Floor, { foreignKey: 'floorId' });

module.exports = Asset;