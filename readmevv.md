**Ensotek Su Soğutma Kulesi Fabrikası Web Sayfası Backend Geliştirme Yol Haritası**

**1. Proje Gereksinimlerinin Belirlenmesi**
   - **Kullanıcı Modülü**:
     - Üyelik sistemi (kayıt olma, giriş yapma, şifre sıfırlama).
     - Yetki seviyeleri (admin, kullanıcı).
   - **Veritabanı Yapıları**:
     - Ürünler: Ürün isimleri, açıklamalar, fiyatlar, teknik bilgiler, görseller.
     - Makaleler: Başlık, içerik, yazar bilgisi, yayın tarihi.
     - Yedek Malzemeler: Malzeme isimleri, stok bilgisi, fiyat.
     - Haberler: Haber başlığı, açıklama, tarih.
     - Referans Firmalar: Firma adı, logo, yapılan iş.
   - **CRUD İşlemleri**:
     - Ürünler, makaleler, yedek malzemeler, haberler ve referans firmalar için GET, POST, PUT, DELETE işlemleri.
   - **Test Araçları**:
     - Postman ile API testleri.
   - **Teknolojiler**:
     - Backend: Node.js, Express.js.
     - Veritabanı: MongoDB.

---

**2. Proje Yol Haritası**

### **Aşama 1: Proje Başlangıcı**
   1. **Proje Ortamının Hazırlanması**:
      - Node.js ve MongoDB kurulumu.
      - Proje dizin yapısının oluşturulması.
      - Gerekli bağımlılıkların yüklenmesi:
        ```bash
        npm init -y
        npm install express mongoose dotenv body-parser cors
        npm install --save-dev nodemon
        ```
   2. **.env Dosyasının Oluşturulması**:
      - Veritabanı bağlantı bilgilerini saklayın.

---

### **Aşama 2: Veritabanı Tasarımı**
   1. **MongoDB Modellerinin Tanımlanması**:
      - **users.js**: Kullanıcı modelini oluşturun.
      - **products.js**: Ürünler için model.
      - **articles.js**: Makaleler için model.
      - **spareParts.js**: Yedek malzemeler için model.
      - **news.js**: Haberler için model.
      - **references.js**: Referans firmalar için model.

---

### **Aşama 3: API Geliştirme**
   1. **Server Yapısının Kurulması**:
      - Express sunucusunu başlatın.
      - Temel route tanımları.
      - Middleware ve hata yakalama mekanizmaları ekleyin.
   2. **API Endpoint’leri**:
      - **Authentication**:
        - POST `/auth/register`: Kullanıcı kaydı.
        - POST `/auth/login`: Giriş işlemi.
        - POST `/auth/reset-password`: Şifre sıfırlama.
      - **Ürünler**:
        - GET `/products`: Tüm ürünleri listele.
        - POST `/products`: Yeni ürün ekle.
        - PUT `/products/:id`: Ürün güncelle.
        - DELETE `/products/:id`: Ürün sil.
      - **Makaleler**:
        - Aynı CRUD yapısını takip ederek `/articles` endpointlerini oluşturun.
      - **Yedek Malzemeler**:
        - CRUD endpointlerini `/spareParts` olarak yapılandırın.
      - **Haberler**:
        - CRUD endpointlerini `/news` olarak yapılandırın.
      - **Referans Firmalar**:
        - CRUD endpointlerini `/references` olarak yapılandırın.

---

### **Aşama 4: Veritabanı Entegrasyonu**
   - Mongoose kullanarak MongoDB bağlantısını kurun.
   - Her model için CRUD işlemlerini API endpoint’lerine bağlayın.

---

### **Aşama 5: Test Süreci**
   1. **Postman Kullanarak Test**:
      - Endpoint’lerin GET, POST, PUT ve DELETE işlemlerini test edin.
   2. **Birlikte Çalışabilirlik Testleri**:
      - Ürünler ve yedek malzemeler gibi ilişkili veri grupları üzerinde testler gerçekleştirin.

---

