const Supplier = require('../models/Supplier');

// Get all suppliers
const getAllSuppliers = async(req, res) => {
    try {
        const suppliers = await Supplier.find().sort({ createdAt: -1 });
        res.render('suppliers/index', {
            title: 'Suppliers',
            suppliers: suppliers,
            message: req.flash('message')
        });
    } catch (error) {
        console.error(error);
        req.flash('error', 'Error fetching suppliers');
        res.redirect('/');
    }
};

// Show create supplier form
const showCreateForm = (req, res) => {
    res.render('suppliers/new', {
        title: 'Add New Supplier',
        supplier: {},
        errors: {}
    });
};

// Create new supplier
const createSupplier = async(req, res) => {
    try {
        const { name, address, phone } = req.body;

        const newSupplier = new Supplier({
            name,
            address,
            phone
        });

        await newSupplier.save();
        req.flash('success', 'Supplier created successfully');
        res.redirect('/suppliers');
    } catch (error) {
        console.error(error);
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
        req.flash('error', 'Error creating supplier');
        res.redirect('/suppliers');
    }
};

// Show supplier details
const showSupplier = async(req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);
        if (!supplier) {
            req.flash('error', 'Supplier not found');
            return res.redirect('/suppliers');
        }
        res.render('suppliers/show', {
            title: 'Supplier Details',
            supplier: supplier
        });
    } catch (error) {
        console.error(error);
        req.flash('error', 'Error fetching supplier');
        res.redirect('/suppliers');
    }
};

// Show edit supplier form
const showEditForm = async(req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);
        if (!supplier) {
            req.flash('error', 'Supplier not found');
            return res.redirect('/suppliers');
        }
        res.render('suppliers/edit', {
            title: 'Edit Supplier',
            supplier: supplier,
            errors: {}
        });
    } catch (error) {
        console.error(error);
        req.flash('error', 'Error fetching supplier');
        res.redirect('/suppliers');
    }
};

// Update supplier
const updateSupplier = async(req, res) => {
    try {
        const { name, address, phone } = req.body;

        const supplier = await Supplier.findByIdAndUpdate(
            req.params.id, { name, address, phone }, { new: true, runValidators: true }
        );

        if (!supplier) {
            req.flash('error', 'Supplier not found');
            return res.redirect('/suppliers');
        }

        req.flash('success', 'Supplier updated successfully');
        res.redirect('/suppliers/' + supplier._id);
    } catch (error) {
        console.error(error);
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
        req.flash('error', 'Error updating supplier');
        res.redirect('/suppliers');
    }
};

// Delete supplier
const deleteSupplier = async(req, res) => {
    try {
        const supplier = await Supplier.findByIdAndDelete(req.params.id);
        if (!supplier) {
            req.flash('error', 'Supplier not found');
            return res.redirect('/suppliers');
        }
        req.flash('success', 'Supplier deleted successfully');
        res.redirect('/suppliers');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Error deleting supplier');
        res.redirect('/suppliers');
    }
};

module.exports = {
    getAllSuppliers,
    showCreateForm,
    createSupplier,
    showSupplier,
    showEditForm,
    updateSupplier,
    deleteSupplier
};