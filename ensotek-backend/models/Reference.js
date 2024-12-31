const mongoose = require('mongoose');

const referenceSchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    projectDescription: { type: String },
    contactPerson: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reference', referenceSchema);

