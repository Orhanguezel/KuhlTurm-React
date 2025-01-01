const express = require('express');
const router = express.Router();
const {
    getAllSpareParts,
    createSparePart,
    updateSparePart,
    deleteSparePart,
} = require('../controllers/sparePartsController');

router.get('/', getAllSpareParts);
router.post('/', createSparePart);
router.put('/:id', updateSparePart);
router.delete('/:id', deleteSparePart);

module.exports = router;


