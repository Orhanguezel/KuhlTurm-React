const connectDB = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userSchema = require('../models/User');
const asyncHandler = require('express-async-handler');

// JWT token'ı cookie'ye yazan yardımcı fonksiyon
const setTokenCookie = (res, token, maxAge = 24 * 60 * 60 * 1000) => {
    res.cookie('token', token, {
        httpOnly: true, // XSS koruması
        secure: process.env.NODE_ENV === 'production', // HTTPS altında secure cookie
        maxAge, // Belirtilen süre kadar geçerli
        sameSite: 'strict', // CSRF koruması
    });
};

// Kullanıcı kayıt işlemi
exports.register = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    const db = await connectDB(process.env.AUTH_DB);
    const User = db.models.User || db.model('User', userSchema);

    const user = await User.create({ username, email, password });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Token'ı cookie'ye ekleyin
    setTokenCookie(res, token);

    res.status(201).json({ success: true, data: { token, user } });
});

// Kullanıcı giriş işlemi
exports.login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const db = await connectDB(process.env.AUTH_DB);
    const User = db.model('User', userSchema);

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ success: false, message: 'Geçersiz email veya şifre' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ success: false, message: 'Geçersiz email veya şifre' });
    }

    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Token'ı cookie'ye ekleyin
    setTokenCookie(res, token, 60 * 60 * 1000); // 1 saat geçerli

    res.status(200).json({
        success: true,
        data: {
            token,
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            profileImage: user.profileImage,
        },
    });
});

// Kullanıcı profil resmini güncelle
exports.updateProfileImage = asyncHandler(async (req, res) => {
    const { userId, profileImage } = req.body;

    if (!userId || !profileImage) {
        return res.status(400).json({ success: false, message: 'Kullanıcı ID veya profil resmi eksik' });
    }

    const db = await connectDB(process.env.AUTH_DB);
    const User = db.model('User', userSchema);

    const user = await User.findByIdAndUpdate(
        userId,
        { profileImage },
        { new: true, runValidators: true }
    );

    if (!user) {
        return res.status(404).json({ success: false, message: 'Kullanıcı bulunamadı' });
    }

    res.status(200).json({ success: true, data: user });
});

// Kullanıcı profil resmini sil
exports.deleteProfileImage = asyncHandler(async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ success: false, message: 'Kullanıcı ID eksik' });
    }

    const db = await connectDB(process.env.AUTH_DB);
    const User = db.model('User', userSchema);

    const user = await User.findByIdAndUpdate(
        userId,
        { profileImage: null },
        { new: true, runValidators: true }
    );

    if (!user) {
        return res.status(404).json({ success: false, message: 'Kullanıcı bulunamadı' });
    }

    res.status(200).json({ success: true, message: 'Profil resmi silindi', data: user });
});

// Kullanıcı çıkış işlemi
exports.logout = asyncHandler(async (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    });

    res.status(200).json({ success: true, message: 'Başarıyla çıkış yaptınız' });
});

// Kullanıcı bilgilerini güncelleme
exports.updateUser = asyncHandler(async (req, res) => {
    const { userId, updates } = req.body;

    if (!userId || !updates) {
        return res.status(400).json({ success: false, message: 'Kullanıcı ID ve güncellemeler gerekli' });
    }

    const db = await connectDB(process.env.AUTH_DB);
    const User = db.model('User', userSchema);

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
        new: true,
        runValidators: true,
    });

    if (!updatedUser) {
        return res.status(404).json({ success: false, message: 'Kullanıcı bulunamadı' });
    }

    res.status(200).json({ success: true, data: updatedUser });
});


