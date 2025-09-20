const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController_new');

// GET /suppliers - List all suppliers
router.get('/', supplierController.getAllSuppliers);

// GET /suppliers/new - Show create supplier form
router.get('/new', supplierController.showCreateForm);

// POST /suppliers - Create new supplier
router.post('/', supplierController.createSupplier);

// GET /suppliers/:id - Show supplier details
router.get('/:id', supplierController.showSupplier);

// GET /suppliers/:id/edit - Show edit supplier form
router.get('/:id/edit', supplierController.showEditForm);

// PUT /suppliers/:id - Update supplier
router.put('/:id', supplierController.updateSupplier);

// DELETE /suppliers/:id - Delete supplier
router.delete('/:id', supplierController.deleteSupplier);

module.exports = router;