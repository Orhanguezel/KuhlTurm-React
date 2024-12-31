const express = require('express');
const router = express.Router();
const {
    getAllArticles,
    createArticle,
    updateArticle,
    deleteArticle
} = require('../controllers/articleController');

router.get('/', getAllArticles);
router.post('/', createArticle);
router.put('/:id', updateArticle);
router.delete('/:id', deleteArticle);

module.exports = router;
