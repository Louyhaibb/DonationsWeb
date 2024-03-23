const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    condition: {
        type: String,
        enum: ['New', 'Like New', 'Used', 'Bad Condtion'],
        required: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Unisex'],
        required: true,
    },
    size: {
        type: String,
        required: false,
    },
    color: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        default: '',
    },
    status: {
        type: String,
        enum: ['request', 'approved', 'declined', 'deleted', ''],
        default: '',
    },
    createBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    requestBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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

module.exports = mongoose.model('Item', itemSchema);
