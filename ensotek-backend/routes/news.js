const express = require('express');
const router = express.Router();
const {
    getAllNews,
    createNews,
    updateNews,
    deleteNews
} = require('../controllers/newsController');

// Haberler için rotalar
router.get('/', getAllNews); // Tüm haberler
router.post('/', createNews); // Yeni haber oluştur
router.put('/:id', updateNews); // Haberi güncelle
router.delete('/:id', deleteNews); // Haberi sil

module.exports = router;
