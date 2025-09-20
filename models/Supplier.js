const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Supplier name is required'],
        trim: true,
        maxLength: [100, 'Name cannot exceed 100 characters']
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
        trim: true,
        maxLength: [200, 'Address cannot exceed 200 characters']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true,
        match: [/^[\d\-\+\(\)\s]+$/, 'Please enter a valid phone number']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Supplier', supplierSchema);