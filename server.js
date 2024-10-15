const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const Company = require('./models/Company');
const AssetType = require('./models/AssetType');
const Asset = require('./models/Asset');
const Floor = require('./models/Floor');
const Inventory = require('./models/Inventory');
const InventoryItem = require('./models/InventoryItem');

const app = express();

// Middlewares
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(bodyParser.json());

// Routes
app.use('/api/companies', require('./routes/companies'));
app.use('/api/assetTypes', require('./routes/assetTypes'));
app.use('/api/assets', require('./routes/assets'));
app.use('/api/floors', require('./routes/floors'));
app.use('/api/inventories', require('./routes/inventories'));

// Synchroniser les modèles et démarrer le serveur
sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log('Serveur démarré sur le port 3001');
  });
});