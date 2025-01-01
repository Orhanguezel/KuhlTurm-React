const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');

// Ortam değişkenlerini yükle
dotenv.config();

// Veritabanı bağlantısı
connectDB(process.env.ARTICLES_DB); 

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // JSON verileri ayrıştırır
app.use(express.urlencoded({ extended: true })); // Form verilerini ayrıştırır

// Rotalar
app.use('/api/products', require('./routes/products')); // Ürün rotası
app.use('/api/auth', require('./routes/auth'));         // Auth rotası
app.use('/api/articles', require('./routes/articles')); // Makale rotası
app.use('/api/news', require('./routes/news'));         // Haber rotası
app.use('/api/spare-parts', require('./routes/spareParts')); // Yedek parça rotası
app.use('/api/references', require('./routes/references'));  // Referans rotası

// Sunucu başlatma
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
