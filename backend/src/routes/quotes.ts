import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";

const uploadsDir = path.resolve("uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const safe = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
    cb(null, `${Date.now()}-${safe}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = /\.(jpe?g|png|webp|pdf|gif)$/i.test(file.originalname);
    cb(null, allowed);
  },
});

const quoteSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(8),
  email: z.string().email().optional().or(z.literal("")),
  description: z.string().min(10),
  dimensions: z.string().optional(),
});

export const quotesRouter = Router();

quotesRouter.post("/", upload.single("file"), async (req, res) => {
  try {
    const parsed = quoteSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid quote data", details: parsed.error.flatten() });
      return;
    }

    const { name, phone, email, description, dimensions } = parsed.data;

    const quote = await prisma.quoteRequest.create({
      data: {
        name,
        phone,
        email: email || null,
        description,
        dimensions: dimensions || null,
        filePath: req.file ? `/uploads/${req.file.filename}` : null,
      },
    });

    res.status(201).json({ data: quote, message: "Quote request received" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to submit quote request" });
  }
});

quotesRouter.get("/", async (_req, res) => {
  try {
    const quotes = await prisma.quoteRequest.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json({ data: quotes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch quotes" });
  }
});
