import { Router } from "express";
import { prisma } from "../lib/prisma.js";

export const productsRouter = Router();

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
