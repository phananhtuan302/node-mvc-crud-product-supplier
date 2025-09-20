const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const morgan = require('morgan');
require('dotenv').config();

const connectDB = require('./config/database');

// Import routes
const indexRoutes = require('./routes/index');
const supplierRoutes = require('./routes/suppliers');
const productRoutes = require('./routes/products');

const app = express();

// Connect to MongoDB
connectDB();

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(morgan('tiny'));

// Routes
app.use('/', indexRoutes);
app.use('/suppliers', supplierRoutes);
app.use('/products', productRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).render('404', { title: 'Page Not Found' });
});

// Error handler
app.use((error, req, res, next) => {
    console.error('Error:', error);
    res.status(500).render('500', {
        title: 'Server Error',
        error: error.message
    });
});

const PORT = process.env.PORT || 3100;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Welcome to Supplier & Product Management at http://localhost:${PORT}`);
});