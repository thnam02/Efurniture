import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { requireAdmin } from "../middleware/adminAuth.js";

export const productsRouter = Router();

function slugify(input: string) {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

async function uniqueSlug(base: string, excludeId?: string) {
  let slug = base || "san-pham";
  let attempt = 0;

  while (true) {
    const candidate = attempt === 0 ? slug : `${slug}-${attempt}`;
    const existing = await prisma.product.findUnique({ where: { slug: candidate } });
    if (!existing || existing.id === excludeId) return candidate;
    attempt += 1;
  }
}

const imageUrlSchema = z
  .string()
  .min(1)
  .refine(
    (value) => value.startsWith("/uploads/") || /^https?:\/\//i.test(value),
    "Image must be an http(s) URL or an uploaded /uploads/ path",
  );

const productSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2).optional().or(z.literal("")),
  description: z.string().optional().nullable(),
  priceFrom: z.coerce.number().int().positive(),
  imageUrl: imageUrlSchema,
  popular: z.boolean().optional().default(false),
  categoryId: z.string().min(1),
});

productsRouter.get("/", async (req, res) => {
  try {
    const { category, popular } = req.query;

    const products = await prisma.product.findMany({
      where: {
        ...(typeof category === "string" ? { category: { slug: category } } : {}),
        ...(popular === "true" ? { popular: true } : {}),
      },
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });

    res.json({ data: products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

productsRouter.get("/:idOrSlug", async (req, res) => {
  try {
    const { idOrSlug } = req.params;

    const product = await prisma.product.findFirst({
      where: {
        OR: [{ id: idOrSlug }, { slug: idOrSlug }],
      },
      include: { category: true },
    });

    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    res.json({ data: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

productsRouter.post("/", requireAdmin, async (req, res) => {
  try {
    const parsed = productSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid product data", details: parsed.error.flatten() });
      return;
    }

    const category = await prisma.category.findUnique({
      where: { id: parsed.data.categoryId },
    });
    if (!category) {
      res.status(400).json({ error: "Category not found" });
      return;
    }

    const slug = await uniqueSlug(
      parsed.data.slug ? slugify(parsed.data.slug) : slugify(parsed.data.name),
    );

    const product = await prisma.product.create({
      data: {
        name: parsed.data.name,
        slug,
        description: parsed.data.description || null,
        priceFrom: parsed.data.priceFrom,
        imageUrl: parsed.data.imageUrl,
        popular: parsed.data.popular ?? false,
        categoryId: parsed.data.categoryId,
      },
      include: { category: true },
    });

    res.status(201).json({ data: product, message: "Product created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create product" });
  }
});

productsRouter.patch("/:id", requireAdmin, async (req, res) => {
  try {
    const existing = await prisma.product.findUnique({ where: { id: req.params.id } });
    if (!existing) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    const parsed = productSchema.partial().safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid product data", details: parsed.error.flatten() });
      return;
    }

    if (parsed.data.categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: parsed.data.categoryId },
      });
      if (!category) {
        res.status(400).json({ error: "Category not found" });
        return;
      }
    }

    let slug = existing.slug;
    if (parsed.data.slug) {
      slug = await uniqueSlug(slugify(parsed.data.slug), existing.id);
    } else if (parsed.data.name && !req.body.slug) {
      // keep existing slug when renaming unless slug provided
      slug = existing.slug;
    }

    const product = await prisma.product.update({
      where: { id: existing.id },
      data: {
        ...(parsed.data.name !== undefined ? { name: parsed.data.name } : {}),
        ...(parsed.data.description !== undefined
          ? { description: parsed.data.description || null }
          : {}),
        ...(parsed.data.priceFrom !== undefined ? { priceFrom: parsed.data.priceFrom } : {}),
        ...(parsed.data.imageUrl !== undefined ? { imageUrl: parsed.data.imageUrl } : {}),
        ...(parsed.data.popular !== undefined ? { popular: parsed.data.popular } : {}),
        ...(parsed.data.categoryId !== undefined ? { categoryId: parsed.data.categoryId } : {}),
        slug,
      },
      include: { category: true },
    });

    res.json({ data: product, message: "Product updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update product" });
  }
});

productsRouter.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const existing = await prisma.product.findUnique({ where: { id: req.params.id } });
    if (!existing) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    await prisma.product.delete({ where: { id: existing.id } });
    res.json({ message: "Product deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete product" });
  }
});
