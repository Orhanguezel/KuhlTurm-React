import multer, { FileFilterCallback } from "multer";
import path from "path";
import fs from "fs";
import express from "express";
import { Request } from "express";
import dotenv from "dotenv";

dotenv.config();

const BASE_UPLOAD_DIR = "uploads";
const BASE_URL = process.env.BASE_URL || "http://localhost:5015";

// 🔁 Kullanılan tüm upload klasörleri
export const UPLOAD_FOLDERS = {
  profile: "profile-images",
  product: "product-images",
  category: "category-images",
  blog: "blog-images",
  gallery: "gallery",
  service: "service-images",
  library: "library", // ✅ PDF & belge dosyaları için
  references: "references", // ✅ Referans logoları için
  default: "",
} as const;

type UploadFolderKeys = keyof typeof UPLOAD_FOLDERS;

// 📁 Gerekli klasörleri oluştur
Object.values(UPLOAD_FOLDERS).forEach((folder) => {
  const fullPath = path.join(BASE_UPLOAD_DIR, folder);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

// 📂 Dosya depolama ayarı
const storage = multer.diskStorage({
  destination: (req, _file, cb) => {
    const folderKey = req.uploadType as UploadFolderKeys;
    const uploadFolder = UPLOAD_FOLDERS[folderKey] || UPLOAD_FOLDERS.default;
    const fullPath = path.join(BASE_UPLOAD_DIR, uploadFolder);
    cb(null, fullPath);
  },
  filename: (_req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

// 📌 Desteklenen MIME türleri (görseller + belgeler)
const allowedMimeTypes = [
  // Görseller
  "image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif",
  // Belgeler
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  "application/msword", // .doc
  "application/vnd.ms-powerpoint", // .ppt
  "application/vnd.openxmlformats-officedocument.presentationml.presentation", // .pptx
];

const fileFilter = (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    console.warn(`❌ Unsupported file type: ${file.originalname} (${file.mimetype})`);
    cb(null, false); // geçersizse sessizce engelle
  }
};

// 🎯 Multer yapılandırması
const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB sınır
  fileFilter,
});

// 🌐 uploads klasörünü statik olarak sun
export const serveUploads = express.static(BASE_UPLOAD_DIR);
export { BASE_URL, UploadFolderKeys };
export default upload;
