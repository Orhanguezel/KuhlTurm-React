const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const {
    getAllArticles,
    createArticle,
    updateArticle,
    deleteArticle
} = require('../controllers/articleController');

router.get('/', asyncHandler(getAllArticles));
router.post('/', asyncHandler(createArticle));
router.put('/:id', asyncHandler(updateArticle));
router.delete('/:id', asyncHandler(deleteArticle));

module.exports = router;

