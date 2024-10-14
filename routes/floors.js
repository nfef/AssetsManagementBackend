const express = require('express');
const router = express.Router();
const Floor = require('../models/Floor');

// CRUD pour Floor
router.get('/', async (req, res) => {
  const floors = await Floor.findAll();
  res.json(floors);
});

router.post('/', async (req, res) => {
  const floor = await Floor.create(req.body);
  res.json(floor);
});

router.get('/:id', async (req, res) => {
  const floor = await Floor.findByPk(req.params.id);
  res.json(floor);
});

router.put('/:id', async (req, res) => {
  const floor = await Floor.findByPk(req.params.id);
  await floor.update(req.body);
  res.json(floor);
});

router.delete('/:id', async (req, res) => {
  const floor = await Floor.findByPk(req.params.id);
  await floor.destroy();
  res.json({ message: 'Floor deleted' });
});

module.exports = router;