const express = require('express');
const router = express.Router();
const {
    login,
    register,
    updateProfileImage,
    deleteProfileImage,
} = require('../controllers/authController');

router.post('/login', login); // login fonksiyonu authController'da tanımlı olmalı
router.post('/register', register); // register fonksiyonu authController'da tanımlı olmalı
router.put('/profile-image', updateProfileImage); // updateProfileImage fonksiyonu tanımlı olmalı
router.delete('/profile-image', deleteProfileImage); // deleteProfileImage fonksiyonu tanımlı olmalı

module.exports = router;



