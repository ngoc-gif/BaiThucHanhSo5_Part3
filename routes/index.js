const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

router.get('/', async (req, res) => {
  const suppliers = await Supplier.find({});
  // show a listing with optional filter
  const { supplierId, q } = req.query;
  let filter = {};
  if (supplierId) filter.supplier = supplierId;
  if (q) filter.name = { $regex: q, $options: 'i' };
  const products = await Product.find(filter).populate('supplier');
  res.render('index', { products, suppliers, q });
});

module.exports = router;
