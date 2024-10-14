const express = require('express');
const router = express.Router();
const Asset = require('../models/Asset');
const PDFDocument = require('pdfkit');
const bwipjs = require('@bwip-js/node');

// CRUD pour Asset
router.get('/', async (req, res) => {
  const assets = await Asset.findAll();
  res.json(assets);
});

router.post('/', async (req, res) => {
  const asset = await Asset.create(req.body);
  res.json(asset);
});

router.get('/:id', async (req, res) => {
  const asset = await Asset.findByPk(req.params.id);
  res.json(asset);
});

router.put('/:id', async (req, res) => {
  const asset = await Asset.findByPk(req.params.id);
  await asset.update(req.body);
  res.json(asset);
});

router.delete('/:id', async (req, res) => {
  const asset = await Asset.findByPk(req.params.id);
  await asset.destroy();
  res.json({ message: 'Asset deleted' });
});

// Route pour générer et télécharger le PDF
router.get('/download/barcodes', async (req, res) => {
  const assets = await Asset.findAll();

  const doc = new PDFDocument();
  let filename = 'barcodes.pdf';
  filename = encodeURIComponent(filename);
  res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
  res.setHeader('Content-type', 'application/pdf');

  doc.pipe(res);

  for (const asset of assets) {
    const barcodeBuffer = await bwipjs.toBuffer({
      bcid: 'code128',       // Barcode type
      text: asset.barcode,   // Text to encode
      scale: 3,              // 3x scaling factor
      height: 10,            // Bar height, in millimeters
      includetext: true,     // Show human-readable text
      textxalign: 'center',  // Always good to set this
    });
    doc.addPage();
    doc.image(barcodeBuffer, {
      fit: [250, 100],
      align: 'center',
      valign: 'center'
    });
    // doc.moveDown(2);
  }

  doc.end();
});

module.exports = router;