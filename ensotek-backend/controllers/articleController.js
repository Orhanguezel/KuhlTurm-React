const Article = require('../models/Article');

exports.getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find();
        res.status(200).json({ success: true, data: articles });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.createArticle = async (req, res) => {
    try {
        const article = await Article.create(req.body);
        res.status(201).json({ success: true, data: article });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

exports.updateArticle = async (req, res) => {
    try {
        const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!article) {
            return res.status(404).json({ success: false, message: "Makale bulunamadı" });
        }

        res.status(200).json({ success: true, data: article });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

exports.deleteArticle = async (req, res) => {
    try {
        const article = await Article.findByIdAndDelete(req.params.id);

        if (!article) {
            return res.status(404).json({ success: false, message: "Makale bulunamadı" });
        }

        res.status(200).json({ success: true, message: "Makale silindi" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
