// src/routes/index.ts

import express, { Router } from "express";
import userRoutes from "./user.routes";
import productRoutes from "./product.routes";

import categoryRoutes from "./category.routes";
import stockRoutes from "./stock.routes";
import orderRoutes from "./order.routes";
import paymentRoutes from "./payment.routes";

import blogRoutes from "./blog.routes";
import newsRoutes from "./news.routes";
import articlesRoutes from "./articles.routes";
import sparePartsRoutes from "./spareParts.routes";
import librarayRoutes from "./library.routes";
import referencesRoutes from "./references.routes";


import dashboardRoutes from "./dashboard.routes";
import cartRoutes from "./cart.routes";
import notificationRoutes from "./notification.routes";
import feedbackRoutes from "./feedback.routes";
import settingsRoutes from "./settings.routes";
import contactRoutes from "./contact.routes";
import galleryRoutes from "./gallery.routes";
import faqRoutes from "./faq.routes";


import accountRoutes from "./account.routes";
import servicesRoutes from "./services.routes";
import emailRoutes from "./email.routes";




const router: Router = express.Router();

router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/orders", orderRoutes);
router.use("/blogs", blogRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/cart", cartRoutes);
router.use("/notifications", notificationRoutes);
router.use("/feedbacks", feedbackRoutes);
router.use("/contacts", contactRoutes);
router.use("/settings", settingsRoutes);
router.use("/faqs", faqRoutes);
router.use("/gallery", galleryRoutes);
router.use("/stocks", stockRoutes);
router.use("/payments", paymentRoutes);
router.use("/account", accountRoutes);
router.use("/services", servicesRoutes);
router.use("/emails", emailRoutes);
router.use("/categories", categoryRoutes);
router.use("/news", newsRoutes);
router.use("/articles", articlesRoutes);
router.use("/spareparts", sparePartsRoutes);
router.use("/library", librarayRoutes);
router.use("/references", referencesRoutes);


export default router;

