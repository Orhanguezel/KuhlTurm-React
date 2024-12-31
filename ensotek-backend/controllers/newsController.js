const News = require('../models/News');

// Tüm haberleri getir
exports.getAllNews = async (req, res) => {
    try {
        const news = await News.find();
        res.status(200).json({ success: true, data: news });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Yeni bir haber oluştur
exports.createNews = async (req, res) => {
    try {
        const news = await News.create(req.body);
        res.status(201).json({ success: true, data: news });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// Haberi güncelle
exports.updateNews = async (req, res) => {
    try {
        const news = await News.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!news) {
            return res.status(404).json({ success: false, message: 'Haber bulunamadı' });
        }
        res.status(200).json({ success: true, data: news });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// Haberi sil
exports.deleteNews = async (req, res) => {
    try {
        const news = await News.findByIdAndDelete(req.params.id);
        if (!news) {
            return res.status(404).json({ success: false, message: 'Haber bulunamadı' });
        }
        res.status(200).json({ success: true, message: 'Haber silindi' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
