const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController_new');

// GET /products - List all products
router.get('/', productController.getAllProducts);

// GET /products/new - Show create product form
router.get('/new', productController.showCreateForm);

// POST /products - Create new product
router.post('/', productController.createProduct);

// GET /products/:id - Show product details
router.get('/:id', productController.showProduct);

// GET /products/:id/edit - Show edit product form
router.get('/:id/edit', productController.showEditForm);

// PUT /products/:id - Update product
router.put('/:id', productController.updateProduct);

// DELETE /products/:id - Delete product
router.delete('/:id', productController.deleteProduct);

module.exports = router;