const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const {
    getAllReferences,
    createReference,
    updateReference,
    deleteReference,
} = require('../controllers/referencesController');
const authorize = require('../helpers/authorization');

router.get('/', authorize(['user', 'admin']), asyncHandler(getAllReferences));
router.post('/', authorize(['admin']), asyncHandler(createReference));
router.put('/:id', authorize(['admin']), asyncHandler(updateReference));
router.delete('/:id', authorize(['admin']), asyncHandler(deleteReference));

module.exports = router;




