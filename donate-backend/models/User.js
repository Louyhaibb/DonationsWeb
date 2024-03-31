const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6,
    },
    role: {
        type: String,
        enum: ['admin', 'donator', 'needy'],
        required: true,
    },
    age: {
        type: Number,
        required: false,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', ''],
        default: '',
    },
    children: {
        type: String,
        enum: ['Yes', 'No', ''],
        default: '',
    },
    married: {
        type: String,
        enum: ['Yes', 'No', ''],
        default: '',
    },
    city: {
        type: String,
        required: false,
    },
    shirtSize: {
        type: String,
        required: false,
    },
    bottomSize: {
        type: String,
        required: false,
    },
    shoeSize: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        enum: ['pending', 'active', 'declined', 'deleted', ''],
        default: '',
    },
    city: {
        type: String,
        required: false,
    },
    lastLogin: {
        type: Date,
    },
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    },
});

module.exports = mongoose.model('User', userSchema);
