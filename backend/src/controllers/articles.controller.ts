import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Article from "../models/articles.models";


// 🔹 Yeni makale oluştur
export const createArticle = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const {
    title,
    summary,
    content,
    slug,
    image,
    tags = [],
    category,
    language = "en",
    isPublished = false,
    publishedAt,
    author = req.user?.name,
  } = req.body;

  const article = await Article.create({
    title,
    summary,
    content,
    slug,
    image,
    tags,
    category,
    language,
    isPublished,
    publishedAt: isPublished ? publishedAt || new Date() : undefined,
    author,
  });

  res.status(201).json({
    success: true,
    message: "Article created successfully",
    article,
  });
});

// 🔹 Tüm makaleleri getir
export const getAllArticles = asyncHandler(async (_req: Request, res: Response): Promise<void> => {
  const articles = await Article.find().sort({ publishedAt: -1 });
  res.status(200).json(articles);
});

// 🔹 Slug ile makale getir
export const getArticleBySlug = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const article = await Article.findOne({ slug: req.params.slug });
  if (!article) {
    res.status(404).json({ message: "Article not found" });
    return;
  }
  res.status(200).json(article);
});

// 🔹 ID ile makale getir
export const getArticleById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const article = await Article.findById(req.params.id);
  if (!article) {
    res.status(404).json({ message: "Article not found" });
    return;
  }
  res.status(200).json(article);
});

// 🔹 Makaleyi güncelle
export const updateArticle = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const updated = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) {
    res.status(404).json({ message: "Article not found" });
    return;
  }

  res.status(200).json({
    success: true,
    message: "Article updated successfully",
    article: updated,
  });
});

// 🔹 Makaleyi sil
export const deleteArticle = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const deleted = await Article.findByIdAndDelete(req.params.id);
  if (!deleted) {
    res.status(404).json({ message: "Article not found" });
    return;
  }

  res.status(200).json({
    success: true,
    message: "Article deleted successfully",
  });
});
