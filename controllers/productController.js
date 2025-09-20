const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

exports.index = async (req, res) => {
  const suppliers = await Supplier.find({});
  const { supplierId, q } = req.query;
  let filter = {};
  if (supplierId) filter.supplier = supplierId;
  if (q) filter.name = { $regex: q, $options: 'i' };
  const products = await Product.find(filter).populate('supplier');
  res.render('products/index', { products, suppliers, q });
};

exports.showForm = async (req, res) => {
  const suppliers = await Supplier.find({});
  let product = {};
  if (req.params.id) product = await Product.findById(req.params.id);
  res.render('products/form', { product, suppliers });
};

exports.create = async (req, res) => {
  const { name, price, quantity, supplier } = req.body;
  const refCode = 'P-' + Date.now();
  await Product.create({ name, price, quantity, supplier, refCode });
  req.flash('success', 'Tạo sản phẩm thành công');
  res.redirect('/products');
};

exports.update = async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, req.body);
  req.flash('success', 'Cập nhật sản phẩm thành công');
  res.redirect('/products');
};

exports.remove = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  req.flash('success', 'Xóa sản phẩm thành công');
  res.redirect('/products');
};
