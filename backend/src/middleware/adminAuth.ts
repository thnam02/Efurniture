import type { Request, Response, NextFunction } from "express";

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const expected = process.env.ADMIN_TOKEN;
  if (!expected) {
    res.status(500).json({ error: "ADMIN_TOKEN is not configured on the server" });
    return;
  }

  const token = req.header("x-admin-token");
  if (!token || token !== expected) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  next();
}
