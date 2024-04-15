const mongoose = require('mongoose');

const itemRequestSchema = new mongoose.Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true,
    },
    status: {
        type: String,
        enum: ['request', 'approved', 'declined'],
        default: 'request',
    },
    requestBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    },
});

module.exports = mongoose.model('ItemRequest', itemRequestSchema);
