const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

// Get all products
const getAllProducts = async(req, res) => {
    try {
        const products = await Product.find().populate('supplierId', 'name').sort({ createdAt: -1 });
        res.render('products/index', {
            title: 'Products',
            products: products,
            message: req.flash('message')
        });
    } catch (error) {
        console.error(error);
        req.flash('error', 'Error fetching products');
        res.redirect('/');
    }
};

// Show create product form
const showCreateForm = async(req, res) => {
    try {
        const suppliers = await Supplier.find().sort({ name: 1 });
        res.render('products/new', {
            title: 'Add New Product',
            product: {},
            suppliers: suppliers,
            errors: {}
        });
    } catch (error) {
        console.error(error);
        req.flash('error', 'Error loading suppliers');
        res.redirect('/products');
    }
};

// Create new product
const createProduct = async(req, res) => {
    try {
        const { name, price, quantity, supplierId } = req.body;

        const newProduct = new Product({
            name,
            price,
            quantity,
            supplierId
        });
        await newProduct.save();
        req.flash('success', 'Product created successfully');
        res.redirect('/products');
    } catch (error) {
        console.error(error);
        if (error.name === 'ValidationError') {
            const errors = {};
            Object.keys(error.errors).forEach(key => {
                errors[key] = error.errors[key].message;
            });
            const suppliers = await Supplier.find().sort({ name: 1 });
            return res.render('products/new', {
                title: 'Add New Product',
                product: req.body,
                suppliers: suppliers,
                errors: errors
            });
        }
        req.flash('error', 'Error creating product');
        res.redirect('/products');
    }
};

// Show product details
const showProduct = async(req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('supplierId', 'name address phone');
        if (!product) {
            req.flash('error', 'Product not found');
            return res.redirect('/products');
        }
        res.render('products/show', {
            title: 'Product Details',
            product: product
        });
    } catch (error) {
        console.error(error);
        req.flash('error', 'Error fetching product');
        res.redirect('/products');
    }
};

// Show edit product form
const showEditForm = async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        const suppliers = await Supplier.find().sort({ name: 1 });

        if (!product) {
            req.flash('error', 'Product not found');
            return res.redirect('/products');
        }

        res.render('products/edit', {
            title: 'Edit Product',
            product: product,
            suppliers: suppliers,
            errors: {}
        });
    } catch (error) {
        console.error(error);
        req.flash('error', 'Error fetching product');
        res.redirect('/products');
    }
};

// Update product
const updateProduct = async(req, res) => {
    try {
        const { name, price, quantity, supplierId } = req.body;

        const product = await Product.findByIdAndUpdate(
            req.params.id, { name, price, quantity, supplierId }, { new: true, runValidators: true }
        );

        if (!product) {
            req.flash('error', 'Product not found');
            return res.redirect('/products');
        }

        req.flash('success', 'Product updated successfully');
        res.redirect('/products/' + product._id);
    } catch (error) {
        console.error(error);
        if (error.name === 'ValidationError') {
            const errors = {};
            Object.keys(error.errors).forEach(key => {
                errors[key] = error.errors[key].message;
            });
            const product = await Product.findById(req.params.id);
            const suppliers = await Supplier.find().sort({ name: 1 });
            return res.render('products/edit', {
                title: 'Edit Product',
                product: {...product.toObject(), ...req.body },
                suppliers: suppliers,
                errors: errors
            });
        }
        req.flash('error', 'Error updating product');
        res.redirect('/products');
    }
};

// Delete product
const deleteProduct = async(req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            req.flash('error', 'Product not found');
            return res.redirect('/products');
        }
        req.flash('success', 'Product deleted successfully');
        res.redirect('/products');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Error deleting product');
        res.redirect('/products');
    }
};

module.exports = {
    getAllProducts,
    showCreateForm,
    createProduct,
    showProduct,
    showEditForm,
    updateProduct,
    deleteProduct
};