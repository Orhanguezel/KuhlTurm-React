const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const {
    getAllArticles,
    createArticle,
    updateArticle,
    deleteArticle,
} = require('../controllers/articleController');
const authorize = require('../helpers/authorization');

router.get('/', authorize(['user', 'admin']), asyncHandler(getAllArticles));
router.post('/', authorize(['admin']), asyncHandler(createArticle));
router.put('/:id', authorize(['admin']), asyncHandler(updateArticle));
router.delete('/:id', authorize(['admin']), asyncHandler(deleteArticle));

module.exports = router;



