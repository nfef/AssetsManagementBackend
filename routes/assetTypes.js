const express = require('express');
const router = express.Router();
const AssetType = require('../models/AssetType');

// CRUD pour AssetType
router.get('/', async (req, res) => {
  const assetTypes = await AssetType.findAll();
  res.json(assetTypes);
});

router.post('/', async (req, res) => {
  const assetType = await AssetType.create(req.body);
  res.json(assetType);
});

router.get('/:id', async (req, res) => {
  const assetType = await AssetType.findByPk(req.params.id);
  res.json(assetType);
});

router.put('/:id', async (req, res) => {
  const assetType = await AssetType.findByPk(req.params.id);
  await assetType.update(req.body);
  res.json(assetType);
});

router.delete('/:id', async (req, res) => {
  const assetType = await AssetType.findByPk(req.params.id);
  await assetType.destroy();
  res.json({ message: 'AssetType deleted' });
});

module.exports = router;