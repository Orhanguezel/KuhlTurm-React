const connectDB = require('../config/db');
const ReferenceSchema = require('../models/Reference');

let ReferenceModel;

const initReferenceModel = async () => {
    const db = await connectDB(process.env.REFERENCES_DB); // Dinamik bağlantı
    if (!ReferenceModel) {
        ReferenceModel = db.model('Reference', ReferenceSchema); // Model oluştur
    }
    return ReferenceModel;
};

// Tüm referansları getir
exports.getAllReferences = async (req, res) => {
    try {
        const Reference = await initReferenceModel();
        const references = await Reference.find();
        res.status(200).json({ success: true, data: references });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Yeni referans oluştur
exports.createReference = async (req, res) => {
    try {
        const Reference = await initReferenceModel();
        const reference = await Reference.create(req.body);
        res.status(201).json({ success: true, data: reference });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// Referansı güncelle
exports.updateReference = async (req, res) => {
    try {
        const Reference = await initReferenceModel();
        const reference = await Reference.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!reference) {
            return res.status(404).json({ success: false, message: 'Referans bulunamadı' });
        }

        res.status(200).json({ success: true, data: reference });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// Referansı sil
exports.deleteReference = async (req, res) => {
    try {
        const Reference = await initReferenceModel();
        const reference = await Reference.findByIdAndDelete(req.params.id);

        if (!reference) {
            return res.status(404).json({ success: false, message: 'Referans bulunamadı' });
        }

        res.status(200).json({ success: true, message: 'Referans silindi' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
