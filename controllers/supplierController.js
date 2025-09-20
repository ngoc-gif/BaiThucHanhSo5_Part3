const Supplier = require('../models/Supplier');

exports.index = async (req, res) => {
  const suppliers = await Supplier.find({});
  res.render('suppliers/index', { suppliers });
};

exports.showForm = (req, res) => {
  res.render('suppliers/form', { supplier: {} });
};

exports.create = async (req, res) => {
  await Supplier.create(req.body);
  req.flash('success', 'Tạo nhà cung cấp thành công');
  res.redirect('/suppliers');
};

exports.editForm = async (req, res) => {
  const supplier = await Supplier.findById(req.params.id);
  if (!supplier) return res.redirect('/suppliers');
  res.render('suppliers/form', { supplier });
};

exports.update = async (req, res) => {
  await Supplier.findByIdAndUpdate(req.params.id, req.body);
  req.flash('success', 'Cập nhật thành công');
  res.redirect('/suppliers');
};

exports.remove = async (req, res) => {
  await Supplier.findByIdAndDelete(req.params.id);
  req.flash('success', 'Xóa thành công');
  res.redirect('/suppliers');
};
