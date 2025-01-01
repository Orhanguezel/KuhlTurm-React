const connectDB = require('../config/db');
const newsSchema = require('../models/News');

let News; // Model için değişken tanımlandı.

const initNewsModel = async () => {
    const db = await connectDB(process.env.NEWS_DB); // Doğru veritabanını bağla.
    if (!News) {
        News = db.model('News', newsSchema); // Schema'yı kullanarak model oluştur.
    }
    return News;
};

// Tüm haberleri getir
exports.getAllNews = async (req, res) => {
    try {
        const NewsModel = await initNewsModel();
        const news = await NewsModel.find();
        res.status(200).json({ success: true, data: news });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Yeni bir haber oluştur
exports.createNews = async (req, res) => {
    try {
        const NewsModel = await initNewsModel();
        const news = await NewsModel.create(req.body);
        res.status(201).json({ success: true, data: news });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// Haberi güncelle
exports.updateNews = async (req, res) => {
    try {
        const NewsModel = await initNewsModel();
        const news = await NewsModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
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
        const NewsModel = await initNewsModel();
        const news = await NewsModel.findByIdAndDelete(req.params.id);
        if (!news) {
            return res.status(404).json({ success: false, message: 'Haber bulunamadı' });
        }
        res.status(200).json({ success: true, message: 'Haber silindi' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
