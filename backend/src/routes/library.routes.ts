import express, { Request, Response, NextFunction } from "express";
import {
  createLibraryItem,
  getAllLibraryItems,
  getLibraryItemById,
  getLibraryItemBySlug,
  updateLibraryItem,
  deleteLibraryItem,
} from "../controllers/library.controller";

import { authenticate, authorizeRoles } from "../middleware/authMiddleware";
import upload from "../middleware/uploadMiddleware";

const router = express.Router();

// 🌐 Public Routes
router.get("/", getAllLibraryItems);
router.get("/slug/:slug", getLibraryItemBySlug);
router.get("/:id", getLibraryItemById);

// 🔐 Protected Routes (admin / moderator)
router.post(
  "/",
  authenticate,
  authorizeRoles("admin", "moderator"),
  (req: Request, _res: Response, next: NextFunction) => {
    req.uploadType = "library"; 
    next();
  },
  upload.single("file"),
  createLibraryItem
);

router.put(
  "/:id",
  authenticate,
  authorizeRoles("admin", "moderator"),
  (req: Request, _res: Response, next: NextFunction) => {
    req.uploadType = "library";
    next();
  },
  upload.single("file"),
  updateLibraryItem
);

router.delete(
  "/:id",
  authenticate,
  authorizeRoles("admin"),
  deleteLibraryItem
);

export default router;
