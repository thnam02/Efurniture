import { Router } from "express";
import { requireAdmin } from "../middleware/adminAuth.js";
import { upload } from "../lib/upload.js";

export const uploadsRouter = Router();

uploadsRouter.post("/", requireAdmin, upload.single("file"), (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: "Image file is required (jpg, png, webp, gif)" });
    return;
  }

  const url = `/uploads/${req.file.filename}`;
  res.status(201).json({ data: { url, filename: req.file.filename } });
});
