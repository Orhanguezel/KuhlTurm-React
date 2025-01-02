const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/productsController');
const authorize = require('../helpers/authorization');

// Ürün rotaları
router.get('/', authorize(['user', 'admin']), asyncHandler(getAllProducts));
router.post('/', authorize(['admin']), asyncHandler(createProduct));
router.put('/:id', authorize(['admin']), asyncHandler(updateProduct));
router.delete('/:id', authorize(['admin']), asyncHandler(deleteProduct));

module.exports = router;