### **Aşama 6: Üyelik ve Yetkilendirme**
   1. **JWT ile Yetkilendirme**:
      - Kullanıcı oturumları için JWT entegrasyonu.
      - Rol tabanlı yetkilendirme.
   2. **Middleware**:
      - Authentication ve Authorization middleware’lerini oluşturun.

---

### **Aşama 7: Kod Optimizasyonu ve Dokümantasyon**
   - Kodu düzenli hale getirin.
   - Swagger veya başka bir araç ile API dokümantasyonu oluşturun.

---

### **Aşama 8: Dağıtım**
   - Backend uygulamasını bir sunucuya dağıtın (örneğin, Heroku, AWS veya başka bir platform).

---

**3. Önerilen Dosya Yapısı**
```
Ensotek-Backend
├── server.js
├── config
│   ├── db.js
│   ├── env.js
├── models
│   ├── users.js
│   ├── products.js
│   ├── articles.js
│   ├── spareParts.js
│   ├── news.js
│   ├── references.js
├── routes
│   ├── auth.js
│   ├── products.js
│   ├── articles.js
│   ├── spareParts.js
│   ├── news.js
│   ├── references.js
├── controllers
│   ├── authController.js
│   ├── productsController.js
│   ├── articlesController.js
│   ├── sparePartsController.js
│   ├── newsController.js
│   ├── referencesController.js
├── middleware
│   ├── authMiddleware.js
│   ├── errorHandler.js
└── package.json
```

Her aşamada yardıma ihtiyacınız olursa adım adım birlikte ilerleyebiliriz.


**Ensotek Web Sitesi Projesi için Backend ve Frontend Yapısı**

Proje iki ana bölümden oluşacak:

1. **Backend**: Node.js, Express.js ve MongoDB kullanılarak API oluşturulacak.
2. **Frontend**: React kullanılarak kullanıcı arayüzü oluşturulacak.

Şimdilik **Backend** kısmını geliştireceğiz.

---

### **Backend için Dosya ve Klasör Yapısı**

Proje dizini şu şekilde olacak:

```
ensotek-backend
├── config
│   ├── db.js               # Veritabanı bağlantısı
│   ├── env.js              # Ortam değişkenleri için
├── controllers
│   ├── authController.js   # Kullanıcı yönetimi için
│   ├── productController.js# Ürün CRUD işlemleri
│   ├── articleController.js# Makale CRUD işlemleri
│   ├── sparePartController.js # Yedek malzeme CRUD işlemleri
│   ├── newsController.js   # Haber CRUD işlemleri
│   ├── referenceController.js # Referans firmalar CRUD
├── middleware
│   ├── authMiddleware.js   # Kullanıcı yetkilendirme
│   ├── errorHandler.js     # Hata yakalama mekanizması
├── models
│   ├── User.js             # Kullanıcı modeli
│   ├── Product.js          # Ürün modeli
│   ├── Article.js          # Makale modeli
│   ├── SparePart.js        # Yedek malzeme modeli
│   ├── News.js             # Haber modeli
│   ├── Reference.js        # Referans firma modeli
├── routes
│   ├── auth.js             # Kullanıcı rotaları
│   ├── products.js         # Ürün rotaları
│   ├── articles.js         # Makale rotaları
│   ├── spareParts.js       # Yedek malzeme rotaları
│   ├── news.js             # Haber rotaları
│   ├── references.js       # Referans firma rotaları
├── utils
│   ├── logger.js           # Loglama aracı (isteğe bağlı)
├── .env                    # Ortam değişkenleri
├── .gitignore              # Git için gereksiz dosya listesi
├── package.json            # Proje bağımlılıkları
├── server.js               # Ana server dosyası
```

---

### **Backend Proje Yapısının Oluşturulması**

#### 1. **Proje Başlatma**
```bash
mkdir ensotek-backend
cd ensotek-backend
npm init -y
```

#### 2. **Gerekli Bağımlılıkların Yüklenmesi**
```bash
npm install express mongoose dotenv body-parser cors
npm install --save-dev nodemon
```

