const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const {
    getAllSpareParts,
    createSparePart,
    updateSparePart,
    deleteSparePart,
} = require('../controllers/sparePartsController');

router.get('/', asyncHandler(getAllSpareParts));
router.post('/', asyncHandler(createSparePart));
router.put('/:id', asyncHandler(updateSparePart));
router.delete('/:id', asyncHandler(deleteSparePart));

module.exports = router;


