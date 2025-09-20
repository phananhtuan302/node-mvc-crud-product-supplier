const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

// Get all products
exports.getAllProducts = async(req, res) => {
    try {
        const products = await Product.find().populate('supplierId', 'name').sort({ createdAt: -1 });
        res.render('products/index', {
            title: 'Products',
            products: products
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).render('500', {
            title: 'Server Error',
            error: 'Error fetching products'
        });
    }
};

// Show create product form
exports.showCreateForm = async(req, res) => {
    try {
        const suppliers = await Supplier.find().sort({ name: 1 });
        res.render('products/new', {
            title: 'Add New Product',
            product: {},
            suppliers: suppliers,
            errors: {}
        });
    } catch (error) {
        console.error('Error loading suppliers:', error);
        res.status(500).render('500', {
            title: 'Server Error',
            error: 'Error loading suppliers'
        });
    }
};

// Create new product
exports.createProduct = async(req, res) => {
    try {
        // Validate request
        if (!req.body) {
            const suppliers = await Supplier.find().sort({ name: 1 });
            return res.status(400).render('products/new', {
                title: 'Add New Product',
                product: {},
                suppliers: suppliers,
                errors: { general: 'Content cannot be empty!' }
            });
        }

        const { name, price, quantity, supplierId } = req.body;

        const newProduct = new Product({
            name,
            price,
            quantity,
            supplierId
        });

        await newProduct.save();
        console.log(`${newProduct.name} added to the database`);
        res.redirect('/products');
    } catch (error) {
        console.error('Error creating product:', error);
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
        res.status(500).render('500', {
            title: 'Server Error',
            error: 'Error creating product'
        });
    }
};

// Show product details
exports.showProduct = async(req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('supplierId', 'name address phone');
        if (!product) {
            return res.status(404).render('404', { title: 'Product Not Found' });
        }
        res.render('products/show', {
            title: 'Product Details',
            product: product
        });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).render('500', {
            title: 'Server Error',
            error: 'Error fetching product'
        });
    }
};

// Show edit product form
exports.showEditForm = async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        const suppliers = await Supplier.find().sort({ name: 1 });

        if (!product) {
            return res.status(404).render('404', { title: 'Product Not Found' });
        }

        res.render('products/edit', {
            title: 'Edit Product',
            product: product,
            suppliers: suppliers,
            errors: {}
        });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).render('500', {
            title: 'Server Error',
            error: 'Error fetching product'
        });
    }
};

// Update product
exports.updateProduct = async(req, res) => {
    try {
        if (!req.body) {
            const suppliers = await Supplier.find().sort({ name: 1 });
            return res.status(400).render('products/edit', {
                title: 'Edit Product',
                product: { _id: req.params.id },
                suppliers: suppliers,
                errors: { general: 'Content cannot be empty!' }
            });
        }

        const { name, price, quantity, supplierId } = req.body;

        const product = await Product.findByIdAndUpdate(
            req.params.id, { name, price, quantity, supplierId }, { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).render('404', { title: 'Product Not Found' });
        }

        console.log(`${product.name} updated in the database`);
        res.redirect('/products/' + product._id);
    } catch (error) {
        console.error('Error updating product:', error);
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
        res.status(500).render('500', {
            title: 'Server Error',
            error: 'Error updating product'
        });
    }
};

// Delete product
exports.deleteProduct = async(req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).render('404', { title: 'Product Not Found' });
        }
        console.log(`${product.name} deleted from the database`);
        res.redirect('/products');
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).render('500', {
            title: 'Server Error',
            error: 'Error deleting product'
        });
    }
};