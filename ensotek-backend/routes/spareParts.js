const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const {
    getAllSpareParts,
    createSparePart,
    updateSparePart,
    deleteSparePart,
} = require('../controllers/sparePartsController');
const authorize = require('../helpers/authorization');

// Yedek parça rotaları
router.get('/', authorize(['user', 'admin']), asyncHandler(getAllSpareParts));
router.post('/', authorize(['admin']), asyncHandler(createSparePart));
router.put('/:id', authorize(['admin']), asyncHandler(updateSparePart));
router.delete('/:id', authorize(['admin']), asyncHandler(deleteSparePart));

module.exports = router;




