import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import SparePart from "../models/spareParts.models";


// 🔹 Yeni yedek parça oluştur
export const createSparePart = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const {
    name,
    slug,
    code,
    description,
    image,
    category,
    manufacturer,
    specifications = {},
    stock = 0,
    price,
    tags = [],
    language = "en",
    isPublished = false,
  } = req.body;

  const sparePart = await SparePart.create({
    name,
    slug,
    code,
    description,
    image,
    category,
    manufacturer,
    specifications,
    stock,
    price,
    tags,
    language,
    isPublished,
  });

  res.status(201).json({
    success: true,
    message: "Spare part created successfully",
    sparePart,
  });
});

// 🔹 Tüm yedek parçaları getir
export const getAllSpareParts = asyncHandler(async (_req: Request, res: Response): Promise<void> => {
  const parts = await SparePart.find().sort({ createdAt: -1 });
  res.status(200).json(parts);
});

// 🔹 Slug ile yedek parça getir
export const getSparePartBySlug = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const part = await SparePart.findOne({ slug: req.params.slug });
  if (!part) {
    res.status(404).json({ message: "Spare part not found" });
    return;
  }
  res.status(200).json(part);
});

// 🔹 ID ile yedek parça getir
export const getSparePartById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const part = await SparePart.findById(req.params.id);
  if (!part) {
    res.status(404).json({ message: "Spare part not found" });
    return;
  }
  res.status(200).json(part);
});

// 🔹 Güncelleme
export const updateSparePart = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const updated = await SparePart.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) {
    res.status(404).json({ message: "Spare part not found" });
    return;
  }

  res.status(200).json({
    success: true,
    message: "Spare part updated successfully",
    sparePart: updated,
  });
});

// 🔹 Silme
export const deleteSparePart = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const deleted = await SparePart.findByIdAndDelete(req.params.id);
  if (!deleted) {
    res.status(404).json({ message: "Spare part not found" });
    return;
  }

  res.status(200).json({
    success: true,
    message: "Spare part deleted successfully",
  });
});
