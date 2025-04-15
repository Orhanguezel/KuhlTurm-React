// src/routes/dashboard.routes.ts

import express from "express";
import { getDashboardStats } from "../controllers/dashboard.controller";
import { authenticate, authorizeRoles } from "../middleware/authMiddleware";

const router = express.Router();

// 🔐 Sadece admin erişebilir
router.get("/", authenticate, authorizeRoles("admin"), getDashboardStats);

export default router;
