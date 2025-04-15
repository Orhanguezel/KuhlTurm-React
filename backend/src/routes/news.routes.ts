import express, { Request, Response, NextFunction } from "express";
import {
  createNews,
  getAllNews,
  getNewsById,
  getNewsBySlug,
  updateNews,
  deleteNews,
} from "../controllers/news.controller";
import { authenticate, authorizeRoles } from "../middleware/authMiddleware";
import upload from "../middleware/uploadMiddleware";

const router = express.Router();

// 🌐 Public
router.get("/", getAllNews);               // Tüm haberleri getir
router.get("/slug/:slug", getNewsBySlug);  // Slug ile getir
router.get("/:id", getNewsById);           // ID ile getir (admin panel için de kullanılabilir)

// 🔐 Protected (admin / moderator)
router.post(
  "/",
  authenticate,
  authorizeRoles("admin", "moderator"),
  (req: Request, _res: Response, next: NextFunction) => {
    req.uploadType = "news";  // 🔁 upload klasörü belirleniyor
    next();
  },
  upload.single("image"), // 📷 form-data alan adı: "image"
  createNews
);

router.put(
  "/:id",
  authenticate,
  authorizeRoles("admin", "moderator"),
  (req: Request, _res: Response, next: NextFunction) => {
    req.uploadType = "news";
    next();
  },
  upload.single("image"),
  updateNews
);

router.delete(
  "/:id",
  authenticate,
  authorizeRoles("admin"),
  deleteNews
);

export default router;
