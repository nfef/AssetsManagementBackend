const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('../config/database');
const Company = require('../models/Company');
const AssetType = require('../models/AssetType');
const Asset = require('../models/Asset');
const Floor = require('../models/Floor');

const app = express();

// Middlewares
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(bodyParser.json());

// Routes
app.use('/api/companies', require('../routes/companies'));
app.use('/api/assetTypes', require('../routes/assetTypes'));
app.use('/api/assets', require('../routes/assets'));
app.use('/api/floors', require('../routes/floors'));

// Synchroniser les modèles et démarrer le serveur
sequelize.sync().then(() => {
  console.log('Base de données synchronisée');
});

exports.app = functions.https.onRequest(app);