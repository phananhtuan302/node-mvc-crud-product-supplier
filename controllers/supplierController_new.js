const Supplier = require('../models/Supplier');

// Get all suppliers
exports.getAllSuppliers = async(req, res) => {
    try {
        const suppliers = await Supplier.find().sort({ createdAt: -1 });
        res.render('suppliers/index', {
            title: 'Suppliers',
            suppliers: suppliers
        });
    } catch (error) {
        console.error('Error fetching suppliers:', error);
        res.status(500).render('500', {
            title: 'Server Error',
            error: 'Error fetching suppliers'
        });
    }
};

// Show create supplier form
exports.showCreateForm = (req, res) => {
    res.render('suppliers/new', {
        title: 'Add New Supplier',
        supplier: {},
        errors: {}
    });
};

// Create new supplier
exports.createSupplier = async(req, res) => {
    try {
        // Validate request
        if (!req.body) {
            return res.status(400).render('suppliers/new', {
                title: 'Add New Supplier',
                supplier: {},
                errors: { general: 'Content cannot be empty!' }
            });
        }

        const { name, address, phone } = req.body;

        const newSupplier = new Supplier({
            name,
            address,
            phone
        });

        await newSupplier.save();
        console.log(`${newSupplier.name} added to the database`);
        res.redirect('/suppliers');
    } catch (error) {
        console.error('Error creating supplier:', error);
        if (error.name === 'ValidationError') {
            const errors = {};
            Object.keys(error.errors).forEach(key => {
                errors[key] = error.errors[key].message;
            });
            return res.render('suppliers/new', {
                title: 'Add New Supplier',
                supplier: req.body,
                errors: errors
            });
        }
        res.status(500).render('500', {
            title: 'Server Error',
            error: 'Error creating supplier'
        });
    }
};

// Show supplier details
exports.showSupplier = async(req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);
        if (!supplier) {
            return res.status(404).render('404', { title: 'Supplier Not Found' });
        }
        res.render('suppliers/show', {
            title: 'Supplier Details',
            supplier: supplier
        });
    } catch (error) {
        console.error('Error fetching supplier:', error);
        res.status(500).render('500', {
            title: 'Server Error',
            error: 'Error fetching supplier'
        });
    }
};

// Show edit supplier form
exports.showEditForm = async(req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);
        if (!supplier) {
            return res.status(404).render('404', { title: 'Supplier Not Found' });
        }
        res.render('suppliers/edit', {
            title: 'Edit Supplier',
            supplier: supplier,
            errors: {}
        });
    } catch (error) {
        console.error('Error fetching supplier:', error);
        res.status(500).render('500', {
            title: 'Server Error',
            error: 'Error fetching supplier'
        });
    }
};

// Update supplier
exports.updateSupplier = async(req, res) => {
    try {
        if (!req.body) {
            return res.status(400).render('suppliers/edit', {
                title: 'Edit Supplier',
                supplier: { _id: req.params.id },
                errors: { general: 'Content cannot be empty!' }
            });
        }

        const { name, address, phone } = req.body;

        const supplier = await Supplier.findByIdAndUpdate(
            req.params.id, { name, address, phone }, { new: true, runValidators: true }
        );

        if (!supplier) {
            return res.status(404).render('404', { title: 'Supplier Not Found' });
        }

        console.log(`${supplier.name} updated in the database`);
        res.redirect('/suppliers/' + supplier._id);
    } catch (error) {
        console.error('Error updating supplier:', error);
        if (error.name === 'ValidationError') {
            const errors = {};
            Object.keys(error.errors).forEach(key => {
                errors[key] = error.errors[key].message;
            });
            const supplier = await Supplier.findById(req.params.id);
            return res.render('suppliers/edit', {
                title: 'Edit Supplier',
                supplier: {...supplier.toObject(), ...req.body },
                errors: errors
            });
        }
        res.status(500).render('500', {
            title: 'Server Error',
            error: 'Error updating supplier'
        });
    }
};

// Delete supplier
exports.deleteSupplier = async(req, res) => {
    try {
        const supplier = await Supplier.findByIdAndDelete(req.params.id);
        if (!supplier) {
            return res.status(404).render('404', { title: 'Supplier Not Found' });
        }
        console.log(`${supplier.name} deleted from the database`);
        res.redirect('/suppliers');
    } catch (error) {
        console.error('Error deleting supplier:', error);
        res.status(500).render('500', {
            title: 'Server Error',
            error: 'Error deleting supplier'
        });
    }
};