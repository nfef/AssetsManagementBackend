const express = require('express');
const router = express.Router();
const Company = require('../models/Company');

// CRUD pour Company
router.get('/', async (req, res) => {
  const companies = await Company.findAll();
  res.json(companies);
});

router.post('/', async (req, res) => {
  const company = await Company.create(req.body);
  res.json(company);
});

router.get('/:id', async (req, res) => {
  const company = await Company.findByPk(req.params.id);
  res.json(company);
});

router.put('/:id', async (req, res) => {
  const company = await Company.findByPk(req.params.id);
  await company.update(req.body);
  res.json(company);
});

router.delete('/:id', async (req, res) => {
  const company = await Company.findByPk(req.params.id);
  await company.destroy();
  res.json({ message: 'Company deleted' });
});

module.exports = router;