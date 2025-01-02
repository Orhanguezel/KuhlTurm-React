const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const {
    getAllReferences,
    createReference,
    updateReference,
    deleteReference,
} = require('../controllers/referencesController');

router.get('/', asyncHandler(getAllReferences));
router.post('/', asyncHandler(createReference));
router.put('/:id', asyncHandler(updateReference));
router.delete('/:id', asyncHandler(deleteReference));

module.exports = router;



