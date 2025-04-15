import express, { Request, Response, NextFunction } from "express";
import {
  createReference,
  getAllReferences,
  getReferenceBySlug,
  getReferenceById,
  updateReference,
  deleteReference,
} from "../controllers/references.controller";

import { authenticate, authorizeRoles } from "../middleware/authMiddleware";
import upload from "../middleware/uploadMiddleware";


const router = express.Router();

// 🌐 Public Routes
router.get("/", getAllReferences);
router.get("/slug/:slug", getReferenceBySlug);
router.get("/:id", getReferenceById);

// 🔐 Protected Routes
router.post(
  "/",
  authenticate,
  authorizeRoles("admin", "moderator"),
  (req: Request, _res: Response, next: NextFunction) => {
    req.uploadType = "references"; 
    next();
  },
  upload.single("logo"),
  createReference
);

router.put(
  "/:id",
  authenticate,
  authorizeRoles("admin", "moderator"),
  (req: Request, _res: Response, next: NextFunction) => {
    req.uploadType = "references";
    next();
  },
  upload.single("logo"),
  updateReference
);

router.delete(
  "/:id",
  authenticate,
  authorizeRoles("admin"),
  deleteReference
);

export default router;
