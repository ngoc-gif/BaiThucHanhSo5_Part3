const User = require('../models/User');

exports.showRegister = (req, res) => res.render('register');
exports.showLogin = (req, res) => res.render('login');
exports.showForgot = (req, res) => res.render('forgot');

exports.register = async (req, res) => {
  try {
    const { username, password, email, phone } = req.body;
    const user = new User({ username, password, email, phone });
    await user.save();
    req.flash('success', 'Đăng ký thành công, hãy đăng nhập.');
    res.redirect('/auth/login');
  } catch (err) {
    req.flash('error', 'Lỗi khi đăng ký: ' + (err.message || err));
    res.redirect('/auth/register');
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      req.flash('error', 'Sai username hoặc mật khẩu');
      return res.redirect('/auth/login');
    }
    const match = await user.comparePassword(password);
    if (!match) {
      req.flash('error', 'Sai username hoặc mật khẩu');
      return res.redirect('/auth/login');
    }
    // set session
    req.session.user = { id: user._id, username: user.username, email: user.email };
    req.flash('success', 'Đăng nhập thành công');
    res.redirect('/');
  } catch (err) {
    req.flash('error', 'Lỗi đăng nhập');
    res.redirect('/auth/login');
  }
};

exports.logout = (req, res) => {
  req.session.destroy(err => {
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
};

// For forgot password - very simple placeholder (production: send email + reset token)
exports.forgot = (req, res) => {
  req.flash('success', 'Yêu cầu khôi phục mật khẩu đã được gửi (demo).');
  res.redirect('/auth/login');
};
