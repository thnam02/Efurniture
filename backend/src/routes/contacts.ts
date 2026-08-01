import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
});

export const contactsRouter = Router();

contactsRouter.post("/", async (req, res) => {
  try {
    const parsed = contactSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid contact data", details: parsed.error.flatten() });
      return;
    }

    const contact = await prisma.contactMessage.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone || null,
        message: parsed.data.message,
      },
    });

    res.status(201).json({ data: contact, message: "Message received" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to submit contact message" });
  }
});
