module.exports.isLoggedIn = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  req.flash('error', 'Bạn cần đăng nhập để thực hiện thao tác này');
  return res.redirect('/auth/login');
};
