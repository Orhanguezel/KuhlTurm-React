const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const {
    getAllNews,
    createNews,
    updateNews,
    deleteNews
} = require('../controllers/newsController');

// Haberler için rotalar
router.get('/', asyncHandler(getAllNews));
router.post('/', asyncHandler(createNews));
router.put('/:id', asyncHandler(updateNews));
router.delete('/:id', asyncHandler(deleteNews));

module.exports = router;