#### 3. **Proje Dosyalarını ve Klasörlerini Oluşturma**
```bash
mkdir config controllers middleware models routes utils
touch config/db.js config/env.js
touch controllers/authController.js controllers/productController.js controllers/articleController.js
touch middleware/authMiddleware.js middleware/errorHandler.js
touch models/User.js models/Product.js models/Article.js models/SparePart.js models/News.js models/Reference.js
touch routes/auth.js routes/products.js routes/articles.js routes/spareParts.js routes/news.js routes/references.js
touch utils/logger.js
touch .env .gitignore server.js
```

#### 4. **Projenin Temel Yapısını Doldurma**

- **server.js**: Ana giriş dosyasını oluşturun.

```javascript
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Ortam değişkenlerini yükle
dotenv.config();

// Veritabanını bağla
connectDB();

// Express uygulaması
const app = express();

// Middleware
app.use(express.json());
app.use(require('cors')());

// Rotalar
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/articles', require('./routes/articles'));
app.use('/api/spare-parts', require('./routes/spareParts'));
app.use('/api/news', require('./routes/news'));
app.use('/api/references', require('./routes/references'));

// Hata yönetimi middleware
app.use(require('./middleware/errorHandler'));

// Sunucu başlatma
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
```

- **config/db.js**: MongoDB bağlantısını ayarlayın.

```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
```

- **routes/products.js**: Ürünler için temel rotaları tanımlayın.

```javascript
const express = require('express');
const router = express.Router();
const { getAllProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');

// CRUD işlemleri
router.get('/', getAllProducts);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
```

- **controllers/productController.js**: Ürün CRUD işlemleri için dummy fonksiyonlar.

```javascript
exports.getAllProducts = (req, res) => {
    res.status(200).json({ success: true, message: 'All products fetched' });
};

exports.createProduct = (req, res) => {
    res.status(201).json({ success: true, message: 'Product created' });
};

exports.updateProduct = (req, res) => {
    res.status(200).json({ success: true, message: 'Product updated' });
};

exports.deleteProduct = (req, res) => {
    res.status(200).json({ success: true, message: 'Product deleted' });
};
```

---

### **Backend Kısmının Tamamlanması**

Bu yapıyla backend kısmı organize edilmiştir. İlk olarak veritabanı bağlantısını ve CRUD işlemlerini test edebilirsiniz. Bundan sonra, **frontend** kısmını React ile entegre ederek ilerleyebiliriz.

---

### **Sonraki Adım**
- Eğer backend kısmında geliştirmeyi tamamlamak istiyorsanız, **CRUD işlemlerini ve JWT ile kimlik doğrulamayı** uygulayabiliriz. Hazırsanız bir sonraki adıma geçelim.




db.updateUser("admin", { pwd: "newsecurepassword" })





### **Ensotek Su Soğutma Kulesi Fabrikası Web Sayfası Backend Geliştirme Yol Haritası: Güncel Durum**

#### **Tamamlanan Adımlar**

1. **Proje Ortamının Hazırlanması**
   - Node.js ve MongoDB kuruldu.
   - Proje dizin yapısı oluşturuldu.
   - Gerekli bağımlılıklar yüklendi (`express`, `mongoose`, `dotenv`, `body-parser`, `cors`).
   - `.env` dosyası oluşturuldu ve gerekli ortam değişkenleri eklendi.
   - Temel proje giriş dosyası olan `server.js` oluşturuldu.

2. **Veritabanı Tasarımı**
   - MongoDB modelleri tanımlandı:
     - **User**: Kullanıcı modeli.
     - **Product**: Ürün modeli.
     - **Article**: Makale modeli.
     - **SparePart**: Yedek malzeme modeli.
     - **News**: Haber modeli.
     - **Reference**: Referans firma modeli.

