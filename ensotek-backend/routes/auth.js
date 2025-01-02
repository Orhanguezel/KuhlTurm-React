const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const {
    login,
    register,
    updateProfileImage,
    deleteProfileImage,
    logout, // Logout fonksiyonu eklendi
    updateUser
} = require('../controllers/authController');
const authorize = require('../helpers/authorization');

router.post('/login', asyncHandler(login));
router.post('/register', asyncHandler(register));
router.post('/logout', authorize(['user', 'admin']), asyncHandler(logout)); // Logout rotası eklendi
router.put('/profile-image', authorize(['user', 'admin']), asyncHandler(updateProfileImage));
router.delete('/profile-image', authorize(['user', 'admin']), asyncHandler(deleteProfileImage));
router.put('/update-user', authorize(['admin']), asyncHandler(updateUser));


module.exports = router;



