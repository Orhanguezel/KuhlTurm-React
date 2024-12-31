const Product = require('../models/Product');

// Tüm ürünleri getir
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ success: true, data: products });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Yeni ürün oluştur
exports.createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({ success: true, data: product });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// Ürün güncelle
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Güncellenmiş veriyi döndür
            runValidators: true, // Validation çalıştır
        });

        if (!product) {
            return res.status(404).json({ success: false, message: "Ürün bulunamadı" });
        }

        res.status(200).json({ success: true, data: product });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};


// Ürün sil
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ success: false, message: 'Ürün bulunamadı' });
        res.status(200).json({ success: true, message: 'Ürün silindi' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

