const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('woodtime_scanner', 'woodtime_website', 'nfefETadmin91', {
  host: '65.108.123.218',
  dialect: 'mysql',
});

module.exports = sequelize;