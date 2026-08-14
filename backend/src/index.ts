import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { productsRouter } from "./routes/products.js";
import { categoriesRouter } from "./routes/categories.js";
import { quotesRouter } from "./routes/quotes.js";
import { contactsRouter } from "./routes/contacts.js";
import { uploadsRouter } from "./routes/uploads.js";

const app = express();
const port = Number(process.env.PORT) || 4000;
const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://localhost:3000";

app.use(
  cors({
    origin: frontendOrigin,
  }),
);
app.use(express.json());
app.use("/uploads", express.static(path.resolve("uploads")));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "efurniture-api" });
});

app.use("/api/products", productsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/quotes", quotesRouter);
app.use("/api/contacts", contactsRouter);
app.use("/api/uploads", uploadsRouter);

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});
