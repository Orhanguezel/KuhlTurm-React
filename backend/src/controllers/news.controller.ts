// src/controllers/news.controller.ts

import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import News from "../models/news.models";
import { BASE_URL } from "../middleware/uploadMiddleware"; // image URL için

export const createNews = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { title, summary, content, slug, tags, category, language, isPublished, publishedAt } = req.body;

  // ❗ Kontrol: zorunlu alanlar var mı
  if (!title || !slug || !summary || !content || !req.file) {
    res.status(400).json({ message: "Required fields missing" });
    return;
  }

  // ✅ Görsel yolu
  const imageUrl = `${BASE_URL}/uploads/news/${req.file.filename}`;

  // ✅ tags JSON formatında geliyorsa dönüştür
  const parsedTags = typeof tags === "string" ? JSON.parse(tags) : tags;

  const news = await News.create({
    title,
    slug,
    summary,
    content,
    image: imageUrl,
    tags: parsedTags || [],
    category,
    author: req.user?.name,
    language: language || "en",
    isPublished: isPublished === "true" || false,
    publishedAt: isPublished === "true" ? publishedAt || new Date() : undefined,
  });

  res.status(201).json({
    success: true,
    message: "News created successfully",
    news,
  });
});


// 🔹 Tüm haberleri getir
export const getAllNews = asyncHandler(async (_req: Request, res: Response): Promise<void> => {
  const newsList = await News.find().sort({ publishedAt: -1 });
  res.status(200).json(newsList);
});

// 🔹 Tek haberi slug ile getir (public)
export const getNewsBySlug = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const news = await News.findOne({ slug: req.params.slug });
  if (!news) {
    res.status(404).json({ message: "News not found" });
    return;
  }
  res.status(200).json(news);
});

// 🔹 Tek haberi ID ile getir (admin)
export const getNewsById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const news = await News.findById(req.params.id);
  if (!news) {
    res.status(404).json({ message: "News not found" });
    return;
  }
  res.status(200).json(news);
});

// 🔹 Haberi güncelle
export const updateNews = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const updated = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) {
    res.status(404).json({ message: "News not found" });
    return;
  }

  res.status(200).json({
    success: true,
    message: "News updated successfully",
    news: updated,
  });
});

// 🔹 Haberi sil
export const deleteNews = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const deleted = await News.findByIdAndDelete(req.params.id);
  if (!deleted) {
    res.status(404).json({ message: "News not found" });
    return;
  }

  res.status(200).json({
    success: true,
    message: "News deleted successfully",
  });
});
