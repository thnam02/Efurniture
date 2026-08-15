import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { requireAdmin } from "../middleware/adminAuth.js";
import { slugify } from "../lib/slug.js";

export const categoriesRouter = Router();

async function uniqueSlug(base: string, excludeId?: string) {
  let slug = base || "danh-muc";
  let attempt = 0;

  while (true) {
    const candidate = attempt === 0 ? slug : `${slug}-${attempt}`;
    const existing = await prisma.category.findUnique({ where: { slug: candidate } });
    if (!existing || existing.id === excludeId) return candidate;
    attempt += 1;
  }
}

const imageUrlSchema = z
  .string()
  .refine(
    (value) =>
      value === "" ||
      value.startsWith("/uploads/") ||
      /^https?:\/\//i.test(value),
    "Image must be an http(s) URL or an uploaded /uploads/ path",
  )
  .optional()
  .nullable();

const categorySchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2).optional().or(z.literal("")),
  imageUrl: imageUrlSchema,
});

categoriesRouter.get("/", async (_req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: { _count: { select: { products: true } } },
      orderBy: { name: "asc" },
    });

    res.json({ data: categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

categoriesRouter.post("/", requireAdmin, async (req, res) => {
  try {
    const parsed = categorySchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid category data", details: parsed.error.flatten() });
      return;
    }

    const slug = await uniqueSlug(
      parsed.data.slug ? slugify(parsed.data.slug) : slugify(parsed.data.name),
    );

    const category = await prisma.category.create({
      data: {
        name: parsed.data.name.trim(),
        slug,
        imageUrl: parsed.data.imageUrl?.trim() || null,
      },
      include: { _count: { select: { products: true } } },
    });

    res.status(201).json({ data: category, message: "Category created" });
  } catch (error) {
    console.error(error);
    if (isUniqueError(error)) {
      res.status(409).json({ error: "Category name already exists" });
      return;
    }
    res.status(500).json({ error: "Failed to create category" });
  }
});

categoriesRouter.patch("/:id", requireAdmin, async (req, res) => {
  try {
    const existing = await prisma.category.findUnique({ where: { id: req.params.id } });
    if (!existing) {
      res.status(404).json({ error: "Category not found" });
      return;
    }

    const parsed = categorySchema.partial().safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid category data", details: parsed.error.flatten() });
      return;
    }

    let slug = existing.slug;
    if (parsed.data.slug) {
      slug = await uniqueSlug(slugify(parsed.data.slug), existing.id);
    }

    const category = await prisma.category.update({
      where: { id: existing.id },
      data: {
        ...(parsed.data.name !== undefined ? { name: parsed.data.name.trim() } : {}),
        ...(parsed.data.imageUrl !== undefined
          ? { imageUrl: parsed.data.imageUrl?.trim() || null }
          : {}),
        slug,
      },
      include: { _count: { select: { products: true } } },
    });

    res.json({ data: category, message: "Category updated" });
  } catch (error) {
    console.error(error);
    if (isUniqueError(error)) {
      res.status(409).json({ error: "Category name already exists" });
      return;
    }
    res.status(500).json({ error: "Failed to update category" });
  }
});

categoriesRouter.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const existing = await prisma.category.findUnique({
      where: { id: req.params.id },
      include: { _count: { select: { products: true } } },
    });

    if (!existing) {
      res.status(404).json({ error: "Category not found" });
      return;
    }

    if (existing._count.products > 0) {
      res.status(409).json({
        error: `Cannot delete: ${existing._count.products} product(s) still use this category`,
      });
      return;
    }

    await prisma.category.delete({ where: { id: existing.id } });
    res.json({ message: "Category deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete category" });
  }
});

function isUniqueError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code: string }).code === "P2002"
  );
}
