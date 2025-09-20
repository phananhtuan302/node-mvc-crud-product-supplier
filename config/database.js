const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_STR || 'mongodb://127.0.0.1:27017/mvc_crud');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        console.log(`Database: ${conn.connection.name}`);
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;