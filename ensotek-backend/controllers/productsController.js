const connectDB = require('../config/db');
const ProductSchema = require('../models/Product');

let ProductModel;

const initProductModel = async () => {
    const db = await connectDB(process.env.PRODUCTS_DB);
    if (!ProductModel) {
        ProductModel = db.model('Product', ProductSchema);
    }
    return ProductModel;
};

// Tüm ürünleri getir
exports.getAllProducts = async (req, res) => {
    try {
        const Product = await initProductModel();
        const products = await Product.find();
        res.status(200).json({ success: true, data: products });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Yeni ürün oluştur
exports.createProduct = async (req, res) => {
    try {
        const Product = await initProductModel();
        const product = await Product.create(req.body);
        res.status(201).json({ success: true, data: product });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// Ürünü güncelle
exports.updateProduct = async (req, res) => {
    try {
        const Product = await initProductModel();
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!product) {
            return res.status(404).json({ success: false, message: 'Ürün bulunamadı' });
        }

        res.status(200).json({ success: true, data: product });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// Ürünü sil
exports.deleteProduct = async (req, res) => {
    try {
        const Product = await initProductModel();
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Ürün bulunamadı' });
        }

        res.status(200).json({ success: true, message: 'Ürün silindi' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