3. **API Endpoint’lerinin Geliştirilmesi**
   - CRUD işlemleri için temel rotalar ve controller’lar oluşturuldu:
     - **Authentication (Kullanıcı İşlemleri)**:
       - `/auth/register`, `/auth/login`, `/auth/logout`.
     - **Ürünler**:
       - `/products` için GET, POST, PUT, DELETE işlemleri.
     - **Makaleler**:
       - `/articles` için CRUD işlemleri.
     - **Yedek Malzemeler**:
       - `/spare-parts` için CRUD işlemleri.
     - **Haberler**:
       - `/news` için CRUD işlemleri.
     - **Referans Firmalar**:
       - `/references` için CRUD işlemleri.
   - Middleware ve hata yakalama mekanizmaları eklendi.

4. **Test Süreci**
   - Postman kullanılarak tüm endpoint’ler test edildi.
   - CRUD işlemlerinin hepsi başarıyla çalıştırıldı ve doğrulandı.

#### **Kalan Adımlar**

1. **JWT ile Yetkilendirme ve Rol Tabanlı Erişim Kontrolü**
   - Kullanıcıların JWT ile kimlik doğrulaması ve yetkilendirme işlemlerinin tamamen uygulanması.
   - **Admin** ve **User** rollerine göre erişim kısıtlamalarının daha detaylı uygulanması.

2. **Hata Yönetimi ve Gelişmiş Middleware**
   - **Hata yakalama mekanizması** (ör. 404, 500 hataları) geliştirilmesi ve kapsamlı hale getirilmesi.
   - Detaylı hata mesajlarının kullanıcıya ve log dosyasına yönlendirilmesi.

3. **Kod Optimizasyonu ve Refaktör**
   - Controller ve middleware dosyalarının düzenlenmesi.
   - Fazladan tekrar eden kodların yeniden kullanılır hale getirilmesi.
   - **Utils/logger.js** gibi araçlarla loglama yapılması.

4. **Dokümantasyon**
   - Swagger veya Postman üzerinden API dokümantasyonu hazırlanması.
   - Endpoint’lerin, istek/yanıt yapılarını ve örnekleri içeren tam bir dokümantasyon oluşturulması.

5. **Veritabanı İlişkileri ve Validasyon**
   - Modeller arasındaki ilişkilerin daha detaylı şekilde yapılandırılması.
   - Örneğin, bir ürünle ilişkili bir yedek parça veya makale bağlantısı eklenmesi.
   - Gelişmiş validasyon işlemlerinin uygulanması (ör. fiyatın pozitif bir sayı olması, tarih formatları vb.).

6. **Backend Dağıtımı**
   - Backend uygulamasının bir sunucuya dağıtımı (ör. AWS, Heroku veya DigitalOcean).
   - CI/CD entegrasyonu ile otomatik dağıtım süreci.

7. **Performans ve Güvenlik İyileştirmeleri**
   - API performans testleri ve iyileştirmeler.
   - Rate limiting, helmet gibi güvenlik paketlerinin entegrasyonu.

8. **Frontend Entegrasyonu**
   - React veya başka bir frontend framework ile backend API'nin entegre edilmesi.
   - Kullanıcı dostu bir arayüz oluşturulması.

---

### **Yeniden Düzenlenmiş Yol Haritası**

#### **Aşama 1: Mevcut Durum**
- Veritabanı modelleri tamamlandı.
- CRUD işlemleri test edildi ve başarıyla çalıştı.
- Proje çalışır durumda.

#### **Aşama 2: Kısa Vadeli Görevler**
1. JWT kimlik doğrulama ve yetkilendirme sistemini geliştirin.
2. Hata yönetimini ve loglama mekanizmalarını tamamlayın.
3. Kod bazında optimizasyon ve refaktör işlemleri gerçekleştirin.

#### **Aşama 3: Orta Vadeli Görevler**
1. Swagger dokümantasyonu oluşturun.
2. Daha karmaşık veritabanı ilişkilerini yapılandırın.
3. Backend uygulamasını bir dağıtım platformunda yayınlayın.

#### **Aşama 4: Uzun Vadeli Görevler**
1. Performans ve güvenlik optimizasyonları uygulayın.
2. Frontend geliştirmeye başlayın ve backend ile entegre edin.

Bu güncel yol haritası ile projenin eksiksiz bir şekilde ilerlemesini sağlayabiliriz. Hangi adımdan devam etmek istersiniz? 🚀
