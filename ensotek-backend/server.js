const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');

// Ortam değişkenlerini yükle
dotenv.config();

// Veritabanı bağlantısı
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rotalar
app.use('/api/products', require('./routes/products')); // Ürün rotası
app.use('/api/auth', require('./routes/auth'));         // Auth rotası

// Sunucu başlatma
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
