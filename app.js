require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const authRouter = require('./routes/auth');
const indexRouter = require('./routes/index');
const suppliersRouter = require('./routes/suppliers');
const productsRouter = require('./routes/products');
const expressLayouts = require('express-ejs-layouts');

const app = express();

// Connect DB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connect error', err));

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layout'); // dùng file layout.ejs làm layout mặc định

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(flash());
app.use(expressLayouts);

// Sessions
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI })
}));

// make user available in views
app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.q = req.query.q || '';   
  next();
});

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: { title: "Supplier-Product API", version: "1.0.0" }
  },
  apis: ['./routes/*.js', './models/*.js']
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/suppliers', suppliersRouter);
app.use('/products', productsRouter);

// 404
app.use((req, res) => res.status(404).render('404'));

// Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
