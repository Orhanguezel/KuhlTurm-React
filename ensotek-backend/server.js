const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser'); // Cookie parser middleware
const errorHandler = require('./middleware/errorHandler');

// Ortam değişkenlerini yükle
dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: true, credentials: true })); // CORS ile cookie kullanımı
app.use(express.json()); // JSON verileri ayrıştırır
app.use(express.urlencoded({ extended: true })); // Form verilerini ayrıştırır
app.use(cookieParser()); // Cookie parser middleware'i ekledik

// Rotalar
app.use('/api/products', require('./routes/products')); // Ürün rotası
app.use('/api/auth', require('./routes/auth'));         // Auth rotası
app.use('/api/articles', require('./routes/articles')); // Makale rotası
app.use('/api/news', require('./routes/news'));         // Haber rotası
app.use('/api/spare-parts', require('./routes/spareParts')); // Yedek parça rotası
app.use('/api/references', require('./routes/references'));  // Referans rotası

// Hata yönetimi middleware'i
app.use(errorHandler);

// Sunucu başlatma
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

