const connectDB = require('../config/db');
const ReferenceSchema = require('../models/Reference');
const asyncHandler = require('express-async-handler');

let ReferenceModel;

const initReferenceModel = async () => {
    const db = await connectDB(process.env.REFERENCES_DB); // Dinamik bağlantı
    if (!ReferenceModel) {
        ReferenceModel = db.model('Reference', ReferenceSchema); // Model oluştur
    }
    return ReferenceModel;
};

// Tüm referansları getir
exports.getAllReferences = asyncHandler(async (req, res) => {
    const Reference = await initReferenceModel();
    const references = await Reference.find();
    res.status(200).json({ success: true, data: references });
});

// Yeni referans oluştur
exports.createReference = asyncHandler(async (req, res) => {
    const Reference = await initReferenceModel();
    const reference = await Reference.create(req.body);
    res.status(201).json({ success: true, data: reference });
});

// Referansı güncelle
exports.updateReference = asyncHandler(async (req, res) => {
    const Reference = await initReferenceModel();
    const reference = await Reference.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!reference) {
        return res.status(404).json({ success: false, message: 'Referans bulunamadı' });
    }

    res.status(200).json({ success: true, data: reference });
});

// Referansı sil
exports.deleteReference = asyncHandler(async (req, res) => {
    const Reference = await initReferenceModel();
    const reference = await Reference.findByIdAndDelete(req.params.id);

    if (!reference) {
        return res.status(404).json({ success: false, message: 'Referans bulunamadı' });
    }

    res.status(200).json({ success: true, message: 'Referans silindi' });
});
