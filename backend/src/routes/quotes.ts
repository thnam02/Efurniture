import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { requireAdmin } from "../middleware/adminAuth.js";
import { uploadWithPdf } from "../lib/upload.js";

const quoteSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(8),
  email: z.string().email().optional().or(z.literal("")),
  description: z.string().min(10),
  dimensions: z.string().optional(),
});

const QUOTE_STATUSES = ["new", "contacted", "quoted", "closed"] as const;

const statusSchema = z.object({
  status: z.enum(QUOTE_STATUSES),
});

export const quotesRouter = Router();

quotesRouter.post("/", uploadWithPdf.single("file"), async (req, res) => {
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

quotesRouter.get("/", requireAdmin, async (req, res) => {
  try {
    const status = typeof req.query.status === "string" ? req.query.status : undefined;

    if (status && !QUOTE_STATUSES.includes(status as (typeof QUOTE_STATUSES)[number])) {
      res.status(400).json({ error: "Invalid status filter" });
      return;
    }

    const quotes = await prisma.quoteRequest.findMany({
      where: status ? { status } : undefined,
      orderBy: { createdAt: "desc" },
    });
    res.json({ data: quotes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch quotes" });
  }
});

quotesRouter.get("/:id", requireAdmin, async (req, res) => {
  try {
    const quote = await prisma.quoteRequest.findUnique({
      where: { id: req.params.id },
    });

    if (!quote) {
      res.status(404).json({ error: "Quote not found" });
      return;
    }

    res.json({ data: quote });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch quote" });
  }
});

quotesRouter.patch("/:id", requireAdmin, async (req, res) => {
  try {
    const parsed = statusSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid status", details: parsed.error.flatten() });
      return;
    }

    const existing = await prisma.quoteRequest.findUnique({
      where: { id: req.params.id },
    });

    if (!existing) {
      res.status(404).json({ error: "Quote not found" });
      return;
    }

    const quote = await prisma.quoteRequest.update({
      where: { id: req.params.id },
      data: { status: parsed.data.status },
    });

    res.json({ data: quote, message: "Quote updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update quote" });
  }
});
