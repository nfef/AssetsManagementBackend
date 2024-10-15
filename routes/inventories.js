const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory');
const InventoryItem = require('../models/InventoryItem');
const Asset = require('../models/Asset');

// CRUD pour Inventory
router.get('/', async (req, res) => {
  const inventories = await Inventory.findAll();
  res.json(inventories);
});

router.post('/', async (req, res) => {
  const inventory = await Inventory.create();
  res.json(inventory);
});

router.get('/:id', async (req, res) => {
  const inventory = await Inventory.findByPk(req.params.id, {
    include: [InventoryItem]
  });
  res.json(inventory);
});

router.post('/:id/items', async (req, res) => {
  const { barcode } = req.body;
  const inventoryId = req.params.id;

  // Trouver l'asset par son code barre
  const asset = await Asset.findOne({ where: { barcode } });
  if (!asset) {
    return res.status(404).json({ message: 'Asset not found' });
  }

  // Créer un item d'inventaire
  const inventoryItem = await InventoryItem.create({ inventoryId, assetId: asset.id });
  res.json(inventoryItem);
});

module.exports = router;