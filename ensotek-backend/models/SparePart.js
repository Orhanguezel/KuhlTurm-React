const mongoose = require('mongoose');

const sparePartSchema = new mongoose.Schema({
    name: { type: String, required: true },
    partNumber: { type: String, required: true },
    description: { type: String },
    stock: { type: Number, required: true },
    price: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SparePart', sparePartSchema);
