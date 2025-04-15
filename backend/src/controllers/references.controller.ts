import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Reference from "../models/references.models";


// 🔹 Yeni referans oluştur
export const createReference = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const {
    companyName,
    slug,
    url,
    sector,
    country,
    year,
    tags = [],
    language = "en",
    description = "",
    isPublished = false,
  } = req.body;

  const logo = req.file
    ? `${process.env.BASE_URL}/uploads/references/${req.file.filename}`
    : undefined;

  const reference = await Reference.create({
    companyName,
    slug,
    url,
    sector,
    country,
    year,
    tags,
    description,
    language,
    isPublished,
    logo,
  });

  res.status(201).json({
    success: true,
    message: "Reference created successfully",
    reference,
  });
});

// 🔹 Tüm referansları getir
export const getAllReferences = asyncHandler(async (_req: Request, res: Response): Promise<void> => {
  const references = await Reference.find().sort({ createdAt: -1 });
  res.status(200).json(references);
});

// 🔹 Slug ile referans getir
export const getReferenceBySlug = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const reference = await Reference.findOne({ slug: req.params.slug });
  if (!reference) {
    res.status(404).json({ message: "Reference not found" });
    return;
  }
  res.status(200).json(reference);
});

// 🔹 ID ile referans getir
export const getReferenceById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const reference = await Reference.findById(req.params.id);
  if (!reference) {
    res.status(404).json({ message: "Reference not found" });
    return;
  }
  res.status(200).json(reference);
});

// 🔹 Güncelle
export const updateReference = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const updates = { ...req.body };

  if (req.file) {
    updates.logo = `${process.env.BASE_URL}/uploads/references/${req.file.filename}`;
  }

  const updated = await Reference.findByIdAndUpdate(req.params.id, updates, { new: true });
  if (!updated) {
    res.status(404).json({ message: "Reference not found" });
    return;
  }

  res.status(200).json({
    success: true,
    message: "Reference updated successfully",
    reference: updated,
  });
});

// 🔹 Sil
export const deleteReference = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const deleted = await Reference.findByIdAndDelete(req.params.id);
  if (!deleted) {
    res.status(404).json({ message: "Reference not found" });
    return;
  }

  res.status(200).json({
    success: true,
    message: "Reference deleted successfully",
  });
});
