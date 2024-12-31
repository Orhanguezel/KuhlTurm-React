// controllers/sparePartsController.js

const SparePart = require('../models/SparePart');

// Tüm yedek malzemeleri getirme
exports.getAllSpareParts = async (req, res) => {
    try {
        const spareParts = await SparePart.find();
        res.status(200).json({ success: true, data: spareParts });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Yeni yedek malzeme oluşturma
exports.createSparePart = async (req, res) => {
    try {
        const sparePart = await SparePart.create(req.body);
        res.status(201).json({ success: true, data: sparePart });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// Yedek malzeme güncelleme
exports.updateSparePart = async (req, res) => {
    try {
        const sparePart = await SparePart.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!sparePart) {
            return res.status(404).json({ success: false, message: "Yedek malzeme bulunamadı" });
        }

        res.status(200).json({ success: true, data: sparePart });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// Yedek malzeme silme
exports.deleteSparePart = async (req, res) => {
    try {
        const sparePart = await SparePart.findByIdAndDelete(req.params.id);

        if (!sparePart) {
            return res.status(404).json({ success: false, message: "Yedek malzeme bulunamadı" });
        }

        res.status(200).json({ success: true, message: "Yedek malzeme silindi" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
