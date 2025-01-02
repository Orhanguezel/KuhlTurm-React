const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const {
    getAllNews,
    createNews,
    updateNews,
    deleteNews,
} = require('../controllers/newsController');
const authorize = require('../helpers/authorization');

// Haber rotaları
router.get('/', authorize(['user', 'admin']), asyncHandler(getAllNews));
router.post('/', authorize(['admin']), asyncHandler(createNews));
router.put('/:id', authorize(['admin']), asyncHandler(updateNews));
router.delete('/:id', authorize(['admin']), asyncHandler(deleteNews));

module.exports = router;


