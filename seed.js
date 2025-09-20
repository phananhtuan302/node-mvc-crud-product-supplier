const mongoose = require('mongoose');
const Supplier = require('./models/Supplier');
const Product = require('./models/Product');
require('dotenv').config();

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_STR || 'mongodb://127.0.0.1:27017/mvc_crud');
        console.log('MongoDB Connected for seeding...');
        console.log(`Database: ${mongoose.connection.name}`);
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};

const seedData = async() => {
    try {
        // Clear existing data
        await Supplier.deleteMany({});
        await Product.deleteMany({});
        console.log('Existing data cleared...');

        // Create suppliers
        const suppliers = await Supplier.create([{
                name: 'Tech Solutions Inc.',
                address: '123 Tech Street, Silicon Valley, CA 94105',
                phone: '+1-555-123-4567'
            },
            {
                name: 'Global Electronics',
                address: '456 Electronics Blvd, New York, NY 10001',
                phone: '+1-555-987-6543'
            },
            {
                name: 'Innovation Corp',
                address: '789 Innovation Ave, Austin, TX 73301',
                phone: '+1-555-456-7890'
            }
        ]);

        console.log('Suppliers created:', suppliers.length);

        // Create products
        const products = await Product.create([{
                name: 'Laptop Pro 15"',
                price: 1299.99,
                quantity: 50,
                supplierId: suppliers[0]._id
            },
            {
                name: 'Smartphone X',
                price: 899.99,
                quantity: 30,
                supplierId: suppliers[1]._id
            },
            {
                name: 'Wireless Headphones',
                price: 299.99,
                quantity: 75,
                supplierId: suppliers[0]._id
            },
            {
                name: 'Gaming Monitor',
                price: 599.99,
                quantity: 25,
                supplierId: suppliers[1]._id
            },
            {
                name: 'Smart Watch',
                price: 399.99,
                quantity: 40,
                supplierId: suppliers[2]._id
            }
        ]);

        console.log('Products created:', products.length);
        console.log('Sample data seeded successfully!');

    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        mongoose.connection.close();
    }
};

const runSeed = async() => {
    await connectDB();
    await seedData();
};

// Run seeding if this file is executed directly
if (require.main === module) {
    runSeed();
}

module.exports = { seedData };