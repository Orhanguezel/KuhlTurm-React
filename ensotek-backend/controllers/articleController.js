// articleController.js
const connectDB = require('../config/db');
const ArticleSchema = require('../models/Article');

let Article;
const initArticleModel = async () => {
    const db = await connectDB(process.env.ARTICLES_DB);
    if (!Article) {
        Article = db.model('Article', ArticleSchema);
    }
    return Article;
};

exports.getAllArticles = async (req, res) => {
    try {
        const ArticleModel = await initArticleModel();
        const articles = await ArticleModel.find();
        console.log('Fetched Articles:', articles); // Verileri konsola yazdırın
        res.status(200).json({ success: true, data: articles });
    } catch (err) {
        console.error(err.message); // Hata mesajını yazdırın
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getArticleById = async (req, res) => {
    try {
        const ArticleModel = await initArticleModel();
        const article = await ArticleModel.findOne({ id: req.params.id });
        if (!article) {
            return res.status(404).json({ success: false, message: 'Makale bulunamadı' });
        }
        res.status(200).json({ success: true, data: article });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.createArticle = async (req, res) => {
    try {
        const ArticleModel = await initArticleModel();
        const { title, id, summary, content } = req.body;

        if (!title || !id || !summary || !content) {
            return res.status(400).json({ success: false, message: 'Tüm alanlar doldurulmalıdır: title, id, summary, content' });
        }

        const newArticle = await ArticleModel.create({ title, id, summary, content });
        res.status(201).json({ success: true, data: newArticle });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

exports.updateArticle = async (req, res) => {
    try {
        const ArticleModel = await initArticleModel();
        const updatedArticle = await ArticleModel.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedArticle) {
            return res.status(404).json({ success: false, message: 'Makale bulunamadı' });
        }
        res.status(200).json({ success: true, data: updatedArticle });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

exports.deleteArticle = async (req, res) => {
    try {
        const ArticleModel = await initArticleModel();
        const deletedArticle = await ArticleModel.findOneAndDelete({ id: req.params.id });
        if (!deletedArticle) {
            return res.status(404).json({ success: false, message: 'Makale bulunamadı' });
        }
        res.status(200).json({ success: true, message: 'Makale silindi', data: deletedArticle });
    } catch (err) {
        console.error('Delete Error:', err.message);
        res.status(500).json({ success: false, message: err.message });
    }
};

