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
        enum: ['New', 'Like New', 'Used', 'Bad Condition'],
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
        enum: ['approved', 'deleted', 'donating'],
        default: 'donating',
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
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    },
});

module.exports = mongoose.model('Item', itemSchema);
