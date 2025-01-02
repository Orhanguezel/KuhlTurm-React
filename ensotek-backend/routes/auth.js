const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const {
    login,
    register,
    updateProfileImage,
    deleteProfileImage,
} = require('../controllers/authController');

router.post('/login', asyncHandler(login));
router.post('/register', asyncHandler(register));
router.put('/profile-image', asyncHandler(updateProfileImage));
router.delete('/profile-image', asyncHandler(deleteProfileImage));

module.exports = router;



