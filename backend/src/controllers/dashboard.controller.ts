// src/controllers/dashboard.controller.ts

import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import User from "../models/user.models";
import Order from "../models/order.models";
import Product from "../models/product.models";
import Blog from "../models/blog.models";
import Feedback from "../models/feedback.models";
import Email from "../models/email.models";
import Gallery from "../models/gallery.models";
import Service from "../models/service.models";
import Notification from "../models/notification.models";
import ContactMessage from "../models/contactMessage.models";

// ✅ Yeni eklenenler
import News from "../models/news.models";
import Reference from "../models/references.models";
import Library from "../models/library.models";
import Article from "../models/articles.models";

// 📊 Admin dashboard verileri
export const getDashboardStats = asyncHandler(async (_req: Request, res: Response): Promise<void> => {
  const [
    userCount,
    orderCount,
    productCount,
    blogCount,
    feedbackCount,
    emailCount,
    galleryCount,
    serviceCount,
    contactCount,
    notificationCount,
    newsCount,
    referenceCount,
    libraryCount,
    articleCount,
  ] = await Promise.all([
    User.countDocuments(),
    Order.countDocuments(),
    Product.countDocuments(),
    Blog.countDocuments(),
    Feedback.countDocuments(),
    Email.countDocuments(),
    Gallery.countDocuments(),
    Service.countDocuments(),
    ContactMessage.countDocuments(),
    Notification.countDocuments(),
    News.countDocuments(),
    Reference.countDocuments(),
    Library.countDocuments(),
    Article.countDocuments(),
  ]);

  const revenueAgg = await Order.aggregate([
    { $group: { _id: null, total: { $sum: "$totalPrice" } } },
  ]);

  const totalRevenue = revenueAgg[0]?.total || 0;

  res.status(200).json({
    success: true,
    message: "Dashboard stats fetched successfully",
    stats: {
      users: userCount,
      orders: orderCount,
      products: productCount,
      revenue: totalRevenue,
      blogs: blogCount,
      feedbacks: feedbackCount,
      emails: emailCount,
      gallery: galleryCount,
      services: serviceCount,
      contactMessages: contactCount,
      notifications: notificationCount,
      news: newsCount,
      references: referenceCount,
      library: libraryCount,
      articles: articleCount,
    },
  });
});
