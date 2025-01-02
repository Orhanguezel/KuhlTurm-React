const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/productsController');

router.get('/', asyncHandler(getAllProducts));
router.post('/', asyncHandler(createProduct));
router.put('/:id', asyncHandler(updateProduct));
router.delete('/:id', asyncHandler(deleteProduct));

module.exports = router;


