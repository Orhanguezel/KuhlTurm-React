// src/controllers/library.controller.ts

import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import LibraryItem from "../models/library.models";
import { BASE_URL } from "../middleware/uploadMiddleware";

// 🔹 Yeni belge oluştur
export const createLibraryItem = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const {
    title,
    slug,
    description,
    category,
    tags = [],
    language = "en",
    fileType = "pdf",
    isPublished = false,
  } = req.body;

  const fileUrl = req.file
    ? `${BASE_URL}/uploads/library/${req.file.filename}`
    : "";

  if (!fileUrl) {
    res.status(400).json({ message: "File upload is required" });
    return;
  }

  const item = await LibraryItem.create({
    title,
    slug,
    description,
    category,
    tags,
    language,
    fileType,
    fileUrl,
    isPublished,
  });

  res.status(201).json({
    success: true,
    message: "Library item created successfully",
    item,
  });
});

// 🔹 Tüm belgeleri getir
export const getAllLibraryItems = asyncHandler(async (_req: Request, res: Response): Promise<void> => {
  const items = await LibraryItem.find().sort({ createdAt: -1 });
  res.status(200).json(items);
});

// 🔹 Slug ile belge getir
export const getLibraryItemBySlug = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const item = await LibraryItem.findOne({ slug: req.params.slug });
  if (!item) {
    res.status(404).json({ message: "Library item not found" });
    return;
  }
  res.status(200).json(item);
});

// 🔹 ID ile belge getir
export const getLibraryItemById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const item = await LibraryItem.findById(req.params.id);
  if (!item) {
    res.status(404).json({ message: "Library item not found" });
    return;
  }
  res.status(200).json(item);
});

// 🔹 Güncelle
export const updateLibraryItem = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const updates: any = { ...req.body };

  if (req.file) {
    updates.fileUrl = `${BASE_URL}/uploads/library/${req.file.filename}`;
  }

  const updated = await LibraryItem.findByIdAndUpdate(req.params.id, updates, { new: true });

  if (!updated) {
    res.status(404).json({ message: "Library item not found" });
    return;
  }

  res.status(200).json({
    success: true,
    message: "Library item updated successfully",
    item: updated,
  });
});

// 🔹 Sil
export const deleteLibraryItem = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const deleted = await LibraryItem.findByIdAndDelete(req.params.id);
  if (!deleted) {
    res.status(404).json({ message: "Library item not found" });
    return;
  }

  res.status(200).json({
    success: true,
    message: "Library item deleted successfully",
  });
});
